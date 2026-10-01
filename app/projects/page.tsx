import type { Metadata } from "next";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { type ProjectFromAPI } from "@/data/projects";
import { jobTitle } from "@/data/meta";
import { db } from "@/lib/firebase";

export const revalidate = 3600;

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

async function loadProjects(): Promise<ProjectFromAPI[]> {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs
    .map((projectDoc) => ({ ...projectDoc.data(), id: projectDoc.id }) as ProjectFromAPI)
    .filter((project) => (project.visibility ?? "public") === "public")
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}

const hrefOf = (p: ProjectFromAPI): string | undefined => p.url ?? p.link ?? p.href;

export default async function ProjectsPage() {
  const projects = await loadProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lukwago Joel Software Projects",
    url: "https://lukwagojoel.com/projects",
    description:
      "A showcase of web applications, mobile platforms, and software engineering projects created by Lukwago Joel.",
    author: {
      "@type": "Person",
      name: "Lukwago Joel",
      jobTitle,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        ...(hrefOf(p)?.startsWith("http") ? { url: hrefOf(p) } : {}),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen w-full bg-white px-5 pb-24 pt-16 text-black sm:pt-24">
        <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          Projects
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
          Web and mobile products I&apos;ve built for clients and for myself.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const href = hrefOf(project);
            const summary = project.description;

            const card = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-white">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-black/20">
                      {project.name[0]}
                    </div>
                  )}
                </div>
                <h2 className="mt-3 break-words text-[17px] font-medium text-black">
                  {project.name}
                </h2>
                {summary && (
                  <p title={summary} className="mt-1 truncate text-sm leading-relaxed text-black/60">
                    {summary}
                  </p>
                )}
              </>
            );

            return (
              <li key={project.id ?? i} className="min-w-0">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {card}
                  </a>
                ) : (
                  <div className="group">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
        {projects.length === 0 && (
          <p className="mt-12 text-black/60">No public projects are available right now.</p>
        )}
        </div>
      </main>
    </>
  );
}