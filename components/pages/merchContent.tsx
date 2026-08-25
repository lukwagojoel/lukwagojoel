"use client";

import React, { useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiLock } from "react-icons/fi";
import { ScrambleText } from "@/components/kprstyle/Effects/scrumble";
import { Reveal } from "@/components/kprstyle/Effects/reveal";
import { AnimatedText } from "@/components/kprstyle/Effects/animatedText";

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

// Placeholder products/images - swap for the real drop whenever it's ready.
export const MERCH_ITEMS: MerchItem[] = [
  { id: "m1", name: "Bytecode Tee", price: "$32", category: "Apparel", image: "https://picsum.photos/seed/joel-merch-1/700/900" },
  { id: "m2", name: "Terminal Hoodie", price: "$68", category: "Apparel", image: "https://picsum.photos/seed/joel-merch-2/700/900" },
  { id: "m3", name: "Debug Cap", price: "$24", category: "Accessories", image: "https://picsum.photos/seed/joel-merch-3/700/900" },
  { id: "m4", name: "Sticker Pack Vol. 1", price: "$8", category: "Accessories", image: "https://picsum.photos/seed/joel-merch-4/700/900" },
  { id: "m5", name: "200 OK Mug", price: "$18", category: "Accessories", image: "https://picsum.photos/seed/joel-merch-5/700/900" },
  { id: "m6", name: "Kampala Dev Tee", price: "$32", category: "Apparel", image: "https://picsum.photos/seed/joel-merch-6/700/900" },
];

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    // NOTE: this is a frontend-only placeholder. To actually collect
    // emails, wire this up to a service like Mailchimp, ConvertKit,
    // Resend, or a simple serverless function + database - there's no
    // backend here to persist this yet.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-fuchsia-400">
        <FiCheck /> You're on the list — we'll email you when it drops.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center gap-2 border-b border-white/20 pb-2 focus-within:border-fuchsia-400">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Notify me"
          className="flex-shrink-0 text-gray-400 transition-colors hover:text-fuchsia-400"
        >
          <FiArrowRight />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </form>
  );
}

export function MerchStore({ items = MERCH_ITEMS }: { items?: MerchItem[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

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

  return (
    <div>
      {/* Notify callout */}
      <Reveal once={false}>
        <div className="flex flex-col items-start gap-4 border border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              </span>
              Store opens soon
            </span>
            <p className="mt-2 max-w-md text-sm text-gray-400">
              <AnimatedText
                text="Be the first to know when the drop goes live."
                mode="chars"
                once={false}
              />
            </p>
          </div>
          <NotifyForm />
        </div>
      </Reveal>

      {/* Category filter */}
      <nav className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/10 pb-6 text-sm">
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

      {/* Product grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {filteredItems.map((item, idx) => (
          <Reveal key={item.id} once={false} delay={(idx % 3) * 0.08}>
            <div className="group relative border border-white/10">
              <div className="absolute top-0 right-0 z-10 h-6 w-6 border-t border-r border-white/20 transition-colors group-hover:border-fuchsia-400" />

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                />

                {/* Locked overlay - communicates "not purchasable yet"
                    without pretending there's a cart that works */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 border border-white/30 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    <FiLock className="text-xs" />
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-white sm:text-base">
                    <ScrambleText text={item.name} />
                  </span>
                </div>
                <span className="text-sm text-gray-400">{item.price}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}