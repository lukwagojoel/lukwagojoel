// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, useTransform, MotionValue } from "framer-motion";
// import { DEMO_PROJECTS, ProjectFromAPI } from "@/data/projects";

// interface NextSectionProps {
//   progress: MotionValue<number>;
// }

// // --- TUNABLES ---
// // Where in the overall scroll (0-1) the carousel index starts/ends moving
// const CAROUSEL_RANGE: [number, number] = [0.5, 0.9];
// // Where the cards resolve from carousel positions into the grid
// const GRID_RANGE: [number, number] = [0.88, 1.0];
// // Grid layout
// const GRID_COLS = 3;
// const GRID_CELL_W = 300;
// const GRID_CELL_H = 260;
// const GRID_SCALE = 0.62;
// // Active vs inactive size contrast (bigger gap = more dramatic)
// const ACTIVE_SCALE = 1.3;
// const SCALE_FALLOFF = 0.7;
// const MIN_SCALE = 0.3;

// export const NextSection = ({ progress }: NextSectionProps) => {
//   const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
//   const [loading, setLoading] = useState(true);

//   const sectionOpacity = useTransform(progress, [0.42, 0.58], [0, 1]);
//   const sectionScale = useTransform(progress, [0.42, 0.65], [0.8, 1]);

//   const scrollIndex = useTransform(
//     progress,
//     CAROUSEL_RANGE,
//     [0, Math.max(projects.length - 1, 1)]
//   );

//   // 0 while carousel is active, ramps to 1 as the user finishes scrolling -
//   // this is what drives every card from its 3D position into its grid cell
//   const gridProgress = useTransform(progress, GRID_RANGE, [0, 1]);

//   useEffect(() => {
//     async function fetchProjects() {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/projects");
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           const clientProjects = data.filter(
//             (p: any) => p.projectType === "client" && (p.visibility ?? "public") === "public"
//           );
//           setProjects(clientProjects.length > 0 ? clientProjects : DEMO_PROJECTS);
//         } else {
//           setProjects(DEMO_PROJECTS);
//         }
//       } catch (err) {
//         console.error("Failed to fetch projects, using defaults", err);
//         setProjects(DEMO_PROJECTS);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProjects();
//   }, []);

//   return (
//     <motion.section
//       style={{ opacity: sectionOpacity, scale: sectionScale }}
//       className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between overflow-hidden bg-zinc-950 p-6 sm:p-12 origin-center will-change-transform font-mono select-none"
//     >
//       {/* HUD Header */}
//       <div className="relative z-30 flex items-center justify-between border-b border-white/10 pb-4">
//         <div className="flex items-center gap-3">
//           <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
//           <span className="text-xs text-fuchsia-400 tracking-widest uppercase font-bold">
//             [ 02 // SELECTED CLIENT WORKS ]
//           </span>
//         </div>
//         <div className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">
//           3D SPATIAL NAVIGATION
//         </div>
//       </div>

//       {/* 3D World Canvas Container */}
//       <div className="relative w-full flex-1 flex items-center justify-center my-auto perspective-[1200px] overflow-hidden">
//         {loading ? (
//           <div className="flex items-center gap-3">
//             <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
//             <span className="text-sm text-gray-400 uppercase tracking-wider">
//               Initializing 3D Space...
//             </span>
//           </div>
//         ) : (
//           <div className="relative w-full max-w-6xl h-[420px] sm:h-[520px] flex items-center justify-center transform-style-3d">
//             {projects.map((project, idx) => (
//               <Project3DCard
//                 key={project.id ?? idx}
//                 project={project}
//                 index={idx}
//                 scrollIndex={scrollIndex}
//                 gridProgress={gridProgress}
//                 total={projects.length}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* HUD Footer Status */}
//       <div className="relative z-30 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-500">
//         <span>CLIENT PORTFOLIO</span>
//         <span className="text-fuchsia-400 font-bold tracking-widest">
//           SCROLL TO TRAVERSE →
//         </span>
//       </div>
//     </motion.section>
//   );
// };

// interface CardProps {
//   project: ProjectFromAPI;
//   index: number;
//   scrollIndex: MotionValue<number>;
//   gridProgress: MotionValue<number>;
//   total: number;
// }

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// function Project3DCard({ project, index, scrollIndex, gridProgress, total }: CardProps) {
//   // Target grid cell for this card, in index order (0 = top-left, reading
//   // left-to-right, top-to-bottom)
//   const cols = Math.min(GRID_COLS, total);
//   const rows = Math.ceil(total / cols);
//   const col = index % cols;
//   const row = Math.floor(index / cols);
//   const gridX = (col - (cols - 1) / 2) * GRID_CELL_W;
//   const gridY = (row - (rows - 1) / 2) * GRID_CELL_H;

//   // --- Carousel-phase values (unchanged logic, steeper scale curve) ---
//   const x = useTransform([scrollIndex, gridProgress], (latest) => {
//     const [latestIndex, gp] = latest as number[];
//     const offset = index - latestIndex;
//     const carouselX = offset * 380;
//     return lerp(carouselX, gridX, gp);
//   });

//   const y = useTransform(gridProgress, (gp) => lerp(0, gridY, gp));

//   const scale = useTransform([scrollIndex, gridProgress], (latest) => {
//     const [latestIndex, gp] = latest as number[];
//     const dist = Math.abs(index - latestIndex);
//     const carouselScale = Math.max(ACTIVE_SCALE - dist * SCALE_FALLOFF, MIN_SCALE);
//     return lerp(carouselScale, GRID_SCALE, gp);
//   });

//   const rotateY = useTransform([scrollIndex, gridProgress], (latest) => {
//     const [latestIndex, gp] = latest as number[];
//     const offset = index - latestIndex;
//     const carouselRotateY = Math.min(Math.max(offset * -22, -45), 45);
//     return lerp(carouselRotateY, 0, gp);
//   });

//   const zIndex = useTransform([scrollIndex, gridProgress], (latest) => {
//     const [latestIndex, gp] = latest as number[];
//     const dist = Math.abs(index - latestIndex);
//     const carouselZ = Math.round(100 - dist * 10);
//     // once resolved into the grid, stack in reading order
//     return Math.round(lerp(carouselZ, 100 - index, gp));
//   });

//   const opacity = useTransform([scrollIndex, gridProgress], (latest) => {
//     const [latestIndex, gp] = latest as number[];
//     const dist = Math.abs(index - latestIndex);
//     const carouselOpacity = Math.max(1 - dist * 0.5, 0.12);
//     // every card is fully visible once the grid has resolved
//     return lerp(carouselOpacity, 1, gp);
//   });

//   return (
//     <motion.div
//       style={{
//         x,
//         y,
//         scale,
//         rotateY,
//         zIndex,
//         opacity,
//         transformStyle: "preserve-3d",
//       }}
//       className="absolute w-[280px] sm:w-[380px] md:w-[440px] flex flex-col items-center pointer-events-none will-change-transform transition-shadow duration-300"
//     >
//       <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-zinc-900/90 shadow-2xl group">
//         {project.image ? (
//           <img
//             src={project.image}
//             alt={project.name}
//             className="w-full h-full object-cover filter brightness-90 contrast-105"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-fuchsia-950/40 flex items-center justify-center">
//             <span className="font-extrabold text-6xl text-fuchsia-400/30">
//               {project.name[0]}
//             </span>
//           </div>
//         )}

//         <div className="absolute inset-0 border border-fuchsia-400/20 rounded-2xl pointer-events-none" />
//         <div className="absolute top-3 left-3 text-[10px] font-bold text-fuchsia-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-fuchsia-400/30">
//           {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
//         </div>
//       </div>

//       <div className="mt-4 text-center space-y-1 max-w-full px-2">
//         <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase truncate">
//           {project.name}
//         </h3>
//         <p className="text-xs text-gray-400 line-clamp-1 font-sans">
//           {project.description}
//         </p>
//       </div>
//     </motion.div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { DEMO_PROJECTS, ProjectFromAPI } from "@/data/projects";

interface NextSectionProps {
  progress: MotionValue<number>;
}

// --- TUNABLES ---
// Where in the overall scroll (0-1) the carousel index starts/ends moving
const CAROUSEL_RANGE: [number, number] = [0.5, 0.9];
// Where the cards resolve from carousel positions into the grid
const GRID_RANGE: [number, number] = [0.88, 1.0];
// Grid layout
const GRID_COLS = 3;
const GRID_CELL_W = 300;
const GRID_CELL_H = 260;
const GRID_SCALE = 0.62;
// Active vs inactive size contrast (bigger gap = more dramatic)
const ACTIVE_SCALE = 1.55;
const SCALE_FALLOFF = 0.75;
const MIN_SCALE = 0.28;

export const NextSection = ({ progress }: NextSectionProps) => {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionOpacity = useTransform(progress, [0.42, 0.58], [0, 1]);
  const sectionScale = useTransform(progress, [0.42, 0.65], [0.8, 1]);

  const scrollIndex = useTransform(
    progress,
    CAROUSEL_RANGE,
    [0, Math.max(projects.length - 1, 1)]
  );

  // 0 while carousel is active, ramps to 1 as the user finishes scrolling -
  // this is what drives every card from its 3D position into its grid cell
  const gridProgress = useTransform(progress, GRID_RANGE, [0, 1]);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data)) {
          const clientProjects = data.filter(
            (p: any) => p.projectType === "client" && (p.visibility ?? "public") === "public"
          );
          setProjects(clientProjects.length > 0 ? clientProjects : DEMO_PROJECTS);
        } else {
          setProjects(DEMO_PROJECTS);
        }
      } catch (err) {
        console.error("Failed to fetch projects, using defaults", err);
        setProjects(DEMO_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <motion.section
      style={{ opacity: sectionOpacity, scale: sectionScale }}
      className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between overflow-hidden bg-zinc-950 p-6 sm:p-12 origin-center will-change-transform font-mono select-none"
    >
      {/* HUD Header */}
      <div className="relative z-30 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
          <span className="text-xs text-fuchsia-400 tracking-widest uppercase font-bold">
            [ 02 // SELECTED CLIENT WORKS ]
          </span>
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">
          3D SPATIAL NAVIGATION
        </div>
      </div>

      {/* 3D World Canvas Container */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto perspective-[1200px] overflow-hidden">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Initializing 3D Space...
            </span>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl h-[420px] sm:h-[520px] flex items-center justify-center transform-style-3d">
            {projects.map((project, idx) => (
              <Project3DCard
                key={project.id ?? idx}
                project={project}
                index={idx}
                scrollIndex={scrollIndex}
                gridProgress={gridProgress}
                total={projects.length}
              />
            ))}
          </div>
        )}
      </div>

      {/* HUD Footer Status */}
      <div className="relative z-30 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-500">
        <span>CLIENT PORTFOLIO</span>
        <span className="text-fuchsia-400 font-bold tracking-widest">
          SCROLL TO TRAVERSE →
        </span>
      </div>
    </motion.section>
  );
};

interface CardProps {
  project: ProjectFromAPI;
  index: number;
  scrollIndex: MotionValue<number>;
  gridProgress: MotionValue<number>;
  total: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Project3DCard({ project, index, scrollIndex, gridProgress, total }: CardProps) {
  // Target grid cell for this card, in index order (0 = top-left, reading
  // left-to-right, top-to-bottom)
  const cols = Math.min(GRID_COLS, total);
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const gridX = (col - (cols - 1) / 2) * GRID_CELL_W;
  const gridY = (row - (rows - 1) / 2) * GRID_CELL_H;

  // --- Carousel-phase values (unchanged logic, steeper scale curve) ---
  const x = useTransform([scrollIndex, gridProgress], (latest) => {
    const [latestIndex, gp] = latest as number[];
    const offset = index - latestIndex;
    const carouselX = offset * 380;
    return lerp(carouselX, gridX, gp);
  });

  const y = useTransform(gridProgress, (gp) => lerp(0, gridY, gp));

  const scale = useTransform([scrollIndex, gridProgress], (latest) => {
    const [latestIndex, gp] = latest as number[];
    const dist = Math.abs(index - latestIndex);
    const carouselScale = Math.max(ACTIVE_SCALE - dist * SCALE_FALLOFF, MIN_SCALE);
    return lerp(carouselScale, GRID_SCALE, gp);
  });

  const rotateY = useTransform([scrollIndex, gridProgress], (latest) => {
    const [latestIndex, gp] = latest as number[];
    const offset = index - latestIndex;
    const carouselRotateY = Math.min(Math.max(offset * -22, -45), 45);
    return lerp(carouselRotateY, 0, gp);
  });

  const zIndex = useTransform([scrollIndex, gridProgress], (latest) => {
    const [latestIndex, gp] = latest as number[];
    const dist = Math.abs(index - latestIndex);
    const carouselZ = Math.round(100 - dist * 10);
    // once resolved into the grid, stack in reading order
    return Math.round(lerp(carouselZ, 100 - index, gp));
  });

  const opacity = useTransform([scrollIndex, gridProgress], (latest) => {
    const [latestIndex, gp] = latest as number[];
    const dist = Math.abs(index - latestIndex);
    const carouselOpacity = Math.max(1 - dist * 0.5, 0.12);
    // every card is fully visible once the grid has resolved
    return lerp(carouselOpacity, 1, gp);
  });

  // NOTE: adjust these field names to whatever your ProjectFromAPI type
  // actually calls the destination link (e.g. project.slug -> `/projects/${slug}`)
  const projectHref =
    (project as any).url ?? (project as any).link ?? (project as any).href ?? "#";

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateY,
        zIndex,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute w-[280px] sm:w-[380px] md:w-[440px] flex flex-col items-center pointer-events-auto will-change-transform transition-shadow duration-300"
    >
      <a
        href={projectHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full cursor-pointer"
        aria-label={project.name}
      >
        <div className="relative w-full aspect-[4/3]  overflow-hidden border border-white/15 bg-zinc-900/90 shadow-2xl group">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover filter brightness-90 contrast-105 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-fuchsia-950/40 flex items-center justify-center">
              <span className="font-extrabold text-6xl text-fuchsia-400/30">
                {project.name[0]}
              </span>
            </div>
          )}

          <div className="absolute inset-0 border border-fuchsia-400/20 rounded-lg pointer-events-none" />
        </div>

        <div className="mt-4 text-center max-w-full px-2">
          <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase truncate">
            {project.name}
          </h3>
        </div>
      </a>
    </motion.div>
  );
}