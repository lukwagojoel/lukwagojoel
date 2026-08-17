"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { Hero } from "../Hero";
import { NextSection } from "../NextSection";


export const ScrollExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooths out raw scroll input — this is most of your "not smooth" fix
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Hero progress={progress} />
        <NextSection progress={progress} />
      </div>
    </div>
  );
};