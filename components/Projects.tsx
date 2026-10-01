import Image from "next/image";
import Link from "next/link";
import type { ProjectFromAPI } from "@/data/projects";

export function Projects({ projects }: { projects: ProjectFromAPI[] }) {
  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl px-5 py-20"
    >
      <div className="flex items-end justify-between gap-4">
        <h2
          id="projects-heading"
          className="text-3xl font-semibold tracking-tight text-black"
        >
          Selected work
        </h2>
        <Link
          href="/projects"
          className="text-sm text-black/60 transition-colors hover:text-black"
        >
          All projects
        </Link>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const href =
            (project as any).url ??
            (project as any).link ??
            (project as any).href ??
            "#";

          return (
            <li key={project.id ?? i}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-black/20">
                      {project.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-[17px] font-medium text-black">
                  {project.name}
                </h3>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}