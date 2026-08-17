"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import { SOCIAL_LINKS } from "../../data/Navigation";
import { ScrambleText } from "./Effects/scrumble";

export const Footer = () => {
  const [timeString, setTimeString] = useState<string>("");

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

  return (
    <footer className="relative w-full bg-black text-white font-mono border-t border-white/10 overflow-hidden pt-16 pb-8 px-6 sm:px-12">
      {/* Background HUD Grid Guidelines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-20">
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
        <div className="absolute top-1/2 left-0 right-0 border-b border-white/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between min-h-[80vh]">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-xs sm:text-sm">
          {/* Column 1: Status & Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lime-400 font-bold tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              AVAILABLE FOR WORK
            </div>
            <p className="text-gray-400">KAMPALA, UGANDA — UTC +3</p>
            <p className="text-gray-500 font-semibold">{timeString || "00:00:00"}</p>
          </div>

          {/* Column 2: Quick Links / Navigation */}
          <div className="space-y-2">
            <span className="text-gray-500 block font-bold tracking-widest">
              ■ NAVIGATION
            </span>
            <div className="flex flex-col gap-1.5">
              <a
                href="#project"
                className="hover:text-lime-400 transition-colors inline-flex items-center gap-1 w-fit"
              >
                PROJECTS <FiArrowUpRight />
              </a>
              <a
                href="mailto:lukwagojoel@example.com"
                className="hover:text-lime-400 transition-colors inline-flex items-center gap-1 w-fit"
              >
                GET IN TOUCH <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-2">
            <span className="text-gray-500 block font-bold tracking-widest">
              ■ CONNECT
            </span>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-lime-400 transition-colors font-bold tracking-wider"
                >
                  <ScrambleText text={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Centerpiece: Giant Animated Name Banner */}
        <div className="py-12 sm:py-20 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center group cursor-pointer select-none"
            onClick={scrollToTop}
          >
            <h2 className="font-extrabold text-[15vw] sm:text-[17vw] leading-[0.75] tracking-tighter uppercase text-white transition-all duration-500 group-hover:text-lime-400 group-hover:tracking-normal">
              LUKWAGO
            </h2>
            <h2 className="font-extrabold text-[15vw] sm:text-[17vw] leading-[0.75] tracking-tighter uppercase text-transparent stroke-text transition-all duration-500 group-hover:text-white group-hover:tracking-normal">
              JOEL.
            </h2>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} LUKWAGO JOEL. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-lime-400 transition-colors uppercase tracking-widest font-bold group"
          >
            BACK TO TOP
            <span className="p-1.5 border border-white/20 rounded-full group-hover:border-lime-400 group-hover:-translate-y-1 transition-all">
              <FiArrowUp className="text-sm" />
            </span>
          </button>
        </div>
      </div>

      {/* Stroke text helper styling for outline text effect */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        .group:hover .stroke-text {
          -webkit-text-stroke: 0px transparent;
        }
      `}</style>
    </footer>
  );
};