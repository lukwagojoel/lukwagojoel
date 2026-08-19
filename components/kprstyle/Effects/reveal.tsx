"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels while fading. */
  y?: number;
  once?: boolean;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Fades/slides content in when it scrolls into view, and back out when it
 * scrolls away - use for images, cards, and other non-text blocks. Pair
 * with AnimatedText for text content.
 */
export function Reveal({ children, className = "", delay = 0, y = 24, once = false }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-15% 0px" }}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}