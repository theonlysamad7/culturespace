"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  projectName: string;
  type: string;
  location: string;
  culturalContext?: string;
  interests?: string;
  audience: string;
  discoveryGoals?: string;
  createdAt: string;
};


type CulturalTag = {
  id: string;
  name: string;
};

type Insight = {
  id: string;
  name: string;
  category: string;
  description: string;
  genres: string[];
  tone: string;
  style: string;
  audience: string;
  image: string | null;
  websites: Array<{ url?: string; name?: string }>;
  tags: string[];
};

type Research = {
  project?: Project;
  source?: string;
  discoveredTags: CulturalTag[];
  insights: Insight[];
  message?: string;
  error?: string;
};

const projectTypes: Record<string, string> = {
  artists: "Artists",
  movies: "Movies & film",
  travel: "For Travellers",
  restaurants: "Restaurants & food",
};

const categoryNames: Record<string, string> = {
  "urn:entity:artist": "Artist",
  "urn:entity:brand": "Brand",
  "urn:entity:destination": "Destination",
  "urn:entity:movie": "Movie",
  "urn:entity:book": "Book",
  "urn:entity:person": "Person",
  "urn:entity:place": "Place",
  artist: "Artist",
  brand: "Brand",
  destination: "Destination",
  movie: "Movie",
  book: "Book",
  place: "Place",
};

function getCreativeDirections(project: Project, insights: Insight[] = []) {
  const references = insights
    .slice(0, 4)
    .map((item) => item.name)
    .filter(Boolean);

  const anchor = references.length
    ? references.join(", ")
    : "cultural references discovered through further research";

  const directions: Record<
    string,
    Array<{ title: string; label: string; description: string }>
  > = {
    artists: [
      {
        title: "Follow the influences",
        label: "Artistic connections",
        description: `Explore the connections between ${anchor}, including shared influences, creative movements, and unexpected relationships.`,
      },
      {
        title: "Discover adjacent voices",
        label: "New artists",
        description: "Use familiar interests to discover artists, styles, and creative communities you may not have encountered yet.",
      },
      {
        title: "Build a cultural story",
        label: "Themes and meaning",
        description: `Connect these references to your interests and audience to develop a distinctive cultural point of view for ${project.projectName}.`,
      },
    ],
    movies: [
      {
        title: "Trace the storylines",
        label: "Film connections",
        description: `Explore what connects ${anchor}, from recurring themes and genres to storytelling traditions and creative influences.`,
      },
      {
        title: "Look beyond the familiar",
        label: "New perspectives",
        description: "Discover different directors, international cinema, and related stories through your existing film interests.",
      },
      {
        title: "Find the shared themes",
        label: "Narrative and culture",
        description: "Investigate how these films connect with your cultural context, intended audience, and discovery goals.",
      },
    ],
    travel: [
      {
        title: "Explore cultural connections",
        label: "Places and heritage",
        description: `Use ${anchor} as a starting point to explore destinations, local traditions, and cultural experiences connected to your interests.`,
      },
      {
        title: "Go beyond the obvious",
        label: "Unexpected destinations",
        description: "Discover places beyond the usual shortlist by following cultural interests, local creative scenes, and distinctive traditions.",
      },
      {
        title: "Understand the local story",
        label: "People and place",
        description: `Explore how local culture, history, food, and creative communities connect to ${project.location || "your chosen destination"}.`,
      },
    ],
    restaurants: [
      {
        title: "Follow the taste connections",
        label: "Food and culture",
        description: `Explore the connections between ${anchor}, including cuisines, culinary traditions, and the stories behind food.`,
      },
      {
        title: "Discover new favourites",
        label: "Culinary exploration",
        description: "Use familiar interests to uncover new cuisines, dishes, and dining experiences.",
      },
      {
        title: "Connect food with place",
        label: "Local food culture",
        description: `Explore how regional traditions, local ingredients, and community food culture relate to ${project.location || "your area of interest"}.`,
      },
    ],
  };

  return directions[project.type] || [
    {
      title: "Follow the cultural signals",
      label: "Shared interests",
      description: `Explore the connections between ${anchor} and the interests behind ${project.projectName}.`,
    },
    {
      title: "Discover something new",
      label: "Adjacent interests",
      description: "Use familiar references to uncover related cultural interests and unexpected connections.",
    },
    {
      title: "Connect the bigger picture",
      label: "Cultural context",
      description: "Bring together your audience, cultural context, and discovery goals to develop a clearer point of view.",
    },
  ];
}


export default function ResearchPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [research, setResearch] = useState<Research | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingResearch, setLoadingResearch] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("culturespace-current-project");
      if (saved) setProject(JSON.parse(saved) as Project);
    } catch {
      setProject(null);
    } finally {
      setLoadingProject(false);
    }
  }, []);

  useEffect(() => {
    if (!project) return;

    let cancelled = false;

    async function loadResearch() {
      const cacheKey =
        `culturespace-research-v2-${project!.id || project!.createdAt}`;

      try {
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed = JSON.parse(cached) as Research;

          if (
            parsed &&
            Array.isArray(parsed.insights) &&
            Array.isArray(parsed.discoveredTags)
          ) {
            if (!cancelled) {
              setResearch(parsed);
              setError("");
            }
            return;
          }
        }
      } catch {
        // Ignore invalid cached data.
      }

      setLoadingResearch(true);
      setError("");
      setResearch(null);

      try {
        const response = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        });

        const result = (await response.json()) as Research;

        if (!response.ok) {
          throw new Error(
            result.error || "We couldn't complete the cultural research."
          );
        }

        if (cancelled) return;

        setResearch(result);

        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch {
          // Results remain available in the current page.
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while gathering cultural insights."
          );
        }
      } finally {
        if (!cancelled) setLoadingResearch(false);
      }
    }

    void loadResearch();

    return () => {
      cancelled = true;
    };
  }, [project, retryCount]);

  if (loadingProject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas text-ink">
        <p className="text-sm text-muted">Opening your research studio...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-5 text-ink">
        <div className="max-w-md text-center">
          <span className="section-label">CULTURESPACE STUDIO</span>
          <h1 className="display-heading mt-5 text-4xl">
            Your next idea starts here.
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            We couldn't find a saved project on this device. Create a brief
            first, and your cultural research will be built around it.
          </p>
          <a
            href="/create"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-olive px-7 text-sm font-medium text-white transition hover:bg-olive-dark"
          >
            Create a project <span className="ml-3">↗</span>
          </a>
        </div>
      </main>
    );
  }

  const directions = getCreativeDirections(project, research?.insights ?? []);
  const hasInsights = Boolean(research?.insights?.length);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="section-container flex h-[72px] items-center justify-between gap-4">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="CultureSpace home">
            <span
  aria-hidden="true"
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive"
>
  <svg
    viewBox="0 0 40 40"
    className="h-9 w-9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 25.5C10 17.5 16 10 23 10C28 10 31 14 31 19"
      stroke="#F8F7F3"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M30 14.5C30 22.5 24 30 17 30C12 30 9 26 9 21"
      stroke="#F8F7F3"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M15 20C17.5 17.5 22.5 17.5 25 20C22.5 22.5 17.5 22.5 15 20Z"
      fill="#D9A18A"
    />
    <circle cx="30.5" cy="10.5" r="2" fill="#D9A18A" />
  </svg>
</span>
            <span className="font-display text-xl tracking-tight">CultureSpace</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:inline">Research studio</span>
            <a href="/create/brief" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
              ← <span>Brief</span>
            </a>
          </div>
        </div>
      </header>

      <section className="section-container pb-12 pt-10 sm:pb-16 sm:pt-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="section-label">CULTURESPACE / FIELD NOTES</span>
          <span className="rounded-full bg-[#E9EBDD] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-dark">
            Step 03 · Research
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <h1 className="display-heading max-w-4xl break-words text-4xl leading-[1.06] sm:text-6xl lg:text-7xl">
              A world of culture,
              <br className="hidden sm:block" /> shaped around your idea.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Research, references, and creative possibilities for{" "}
              <span className="font-medium text-ink">{project.projectName}</span>.
              We look beyond the brief to explore the tastes, stories, and
              cultural connections that could give your project its own point
              of view.
            </p>
          </div>

          <aside className="rounded-[5px] border border-line bg-white/60 p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">Your project</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">{project.projectName}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E9EBDD] px-3 py-1.5 text-xs text-olive-dark">
                {projectTypes[project.type] || "Creative project"}
              </span>
              {project.location && (
                <span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">⌖ {project.location}</span>
              )}
            </div>
            <a href="/create/brief" className="mt-5 inline-flex text-xs font-medium text-olive underline decoration-olive/30 underline-offset-4">
              Review project brief
            </a>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-[#F0ECE2]">
        <div className="section-container grid gap-6 py-7 sm:grid-cols-3 sm:gap-8 sm:py-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
              01 / Cultural context
            </p>
            <p className="mt-3 text-sm leading-6">
              {project.culturalContext || project.location || "Open to cultural discovery"}
            </p>
          </div>
          <div className="border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
              02 / Interests
            </p>
            <p className="mt-3 text-sm leading-6">
              {project.interests || "New interests waiting to be discovered"}
            </p>
          </div>
          <div className="border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
              03 / Discovery goals
            </p>
            <p className="mt-3 text-sm leading-6">
              {project.discoveryGoals || project.audience || "Explore new cultural connections"}
            </p>
          </div>
        </div>
      </section>
      <section className="section-container py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">01 / Cultural intelligence</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-5xl">
              Signals & connections
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Cultural references that help us understand the tastes, interests
              and influences surrounding your project.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-olive" />
            Powered by Qloo
          </span>
        </div>

        {loadingResearch && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-2xl border border-line bg-white p-6">
                <div className="h-3 w-20 rounded bg-[#E8E3D8]" />
                <div className="mt-6 h-5 w-3/4 rounded bg-[#E8E3D8]" />
                <div className="mt-4 h-3 w-full rounded bg-[#E8E3D8]" />
                <div className="mt-2 h-3 w-2/3 rounded bg-[#E8E3D8]" />
                <p className="mt-8 text-xs text-muted">Reading cultural signals…</p>
              </div>
            ))}
          </div>
        )}

        {error && !loadingResearch && (
          <div className="mt-10 rounded-2xl border border-line bg-white p-6 sm:p-9">
            <p className="section-label">Research temporarily unavailable</p>
            <h3 className="mt-3 font-display text-2xl">Let’s try that again.</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 rounded-full bg-olive px-6 py-3 text-sm font-medium text-white transition hover:bg-olive-dark"
            >
              Retry research
            </button>
          </div>
        )}

        {research && !loadingResearch && (
          <>
            {research.discoveredTags?.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-medium text-muted">DISCOVERED CULTURAL TAGS</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {research.discoveredTags.map((tag: CulturalTag, index: number) => (
                    <span
                      key={tag.id || `${tag.name}-${index}`}
                      className="rounded-full border border-line bg-white px-4 py-2 text-xs"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasInsights ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {research.insights.map((insight: Insight, index: number) => (
                  <article
                    key={insight.id || `${insight.name}-${index}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {insight.image ? (
                      <div className="aspect-[16/9] overflow-hidden bg-[#E8E3D8]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={insight.image}
                          alt={insight.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/9] items-end bg-[#E9E5DA] p-5">
                        <span className="font-display text-4xl text-olive/70">
                          {insight.name.slice(0, 1)}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-olive">
                        {categoryNames[insight.category || ""] || insight.category || "Cultural reference"}
                      </p>
                      <h3 className="mt-3 font-display text-2xl leading-snug">
                        {insight.name}
                      </h3>

                      {insight.description && (
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {insight.description}
                        </p>
                      )}

                      {insight.tags && insight.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {insight.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span
                              key={`${tag}-${tagIndex}`}
                              className="rounded-full bg-canvas px-3 py-1.5 text-[10px] text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {insight.websites?.[0]?.url && (
                        <a
                          href={insight.websites[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-xs font-medium text-olive hover:underline"
                        >
                          Explore reference <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="font-display text-2xl">A starting point for exploration</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  {research.message || "We found some cultural signals, but not enough matching references to display here yet."}
                </p>
              </div>
            )}

            <p className="mt-6 max-w-3xl text-xs leading-6 text-muted">
              Qloo provides cultural entities and signals. These references are
              research references that help reveal cultural interests and
              connections. Use them as starting points for further exploration.
            </p>
          </>
        )}
      </section>

      <section className="border-y border-line bg-[#F0ECE2]">
        <div className="section-container py-16 sm:py-24">
          <p className="section-label">02 / Cultural interpretation</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
            <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
              Follow the connections. Find your next discovery.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-muted">
              These directions are CultureSpace interpretations of your brief
              and available cultural references. They are prompts for further
              exploration, not recommendations generated directly by Qloo.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {directions.map((direction, index) => (
              <article
                key={direction.title}
                className="rounded-[5px] border border-line bg-white p-6 sm:p-8"
              >
                <span className="text-xs font-medium text-olive">
                  DISCOVERY 0{index + 1}
                </span>
                <h3 className="mt-8 font-display text-2xl">{direction.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {direction.description}
                </p>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Explore through
                  </p>
                  <p className="mt-2 text-sm leading-6">{direction.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 sm:py-24">
        <div className="grid gap-8 rounded-[5px] border border-line bg-white p-6 sm:p-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="section-label">03 / Your next discovery</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-5xl">
              There is always another connection to find.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              Use these findings as a starting point. Refine your cultural
              interests, revisit the brief, and explore new references as your
              project takes shape.
            </p>
          </div>
          <div className="rounded-[5px] bg-[#F0ECE2] p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
              Your discovery focus
            </p>
            <p className="mt-3 font-display text-2xl">
              {project.discoveryGoals || "Explore new cultural connections"}
            </p>
            {project.interests && (
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  Your interests
                </p>
                <p className="mt-2 text-sm leading-6">{project.interests}</p>
              </div>
            )}
            <a
              href="/create"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-olive px-6 text-sm font-medium text-white transition hover:bg-olive-dark"
            >
              Refine your brief <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="section-container flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="font-display text-lg text-ink">CultureSpace</a>
          <p>Cultural intelligence meets creative possibility.</p>
        </div>
      </footer>
    </main>
  );
}
