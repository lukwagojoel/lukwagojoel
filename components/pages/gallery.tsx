"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { ScrambleText } from "@/components/kprstyle/Effects/scrumble";
import { Reveal } from "@/components/kprstyle/Effects/reveal";

export type GallerySize = "sm" | "wide" | "tall" | "lg";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  size: GallerySize;
}

// Placeholder images via picsum.photos (deterministic seeds so they stay
// consistent between reloads) - swap `src` for your real assets in /public
// whenever you have them. Categories pulled from your page's own metadata
// description: UI, Experiments, Graphics, Snapshots.
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", src: "/me24.jpg", title: "Dashboard Concept", category: "UI", size: "lg" },
  { id: "g2", src: "/me25.jpg", title: "Studio Setup", category: "Snapshots", size: "sm" },
  { id: "g3", src: "https://picsum.photos/seed/joel-gfx-1/600/600", title: "Type Study", category: "Graphics", size: "sm" },
  { id: "g4", src: "https://picsum.photos/seed/joel-exp-1/600/1200", title: "Shader Test", category: "Experiments", size: "tall" },
  { id: "g5", src: "https://picsum.photos/seed/joel-ui-2/1200/600", title: "Mobile Flow", category: "UI", size: "wide" },
  { id: "g6", src: "https://picsum.photos/seed/joel-gfx-2/600/600", title: "Poster Draft", category: "Graphics", size: "sm" },
  { id: "g7", src: "https://picsum.photos/seed/joel-snap-2/600/600", title: "Gym Log", category: "Snapshots", size: "sm" },
  { id: "g8", src: "https://picsum.photos/seed/joel-exp-2/600/1200", title: "Particle Field", category: "Experiments", size: "tall" },
  { id: "g9", src: "https://picsum.photos/seed/joel-ui-3/900/900", title: "Component Library", category: "UI", size: "lg" },
];

const SIZE_CLASSES: Record<GallerySize, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  lg: "col-span-2 row-span-2",
};

export function Gallery({ items = GALLERY_ITEMS }: { items?: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter((i) => i.category === activeCategory),
    [items, activeCategory]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredItems.length));
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredItems.length) % filteredItems.length
    );

  // Keyboard nav for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {/* Category filter - same understated text-link pattern as the rest of the site */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/10 pb-6 text-sm">
        <button
          onClick={() => setActiveCategory("all")}
          className={`transition-colors ${
            activeCategory === "all"
              ? "text-fuchsia-400 underline underline-offset-4"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`transition-colors ${
              activeCategory === cat
                ? "text-fuchsia-400 underline underline-offset-4"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Bento grid - mixed tile sizes instead of a uniform grid */}
      <div className="mt-8 grid grid-cols-2 auto-rows-[160px] gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
        {filteredItems.map((item, idx) => (
          <Reveal key={item.id} once={false} delay={(idx % 4) * 0.06}>
            <button
              onClick={() => setLightboxIndex(idx)}
              className={`group relative block h-full w-full overflow-hidden border border-white/10 ${SIZE_CLASSES[item.size]}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Corner accent, consistent with the rest of the site */}
              <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-white/20 transition-colors group-hover:border-fuchsia-400" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
                  {item.category}
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm font-bold text-white">
                  <ScrambleText text={item.title} />
                </span>
              </div>

              <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 p-1.5 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <FiMaximize2 className="text-xs text-white" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-6 py-16"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 transition-colors hover:text-fuchsia-400"
            >
              <FiX size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 text-white/50 transition-colors hover:text-fuchsia-400"
            >
              <FiChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 text-white/50 transition-colors hover:text-fuchsia-400"
            >
              <FiChevronRight size={32} />
            </button>

            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-3xl flex-col items-center"
            >
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto border border-white/10 object-contain"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
                  {activeItem.category}
                </span>
                <p className="mt-1 text-lg font-bold text-white">{activeItem.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}