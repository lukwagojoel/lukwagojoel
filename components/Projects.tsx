"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { technicalAssets } from "./assets";

type ProjectFromAPI = {
  id?: string;
  name: string;
  description: string;
  link?: string;
  image?: string;
  stack?: string[];
  projectType?: "personal" | "client";
};

const filters = ["personal", "client", "all"] as const;

export default function Projects() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "personal" | "client">("personal");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // cursor-following preview position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        const publicProjects = (data as any[])
          .filter((p) => (p.visibility ?? "public") === "public")
          .sort((a, b) => {
            const ao = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
            const bo = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
            return ao - bo;
          });
        setProjects(publicProjects);
      } else setProjects([]);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  function renderStack(stack?: string[]) {
    if (!stack || stack.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-3 mt-3">
        {stack.map((key, idx) => {
          const logo = (technicalAssets as any)[key];
          const label =
            key === "reactNative" ? "React Native" : key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <div
              key={idx}
              className="font-mono text-[10px] uppercase tracking-wide text-graphite border border-line px-2 py-1"
              title={label}
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={label} className="w-4 h-4 object-contain" />
              ) : (
                label
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const visible = projects.filter((p) => filter === "all" || p.projectType === filter);
  const activeProject = activeIndex !== null ? visible[activeIndex] : null;

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <section className="w-full px-6 sm:px-10 py-24 sm:py-32 border-t border-line">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-graphite mb-4">
            02 — Selected Work
          </p>
          <h2 className="font-display uppercase text-5xl sm:text-6xl text-bone">Projects</h2>
        </div>
        <div className="flex gap-2">
          {filters.map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilter(t);
                setActiveIndex(null);
              }}
              className={`font-mono text-xs uppercase tracking-wide px-4 py-2 border transition-colors focus-ring ${
                filter === t
                  ? "bg-ember border-ember text-carbon"
                  : "bg-transparent border-line text-graphite hover:border-chrome hover:text-bone"
              }`}
            >
              {t === "client" ? "Client Work" : t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="font-mono text-sm text-graphite">Loading projects…</p>
      ) : visible.length === 0 ? (
        <p className="font-mono text-sm text-graphite">
          Nothing here yet — add projects via /api/projects.
        </p>
      ) : (
        <div className="relative" onMouseMove={handleMouseMove}>
          <ul className="border-t border-line">
            {visible.map((project, index) => (
              <motion.li
                key={project.id ?? index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="group relative border-b border-line"
              >
                <a
                  href={project.link || undefined}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-8 focus-ring ${
                    project.link ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="font-mono text-xs text-graphite w-10 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <motion.h3
                    animate={{ x: activeIndex === index ? 16 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-bone group-hover:text-ember transition-colors flex-1"
                  >
                    {project.name}
                  </motion.h3>

                  <div className="flex-1 max-w-md">
                    <p className="text-graphite text-sm leading-relaxed">
                      {project.description}
                    </p>
                    {renderStack(project.stack)}
                  </div>

                  <span
                    className={`font-mono text-xs uppercase tracking-wide shrink-0 transition-colors ${
                      project.link ? "text-chrome group-hover:text-ember" : "text-graphite/40"
                    }`}
                  >
                    {project.link ? "View →" : ""}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* cursor-following image preview */}
          <AnimatePresence>
            {activeProject?.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  translateX: springX,
                  translateY: springY,
                }}
                className="hidden lg:block fixed top-0 left-0 w-72 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 overflow-hidden border border-ember/50 shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}