import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = "https://hackathon.api.qloo.com";

type ProjectBrief = {
  projectName?: string;
  type?: string;
  category?: string;
  location?: string;
  audience?: string;
  culturalContext?: string;
  discoveryGoals?: string;
  details?: string;
  atmosphere?: string;
  budget?: string;
  interests?: string | string[];
  dietaryRequirements?: string;
  priceRange?: string;
  diningStyle?: string;
};

type CulturalTag = {
  id: string;
  name: string;
};

type QlooEntity = {
  entity_id?: string;
  name?: string;
  subtype?: string;
  type?: string;
  tags?: Array<{ name?: string; id?: string }>;
  properties?: {
    description?: string;
    genres?: string[] | string;
    emotional_tone_description?: string;
    style_description?: string;
    audience_identity?: string;
    image?: { url?: string };
    websites?: Array<{ url?: string; name?: string }>;
    address?: string;
  };
};

type Insight = {
  id: string;
  name: string;
  category: string;
  description: string;
  genres: string[] | string;
  tone: string;
  style: string;
  audience: string;
  image: string | null;
  websites: Array<{ url?: string; name?: string }>;
  tags: string[];
  relevanceScore?: number;
};

type CategoryStrategy = {
  label: string;
  themes: string[];
  entityTypes: string[];
  hardLocation: boolean;
  requiredTags?: string[];
  excludedWords?: string[];
};

const CATEGORY_STRATEGIES: Record<string, CategoryStrategy> = {
  artists: {
    label: "Artists",
    themes: [
      "music genres and musical artists",
      "local music scenes and cultural identity",
      "artists with related sounds and styles",
    ],
    entityTypes: ["urn:entity:artist"],
    hardLocation: false,
  },

  movies: {
    label: "Movies",
    themes: [
      "film genres and cinematic styles",
      "storytelling traditions and film culture",
      "directors actors and related movies",
    ],
    entityTypes: ["urn:entity:movie"],
    hardLocation: false,
  },

  travel: {
    label: "For Travellers",
    themes: [
      "tourist attractions and landmarks",
      "museums heritage architecture and art",
      "cultural destinations and places worth visiting",
    ],
    entityTypes: ["urn:entity:place", "urn:entity:destination"],
    hardLocation: true,
    excludedWords: [
      "office",
      "administrative office",
      "government office",
      "corporate office",
      "headquarters",
      "warehouse",
      "distribution center",
      "repair shop",
      "car dealership",
      "plumbing",
      "accounting firm",
      "law office",
      "real estate agency",
      "estate agent",
      "insurance agency",
      "shipping office",
      "logistics office",
      "charity office",
      "donation center",
    ],
  },

  restaurants: {
    label: "Restaurants",
    themes: [
      "regional cuisine and food culture",
      "restaurants serving local and international food",
      "dining styles cuisines and food traditions",
    ],
    entityTypes: ["urn:entity:place"],
    hardLocation: true,
    requiredTags: ["urn:tag:genre:place:restaurant"],
    excludedWords: [
      "administrative office",
      "government office",
      "corporate office",
      "warehouse",
      "distribution center",
      "car dealership",
      "law office",
      "insurance agency",
    ],
  },
};

function normalizeCategory(value?: string): string {
  const normalized = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  const aliases: Record<string, string> = {
    artist: "artists",
    music: "artists",
    musicians: "artists",
    movie: "movies",
    film: "movies",
    films: "movies",
    destination: "travel",
    tourism: "travel",
    restaurant: "restaurants",
    food: "restaurants",
    dining: "restaurants",
  };

  const category = aliases[normalized] ?? normalized;

  return CATEGORY_STRATEGIES[category] ? category : "";
}

async function qlooGet(
  path: string,
  params: Record<string, string>,
  apiKey: string,
) {
  const url = new URL(path, BASE_URL);

  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      });

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("retry-after"));
        const delay =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? Math.min(retryAfter * 1000, 10000)
            : 1500 * (attempt + 1);

        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        const error = new Error("Qloo rate limit reached") as Error & {
          status?: number;
        };
        error.status = 429;
        throw error;
      }

      if (!response.ok) {
        const error = new Error(
          `Qloo request failed: ${response.status}`,
        ) as Error & { status?: number };
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      lastError = error as Error;

      if ((error as { status?: number }).status === 429) {
        throw error;
      }

      if (attempt < 2) {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
        continue;
      }
    }
  }

  throw lastError ?? new Error("Qloo request failed");
}

function getTags(data: any): CulturalTag[] {
  const possibleTags =
    data?.results?.tags ??
    data?.results ??
    data?.tags ??
    [];

  if (!Array.isArray(possibleTags)) return [];

  return possibleTags
    .map((tag: any) => ({
      id: String(tag.tag_id ?? tag.id ?? ""),
      name: String(tag.name ?? tag.label ?? ""),
    }))
    .filter((tag: CulturalTag) => tag.id && tag.name);
}

function getWords(value: unknown): Set<string> {
  const text = Array.isArray(value)
    ? value.join(" ")
    : String(value ?? "");

  const stopWords = new Set([
    "the", "and", "for", "with", "from", "that", "this",
    "are", "was", "were", "has", "have", "had", "into",
    "your", "you", "our", "their", "they", "them", "its",
    "about", "want", "looking", "find", "recommend",
    "recommendations", "best", "good", "great", "near",
    "nearby", "place", "places", "project", "culture",
    "culturespace", "experience", "experiences", "something",
    "would", "could", "should", "like", "love",
  ]);

  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(
        (word) => word.length > 2 && !stopWords.has(word),
      ),
  );
}

function entityText(entity: Insight): string {
  return [
    entity.name,
    entity.category,
    entity.description,
    entity.genres,
    entity.tone,
    entity.style,
    entity.audience,
    entity.tags,
  ]
    .flat()
    .filter(Boolean)
    .join(" ");
}

function getRelevanceScore(
  insight: Insight,
  briefWords: Set<string>,
  category: string,
): number {
  const entityWords = getWords(entityText(insight));
  let score = 0;

  for (const word of briefWords) {
    if (entityWords.has(word)) score += 2;
  }

  const tagWords = getWords(insight.tags);

  for (const word of briefWords) {
    if (tagWords.has(word)) score += 1;
  }

  if (insight.name) score += 1;
  if (insight.description) score += 1;
  if (insight.image) score += 1;

  const lower = entityText(insight).toLowerCase();

  if (category === "travel") {
    if (
      /museum|landmark|heritage|historic|historical|monument|gallery|architecture|palace|castle|temple|park|garden|waterfall|beach|national park|cultural|attraction|theatre|theater|art center|art centre/i.test(lower)
    ) {
      score += 5;
    }

    if (
      /shop|store|retail|office|headquarters|warehouse|dealership|charity office|administrative/i.test(lower)
    ) {
      score -= 8;
    }
  }

  if (category === "restaurants") {
    if (
      /restaurant|dining|cuisine|food|grill|bistro|eatery|kitchen|cafe|café|bar and grill|steakhouse|suya|seafood/i.test(lower)
    ) {
      score += 4;
    }
  }

  if (category === "artists" && insight.genres) score += 2;
  if (category === "movies" && insight.genres) score += 2;

  return score;
}

function toInsight(
  entity: QlooEntity,
  fallbackCategory: string,
): Insight | null {
  const id = entity.entity_id ?? "";

  if (!id || !entity.name) return null;

  const properties = entity.properties ?? {};

  return {
    id,
    name: entity.name,
    category: entity.subtype ?? fallbackCategory,
    description: properties.description ?? "",
    genres: properties.genres ?? [],
    tone: properties.emotional_tone_description ?? "",
    style: properties.style_description ?? "",
    audience: properties.audience_identity ?? "",
    image: properties.image?.url ?? null,
    websites: properties.websites ?? [],
    tags: (entity.tags ?? [])
      .slice(0, 10)
      .map((tag) => tag.name ?? "")
      .filter(Boolean),
  };
}

function containsExcludedWords(
  insight: Insight,
  excludedWords: string[] = [],
): boolean {
  const text = entityText(insight).toLowerCase();

  return excludedWords.some((word) =>
    text.includes(word.toLowerCase()),
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.QLOO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Qloo API key is missing from server configuration.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ProjectBrief;

    const projectName =
      body.projectName?.trim() || "Untitled project";

    const type = normalizeCategory(body.type ?? body.category);
    const location = body.location?.trim() || "";
    const audience = body.audience?.trim() || "";
    const culturalContext =
      body.culturalContext?.trim() || body.atmosphere?.trim() || "";
    const discoveryGoals =
      body.discoveryGoals?.trim() || body.details?.trim() || "";
    const interests = Array.isArray(body.interests)
      ? body.interests.join(", ")
      : body.interests?.trim() || "";

    if (!type) {
      return NextResponse.json(
        {
          error:
            "Choose one category: Artists, Movies, Travel, or Restaurants.",
        },
        { status: 400 },
      );
    }

    const strategy = CATEGORY_STRATEGIES[type];

    if (strategy.hardLocation && !location) {
      return NextResponse.json(
        {
          error: `${strategy.label} recommendations need a location so results can be filtered to the area you selected.`,
        },
        { status: 400 },
      );
    }

    const hasUserContext = [
      location,
      audience,
      culturalContext,
      discoveryGoals,
      interests,
    ].some(Boolean);

    if (!hasUserContext) {
      return NextResponse.json(
        {
          error:
            "Add cultural interests, cultural context, an audience, discovery goals, or a location before starting research.",
        },
        { status: 400 },
      );
    }

    // Discover cultural tags using category-specific context.
    // Restaurant searches use food preferences, never musicians
    // as their primary cultural signals.
    const categoryTerms = strategy.themes;

    const userTerms = [
      interests,
      culturalContext,
      audience,
      discoveryGoals,
    ]
      .filter(Boolean)
      .slice(0, 4);

    const searchTerms = [
      ...categoryTerms.slice(0, 2),
      ...userTerms,
    ].slice(0, 5);

    const uniqueTagMap = new Map<string, CulturalTag>();

    for (const term of searchTerms) {
      try {
        const data = await qlooGet(
          "/v2/tags",
          {
            "filter.query": term.slice(0, 100),
            take: "5",
          },
          apiKey,
        );

        for (const tag of getTags(data)) {
          if (!uniqueTagMap.has(tag.id)) {
            uniqueTagMap.set(tag.id, tag);
          }
        }
      } catch (error) {
        if ((error as { status?: number }).status === 429) {
          throw error;
        }

        console.warn(
          "A cultural tag search was unavailable.",
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 300),
      );
    }

    const discoveredTags = Array.from(
      uniqueTagMap.values(),
    ).slice(0, 10);

    const insights: Insight[] = [];
    const seen = new Set<string>();

    // Fetch recommendations using the selected category's strategy.
    for (const entityType of strategy.entityTypes) {
      const params: Record<string, string> = {
        "filter.type": entityType,
        take: "20",
        "feature.explainability": "true",
      };

      if (discoveredTags.length > 0) {
        params["signal.interests.tags"] = discoveredTags
          .map((tag) => tag.id)
          .join(",");
      }

      if (location) {
        if (strategy.hardLocation) {
          // Travel and Restaurants must respect the selected location.
          params["filter.location.query"] = location;
          params["filter.location.radius"] = "0";
        } else {
          // Artists and Movies can discover culturally relevant results
          // beyond the selected location.
          params["signal.location.query"] = location;
        }
      }

      if (type === "restaurants") {
        params["filter.tags"] = strategy.requiredTags!.join(",");
      }

      try {
        let data: any;

        try {
          data = await qlooGet(
            "/v2/insights",
            params,
            apiKey,
          );
        } catch (error) {
          if (
            type !== "movies" ||
            (error as { status?: number }).status === 429
          ) {
            throw error;
          }

          console.warn(
            "Movie interest-based search failed; trying fallback search.",
          );

          const fallbackParams: Record<string, string> = {
            "filter.type": entityType,
            take: "20",
          };

          if (location) {
            fallbackParams["signal.location.query"] = location;
          }

          data = await qlooGet(
            "/v2/insights",
            fallbackParams,
            apiKey,
          );
        }

        let entities: QlooEntity[] =
          data?.results?.entities ?? [];

        if (type === "movies" && entities.length === 0) {
          console.info(
            "Movie search returned no results; trying a simpler query.",
          );

          const fallbackParams: Record<string, string> = {
            "filter.type": entityType,
            take: "20",
          };

          if (location) {
            fallbackParams["signal.location.query"] = location;
          }

          const fallbackData = await qlooGet(
            "/v2/insights",
            fallbackParams,
            apiKey,
          );

          entities = fallbackData?.results?.entities ?? [];
        }

        for (const entity of entities) {
          const insight = toInsight(entity, entityType);

          if (!insight || seen.has(insight.id)) continue;

          if (
            containsExcludedWords(
              insight,
              strategy.excludedWords,
            )
          ) {
            continue;
          }

          seen.add(insight.id);
          insights.push(insight);
        }
      } catch (error) {
        if ((error as { status?: number }).status === 429) {
          throw error;
        }

        console.warn(
          `Skipping unavailable Qloo type: ${entityType}`,
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 400),
      );
    }

    // Rank candidates using the user's preferences and category themes.
    const briefForMatching = [
      projectName,
      location,
      audience,
      culturalContext,
      discoveryGoals,
      interests,
      ...strategy.themes,
      ...discoveredTags.map((tag) => tag.name),
    ]
      .filter(Boolean)
      .join(" ");

    const briefWords = getWords(briefForMatching);

    const ranked = insights
      .map((insight) => ({
        ...insight,
        relevanceScore: getRelevanceScore(
          insight,
          briefWords,
          type,
        ),
      }))
      .sort(
        (a, b) =>
          b.relevanceScore! - a.relevanceScore!,
      );

    const rankedInsights = ranked.slice(0, 16);

    return NextResponse.json({
      project: {
        projectName,
        type,
        location,
        audience,
        culturalContext,
        discoveryGoals,
        interests,
      },
      source: "Qloo",
      researchFocus: strategy.themes,
      discoveredTags,
      insights: rankedInsights,
      message:
        rankedInsights.length === 0
          ? `Qloo returned no ${strategy.label.toLowerCase()} references for this search. Try adjusting your interests or preferences${
              strategy.hardLocation
                ? " while keeping your selected location"
                : ""
            }.`
          : `Cultural references for ${strategy.label.toLowerCase()} were retrieved from Qloo and ranked using category-relevant signals. CultureSpace's explanations and interpretations are separate from Qloo's source data.`,
    });
  } catch (error) {
    console.error(
      "CultureSpace research request failed.",
    );

    if ((error as { status?: number }).status === 429) {
      return NextResponse.json(
        {
          error:
            "Qloo's API rate limit has been reached. Please wait a little before trying this research again.",
          code: "QLOO_RATE_LIMIT",
        },
        {
          status: 429,
          headers: { "Retry-After": "15" },
        },
      );
    }

    return NextResponse.json(
      {
        error:
          "Research could not be completed. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
