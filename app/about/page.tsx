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
        className="break-all underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 sm:px-5 sm:pb-24 sm:pt-16 lg:pt-24">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
            About
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60 sm:mt-5 sm:text-lg">
            Engineering practical software systems, modern web platforms, and
            AI tools that solve real-world problems.
          </p>
        </header>

        {/* Main Layout */}
        <div className="mt-10 flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          
          {/* Profile Card */}
          <aside className="order-first lg:order-last">
            <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:max-w-[360px] lg:max-w-[280px]">
              
              {/* Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
                <Image
                  src="/me25.jpg"
                  alt="Portrait of Lukwago Joel"
                  fill
                  quality={90}
                  priority
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 360px, 100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Profile Information */}
              <div className="p-4 sm:p-5">
                <p className="text-base font-semibold text-black sm:text-[17px]">
                  Lukwago Joel
                </p>

                <p className="mt-0.5 text-sm text-black/50">
                  Software Engineer &amp; Entrepreneur
                </p>

                <dl className="mt-4 space-y-3 border-t border-black/10 pt-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="shrink-0 text-black/50">Based in</dt>
                    <dd className="text-right text-black">
                      Kampala, Uganda
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <dt className="shrink-0 text-black/50">Focus</dt>
                    <dd className="max-w-[170px] text-right text-black">
                      Web &amp; mobile engineering
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 lg:order-first">
            {/* On This Page */}
            <nav
              aria-label="On this page"
              className="flex flex-wrap gap-2"
            >
              {ABOUT_DATA.map((block) => (
                <a
                  key={block.section}
                  href={`#${block.section}`}
                  className="inline-flex min-h-9 items-center rounded-full bg-black/5 px-3.5 py-2 text-xs font-medium text-black/70 transition-colors hover:bg-black/10 sm:px-4 sm:text-sm"
                >
                  {block.title}
                </a>
              ))}
            </nav>

            {/* Sections */}
            <div className="mt-4 sm:mt-6">
              {ABOUT_DATA.map((block) => (
                <section
                  key={block.section}
                  id={block.section}
                  className="scroll-mt-20 border-b border-black/10 py-7 last:border-b-0 sm:py-8"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                    {block.title}
                  </h2>

                  <dl className="mt-5 grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
                    {block.items.map((item, i) => {
                      const isLong =
                        typeof item.value === "string" &&
                        item.value.length > 60;

                      return (
                        <div
                          key={i}
                          className={`min-w-0 ${
                            isLong ? "sm:col-span-2" : ""
                          }`}
                        >
                          <dt className="text-sm text-black/50">
                            {item.label}
                          </dt>

                          <dd className="mt-1 break-words text-[15px] leading-relaxed text-black sm:text-[16px]">
                            <Value value={item.value} />
                          </dd>
                        </div>
                      );
                    })}
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
