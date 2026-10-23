import type { Metadata } from "next";
import Link from "next/link";
import {
  getPublicProjects,
  categoryLabel,
  platformLabel,
} from "@/data/projectdata";
import { ProjectLogo } from "@/components/project-logo";
import { jobTitle } from "@/data/meta";

const SITE = "https://lukwagojoel.com";

const description =
  "Explore selected full-stack web applications, custom software engineering solutions, UI/UX systems, and open-source software built by Lukwago Joel.";

export const metadata: Metadata = {
  title: "Projects | Lukwago Joel",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Lukwago Joel",
    description,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getPublicProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lukwago Joel Software Projects",
    url: `${SITE}/projects`,
    description:
      "A showcase of web applications, mobile platforms, and software engineering projects created by Lukwago Joel.",
    author: { "@type": "Person", name: "Lukwago Joel", jobTitle },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE}/projects/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen w-full bg-white px-4 pb-20 pt-12 text-black sm:px-5 sm:pb-24 sm:pt-16 lg:pt-24">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Projects
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60 sm:mt-5 sm:text-lg">
              Web and mobile products I&apos;ve built for clients and for
              myself.
            </p>
          </header>

          {/* Projects */}
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id} className="min-w-0">
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.name} project details`}
                  className="group flex h-full flex-col rounded-2xl border border-black/[0.08] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start justify-between">
                    <ProjectLogo
                      size="card"
                      name={project.name}
                      logo={project.logo}
                      className="h-14 w-14"
                    />
                    <span
                      aria-hidden
                      className="text-lg text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                    >
                      ↗
                    </span>
                  </div>

                  <h2 className="mt-4 break-words text-[17px] font-medium leading-snug">
                    {project.name}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-black/60">
                    {project.tagline}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-medium text-white">
                      {categoryLabel[project.category]}
                    </span>
                    {project.platforms.slice(0, 3).map((pl) => (
                      <span
                        key={pl}
                        className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium text-black/60"
                      >
                        {platformLabel[pl]}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {projects.length === 0 && (
            <p className="mt-12 text-black/60">
              No public projects are available right now.
            </p>
          )}
        </div>
      </main>
    </>
  );
}