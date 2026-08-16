"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120, damping: 25, restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0% 0%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-ember z-[60]"
      />
      {/* iOS-style pill indicator — shows % on mobile */}
      <motion.div
        style={{ opacity: useSpring(scrollYProgress, { stiffness: 120, damping: 25 }) }}
        className="fixed top-4 right-4 z-[60] sm:hidden"
      >
        <div className="bg-carbon/80 backdrop-blur border border-white/10 rounded-full px-3 py-1">
          <motion.span
            className="font-mono text-[10px] text-ember"
          >
            {/* rendered via style — no JS needed in JSX */}
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}