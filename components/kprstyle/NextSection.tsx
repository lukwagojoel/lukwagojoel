"use client";

import React, { useEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { DEMO_PROJECTS, ProjectFromAPI } from "@/data/projects";





interface NextSectionProps {
  progress: MotionValue<number>;
}

export const NextSection = ({ progress }: NextSectionProps) => {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(true);

  // Section entry crossfade & scaling
  const sectionOpacity = useTransform(progress, [0.42, 0.58], [0, 1]);
  const sectionScale = useTransform(progress, [0.42, 0.65], [0.8, 1]);

  // Map scroll progress (0.5 to 1.0) to active carousel index range
  const scrollIndex = useTransform(
    progress,
    [0.5, 0.98],
    [0, Math.max(projects.length - 1, 1)]
  );

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Strictly filter for CLIENT work only
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
          <div className="relative w-full max-w-5xl h-[380px] sm:h-[460px] flex items-center justify-center transform-style-3d">
            {projects.map((project, idx) => (
              <Project3DCard
                key={project.id ?? idx}
                project={project}
                index={idx}
                scrollIndex={scrollIndex}
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
  total: number;
}

function Project3DCard({ project, index, scrollIndex, total }: CardProps) {
  // Transform continuous scroll progress into 3D positioning relative to active card
  const x = useTransform(scrollIndex, (latest) => {
    const offset = index - latest;
    return `${offset * 320}px`; // Horizontal separation in 3D
  });

  const scale = useTransform(scrollIndex, (latest) => {
    const dist = Math.abs(index - latest);
    return Math.max(1 - dist * 0.28, 0.55); // Middle card is largest (1.0), neighbors scale down
  });

  const rotateY = useTransform(scrollIndex, (latest) => {
    const offset = index - latest;
    return Math.min(Math.max(offset * -22, -45), 45); // Curved rotation toward camera center
  });

  const zIndex = useTransform(scrollIndex, (latest) => {
    const dist = Math.abs(index - latest);
    return Math.round(100 - dist * 10); // Active item always on top
  });

  const opacity = useTransform(scrollIndex, (latest) => {
    const dist = Math.abs(index - latest);
    return Math.max(1 - dist * 0.45, 0.15); // Fade out distant cards
  });

  return (
    <motion.div
      style={{
        x,
        scale,
        rotateY,
        zIndex,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute w-[280px] sm:w-[380px] md:w-[440px] flex flex-col items-center pointer-events-none will-change-transform transition-shadow duration-300"
    >
      {/* Card Visual Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-zinc-900/90 shadow-2xl group">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-fuchsia-950/40 flex items-center justify-center">
            <span className="font-extrabold text-6xl text-fuchsia-400/30">
              {project.name[0]}
            </span>
          </div>
        )}

        {/* HUD Border Accent */}
        <div className="absolute inset-0 border border-fuchsia-400/20 rounded-2xl pointer-events-none" />
        <div className="absolute top-3 left-3 text-[10px] font-bold text-fuchsia-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-fuchsia-400/30">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* Minimal Project Title & Subtitle */}
      <div className="mt-4 text-center space-y-1 max-w-full px-2">
        <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase truncate">
          {project.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-1 font-sans">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}