"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { ABOUT_DATA } from "@/data/bio";
import { AnimatedText } from "../kprstyle/Effects/animatedText";
import { Reveal } from "../kprstyle/Effects/reveal";

const renderValue = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return (
      <p className="mt-1 text-sm text-gray-300 leading-relaxed">
        {value.join(" · ")}
      </p>
    );
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return (
      <Link
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-gray-200 underline decoration-gray-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
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
    <div className="pt-12 lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
      {/* Main column - prose */}
      <div className="order-2 lg:order-1">
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
          <AnimatedText text="About" mode="chars" once={false} />
        </h2>

        <div className="mt-4 max-w-2xl font-serif text-lg text-gray-300 leading-relaxed">
          <AnimatedText
            text="Engineering practical software systems, modern web platforms, and AI tools — with the same discipline I bring to the gym, applied to the craft."
            mode="words"
            once={false}
          />
        </div>

        {/* Section filter - understated text links, no pills */}
        <nav className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/10 pb-4 text-sm">
          <button
            onClick={() => setActiveSection("all")}
            className={`transition-colors ${
              activeSection === "all"
                ? "text-white underline underline-offset-4"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            All
          </button>
          {ABOUT_DATA.map((sec) => (
            <button
              key={sec.section}
              onClick={() => setActiveSection(sec.section)}
              className={`transition-colors ${
                activeSection === sec.section
                  ? "text-white underline underline-offset-4"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </nav>

        <div className="mt-2">
          {filteredData.map((block) => (
            <Reveal key={block.section} once={false}>
              <section
                id={block.section}
                className="border-b border-white/5 py-8 first:pt-8"
              >
                <h3 className="font-serif text-xl text-white">
                  <AnimatedText text={block.title} mode="words" />
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {block.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        typeof item.value === "string" && item.value.length > 60
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <span className="block text-xs uppercase tracking-wider text-gray-500">
                        {item.label}
                      </span>
                      <div className="mt-1">{renderValue(item.value)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Infobox - Wikipedia-style, sits top-right on desktop, top on mobile */}
      <aside className="order-1 mb-10 lg:order-2 lg:mb-0">
        <Reveal once={false}>
          <div className="border border-white/15 bg-white/[0.02]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/me.jpg"
                alt="Lukwago Joel"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-3 p-4">
              <div>
                <h3 className="text-base font-semibold text-white">Lukwago Joel</h3>
                <p className="text-xs text-gray-500">Software Engineer &amp; Entrepreneur</p>
              </div>

              <dl className="space-y-2 border-t border-white/10 pt-3 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Based in</dt>
                  <dd className="text-right text-gray-300">Kampala, Uganda</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Focus</dt>
                  <dd className="text-right text-gray-300">Web &amp; mobile engineering</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </aside>
    </div>
  );
};