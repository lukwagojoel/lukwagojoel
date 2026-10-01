import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT_DATA } from "@/data/bio";
import { SOCIAL_LINKS } from "@/data/Navigation";
import { jobTitle } from "@/data/meta";

const description =
  "Learn more about Lukwago Joel, a full-stack & web application engineer specializing in high-performance web applications and design systems.";

export const metadata: Metadata = {
  title: "About | Lukwago Joel",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Lukwago Joel",
    description,
    url: "/about",
  },
};

function Value({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return <span>{value.join(", ")}</span>;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
      >
        {value.replace(/^https?:\/\/(www\.)?/, "")}
      </a>
    );
  }

  return <span>{value}</span>;
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Lukwago Joel",
    url: "https://lukwagojoel.com/about",
    mainEntity: {
      "@type": "Person",
      name: "Lukwago Joel",
      jobTitle,
      url: "https://lukwagojoel.com",
      sameAs: SOCIAL_LINKS.map((s) => s.href),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-24">
        <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          About
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
          Engineering practical software systems, modern web platforms, and AI
          tools that solve real-world problems.
        </p>

        <div className="mt-12 lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
          <aside className="mb-10 lg:order-2 lg:mb-0">
            <div className="overflow-hidden rounded-3xl border border-black/10">
              <div className="relative aspect-[4/5] w-full bg-black/5">
                <Image
                  src="/me25.jpg"
                  alt="Portrait of Lukwago Joel"
                  fill
                  quality={90}
                  priority
                  sizes="(min-width: 1024px) 280px, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-5">
                <p className="text-[17px] font-semibold text-black">
                  Lukwago Joel
                </p>
                <p className="text-sm text-black/50">
                  Software Engineer &amp; Entrepreneur
                </p>
                <dl className="mt-4 space-y-2 border-t border-black/10 pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/50">Based in</dt>
                    <dd className="text-right text-black">Kampala, Uganda</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/50">Focus</dt>
                    <dd className="text-right text-black">
                      Web &amp; mobile engineering
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          <div className="lg:order-1">
            <nav aria-label="On this page" className="flex flex-wrap gap-2">
              {ABOUT_DATA.map((block) => (
                <a
                  key={block.section}
                  href={`#${block.section}`}
                  className="inline-flex h-9 items-center rounded-full bg-black/5 px-4 text-sm font-medium text-black/70 transition-colors hover:bg-black/10"
                >
                  {block.title}
                </a>
              ))}
            </nav>

            <div className="mt-6">
              {ABOUT_DATA.map((block) => (
                <section
                  key={block.section}
                  id={block.section}
                  className="scroll-mt-20 border-b border-black/10 py-8 last:border-b-0"
                >
                  <h2 className="text-2xl font-semibold tracking-tight text-black">
                    {block.title}
                  </h2>

                  <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {block.items.map((item, i) => (
                      <div
                        key={i}
                        className={
                          typeof item.value === "string" && item.value.length > 60
                            ? "sm:col-span-2"
                            : ""
                        }
                      >
                        <dt className="text-sm text-black/50">{item.label}</dt>
                        <dd className="mt-1 text-[16px] leading-relaxed text-black">
                          <Value value={item.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}