import { ScrambleText } from "@/components/kprstyle/Effects/scrumble";
import React from "react";
import { FiTerminal } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Lukwago Joel",
   description: "Conversations on God, life, & Relationships",
  alternates: {
    canonical: "/podcast",
  },
  openGraph: {
    title: "Podcast | Lukwago Joel",
     description: "Conversations on God, life, & Relationships",
    url: "/podcast",
  },
};

export default function PodcastPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Lukwago Joel Podcasts",
    url: "https://lukwagojoel.com/podcast",
    description: "Conversations on God, life, & Relationships",
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
      <section className="relative min-h-screen w-full bg-black text-white font-mono overflow-hidden pt-28 pb-20 px-6 sm:px-12 selection:bg-fuchsia-400 selection:text-black">
        {/* Background Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-15">
          <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
          <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
          <div className="absolute top-1/3 left-0 right-0 border-b border-white/20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="space-y-4 pb-12 border-b border-white/10">
            <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold tracking-widest uppercase">
              <FiTerminal className="animate-pulse" />
              <span>[ 03 // AUDIO ]</span>
            </div>
            <ScrambleText className="text-6xl md:text-8xl font-bold" text="THE PODCAST" />
          </div>

          {/* Placeholder Content */}
          <div className="py-20 text-gray-400 text-lg">
            <p>// Episodes coming soon...</p>
          </div>
        </div>
      </section>
    </>
  );
}