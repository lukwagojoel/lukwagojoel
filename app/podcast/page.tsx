import type { Metadata } from "next";
import Image from "next/image";

const description = "Conversations on God, life, & Relationships";

export const metadata: Metadata = {
  title: "Podcast | Lukwago Joel",
  description,
  alternates: { canonical: "/podcast" },
  openGraph: {
    title: "Podcast | Lukwago Joel",
    description,
    url: "/podcast",
  },
};

interface Podcast {
  id: string;
  title: string;
  description: string;
  cover: string;
  status: "coming-soon" | "live";
  links: { label: string; href: string }[];
}

// Swap the cover and links for the real thing when the show is live.
const PODCASTS: Podcast[] = [
  {
    id: "grounded",
    title: "Grounded",
    description:
      "Conversations on God, life, and relationships — real, unfiltered, and rooted in faith.",
    cover: "/podcast.jpg",
    status: "coming-soon",
    links: [
      { label: "Spotify", href: "#" },
      { label: "Apple Podcasts", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export default function PodcastPage() {
  const show = PODCASTS[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: show.title,
    url: "https://lukwagojoel.com/podcast",
    description,
    author: {
      "@type": "Person",
      name: "Lukwago Joel",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-24">
        <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          Podcast
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
          {description}
        </p>

        <div className="mt-12 space-y-6">
          {PODCASTS.map((podcast) => {
            const comingSoon = podcast.status === "coming-soon";

            return (
              <article
                key={podcast.id}
                className="grid gap-6 rounded-3xl border border-black/10 p-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:p-6"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                  <Image
                    src={podcast.cover}
                    alt={`${podcast.title} cover art`}
                    fill
                    priority
                    sizes="(min-width: 640px) 220px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    {comingSoon && (
                      <span className="inline-flex h-7 items-center rounded-full bg-black/5 px-3 text-xs font-medium text-black/70">
                        Coming soon
                      </span>
                    )}
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black">
                      {podcast.title}
                    </h2>
                    <p className="mt-3 max-w-md leading-relaxed text-black/60">
                      {podcast.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-black/50">
                      {comingSoon ? "Available on" : "Listen on"}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {podcast.links.map(({ label, href }) => (
                        <li key={label}>
                          {comingSoon ? (
                            <span
                              aria-disabled="true"
                              className="inline-flex h-9 items-center rounded-full border border-black/10 px-4 text-sm text-black/35"
                            >
                              {label}
                            </span>
                          ) : (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-9 items-center rounded-full border border-black/15 px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
                            >
                              {label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}