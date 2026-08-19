"use client";

import React from "react";
import Image from "next/image";
import { FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import { AnimatedText } from "@/components/kprstyle/Effects/animatedText";
import { Reveal } from "@/components/kprstyle/Effects/reveal";

export interface PodcastPlatformLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  /** Replace with your real cover art once you have it - path relative to /public */
  cover: string;
  status: "coming-soon" | "live";
  links: PodcastPlatformLink[];
}

// Sample entry - swap the cover path and links for the real thing when ready.
export const PODCASTS: Podcast[] = [
  {
    id: "grounded",
    title: "Grounded",
    description:
      "Conversations on God, life, and relationships — real, unfiltered, and rooted in faith.",
    cover: "/podcast.jpg",
    status: "coming-soon",
    links: [
      { label: "Spotify", href: "#", icon: FaSpotify },
      { label: "Apple Podcasts", href: "#", icon: FaApple },
      { label: "YouTube", href: "#", icon: FaYoutube },
    ],
  },
];

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const isComingSoon = podcast.status === "coming-soon";

  return (
    <Reveal once={false}>
      <div className="group relative grid grid-cols-1 gap-6 border border-white/10 p-6 sm:grid-cols-[220px_1fr] sm:gap-8 sm:p-8">
        {/* Corner accent, matches the rest of the site's HUD styling */}
        <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-white/20 transition-colors group-hover:border-fuchsia-400" />

        {/* Cover art */}
        <div className="relative aspect-square w-full overflow-hidden border border-white/10 bg-neutral-900">
          <Image
            src={podcast.cover}
            alt={`${podcast.title} cover art`}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {isComingSoon && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                  </span>
                  Coming Soon
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              <AnimatedText text={podcast.title} mode="chars" once={false} />
            </h3>

            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              <AnimatedText text={podcast.description} mode="chars" once={false} />
            </p>
          </div>

          {/* Platform links - inert placeholders until the show is live */}
          <div className="mt-6 flex flex-wrap gap-3">
            {podcast.links.map(({ label, href, icon: Icon }) =>
              isComingSoon ? (
                <span
                  key={label}
                  title="Coming soon"
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-2 border border-white/10 px-3 py-1.5 text-xs text-gray-600"
                >
                  <Icon className="text-sm" />
                  {label}
                </span>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-fuchsia-400 hover:text-fuchsia-400"
                >
                  <Icon className="text-sm" />
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function PodcastList({ podcasts = PODCASTS }: { podcasts?: Podcast[] }) {
  return (
    <div className="space-y-6">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}