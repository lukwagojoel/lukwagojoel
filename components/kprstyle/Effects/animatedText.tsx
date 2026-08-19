"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** "chars" reveals letter-by-letter, "words" reveals word-by-word. */
  mode?: "chars" | "words";
  /** Extra delay in seconds before this block starts animating. */
  delay?: number;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  /** If true, only animates in the first time it's seen. Default false -
   * fades in on every scroll-into-view and back out on every scroll-away. */
  once?: boolean;
}

const unitVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Reveals text on scroll-into-view, animating individual characters or
 * whole words in a stagger. Long passages auto-fallback to word mode
 * to avoid rendering hundreds of animated glyphs.
 */
export function AnimatedText({
  text,
  className = "",
  mode = "chars",
  delay = 0,
  as = "span",
  once = false,
}: AnimatedTextProps) {
  const effectiveMode: "chars" | "words" = mode;

  const staggerChildren = effectiveMode === "chars" ? 0.055 : 0.09;

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren: delay },
    },
  };

  const words = text.split(" ");
  const MotionTag = motion[as as "span"];

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-15% 0px" }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {effectiveMode === "chars"
              ? word.split("").map((char, ci) => (
                  <motion.span key={ci} variants={unitVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))
              : (
                  <motion.span variants={unitVariants} className="inline-block">
                    {word}
                  </motion.span>
                )}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </MotionTag>
  );
}