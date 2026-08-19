import { ScrambleText } from "@/components/kprstyle/Effects/scrumble";
import React from "react";
import { FiTerminal } from "react-icons/fi";
import type { Metadata } from "next";
import { AboutAnimated } from "@/components/pages/aboutContent";
import { jobTitle } from "@/data/meta";

export const metadata: Metadata = {
  title: "About | Lukwago Joel",
  description:
    "Learn more about Lukwago Joel, a full-stack & web application engineer specializing in high-performance web applications and design systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Lukwago Joel",
    description:
      "Learn more about Lukwago Joel, a full-stack & web application engineer specializing in high-performance web applications and design systems.",
    url: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Lukwago Joel",
    url: "https://lukwagojoel.com/about",
    mainEntity: {
      "@type": "Person",
      name: "Lukwago Joel",
     jobTitle: jobTitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
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
              <span>[ 01 // PROFILE ]</span>
            </div>
            <ScrambleText className="text-6xl md:text-8xl font-bold" text="ABOUT ME" />
          </div>

          {/* Interactive Animated Content Component */}
          <AboutAnimated/>
        </div>
      </section>
    </>
  );
}