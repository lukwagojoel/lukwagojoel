// "use client";

// import { Header } from "@/components/kprstyle/Header";
// import { Hero } from "@/components/kprstyle/Hero";
// import React from "react";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
//       {/* 1. Transparent Header with Drawer */}
    

//       {/* 2. Full-Screen Interactive Tilt Hero */}
//       <Hero/>

//       {/* 3. Sample Secondary Content Section to Test Scroll & Header Overlay */}
//       <section id="project" className="relative min-h-screen px-6 py-24 max-w-7xl mx-auto flex flex-col justify-center">
//         <div className="border-l-2 border-lime-400 pl-6 space-y-4">
//           <span className="font-mono text-xs text-lime-400 tracking-widest uppercase">
//             [ 01 // OVERVIEW ]
//           </span>
//           <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
//             THE NEXT ERA OF NARRATIVE.
//           </h2>
//           <p className="text-gray-400 max-w-2xl text-base sm:text-lg font-mono leading-relaxed">
//             Testing smooth scrolling and layout response. The header remains fixed and transparent at the top, allowing the full visual depth to show through while maintaining fast access to navigation.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import React from "react";
import { Hero } from "@/components/kprstyle/Hero";
import { NextSection } from "@/components/kprstyle/NextSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      <Hero />
      <NextSection />
    </main>
  );
}