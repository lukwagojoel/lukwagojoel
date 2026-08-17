"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { SIDEBAR_LINKS, SOCIAL_LINKS } from "../../data/Navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm sm:max-w-md bg-black text-white z-50 flex flex-col justify-between border-r border-white/10 p-6 sm:p-10 font-mono"
          >
            {/* Header & Close */}
            <div>
              <div className="flex justify-between items-center pb-8 border-b border-white/10">
                <div className="text-xs uppercase tracking-widest text-lime-400">
                  ■ DISCOVER
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-2xl hover:text-lime-400 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col gap-4">
                {SIDEBAR_LINKS.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="group flex items-baseline justify-between text-2xl sm:text-4xl font-extrabold tracking-wider hover:text-lime-400 transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.page && (
                      <span className="text-xs bg-lime-400 text-black px-1.5 py-0.5 rounded-sm">
                        PAGE {item.page}
                      </span>
                    )}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer / Socials */}
            <div className="border-t border-white/10 pt-6 space-y-4 text-xs">
              <div>
                <span className="text-gray-500 block mb-2">■ CONNECT</span>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-lime-400 transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-gray-600 flex justify-between pt-4">
                <span>US-EN ▾</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};