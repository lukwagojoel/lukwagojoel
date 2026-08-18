"use client";

import React from "react";
import { motion } from "framer-motion";

interface ClippedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ClippedButton = ({
  children,
  onClick,
  className = "",
}: ClippedButtonProps) => {
  // Polygon coordinates: (0 0) -> (82% 0) -> (100% 35%) -> (100% 100%) -> (18% 100%) -> (0 65%)
  const clipPolygon =
    "polygon(0 0, 82% 0, 100% 35%, 100% 100%, 18% 100%, 0 65%)";

  return (
    <div className="relative inline-block group">
      {/* 1. BACKGROUND SHADOW LAYER (Offset Shape) */}
      <div
        style={{ clipPath: clipPolygon }}
        className="absolute inset-0 bg-fuchsia-500 translate-x-1.5 translate-y-1.5 transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />

      {/* 2. MAIN FRONT BUTTON */}
      <button
        onClick={onClick}
        style={{ clipPath: clipPolygon }}
        className={`relative z-10 block px-8 py-4 font-extrabold text-sm tracking-widest uppercase text-black bg-white transition-all duration-300 ease-out border-2 border-gray-300 group-hover:text-white ${className}`}
      >
        {/* Continuous Endless Moving Border (Fuchsia Accent) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.polygon
            points="0,0 82,0 100,35 100,100 18,100 0,65"
            fill="none"
            stroke="#730385"
            strokeWidth="3"
            strokeDasharray="25 75"
            animate={{
              strokeDashoffset: [0, -100],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* Hover Background Layer (Fuchsia Fill) */}
        <span
          style={{ clipPath: clipPolygon }}
          className="absolute inset-0 w-full h-full bg-fuchsia-600 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 group-hover:-rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 ease-out"
        />

        {/* Button Content Label */}
        <span className="relative z-30 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    </div>
  );
};