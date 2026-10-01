import { MerchNotify } from "@/components/pages/merchContent";
import type { Metadata } from "next";
import Image from "next/image";


const description =
  "Official developer apparel, custom tech accessories, and limited edition drops by Lukwago Joel.";

export const metadata: Metadata = {
  title: "Merch | Lukwago Joel",
  description,
  alternates: { canonical: "/merch" },
  openGraph: {
    title: "Merch | Lukwago Joel",
    description,
    url: "/merch",
  },
};

interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

// Placeholder products and images. Swap for the real drop when it's ready.
const MERCH_ITEMS: MerchItem[] = [
  { id: "m1", name: "Bytecode Tee", price: "$32", category: "Apparel", image: "https://picsum.photos/seed/joel-merch-1/1600/2133" },
  { id: "m2", name: "Terminal Hoodie", price: "$68", category: "Apparel", image: "https://picsum.photos/seed/joel-merch-2/1600/2133" },
];

export default function MerchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lukwago Joel Merch Store",
    url: "https://lukwagojoel.com/merch",
    description: "Official apparel and tech accessories collection.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-24">
        <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          Merch
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
          Developer apparel and accessories. The first drop is coming soon.
        </p>

        <section
          aria-labelledby="notify-heading"
          className="mt-12 flex flex-col gap-5 rounded-2xl border border-black/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h2
              id="notify-heading"
              className="text-xl font-semibold tracking-tight text-black"
            >
              Get notified
            </h2>
            <p className="mt-1 text-black/60">
              Be the first to know when the drop goes live.
            </p>
          </div>
          <MerchNotify/>
        </section>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {MERCH_ITEMS.map((item) => (
            <li key={item.id}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                <Image
                  src={item.image}
                  alt={`${item.name} (${item.category})`}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-medium text-black">
                    {item.name}
                  </h3>
                  <p className="text-sm text-black/50">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] text-black">{item.price}</p>
                  <p className="text-xs text-black/50">Coming soon</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}