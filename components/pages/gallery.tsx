"use client";

import { GalleryItem, GallerySize } from "@/data/gallery";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const SIZE_CLASSES: Record<GallerySize, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  lg: "col-span-2 row-span-2",
};

const TILE_SIZES: Record<GallerySize, string> = {
  sm: "(min-width: 1024px) 25vw, 50vw",
  tall: "(min-width: 1024px) 25vw, 50vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  lg: "(min-width: 1024px) 50vw, 100vw",
};

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState<number | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const visible = useMemo(
    () => (category === "all" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, next, prev]);

  const active = index !== null ? visible[index] : null;

  const chip = (label: string, value: string) => (
    <button
      key={value}
      type="button"
      aria-pressed={category === value}
      onClick={() => setCategory(value)}
      className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
        category === value
          ? "bg-black text-white"
          : "bg-black/5 text-black/70 hover:bg-black/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {chip("All", "all")}
        {categories.map((c) => chip(c, c))}
      </div>

      <ul className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
        {visible.map((item, i) => (
          <li key={item.id} className={SIZE_CLASSES[item.size]}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${item.title}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5"
            >
              <Image
                src={item.src}
                alt={`${item.title} (${item.category})`}
                fill
                quality={90}
                sizes={TILE_SIZES[item.size]}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 px-5 py-16 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[70vh] w-[min(90vw,48rem)]"
          >
            <Image
              src={active.src}
              alt={`${active.title} (${active.category})`}
              fill
              quality={90}
              sizes="(min-width: 768px) 768px, 90vw"
              className="object-contain"
            />
          </div>

          <p className="mt-5 text-[17px] font-medium text-black">{active.title}</p>
          <p className="text-sm text-black/50">{active.category}</p>

          <div className="mt-5 flex gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}