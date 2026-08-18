// "use client";

// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiX } from "react-icons/fi";
// import { SIDEBAR_LINKS, SOCIAL_LINKS } from "../../data/Navigation";
// import { ScrambleText } from "./Effects/scrumble";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Transparent Vignette Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-[9998] cursor-pointer bg-gradient-to-r from-black/40 via-black/10 to-transparent backdrop-blur-[2px]"
//             style={{
//               maskImage:
//                 "linear-gradient(to right, black 0%, black 30%, transparent 60%)",
//               WebkitMaskImage:
//                 "linear-gradient(to right, black 0%, black 30%, transparent 60%)",
//             }}
//           />

//           {/* Drawer Container: Full Screen on Mobile, Floating Card on Desktop */}
//           <motion.aside
//             initial={{ x: "-110%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-110%" }}
//             transition={{ type: "spring", damping: 26, stiffness: 220 }}
//             className="fixed inset-0 sm:top-6 sm:left-6 sm:bottom-6 sm:inset-auto w-full h-full sm:h-[calc(100vh-3rem)] sm:w-[calc(100%-1.5rem)] max-w-none sm:max-w-lg md:max-w-xl bg-zinc-950/95 sm:bg-zinc-950/90 backdrop-blur-md text-white z-[9999] flex flex-col justify-between border-0 sm:border border-white/20 rounded-none sm:rounded-3xl p-6 sm:p-10 font-mono shadow-2xl overflow-y-auto"
//           >
//             {/* Internal HUD Grid Overlay */}
//             <div className="absolute inset-0 pointer-events-none select-none rounded-none sm:rounded-3xl overflow-hidden">
//               <div className="absolute top-0 bottom-0 left-12 sm:left-16 border-r border-white/10" />
//               <div className="absolute top-20 left-0 right-0 border-b border-white/10" />
//               <div className="absolute bottom-28 left-0 right-0 border-t border-white/10" />
//               <div className="absolute left-12 sm:left-16 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px]">
//                 ┼
//               </div>
//             </div>

//             {/* Header & Close Button */}
//             <div className="relative z-10">
//               <div className="flex justify-between items-center pb-6 border-b border-white/10">
//                 <div className="text-xs sm:text-sm uppercase tracking-widest text-fuchsia-400 font-bold">
//                   ■ DISCOVER
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-2 text-2xl sm:text-3xl hover:text-fuchsia-400 transition-colors"
//                   aria-label="Close menu"
//                 >
//                   <FiX />
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <nav className="mt-8 sm:mt-12 flex flex-col gap-4 sm:gap-6">
//                 {SIDEBAR_LINKS.map((item, idx) => (
//                   <motion.div
//                     key={item.label}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.08 + idx * 0.04 }}
//                     className="flex items-baseline justify-between group"
//                   >
//                     <a
//                       href={item.href}
//                       onClick={onClose}
//                       className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight group-hover:text-fuchsia-400 transition-colors uppercase leading-none py-1"
//                     >
//                       <ScrambleText text={item.label} />
//                     </a>

//                     {item.page && (
//                       <span className="text-[10px] sm:text-xs font-bold bg-fuchsia-400 text-black px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-widest">
//                         PAGE {item.page}
//                       </span>
//                     )}
//                   </motion.div>
//                 ))}
//               </nav>
//             </div>

//             {/* Footer / Social Links */}
//             <div className="relative z-10 border-t border-white/10 pt-6 sm:pt-8 space-y-4 text-xs sm:text-sm">
//               <div>
//                 <span className="text-gray-500 block mb-2 sm:mb-3 font-bold tracking-widest">
//                   ■ CONNECT
//                 </span>
//                 <div className="flex flex-wrap gap-4 sm:gap-6">
//                   {SOCIAL_LINKS.map((s) => (
//                     <a
//                       key={s.label}
//                       href={s.href}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="hover:text-fuchsia-400 transition-colors font-bold tracking-wider sm:text-base"
//                     >
//                       <ScrambleText text={s.label} />
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               <div className="text-gray-600 flex justify-between pt-3 border-t border-white/5 sm:text-xs">
//                 <span>US-EN ▾</span>
//                 <span>© {new Date().getFullYear()}</span>
//               </div>
//             </div>
//           </motion.aside>
//         </>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { SIDEBAR_LINKS, SOCIAL_LINKS } from "../../data/Navigation";
import { ScrambleText } from "./Effects/scrumble";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Vignette Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] cursor-pointer bg-gradient-to-r from-black/50 via-black/20 to-transparent backdrop-blur-[2px]"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 30%, transparent 60%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 30%, transparent 60%)",
            }}
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: "-110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-110%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-0 sm:top-6 sm:left-6 sm:bottom-6 sm:inset-auto w-full h-full sm:h-[calc(100vh-3rem)] sm:w-[calc(100%-1.5rem)] max-w-none sm:max-w-lg md:max-w-xl bg-zinc-950/95 sm:bg-zinc-950/90 backdrop-blur-md text-white z-[9999] flex flex-col justify-between border-0 sm:border border-white/20 rounded-none sm:rounded-3xl p-6 sm:p-10 font-mono shadow-2xl overflow-hidden"
          >
            {/* Dynamic Background Image on Link Hover - Clearer & Brighter */}
            <AnimatePresence mode="wait">
              {hoveredImage && (
                <motion.div
                  key={hoveredImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 pointer-events-none z-0 rounded-none sm:rounded-3xl overflow-hidden"
                >
                  {/* Background Image - Sharper blur & higher brightness */}
                  <img
                    src={hoveredImage}
                    alt="Menu Preview"
                    className="w-full h-full object-cover filter blur-[1.5px] brightness-110 contrast-105 scale-105"
                  />
                  {/* Lighter Dark Overlay with Text Scrim for clear visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-zinc-950/30" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Internal HUD Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none select-none rounded-none sm:rounded-3xl overflow-hidden z-10">
              <div className="absolute top-0 bottom-0 left-12 sm:left-16 border-r border-white/15" />
              <div className="absolute top-20 left-0 right-0 border-b border-white/15" />
              <div className="absolute bottom-28 left-0 right-0 border-t border-white/15" />
              <div className="absolute left-12 sm:left-16 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[10px]">
                ┼
              </div>
            </div>

            {/* Header & Close Button */}
            <div className="relative z-20">
              <div className="flex justify-between items-center pb-6 border-b border-white/15">
                <div className="text-xs sm:text-sm uppercase tracking-widest text-fuchsia-400 font-bold drop-shadow">
                  ■ DISCOVER
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-2xl sm:text-3xl hover:text-fuchsia-400 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 sm:mt-12 flex flex-col gap-4 sm:gap-6">
                {SIDEBAR_LINKS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.04 }}
                    className="flex items-baseline justify-between group cursor-pointer"
                    onMouseEnter={() =>
                      setHoveredImage(item.image || "/images/sidebar-default.jpg")
                    }
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight group-hover:text-fuchsia-400 transition-colors uppercase leading-none py-1 drop-shadow-lg"
                    >
                      <ScrambleText text={item.label} />
                    </a>

                    {item.page && (
                      <span className="text-[10px] sm:text-xs font-bold bg-fuchsia-400 text-black px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-widest group-hover:bg-white transition-colors shadow">
                        PAGE {item.page}
                      </span>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer / Social Links */}
            <div className="relative z-20 border-t border-white/15 pt-6 sm:pt-8 space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-400 block mb-2 sm:mb-3 font-bold tracking-widest">
                  ■ CONNECT
                </span>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-fuchsia-400 transition-colors font-bold tracking-wider sm:text-base drop-shadow"
                    >
                      <ScrambleText text={s.label} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-gray-400 flex justify-between pt-3 border-t border-white/10 sm:text-xs">
                <span>US-EN ▾</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};