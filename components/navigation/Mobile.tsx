"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 6h12M3 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {/* Always in the DOM so links stay crawlable; hidden visually when closed */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "invisible opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        aria-label="Menu"
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-6">
          <ul className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block px-4 py-3.5 text-[17px] text-black transition-colors hover:bg-black/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          onClick={close}
          className="mt-4 flex h-11 items-center justify-center rounded-full bg-black text-[15px] font-medium text-white"
        >
          Contact
        </Link>
      </aside>
    </div>
  );
}