"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const NextSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Zoom-in transformation sequence
  const scale = useTransform(scrollYProgress, [0.15, 0.5], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.35, 0.55], ["48px", "0px"]);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black -mt-[100vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-4 sm:p-8 z-20">
        <motion.section
          style={{ scale, opacity, borderRadius }}
          className="w-full h-full max-w-7xl mx-auto bg-zinc-950 border border-white/10 p-8 sm:p-16 flex flex-col justify-center shadow-2xl overflow-hidden"
        >
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
        </motion.section>
      </div>
    </div>
  );
};