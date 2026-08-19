import { ScrambleText } from "@/components/kprstyle/Effects/scrumble";
import { ContactForm } from "@/components/pages/contactContent";
import React from "react";
import { FiTerminal } from "react-icons/fi";
import type { Metadata } from "next";
import { jobTitle } from "@/data/meta";

export const metadata: Metadata = {
  // If your layout.tsx has a title template (e.g., template: "%s | Lukwago Joel"), 
  // you only need to write "Contact" here.
  title: "Contact | Lukwago Joel", 
  description: "Get in touch for full-stack web development, UI/UX design, and software consulting inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Lukwago Joel",
    description: "Get in touch for full-stack web development, UI/UX design, and software consulting inquiries.",
    url: "/contact",
    // Only include images here if you have a specific banner for the contact page, 
    // otherwise it inherits the default from layout.tsx
  },
};

export default function ContactPage() {
  const email = "me@lukwagojoel.com";
  const phone = "+256706754002";
  const formattedPhone = "+256 706 754 002";

  // Retaining JSON-LD is highly recommended here, as it tells search engines 
  // exactly what this specific page is for (Contact Information).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Lukwago Joel",
    url: "https://lukwagojoel.com/contact",
    mainEntity: {
      "@type": "Person",
      name: "Lukwago Joel",
      email: email,
      telephone: phone,
      jobTitle: jobTitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-screen w-full bg-black text-white font-mono overflow-hidden pt-28 pb-20 px-6 sm:px-12 selection:bg-fuchsia-400 selection:text-black">
        {/* Background Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-15">
          <div className="absolute top-0 bottom-0 left-6 sm:left-12 border-r border-white/20" />
          <div className="absolute top-0 bottom-0 right-6 sm:right-12 border-r border-white/20" />
          <div className="absolute top-1/3 left-0 right-0 border-b border-white/20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="space-y-4 pb-12 border-b border-white/10">
            <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold tracking-widest uppercase">
              <FiTerminal className="animate-pulse" />
              <span>[ 02 // INTERESTED ]</span>
            </div>
            <ScrambleText className="text-6xl md:text-8xl font-bold" text="GET IN TOUCH" />
          </div>

          {/* Client-Side Interactive Form */}
          <ContactForm
            email={email}
            phone={phone}
            formattedPhone={formattedPhone}
          />
        </div>
      </section>
    </>
  );
}