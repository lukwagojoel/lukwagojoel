"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Bio = () => {
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightImages: Record<string, string> = {
    engineer: "/fashion.jpeg",
    bodybuilder: "/me.jpg",
    entrepreneurship: "/me.jpg",
    fashion: "/fashion.jpeg",
  };

  const handleHighlightHover = (highlight: string, e: React.MouseEvent) => {
    setHoveredHighlight(highlight);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top + 44 });
  };

  const handleMouseLeave = () => setHoveredHighlight(null);

  useEffect(() => {
    const handleClickOutside = () => setHoveredHighlight(null);
    if (hoveredHighlight) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [hoveredHighlight]);

  const Highlight = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <span
      className="text-ember cursor-pointer relative inline-block border-b border-ember/40 hover:border-ember transition-colors"
      onMouseEnter={(e) => handleHighlightHover(label, e)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );

  /* iOS-style card pills */
  const pills = [
    { emoji: "💻", label: "Software Engineer" },
    { emoji: "🏋️", label: "Bodybuilder" },
    { emoji: "🚀", label: "Entrepreneur" },
    { emoji: "✝️", label: "Christian" },
  ];

  return (
    <section className="w-full px-6 sm:px-10 py-24 sm:py-32 border-t border-line relative">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest2 text-graphite mb-8"
      >
        01 — Who&apos;s Building This
      </motion.p>

      {/* iOS-style identity pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {/* {pills.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="text-sm">{p.emoji}</span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-graphite">{p.label}</span>
          </motion.div>
        ))} */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl text-bone leading-relaxed space-y-5 font-body text-base sm:text-lg"
      >
        <p>
          I&apos;m a Kampala-based{" "}
          <Highlight label="engineer">software engineer</Highlight> specializing
          in modern web and mobile applications with React, React Native, and
          Node.js. I have a deep passion for AI, machine learning,{" "}
          <Highlight label="entrepreneurship">entrepreneurship</Highlight> and
          real estate — driven by both business impact and architectural beauty.
          <br/>
          I&apos;m a devoted Christian, guided by faith in both my
          personal life and professional journey.
        </p>
        
      </motion.div>

      {/* Hover image tooltip */}
      <AnimatePresence>
        {hoveredHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed w-52 h-52 overflow-hidden shadow-2xl border border-white/10 z-50 rounded-2xl"
            style={{ left: `${tooltipPos.x - 104}px`, top: `${tooltipPos.y}px` }}
            onMouseEnter={() => setHoveredHighlight(hoveredHighlight)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={highlightImages[hoveredHighlight] || "/me.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Bio;