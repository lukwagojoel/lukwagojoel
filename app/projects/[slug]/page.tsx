import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublicProjects,
  getProjectBySlug,
  getAdjacentProjects,
  categoryLabel,
  platformLabel,
  linkKindLabel,
  type Project,
} from "@/data/projectdata";
import { ProjectLogo } from "@/components/project-logo";
import { jobTitle } from "@/data/meta";

const SITE = "https://lukwagojoel.com";

/** Store badge images. Change these paths if you saved them elsewhere in /public */
const BADGES = {
  playStore: "/assets/playstore.png",
  appStore: "/assets/apple.png",
  appStoreSoon: "/assets/apple.jpg",
};

type Props = { params: Promise<{ slug: string }> };

// Only slugs from the array exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicProjects().map((p) => ({ slug: p.slug }));
}

const clip = (text: string, max = 158) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

const hostOf = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const pageUrl = (p: Project) => `${SITE}/projects/${p.slug}`;

const shareImage = (p: Project) => p.images?.[0] ?? p.logo;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.name}: ${project.tagline}`;
  const description = clip(`${project.tagline}. ${project.description}`);
  const img = shareImage(project);

  return {
    title: `${project.name} | Projects | Lukwago Joel`,
    description,
    keywords: [
      project.name,
      categoryLabel[project.category],
      ...project.stack,
      "Lukwago Joel",
      "Uganda",
    ],
    authors: [{ name: "Lukwago Joel", url: SITE }],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${project.slug}`,
      siteName: "Lukwago Joel",
      images: img ? [{ url: img, alt: project.name }] : undefined,
    },
    twitter: {
      card: project.images?.length ? "summary_large_image" : "summary",
      title,
      description,
      images: img ? [img] : undefined,
    },
  };
}

function buildJsonLd(project: Project) {
  const author = { "@type": "Person", name: "Lukwago Joel", url: SITE, jobTitle };
  const play = project.links.find((l) => l.kind === "play-store");
  const github = project.links.find((l) => l.kind === "github");
  const img = shareImage(project);

  const base = {
    "@context": "https://schema.org",
    name: project.name,
    description: project.description,
    url: project.url ?? pageUrl(project),
    mainEntityOfPage: pageUrl(project),
    image: img ? `${SITE}${img}` : undefined,
    author,
    keywords: project.stack.join(", "),
    sameAs: project.links.map((l) => l.url),
  };

  const main =
    project.category === "mobile-app"
      ? {
          ...base,
          "@type": "MobileApplication",
          operatingSystem: project.platforms.includes("android") ? "Android" : "Any",
          applicationCategory: "BusinessApplication",
          ...(project.images?.length
            ? { screenshot: project.images.map((s) => `${SITE}${s}`) }
            : {}),
          ...(play ? { installUrl: play.url, downloadUrl: play.url } : {}),
        }
      : project.category === "ai-ml"
        ? {
            ...base,
            "@type": "SoftwareSourceCode",
            programmingLanguage: project.stack.filter((s) =>
              ["Python", "TypeScript", "JavaScript"].includes(s)
            ),
            ...(github ? { codeRepository: github.url } : {}),
          }
        : { ...base, "@type": "WebSite" };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: pageUrl(project) },
    ],
  };

  return [main, breadcrumbs];
}

/** A single store badge image (height fixed, width follows the image) */
function Badge({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="180px"
      quality={100}
      className="h-12 w-auto sm:h-14"
    />
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  // Split store links (shown as badges) from everything else
  const playLink = project.links.find((l) => l.kind === "play-store");
  const appleLink = project.links.find((l) => l.kind === "app-store");
  const otherLinks = project.links.filter(
    (l) => l.kind !== "play-store" && l.kind !== "app-store"
  );

  const isApp = project.category === "mobile-app";
  // Mobile apps without an iOS link show the "coming soon" badge
  const showAppleSoon = isApp && !appleLink;
  const hasBadges = Boolean(playLink || appleLink || showAppleSoon);

  return (
    <>
      {buildJsonLd(project).map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <main className="min-h-screen w-full bg-white px-4 pb-20 pt-12 text-black sm:px-5 sm:pb-24 sm:pt-16 lg:pt-24">
        <article className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-black/50">
            <Link href="/projects" className="transition-colors hover:text-black">
              Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black/80">{project.name}</span>
          </nav>

          {/* Header: text on the left, big logo on the far right */}
          <header className="mt-8 flex items-start justify-between gap-5 sm:gap-8">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium uppercase tracking-wider text-black/50">
                {categoryLabel[project.category]}
              </p>

              <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-5xl">
                {project.name}
              </h1>

              <p className="mt-3 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
                {project.tagline}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  Visit {hostOf(project.url)} ↗
                </a>
              )}
            </div>

            <ProjectLogo
              size="detail"
              name={project.name}
              logo={project.logo}
            />
          </header>

          {/* Overview + facts */}
          <div className="mt-12 grid gap-10 border-t border-black/[0.08] pt-10 md:grid-cols-[1fr_16rem]">
            <section aria-labelledby="overview">
              <h2 id="overview" className="text-xl font-semibold">
                Overview
              </h2>
              <p className="mt-3 leading-relaxed text-black/70">
                {project.description}
              </p>
            </section>

            <aside aria-label="Project details">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-black/50">My role</dt>
                  <dd className="mt-1 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-black/50">Type</dt>
                  <dd className="mt-1 font-medium">
                    {project.projectType === "client"
                      ? "Client work"
                      : "Personal project"}
                  </dd>
                </div>
                <div>
                  <dt className="text-black/50">Available on</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.platforms.map((pl) => (
                      <span
                        key={pl}
                        className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium"
                      >
                        {platformLabel[pl]}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* Get the app (store badges) */}
          {hasBadges && (
            <section aria-labelledby="get-app" className="mt-12">
              <h2 id="get-app" className="text-xl font-semibold">
                Get the app
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                {playLink && (
                  <a
                    href={playLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${project.name} on Google Play`}
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Badge
                      src={BADGES.playStore}
                      alt={`Get ${project.name} on Google Play`}
                    />
                  </a>
                )}

                {appleLink && (
                  <a
                    href={appleLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${project.name} on the App Store`}
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Badge
                      src={BADGES.appStore}
                      alt={`Download ${project.name} on the App Store`}
                    />
                  </a>
                )}

                {showAppleSoon && (
                  <span title="iOS version coming soon">
                    <Badge
                      src={BADGES.appStoreSoon}
                      alt={`${project.name} for iOS is coming soon to the App Store`}
                    />
                  </span>
                )}
              </div>
            </section>
          )}

          {/* Screenshots (compact, scrollable) */}
          {project.images && project.images.length > 0 && (
            <section aria-labelledby="screens" className="mt-12">
              <h2 id="screens" className="text-xl font-semibold">
                Screenshots
              </h2>
              <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {project.images.map((src, i) => (
                  <li key={src} className="shrink-0 snap-start">
                    <Image
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      width={0}
                      height={0}
                      sizes="(min-width: 640px) 320px, 70vw"
                      quality={90}
                      className="h-64 w-auto rounded-xl border border-black/[0.08] bg-black/[0.025] sm:h-72"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Other links (website, web dashboard, source code) */}
          {otherLinks.length > 0 && (
            <section aria-labelledby="links" className="mt-12">
              <h2 id="links" className="text-xl font-semibold">
                Find it online
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {otherLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-black/[0.08] px-4 py-3 transition-colors hover:border-black/30"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs text-black/50">
                          {linkKindLabel[link.kind]}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {link.label}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="ml-3 text-black/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Stack */}
          <section aria-labelledby="stack" className="mt-12">
            <h2 id="stack" className="text-xl font-semibold">
              Tech stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-black/[0.04] px-3 py-1.5 text-sm text-black/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Prev / Next */}
          <nav
            aria-label="More projects"
            className="mt-16 grid gap-4 border-t border-black/[0.08] pt-8 sm:grid-cols-2"
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group">
                <span className="text-xs text-black/50">← Previous</span>
                <span className="mt-1 block font-medium group-hover:underline">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group sm:text-right"
              >
                <span className="text-xs text-black/50">Next →</span>
                <span className="mt-1 block font-medium group-hover:underline">
                  {next.name}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </main>
    </>
  );
}