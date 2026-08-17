"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface NextSectionProps {
  progress: MotionValue<number>;
}

export const NextSection = ({ progress }: NextSectionProps) => {
  // Starts revealing AFTER Hero is mostly gone (Hero opacity hits 0 at 0.5)
  // Overlaps slightly (0.42–0.5) for a soft crossfade, not a hard cut
  const opacity = useTransform(progress, [0.42, 0.62], [0, 1]);
  const scale = useTransform(progress, [0.45, 0.78], [0.7, 1]); // true zoom-in, not "pop in"
  const borderRadius = useTransform(progress, [0.6, 0.88], ["48px", "0px"]);

  return (
    <motion.section
      style={{ scale, opacity, borderRadius }}
      className="absolute inset-0 z-20 w-full h-full flex items-center justify-center overflow-hidden p-4 sm:p-8 origin-center will-change-transform"
    >
      <div className="w-full h-full max-w-7xl mx-auto bg-zinc-950 border border-white/10 p-8 sm:p-16 flex flex-col justify-center shadow-2xl overflow-hidden rounded-[inherit]">
        <div className="border-l-2 border-lime-400 pl-6 space-y-4">
          <span className="font-mono text-xs text-lime-400 tracking-widest uppercase">
            [ 01 // OVERVIEW ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            THE NEXT ERA OF NARRATIVE.
          </h2>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg font-mono leading-relaxed">
            The hero shrinks into the background, and this section smoothly expands to take over the screen.
          </p>
        </div>
      </div>
    </motion.section>
  );
};