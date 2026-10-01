"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Plus_Jakarta, playwrite } from "@/lib/fonts";

type NavLink = {
  label: string;
  href: string;
};

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Menu button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 active:bg-black/10 md:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6.5h12M4 13.5h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className={`absolute inset-0 h-full w-full bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          id="mobile-menu"
          aria-label="Mobile menu"
          aria-hidden={!open}
          className={`absolute right-0 top-0 flex h-[100dvh] w-[min(20rem,calc(100vw-1rem))] flex-col bg-white px-5 pb-6 pt-5 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between">
            <Link
          href="/"
          className={`${playwrite.className} py-4 min-w-0 truncate text-base font-black leading-none text-black sm:text-2xl md:text-center`}
        >
          Lukwago Joel
        </Link>

            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 active:bg-black/10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav aria-label="Mobile navigation" className="mt-8 flex-1 overflow-y-auto">
            <ul className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center px-4 py-3 text-[16px] text-black transition-colors hover:bg-black/[0.04] active:bg-black/[0.07]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={close}
            className="mt-5 flex h-11 shrink-0 items-center justify-center rounded-full bg-black px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-80 active:opacity-70"
          >
            Contact
          </Link>
        </aside>
      </div>
    </>
  );
}