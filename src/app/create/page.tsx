"use client";

import { useState } from "react";

const projectTypes = [
  {
    id: "artists",
    name: "Artists",
    description: "Discover artists, sounds and connected music scenes",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "movies",
    name: "Movies",
    description: "Explore films, genres and cinematic connections",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "travel",
    name: "For Travellers",
    description: "Discover interesting places, local attractions and experiences worth exploring while travelling",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description: "Explore cuisines, dining spots and food cultures",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=85",
  },
];

export default function CreateProjectPage() {
  const [selectedType, setSelectedType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [culturalContext, setCulturalContext] = useState("");
  const [interests, setInterests] = useState("");
  const [audience, setAudience] = useState("");
  const [discoveryGoals, setDiscoveryGoals] = useState("");
  const [notice, setNotice] = useState("");

  function handleContinue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!selectedType) {
      setNotice("Choose one of the four cultural discovery categories.");
      return;
    }

    if (!projectName.trim()) {
      setNotice("Give your project a name before continuing.");
      return;
    }

    if (!location.trim()) {
      setNotice("Add a location so your cultural research has a clear context.");
      return;
    }

    if (!interests.trim()) {
      setNotice("Add at least one cultural interest or reference to guide the research.");
      return;
    }

    try {
      const project = {
        id: `project-${Date.now()}`,
        projectName: projectName.trim(),
        type: selectedType,
        location: location.trim(),
        culturalContext: culturalContext.trim(),
        interests: interests.trim(),
        audience: audience.trim(),
        discoveryGoals: discoveryGoals.trim(),
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("culturespace-current-project", JSON.stringify(project));
      window.location.href = "/create/brief";
    } catch {
      setNotice("We couldn't save your project in this browser. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="section-container flex h-[76px] items-center justify-between">
          <a href="/" className="flex items-center gap-3" aria-label="CultureSpace home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive">
              <svg
                viewBox="0 0 40 40"
                className="h-10 w-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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
            <span className="text-xl tracking-tight">
              <span className="font-semibold">Culture</span>
              <span className="font-normal">Space</span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      </header>

      <section className="section-container pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="section-label">
              YOUR NEXT CREATIVE CHAPTER
            </span>

            <h1 className="display-heading mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Every great idea starts with{" "}
              <span className="italic text-olive">a feeling.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Tell us what you have in mind. We&apos;ll help you explore the
              cultural tastes, interests, and ideas that could shape an
              experience people genuinely connect with.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-olive" />
                Your vision comes first
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-terracotta" />
                Ideas grounded in culture
              </span>
            </div>
          </div>

          <div className="relative min-h-[250px] overflow-hidden rounded-[5px] bg-sand sm:min-h-[340px]">
            <img
              src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=90"
              alt="A live music event filled with people, energy and cultural expression"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                CULTURE THAT MOVES PEOPLE
              </p>
              <p className="mt-2 max-w-xs font-display text-2xl leading-snug sm:text-3xl">
                More than an idea. A feeling, a story, a connection.
              </p>
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:right-5 sm:top-5">
              Begin with what inspires you
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pb-20">
        <div className="border-t border-line pt-9 sm:pt-12">
          <div className="mb-8 flex items-start justify-between gap-5 sm:mb-10">
            <div>
              <p className="section-label">LET&apos;S GET TO KNOW IT</p>
              <h2 className="display-heading mt-3 text-3xl sm:text-4xl">
                Tell us about your project
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
                Start with the essentials. There are no wrong answers, and
                you can refine your direction as you go.
              </p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                STEP 01
              </span>
              <p className="mt-1 text-sm text-ink">The project brief</p>
            </div>
          </div>


          <form onSubmit={handleContinue} className="space-y-10">
            <section>
              <div className="mb-5">
                <p className="section-label">01 / YOUR PROJECT</p>
                <h3 className="display-heading mt-3 text-2xl sm:text-3xl">
                  What are you exploring?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Choose a cultural world to explore. Your selection shapes the research we gather.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projectTypes.map((type) => {
                  const isSelected = selectedType === type.id;

                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type.id);
                        setNotice("");
                      }}
                      aria-pressed={isSelected}
                      className={`group overflow-hidden rounded-[5px] border text-left transition duration-200 ${
                        isSelected
                          ? "border-olive bg-[#F0F1E9] ring-1 ring-olive"
                          : "border-line bg-white/60 hover:border-[#A7AD9A] hover:bg-white"
                      }`}
                    >
                      <div className="relative h-36 overflow-hidden bg-sand sm:h-44">
                        <img
                          src={type.image}
                          alt=""
                          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] ${
                            isSelected ? "scale-[1.02]" : ""
                          }`}
                        />
                        <span
                          className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border text-xs transition ${
                            isSelected
                              ? "border-olive bg-olive text-white"
                              : "border-white/80 bg-white/90 text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3 p-4">
                        <div>
                          <h4 className="text-sm font-semibold sm:text-base">{type.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">
                            {type.description}
                          </p>
                        </div>
                        <span className={`mt-1 text-lg ${isSelected ? "text-olive" : "text-muted"}`} aria-hidden="true">
                          ↗
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="section-label">02 / LOCATION & CONTEXT</p>
                <h3 className="display-heading mt-3 text-2xl sm:text-3xl">
                  Where should we look?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Place and cultural context help connect your project to relevant scenes, traditions and communities.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Project name <span className="text-terracotta">*</span>
                  </span>
                  <input
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    placeholder="e.g. Lagos After Dark"
                    maxLength={100}
                    required
                    className="w-full rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Location <span className="text-terracotta">*</span>
                  </span>
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="e.g. Lagos, Nigeria"
                    maxLength={150}
                    required
                    className="w-full rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                  <span className="mt-2 block text-xs leading-5 text-muted">
                    For Artists and Movies, this can guide cultural context. For Travel and Restaurants, it helps narrow location-based results.
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Cultural context</span>
                  <textarea
                    value={culturalContext}
                    onChange={(event) => setCulturalContext(event.target.value)}
                    placeholder="e.g. Contemporary Nigerian culture, Afrobeats, local film scenes, regional food traditions..."
                    rows={3}
                    maxLength={1000}
                    className="w-full resize-y rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                </label>
              </div>
            </section>

            <section className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="section-label">03 / CULTURAL INTERESTS</p>
                <h3 className="display-heading mt-3 text-2xl sm:text-3xl">
                  What should we connect?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Share names, genres, places, styles or traditions that could help us find meaningful connections.
                </p>
              </div>

              <div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Cultural interests & references <span className="text-terracotta">*</span>
                  </span>
                  <textarea
                    value={interests}
                    onChange={(event) => setInterests(event.target.value)}
                    placeholder={
                      selectedType === "artists"
                        ? "e.g. Burna Boy, Tems, Afrobeats, alternative R&B..."
                        : selectedType === "movies"
                          ? "e.g. Nollywood, sci-fi, Christopher Nolan, character-driven films..."
                          : selectedType === "travel"
                            ? "e.g. art museums, live music districts, historic landmarks, coastal destinations..."
                            : selectedType === "restaurants"
                              ? "e.g. Nigerian cuisine, jollof, seafood spots, contemporary African dining..."
                              : "Choose a category, then add artists, films, destinations, cuisines or other references..."
                    }
                    rows={4}
                    maxLength={2000}
                    required
                    className="w-full resize-y rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                  <span className="mt-2 block text-xs leading-5 text-muted">
                    A few specific references can help guide the cultural discovery.
                  </span>
                </label>
              </div>
            </section>

            <section className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="section-label">04 / AUDIENCE & DISCOVERY</p>
                <h3 className="display-heading mt-3 text-2xl sm:text-3xl">
                  Who is this for?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Tell us who you have in mind and what you hope to discover beyond the familiar.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Intended audience</span>
                  <textarea
                    value={audience}
                    onChange={(event) => setAudience(event.target.value)}
                    placeholder="e.g. Young music fans, curious travellers, film lovers, people exploring new cuisines..."
                    rows={3}
                    maxLength={1000}
                    className="w-full resize-y rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Discovery goals</span>
                  <textarea
                    value={discoveryGoals}
                    onChange={(event) => setDiscoveryGoals(event.target.value)}
                    placeholder="e.g. Find artists with a similar sound, uncover hidden gems, discover unexpected cultural connections..."
                    rows={3}
                    maxLength={1500}
                    className="w-full resize-y rounded-[4px] border border-line bg-white px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A3A49B] focus:border-olive focus:ring-2 focus:ring-olive/10"
                  />
                </label>
              </div>
            </section>

            {notice && (
              <p
                role="alert"
                className="rounded-[4px] border border-terracotta/30 bg-[#F7EDE7] px-4 py-3 text-sm text-[#874B35]"
              >
                {notice}
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-5 text-muted">
                Your brief is saved in this browser. CultureSpace will use your cultural context and references to guide Qloo-powered discovery.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-4 rounded-[4px] bg-olive px-7 py-4 text-sm font-medium text-white transition hover:bg-olive-dark focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
              >
                Explore cultural connections <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="section-container flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>CultureSpace — Design with cultural intelligence.</p>
          <a href="/" className="transition hover:text-ink">
            Return to home ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
