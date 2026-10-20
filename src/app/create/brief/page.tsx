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

const projectTypes: Record<string, string> = {
  artists: "Artists",
  movies: "Movies",
  travel: "For Travellers",
  restaurants: "Restaurants",
};

const fields = [
  {
    key: "location",
    label: "Location",
    fallback: "Open to exploration",
  },
  {
    key: "culturalContext",
    label: "Cultural context",
    fallback: "To be explored",
  },
  {
    key: "interests",
    label: "Cultural interests",
    fallback: "Open to discovery",
  },
  {
    key: "audience",
    label: "Target audience",
    fallback: "Open to exploration",
  },
] as const;

export default function ProjectBriefPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("culturespace-current-project");

      if (saved) {
        setProject(JSON.parse(saved) as Project);
      }
    } catch {
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas text-ink">
        <p className="text-sm text-muted">Preparing your project brief...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-20 text-ink">
        <div className="mx-auto max-w-xl text-center">
          <span className="section-label">YOUR CULTURAL JOURNEY</span>

          <h1 className="display-heading mt-5 text-4xl sm:text-5xl">
            Let&apos;s start with an idea.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
            Your project brief isn&apos;t available on this device yet.
            Start a project and discover the cultural connections that
            could bring your idea to life.
          </p>

          <a
            href="/create"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-olive px-7 text-sm font-medium text-white transition hover:bg-olive-dark"
          >
            Start a project <span className="ml-3">↗</span>
          </a>
        </div>
      </main>
    );
  }

  function displayValue(
    value: string | undefined,
    fallback: string,
  ) {
    return value?.trim() || fallback;
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="section-container flex h-[72px] items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3"
            aria-label="CultureSpace home"
          >
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

            <span className="font-display text-xl tracking-tight">
              CultureSpace
            </span>
          </a>

          <a
            href="/create"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            <span>Edit project</span>
          </a>
        </div>
      </header>

      <section className="section-container pb-12 pt-10 sm:pb-16 sm:pt-16 lg:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-label">YOUR PROJECT</span>

              <span className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                Step 02 · The brief
              </span>
            </div>

            <h1 className="display-heading mt-5 max-w-2xl break-words text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {project.projectName}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Culture is full of unexpected connections. This brief
              brings together your interests, context, and audience
              to guide a more meaningful discovery experience.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E9EBDD] px-4 py-2 text-xs font-medium text-olive-dark">
                <span className="h-2 w-2 rounded-full bg-olive" />
                {projectTypes[project.type] || "Creative project"}
              </span>

              {project.location && (
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-4 py-2 text-xs text-muted">
                  <span aria-hidden="true">⌖</span>
                  {project.location}
                </span>
              )}
            </div>

            <div className="mt-10 border-t border-line pt-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl sm:text-3xl">
                  The project at a glance
                </h2>

                <span className="text-xs text-muted">01 / 03</span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {fields.map((field) => {
                  const value = project[field.key];

                  return (
                    <div
                      key={field.key}
                      className="min-w-0 rounded-[5px] border border-line bg-white/60 p-5 sm:p-6"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
                        {field.label}
                      </p>

                      <p className="mt-3 break-words text-sm leading-6 text-ink sm:text-base">
                        {displayValue(value, field.fallback)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 rounded-[5px] border border-line bg-white/60 p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
                  Your discovery goals
                </p>

                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-ink sm:text-base">
                  {displayValue(
                    project.discoveryGoals,
                    "Your discovery goals can evolve as new cultural connections emerge.",
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/create"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium transition hover:bg-white"
              >
                <span aria-hidden="true">←</span>
                Edit your brief
              </a>

              <a
                href="/create/research"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-olive px-7 text-sm font-medium text-white transition hover:bg-olive-dark"
              >
                Explore cultural insights
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted">
              Your brief is saved locally on this device. CultureSpace
              uses your cultural context and references to guide
              Qloo-powered discovery.
            </p>
          </div>

          <aside className="lg:sticky lg:top-8">
            <div className="relative min-h-[340px] overflow-hidden rounded-[5px] bg-sand sm:min-h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=90"
                alt="A lively music venue filled with people experiencing music together"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

              <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.17em] text-white backdrop-blur-sm">
                The starting point
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  BEYOND THE OBVIOUS
                </p>

                <h2 className="mt-3 max-w-sm font-display text-3xl leading-tight sm:text-4xl">
                  Find the connections you didn&apos;t know to look for.
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                  Discover how tastes, places, stories, and cultural
                  influences intersect to reveal something unexpected.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border border-line p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                  Your references
                </p>

                <p className="mt-2 text-sm font-medium">
                  Where discovery begins
                </p>
              </div>

              <div className="border border-line p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                  Cultural insight
                </p>

                <p className="mt-2 text-sm font-medium">
                  Where connections emerge
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="section-container flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>CultureSpace · Ideas shaped by culture.</span>

          <a href="/" className="transition hover:text-ink">
            Back to the homepage ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
