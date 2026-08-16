"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Bio = () => {
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const highlightImages: Record<string, string> = {
    engineer: "/fashion.jpeg",
    bodybuilder: "/me.jpg",
    entrepreneurship: "/me.jpg",
    fashion: "/fashion.jpeg",
  };

  const handleHighlightHover = (highlight: string, e: React.MouseEvent) => {
    setHoveredHighlight(highlight);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top + 40,
    });
  };

  const handleMouseLeave = () => setHoveredHighlight(null);

  useEffect(() => {
    const handleClickOutside = () => setHoveredHighlight(null);
    if (hoveredHighlight) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [hoveredHighlight]);

  const Highlight = ({
    children,
    label,
  }: {
    children: React.ReactNode;
    label: string;
  }) => (
    <span
      className="text-ember cursor-pointer relative inline-block border-b border-ember/40 hover:border-ember transition-colors"
      onMouseEnter={(e) => handleHighlightHover(label, e)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );

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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl text-bone leading-relaxed space-y-5 font-body text-base sm:text-lg"
      >
        <p>
          I&apos;m a Kampala-based{" "}
          software engineer
          specializing in building modern web and mobile applications with
          React, React Native, and Node.js. I have a deep passion for AI,
          machine learning, entrepreneurship
          and real estate — driven by both business impact and architectural
          beauty. I&apos;m dedicated to creating value through innovative and
          impactful ventures.
            <br/>
           Above all, I&apos;m a devoted Christian and lover of God,
                guided by faith in both my personal life and professional
                journey.
        </p>

        {/* {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="font-mono text-xs uppercase tracking-wide text-chrome hover:text-bone transition-colors focus-ring"
          >
            + Read the rest
          </button>
        )} */}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 overflow-hidden"
            >
              <p>
                Beyond the professional realm, I&apos;m also a{" "}
               <span className="text-red-500">professional bodybuilder</span>,
                dedicated to discipline, strength, and continuous
                self-improvement. I&apos;m equally passionate about{" "}
                fashion; I love
                clothes, shoes, and the art of dressing well.
              </p>
              <p>
                Above all, I&apos;m a devoted Christian and lover of God,
                guided by faith in both my personal life and professional
                journey.
              </p>
              <button
                onClick={() => setIsExpanded(false)}
                className="font-mono text-xs uppercase tracking-wide text-graphite hover:text-bone transition-colors focus-ring"
              >
                — Show less
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {hoveredHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="fixed w-56 h-56 overflow-hidden shadow-2xl border border-ember/50 z-50"
            style={{
              left: `${tooltipPos.x - 112}px`,
              top: `${tooltipPos.y}px`,
            }}
            onMouseEnter={() => setHoveredHighlight(hoveredHighlight)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
