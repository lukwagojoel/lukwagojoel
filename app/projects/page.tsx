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

/**
 * Social share image. The Pexels params crop it to the 1200x630 size
 * that WhatsApp, LinkedIn, Facebook and X expect.
 * For best reliability, download it into /public/og/projects.jpg and
 * use "/og/projects.jpg" here instead.
 */
const SOCIAL_IMAGE =
  "https://images.pexels.com/photos/18833779/pexels-photo-18833779.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630";

const SOCIAL_IMAGE_ALT = "Software projects by Lukwago Joel";

const title = "Projects | Lukwago Joel";

const description =
  "Explore selected full-stack web applications, custom software engineering solutions, UI/UX systems, and open-source software built by Lukwago Joel.";

const socialTitle = "Projects by Lukwago Joel: Web & Mobile Apps";

const socialDescription =
  "Mobile apps on Google Play, web platforms and websites built with React, React Native, Next.js and Node.js by Lukwago Joel, software engineer in Kampala, Uganda.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Lukwago Joel",
  keywords: [
    "Lukwago Joel",
    "Lukwago Joel projects",
    "software engineer Uganda",
    "software developer Kampala",
    "React Native developer",
    "Next.js developer",
    "React developer Uganda",
    "mobile app developer Uganda",
    "full-stack developer",
    "web developer Kampala",
    "Microsolvant",
    "Imani Veterinary Solutions",
    "Muzugu",
    "Holy Battlefront",
    "portfolio",
  ],
  authors: [{ name: "Lukwago Joel", url: SITE }],
  creator: "Lukwago Joel",
  publisher: "Lukwago Joel",
  category: "technology",
  alternates: { canonical: "/projects" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: "Lukwago Joel",
    locale: "en_UG",
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [{ url: SOCIAL_IMAGE, alt: SOCIAL_IMAGE_ALT }],
  },
};

export default function ProjectsPage() {
  const projects = getPublicProjects();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE}/projects#page`,
      name: "Lukwago Joel Software Projects",
      url: `${SITE}/projects`,
      description:
        "A showcase of web applications, mobile platforms, and software engineering projects created by Lukwago Joel.",
      inLanguage: "en",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
      },
      isPartOf: { "@type": "WebSite", name: "Lukwago Joel", url: SITE },
      author: {
        "@type": "Person",
        name: "Lukwago Joel",
        url: SITE,
        jobTitle,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE}/projects/${p.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE}/projects`,
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

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