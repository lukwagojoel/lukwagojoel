"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type ProjectFromAPI = {
  id?: string;
  name: string;
  description: string;
  link?: string;
  image?: string;
  stack?: string[];
  projectType?: "personal" | "client";
};

const filters = ["client", "personal", "all"] as const;

export default function Projects() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "personal" | "client">("client");

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        const pub = (data as any[])
          .filter((p) => (p.visibility ?? "public") === "public")
          .sort((a, b) => {
            if (a.projectType !== b.projectType) return a.projectType === "client" ? -1 : 1;
            const ao = typeof a.order === "number" ? a.order : Infinity;
            const bo = typeof b.order === "number" ? b.order : Infinity;
            return ao - bo;
          });
        setProjects(pub);
      } else setProjects([]);
    } catch (err) { console.error(err); setProjects([]); }
    finally { setLoading(false); }
  }

  const visible = projects.filter((p) => filter === "all" || p.projectType === filter);

  return (
    <section className="w-full border-t border-line py-24 sm:py-32">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-graphite mb-4">
            02 — Selected Work
          </p>
          <h2 className="font-display uppercase text-5xl sm:text-6xl text-bone">Projects</h2>
        </div>

        {/* Segmented filter */}
        <div className="flex bg-white/[0.06] border border-white/10 rounded-full p-1 gap-1 self-start sm:self-auto backdrop-blur-sm">
          {filters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`relative font-mono text-[11px] uppercase tracking-wide px-4 py-1.5 rounded-full transition-colors ${
                filter === t ? "text-carbon" : "text-graphite hover:text-bone"
              }`}
            >
              {filter === t && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-ember rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {t === "client" ? "Client" : t === "personal" ? "Personal" : "All"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 max-w-5xl mx-auto px-6 sm:px-10">
          <div className="w-4 h-4 border-2 border-ember border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-sm text-graphite">Loading…</p>
        </div>
      )}

      {!loading && visible.length === 0 && (
        <p className="font-mono text-sm text-graphite max-w-5xl mx-auto px-6 sm:px-10">
          Nothing here yet.
        </p>
      )}

      {/* Project slides */}
      {!loading && (
        <div className="space-y-0">
          {visible.map((project, index) => (
            <ProjectSlide key={project.id ?? index} project={project} index={index} total={visible.length} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectSlide({ project, index, total }: {
  project: ProjectFromAPI; index: number; total: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-svh flex items-center justify-center py-16 border-t border-line"
    >
      {/* Centered container */}
      <div
        className="max-w-5xl w-full mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center gap-10 sm:gap-14"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── LEFT: Image ── */}
        <div className="flex-shrink-0 w-full sm:w-[420px] lg:w-[480px]">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.name}
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-carbon to-ember/20 flex items-center justify-center">
                <span className="font-display text-7xl text-ember/40">{project.name[0]}</span>
              </div>
            )}
            {/* Hover ember wash */}
            <motion.div
              animate={{ opacity: hovered ? 0.14 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-ember"
            />
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Counter + badge */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-graphite tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
              project.projectType === "client"
                ? "border-ember/40 text-ember bg-ember/10"
                : "border-white/15 text-graphite bg-white/5"
            }`}>
              {project.projectType === "client" ? "Client work" : "Personal"}
            </span>
          </div>

          {/* Name */}
          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display uppercase text-4xl sm:text-5xl text-bone leading-[0.88]"
          >
            {project.name}
          </motion.h3>

          {/* Divider */}
          <div className="w-10 h-px bg-ember" />

          {/* Description */}
          <p className="font-body text-sm sm:text-base text-graphite leading-relaxed">
            {project.description}
          </p>

          {/* CTA */}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start bg-ember text-carbon font-mono text-[11px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-ember/90 transition-colors mt-2"
            >
              View project
              <motion.span animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
            </a>
          ) : (
            <span className="font-mono text-xs text-graphite/40 uppercase tracking-wide mt-2">Coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}