"use client";

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NAV_LINKS } from "../../data/Navigation";
import { ClippedButton } from "./clippedButton";
import { Sidebar } from "./SideBar";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 px-6 py-6 flex items-center justify-between bg-transparent">
        {/* Left: Menu Trigger */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white text-2xl p-2 hover:text-lime-400 transition-colors"
          aria-label="Open navigation menu"
        >
          <FiMenu />
        </button>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest text-white/80">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Contact Button */}
        <ClippedButton onClick={() => (window.location.href = "#contact")}>
          CONTACT
        </ClippedButton>
      </header>

      {/* Slide-out Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};