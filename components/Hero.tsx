import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
            Lukwago Joel
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
            Software engineer in Kampala, Uganda. I build fast, reliable web
            and mobile products.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full bg-black px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-black/15 px-6 text-[15px] font-medium text-black transition-colors hover:bg-black/5"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-black/10 bg-black/5">
          <Image
            src="/me24.jpg"
            alt="Portrait of Lukwago Joel"
            fill
            priority
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}