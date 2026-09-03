"use client";

import React, { useEffect } from "react";
import { AnimatedText } from "@/components/kprstyle/Effects/animatedText";

export function MaintenanceScreen() {
  // Lock scroll while the maintenance screen is mounted
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-black px-6 font-mono text-white selection:bg-fuchsia-400 selection:text-black">
      {/* Background HUD grid */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-15">
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
        <div className="absolute top-1/2 left-0 right-0 border-b border-white/20" />
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
          </span>
          Updating
        </span>

        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          <AnimatedText text="Back Soon" mode="chars" once={false} />
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-gray-400 sm:text-base">
          <AnimatedText
            text="I'm making changes to this site right now. It'll be back up shortly — thanks for your patience."
            mode="chars"
            once={false}
          />
        </p>
      </div>
    </div>
  );
}