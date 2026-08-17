"use client";

import React, { useState } from "react";
import { FiMenu, FiVolume2, FiVolumeX } from "react-icons/fi";
import { NAV_LINKS } from "../../data/Navigation";
import { ClippedButton } from "./clippedButton";
import { Sidebar } from "./SideBar";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <>
      {/* 
        FLOATING HUD GRID OVERLAY
        Inset from screen edges with rounded outer corners (rounded-2xl / rounded-3xl).
        Does NOT block background content from extending full-screen underneath.
      */}
      <div className="fixed inset-3 sm:inset-6 pointer-events-none z-30 select-none">
        {/* Outer Frame with Rounded Corners */}
        <div className="absolute inset-0 border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Top Horizontal Grid Line */}
          <div className="absolute top-16 left-0 right-0 border-b border-white/15" />

          {/* Left Vertical Grid Line */}
          <div className="absolute top-0 bottom-0 left-16 sm:left-20 border-r border-white/15" />

          {/* Right Vertical Grid Line */}
          <div className="absolute top-0 bottom-0 right-36 sm:right-48 border-l border-white/15" />

          {/* Bottom Horizontal Grid Line */}
          <div className="absolute bottom-12 left-0 right-0 border-t border-white/15" />

          {/* HUD Crosshair Accent (Left Vertical Line Center) */}
          <div className="absolute left-16 sm:left-20 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 text-xs font-mono">
            ┼
          </div>
        </div>

        {/* --- INTERACTIVE GRID ANCHORS --- */}

        {/* Top-Left Corner Box: Hamburger Trigger */}
        <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white text-xl p-2 hover:text-lime-400 transition-colors"
            aria-label="Open navigation menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Top-Center Desktop Navigation */}
        <nav className="absolute top-0 left-20 right-36 sm:right-48 h-16 hidden md:flex items-center justify-center gap-8 font-mono text-xs tracking-widest text-white/80 pointer-events-auto">
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

        {/* Top-Right Corner Box: Contact Button */}
        <div className="absolute top-0 right-0 w-36 sm:w-48 h-16 flex items-center justify-center pointer-events-auto">
          <ClippedButton onClick={() => (window.location.href = "/contact")}>
            CONTACT
          </ClippedButton>
        </div>

        {/* Bottom-Left Corner Box: Sound/Audio Icon */}
        <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-12 flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/60 hover:text-lime-400 transition-colors text-base p-2"
            aria-label="Toggle audio"
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        </div>
      </div>

      {/* Animated Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};