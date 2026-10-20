const categories = [
  {
    id: "artists",
    number: "01",
    name: "Artists",
    headline: "Find your next favourite.",
    description:
      "From the artists you already love to the sounds and creative worlds you haven't discovered yet.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=90",
    imageAlt: "A live music performance filled with atmosphere and energy",
    label: "SOUNDS THAT MOVE YOU",
  },
  {
    id: "movies",
    number: "02",
    name: "Movies",
    headline: "Stories that stay with you.",
    description:
      "Explore the films, filmmakers, and cinematic worlds that speak to your taste.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A cinematic theatre ready for a screening",
    label: "STORIES WORTH FINDING",
  },
  {
    id: "travel",
    number: "03",
    name: "For Travellers",
    headline: "Go where curiosity leads.",
    description:
      "Discover interesting places, local attractions and experiences worth exploring while travelling",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A sunlit Mediterranean destination overlooking the sea",
    label: "PLACES WITH A FEELING",
  },
  {
    id: "restaurants",
    number: "04",
    name: "Restaurants",
    headline: "Follow your appetite.",
    description:
      "Find places to eat, flavours to explore, and dining experiences worth remembering.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "An intimate restaurant with carefully arranged tables",
    label: "TASTE SOMETHING DIFFERENT",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="inline-block text-lg leading-none">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive"
    >
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10"
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
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-canvas text-ink">
      {/* NAVIGATION */}
      <header className="border-b border-line bg-canvas">
        <div className="section-container flex h-[76px] items-center justify-between gap-5">
          <a
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="CultureSpace home"
          >
            <BrandMark />
            <span className="text-xl tracking-tight">
              <span className="font-semibold">Culture</span>
              <span className="font-normal">Space</span>
            </span>
          </a>

          <nav className="flex items-center gap-5 sm:gap-8">
            <a
              href="#explore"
              className="hidden text-sm text-muted transition hover:text-ink sm:inline-block"
            >
              Explore
            </a>
            <a
              href="/create"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-olive px-4 text-xs font-medium text-white transition hover:bg-olive-dark sm:px-5 sm:text-sm"
            >
              Create your project <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="section-container pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div className="relative z-10">
            <SectionLabel>
              CULTURESPACE — A WORLD OF YOUR OWN
            </SectionLabel>

            <h1 className="display-heading mt-5 max-w-2xl text-[2.8rem] leading-[1.08] sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem]">
              Your taste has a world{" "}
              <span className="italic text-olive">of its own.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              The artists you love. The films you remember. The places you
              dream about. Discover the cultural connections that make your
              world yours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/create"
                className="inline-flex min-h-14 items-center justify-center gap-4 rounded-[4px] bg-olive px-6 py-4 text-sm font-medium text-white transition hover:bg-olive-dark"
              >
                Start shaping your ideas <Arrow />
              </a>
              <a
                href="#explore"
                className="inline-flex min-h-12 items-center gap-2 text-sm text-ink transition hover:text-olive"
              >
                Explore CultureSpace <Arrow diagonal />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-olive" />
                Made around your interests
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-terracotta" />
                Connected by culture
              </span>
            </div>
          </div>

          {/* IMAGE-LED ARTIST HERO */}
          <div className="relative min-w-0 pb-7 pl-0 sm:pb-9 sm:pl-5">
            <div className="relative h-[390px] overflow-hidden rounded-[5px] bg-sand sm:h-[490px] lg:h-[570px]">
              <img
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=90"
                alt="An atmospheric live music performance with a crowd immersed in the moment"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15" />

              <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                <span className="inline-flex items-center gap-2 border border-white/40 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  Start with what moves you
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-8 lg:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xs">
                  01 / ARTISTS & MUSIC
                </p>
                <p className="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Some things you don't just hear. You feel.
                </p>
                <a
                  href="/create?category=artists"
                  className="mt-5 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-sm text-white transition hover:border-white"
                >
                  Explore your musical world <Arrow diagonal />
                </a>
              </div>
            </div>

            <div className="absolute -bottom-1 right-0 flex max-w-[240px] items-center gap-3 border border-line bg-white p-3 shadow-sm sm:right-4 sm:max-w-[280px] sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#E8E9DF] text-xl text-olive sm:h-12 sm:w-12">
                ✳
              </div>
              <div>
                <p className="text-xs font-semibold sm:text-sm">
                  One interest. Many possibilities.
                </p>
                <p className="mt-1 text-[10px] leading-4 text-muted sm:text-xs">
                  Discover what connects your taste.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-2 top-16 hidden h-16 w-16 items-center justify-center rounded-full border border-terracotta/50 bg-canvas font-display text-2xl italic text-terracotta sm:flex lg:-right-4">
              C.
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-y border-line bg-[#F0EFE8]">
        <div className="section-container grid gap-5 py-8 sm:grid-cols-[0.7fr_1.3fr] sm:items-center sm:py-10">
          <SectionLabel>MORE THAN RECOMMENDATIONS</SectionLabel>
          <p className="max-w-3xl font-display text-xl leading-relaxed sm:text-2xl lg:text-3xl">
            Your interests are connected in ways you might not expect.
            CultureSpace helps you follow those connections and discover
            something new along the way.
          </p>
        </div>
      </section>

      {/* CULTURAL CATEGORIES */}
      <section
        id="explore"
        className="section-container scroll-mt-8 pb-20 pt-16 sm:pb-24 sm:pt-24"
      >
        <div className="mb-9 grid gap-5 sm:mb-12 sm:grid-cols-[1fr_0.65fr] sm:items-end">
          <div>
            <SectionLabel>EXPLORE WHAT MOVES YOU</SectionLabel>
            <h2 className="display-heading mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Follow your <span className="italic text-olive">curiosity.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted sm:justify-self-end sm:text-base sm:leading-7">
            Start with something familiar or wander into something completely
            new. Your next discovery could begin anywhere.
          </p>
        </div>

        {/* Featured artists card */}
        <a
          id="artists"
          href="/create?category=artists"
          className="group mb-5 grid scroll-mt-6 overflow-hidden rounded-[5px] border border-line bg-white/60 transition hover:border-[#A7AD9A] md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-[280px] overflow-hidden bg-sand sm:min-h-[370px]">
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85"
              alt="A crowd gathered for a live music performance"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute left-4 top-4 bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink sm:left-6 sm:top-6">
              01 — Artists
            </span>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <SectionLabel>SOUNDS THAT MOVE YOU</SectionLabel>
            <h3 className="display-heading mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Find your next favourite.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Music is more than a playlist. It can lead you to new artists,
              creative movements, unexpected influences, and entirely new
              perspectives.
            </p>
            <span className="mt-7 inline-flex w-fit items-center gap-3 border-b border-olive pb-2 text-sm font-medium text-olive">
              Explore artists <Arrow diagonal />
            </span>
          </div>
        </a>

        {/* Remaining cultural categories */}
        <div className="grid gap-5 md:grid-cols-3">
          {categories.slice(1).map((category) => (
            <a
              key={category.id}
              id={category.id}
              href={`/create?category=${category.id}`}
              className="group flex scroll-mt-6 flex-col overflow-hidden rounded-[5px] border border-line bg-white/60 transition hover:border-[#A7AD9A]"
            >
              <div className="relative h-[230px] overflow-hidden bg-sand sm:h-[250px]">
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute left-4 top-4 border border-white/40 bg-black/15 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {category.number} / CULTURE
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <SectionLabel>{category.label}</SectionLabel>
                <h3 className="display-heading mt-3 text-3xl">
                  {category.name}
                </h3>
                <p className="mt-2 text-lg leading-snug text-ink">
                  {category.headline}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {category.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-olive">
                  Explore {category.name.toLowerCase()} <Arrow diagonal />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CULTURAL CONNECTIONS */}
      <section className="border-y border-line bg-[#E9E9DF]">
        <div className="section-container grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <SectionLabel>THE IDEA BEHIND CULTURESPACE</SectionLabel>
            <h2 className="display-heading mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              One thing leads to{" "}
              <span className="italic text-olive">another.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8">
              A favourite artist might lead you to a film. A film might inspire
              a trip. A trip might introduce you to a meal you never forget.
              Culture is full of connections, and some of the best discoveries
              happen between categories.
            </p>
            <a
              href="/create"
              className="mt-7 inline-flex min-h-12 items-center gap-3 border-b border-olive pb-2 text-sm font-medium text-olive transition hover:text-olive-dark"
            >
              Start with your interests <Arrow />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="mt-8 overflow-hidden rounded-[5px] bg-white/70 sm:mt-12">
              <div className="h-40 overflow-hidden sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85"
                  alt="A performer expressing themselves on stage"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  YOUR SOUND
                </p>
                <p className="mt-2 font-display text-xl sm:text-2xl">
                  What moves you
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[5px] bg-white/70">
              <div className="h-40 overflow-hidden sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=700&q=85"
                  alt="A colourful coastal village"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  YOUR NEXT CHAPTER
                </p>
                <p className="mt-2 font-display text-xl sm:text-2xl">
                  Where it takes you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BEGIN */}
      <section className="section-container py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionLabel>A GOOD PLACE TO START</SectionLabel>
            <h2 className="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
              Your curiosity is enough.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base sm:leading-8">
              You don't need a complete plan. Bring an interest, a feeling, or
              an idea you want to explore. We'll help you turn it into a
              starting point.
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            <div className="grid grid-cols-[48px_1fr] gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-7">
              <span className="font-display text-2xl italic text-terracotta sm:text-3xl">
                01
              </span>
              <div>
                <h3 className="text-base font-semibold sm:text-lg">
                  Start with what you love
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                  Choose a cultural direction and share the interests that
                  inspire you.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[48px_1fr] gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-7">
              <span className="font-display text-2xl italic text-terracotta sm:text-3xl">
                02
              </span>
              <div>
                <h3 className="text-base font-semibold sm:text-lg">
                  Give your idea some context
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                  Tell us about the feeling, audience, or experience you have
                  in mind.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[48px_1fr] gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-7">
              <span className="font-display text-2xl italic text-terracotta sm:text-3xl">
                03
              </span>
              <div>
                <h3 className="text-base font-semibold sm:text-lg">
                  Find a new direction
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                  Use your brief as the starting point for a more thoughtful,
                  culturally informed exploration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INVITATION */}
      <section className="section-container pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-[5px] bg-olive px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/15 sm:h-80 sm:w-80" />
          <div className="pointer-events-none absolute -right-4 -top-8 h-48 w-48 rounded-full border border-white/10 sm:h-64 sm:w-64" />

          <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                YOUR NEXT CREATIVE CHAPTER
              </p>
              <h2 className="display-heading mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Every great idea starts with{" "}
                <span className="italic text-[#E6C1A8]">a feeling.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                Bring your interests, your ideas, and your point of view.
                Let's discover where they could lead.
              </p>
            </div>

            <a
              href="/create"
              className="inline-flex min-h-14 items-center justify-center gap-4 rounded-[4px] bg-canvas px-6 py-4 text-sm font-medium text-ink transition hover:bg-white sm:shrink-0"
            >
              Let's get started <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line">
        <div className="section-container">
          <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex w-fit items-center gap-3"
              aria-label="CultureSpace home"
            >
              <BrandMark />
              <span className="text-lg tracking-tight">
                <span className="font-semibold">Culture</span>
                <span>Space</span>
              </span>
            </a>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
            >
              <a href="#explore" className="transition hover:text-ink">
                Explore
              </a>
              <a href="/create" className="transition hover:text-ink">
                Create your project
              </a>
              <a href="#top" className="transition hover:text-ink">
                Back to top ↑
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-2 border-t border-line py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>CultureSpace — Design with cultural intelligence.</p>
            <p>Made for the curious. © {new Date().getFullYear()} CultureSpace.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
