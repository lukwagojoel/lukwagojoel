import type { Metadata } from "next";
import { GALLERY_ITEMS } from "@/data/gallery";
import { Gallery } from "@/components/pages/gallery";

const description =
  "A visual showcase of UI designs, creative development experiments, graphics, and technical snapshots.";

export const metadata: Metadata = {
  title: "Gallery | Lukwago Joel",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Lukwago Joel",
    description,
    url: "/gallery",
  },
};

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Lukwago Joel Visual Gallery",
    url: "https://lukwagojoel.com/gallery",
    description: "Visual portfolio and design archives by Lukwago Joel.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-24">
        <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          Gallery
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
          UI designs, experiments, graphics and snapshots.
        </p>

        <div className="mt-12">
          <Gallery items={GALLERY_ITEMS} />
        </div>
      </main>
    </>
  );
}