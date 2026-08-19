"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import { SOCIAL_LINKS } from "../../data/Navigation";
import { ScrambleText } from "./Effects/scrumble";
import { AnimatedText } from "../kprstyle/Effects/animatedText";
import { Reveal } from "../kprstyle/Effects/reveal";

export const Footer = () => {
  const [timeString, setTimeString] = useState<string>("");
  const nameSectionRef = useRef<HTMLDivElement>(null);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Full viewport-width horizontal scroll translation
  const { scrollYProgress: nameProgress } = useScroll({
    target: nameSectionRef,
    offset: ["start end", "end start"],
  });
  
  // Drives the name across the entire screen from right to left
  const nameX = useTransform(nameProgress, [0, 1], ["25vw", "-65vw"]);

  return (
    <footer className="relative w-full bg-black text-white font-mono border-t border-white/10 overflow-hidden pt-16 pb-8">
      {/* Background HUD Grid Guidelines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-20">
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
        <div className="absolute top-1/2 left-0 right-0 border-b border-white/20" />
      </div>

      <div className="w-full relative z-10 flex flex-col justify-between min-h-[80vh]">
        {/* Top Header Row Container */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-xs sm:text-sm">
            {/* Column 1: Status & Location */}
            <Reveal once={false}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-fuchsia-400 font-bold tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                  </span>
                  <AnimatedText text="AVAILABLE FOR WORK" mode="chars" once={false} />
                </div>
                <p className="text-gray-400">
                  <AnimatedText text="KAMPALA, UGANDA — UTC +3" mode="chars" once={false} />
                </p>
                <p className="text-gray-500 font-semibold">{timeString || "00:00:00"}</p>
              </div>
            </Reveal>

            {/* Column 2: Navigation Links */}
            <Reveal once={false}>
              <div className="space-y-2">
                <span className="text-gray-500 block font-bold tracking-widest">
                  <AnimatedText text="■ NAVIGATION" mode="chars" once={false} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <a
                    href="/projects"
                    className="hover:text-fuchsia-400 transition-colors inline-flex items-center gap-1 w-fit"
                  >
                    <AnimatedText text="PROJECTS" mode="chars" once={false} />
                    <FiArrowUpRight />
                  </a>
                  <a
                    href="mailto:lukwagojoel@example.com"
                    className="hover:text-fuchsia-400 transition-colors inline-flex items-center gap-1 w-fit"
                  >
                    <AnimatedText text="GET IN TOUCH" mode="chars" once={false} />
                    <FiArrowUpRight />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Column 3: Social Links */}
            <Reveal once={false}>
              <div className="space-y-2">
                <span className="text-gray-500 block font-bold tracking-widest">
                  <AnimatedText text="■ CONNECT" mode="chars" once={false} />
                </span>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-fuchsia-400 transition-colors font-bold tracking-wider"
                    >
                      <ScrambleText text={s.label} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Full-Width Centerpiece Banner */}
        <div
          ref={nameSectionRef}
          className="w-full py-16 sm:py-24 overflow-hidden relative"
        >
          <motion.div
            style={{ x: nameX }}
            className="w-max whitespace-nowrap cursor-pointer select-none"
            onClick={scrollToTop}
          >
            <h2 className="font-extrabold text-[15vw] sm:text-[18vw] leading-none tracking-tighter uppercase text-white transition-colors duration-500 hover:text-fuchsia-400">
              LUKWAGO{" "}
              <span className="stroke-text text-transparent">JOEL.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bottom Bar Container */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12">
          <Reveal once={false}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-gray-500">
              <div>
                <AnimatedText
                  text={`© ${new Date().getFullYear()} LUKWAGO JOEL. ALL RIGHTS RESERVED.`}
                  mode="chars"
                  once={false}
                />
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 hover:text-fuchsia-400 transition-colors uppercase tracking-widest font-bold group"
              >
                <AnimatedText text="BACK TO TOP" mode="chars" once={false} />
                <span className="p-1.5 border border-white/20 rounded-full group-hover:border-fuchsia-400 group-hover:-translate-y-1 transition-all">
                  <FiArrowUp className="text-sm" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        h2:hover .stroke-text {
          -webkit-text-stroke: 0px transparent;
          color: white;
        }
      `}</style>
    </footer>
  );
};