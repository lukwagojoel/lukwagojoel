"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Fades/dissolves content in when it scrolls into view, and back out when
 * it scrolls away - a soft blur+opacity "ghost" effect, no directional
 * movement. Use for images, cards, and other non-text blocks. Pair with
 * AnimatedText for text content.
 */
export function Reveal({ children, className = "", delay = 0, once = false }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-15% 0px" }}
      variants={{
        hidden: { opacity: 0, filter: "blur(10px)" },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}