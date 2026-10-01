import type { Metadata } from "next";
import { SOCIAL_LINKS } from "@/data/Navigation";
import { jobTitle } from "@/data/meta";
import { ContactForm } from "@/components/pages/contactContent";

const description =
  "Get in touch for full-stack web development, UI/UX design, and software consulting inquiries.";

export const metadata: Metadata = {
  title: "Contact | Lukwago Joel",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Lukwago Joel",
    description,
    url: "/contact",
  },
};

const email = "me@lukwagojoel.com";
const phone = "+256706754002";
const formattedPhone = "+256 706 754 002";

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Lukwago Joel",
    url: "https://lukwagojoel.com/contact",
    mainEntity: {
      "@type": "Person",
      name: "Lukwago Joel",
      email,
      telephone: phone,
      jobTitle,
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
          Get in touch
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
          Tell me about your project. I'm taking on new web and mobile work.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <dl className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
              <div className="px-4 py-3.5">
                <dt className="text-sm text-black/50">Email</dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${email}`}
                    className="text-[17px] text-black hover:underline"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div className="px-4 py-3.5">
                <dt className="text-sm text-black/50">Phone / WhatsApp</dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${phone}`}
                    className="text-[17px] text-black hover:underline"
                  >
                    {formattedPhone}
                  </a>
                </dd>
              </div>
              <div className="px-4 py-3.5">
                <dt className="text-sm text-black/50">Location</dt>
                <dd className="mt-0.5 text-[17px] text-black">
                  Kampala, Uganda (UTC+3)
                </dd>
              </div>
            </dl>

            <div>
              <h2 className="text-sm font-semibold text-black">Elsewhere</h2>
              <ul className="mt-3 space-y-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/60 transition-colors hover:text-black"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </main>
    </>
  );
}