"use client";

import React from "react";
import Image from "next/image";
import TiltCard from "./TiltCard";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden p-3 sm:p-6 flex flex-col justify-between">
      {/* Outer Aesthetic Border Grid */}
      <div className="absolute inset-3 sm:inset-6 border border-white/10 pointer-events-none z-20" />

      {/* Main Interactive Interactive Tilt Card Canvas */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <TiltCard className="w-full h-full" maxTilt={8} hoverScale={1.04}>
          <div className="relative w-full h-full">
            {/* Replace /hero-bg.jpg with your main art asset */}
            <Image
              src="/hero-bg.jpg"
              alt="Hero Artwork"
              fill
              priority
              className="object-cover object-center select-none"
            />
            {/* Ambient Dark Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        </TiltCard>

        {/* --- OVERLAY UI LAYERS (Non-tilting foreground elements) --- */}

        {/* Top-Left Story Paragraph */}
        <div className="absolute top-24 left-8 sm:left-12 max-w-xs z-10 font-mono text-xs text-white/80 leading-relaxed pointer-events-none hidden md:block">
          <p>
            KPR is a brand that focuses on collective narrative and empowering
            storytellers. Keepers is a living story, an uncharted world waiting
            to be explored.
          </p>
        </div>

        {/* Large Typography: LUKWAGO JOEL */}
        <div className="absolute bottom-12 left-8 sm:left-12 right-8 z-10 pointer-events-none select-none">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.85] text-white drop-shadow-2xl">
            LUKWAGO <br />
            JOEL.
          </h1>
        </div>

        {/* HUD UI Accents */}
        {/* Left Side Crosshair */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/50 pointer-events-none hidden sm:block">
          <span className="text-xl font-light">┼</span>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <div className="absolute bottom-6 right-8 sm:right-12 z-10 font-mono text-xs tracking-widest text-white/70 flex items-center gap-2 pointer-events-none">
          <span>SCROLL</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};