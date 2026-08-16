"use client";

import { motion } from "framer-motion";

const line1 = "LUKWAGO";
const line2 = "JOEL";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const letter = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedLine({ text }: { text: string }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block leading-[0.85]">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* iOS-style stat chips */
const stats = [
  { value: "3+", label: "Years building" },
  { value: "15+", label: "Projects shipped" },
  { value: "KLA", label: "Based in" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] min-h-[100svh]">
        {/* Text column */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 py-28 lg:py-0 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-mono text-xs sm:text-sm tracking-widest2 uppercase text-ember mb-4"
          >
            Kampala, Uganda — Software Engineer
          </motion.p>

          <h1 className="font-display uppercase text-[16vw] sm:text-[9vw] lg:text-[6.2vw] text-bone tracking-tight">
            <AnimatedLine text={line1} />
            <AnimatedLine text={line2} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 max-w-md font-body text-graphite text-sm sm:text-base"
          >
            Building modern web &amp; mobile products. Backing new ventures.
            Training like it&apos;s a competition. Three disciplines, one standard.
          </motion.p>

          {/* iOS-style stat row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-10 flex gap-3 flex-wrap"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm min-w-[72px]">
                <span className="font-display text-xl text-bone">{s.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-graphite mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-14 lg:mt-20 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-graphite"
          >
            <span className="block w-8 h-px bg-graphite" />
            Scroll
          </motion.div>
        </div>

        {/* Image column */}
        <div className="relative order-1 lg:order-2 h-[52vh] lg:h-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/me.jpg" alt="Lukwago Joel" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-ember mix-blend-color opacity-[0.22]" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-carbon via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}