"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { ABOUT_DATA } from "@/data/bio";

const renderValue = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {value.map((item, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-200"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return (
      <Link
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors inline-flex items-center gap-1 text-sm underline underline-offset-4"
      >
        <span>{value.replace(/^https?:\/\/(www\.)?/, "")}</span>
        <FiExternalLink className="text-xs" />
      </Link>
    );
  }

  return <p className="text-sm text-gray-300 leading-relaxed">{value}</p>;
};

export const AboutAnimated = () => {
  const [activeSection, setActiveSection] = useState<string>("all");

  const filteredData =
    activeSection === "all"
      ? ABOUT_DATA
      : ABOUT_DATA.filter((item) => item.section === activeSection);

  return (
    <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Tactical Identity HUD Card */}
      <div className="lg:col-span-5 relative group">
        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-neutral-900/50 backdrop-blur-md p-4 space-y-4 shadow-2xl">
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 group-hover:border-fuchsia-400/50 transition-colors">
            <Image
              src="/me.jpg"
              alt="Lukwago Joel"
              fill
              priority
              className="object-cover object-center  transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ONLINE // KAMPALA, UG</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-xl font-bold text-white tracking-tight">LUKWAGO JOEL</h3>
            <p className="text-xs text-fuchsia-400 tracking-wider uppercase">
              Software Engineer & Entrepreneur
            </p>
            <p className="text-xs text-gray-400 font-sans leading-relaxed pt-2 border-t border-white/10">
              Engineering practical software systems, modern web platforms, AI tools, and athletic discipline from Kampala, Uganda.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Filter Navigation & Data Cards */}
      <div className="lg:col-span-7 space-y-8">
        <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
          <button
            onClick={() => setActiveSection("all")}
            className={`text-xs px-3 py-1.5 rounded transition-all uppercase tracking-wider font-semibold ${
              activeSection === "all"
                ? "bg-fuchsia-500 text-black shadow-lg shadow-fuchsia-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            // ALL DATA
          </button>
          {ABOUT_DATA.map((sec) => (
            <button
              key={sec.section}
              onClick={() => setActiveSection(sec.section)}
              className={`text-xs px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                activeSection === sec.section
                  ? "bg-fuchsia-500 text-black font-semibold"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredData.map((block) => (
            <div
              key={block.section}
              id={block.section}
              className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 space-y-4 hover:border-fuchsia-400/30 transition-colors relative group"
            >
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 group-hover:border-fuchsia-400 transition-colors" />

              <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-sm tracking-widest uppercase pb-2 border-b border-white/5">
                <span>[ {block.title} ]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {block.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`space-y-1 ${
                      typeof item.value === "string" && item.value.length > 60
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">
                      {item.label}
                    </span>
                    {renderValue(item.value)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};