import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta, playwrite } from "@/lib/fonts"; 

export function Hero() {
  return (
    <section className={`${Plus_Jakarta.className} mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-32`}>
      <div className="grid gap-12 md:grid-cols-[1fr,auto] md:items-center md:gap-16">
        
        {/* Text Content Area */}
        <div className="max-w-3xl">
          {/* Name using Signature Font */}
          <h1 className={`${playwrite.className} text-6xl leading-none tracking-tight text-black sm:text-7xl md:text-8xl`}>
            Lukwago Joel
          </h1>
          
          {/* Job Title & Location */}
          <p className="mt-6 text-2xl font-medium text-black/80 sm:text-3xl">
            Software Engineer based in Kampala, Uganda.
          </p>

          {/* Bio / Mission Statement */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
            Specializing in building high-performance web applications, scalable backends, 
            and intuitive design systems that drive real business value.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center rounded-full bg-black px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-black/90 hover:shadow-black/10"
            >
              Explore My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-black/10 bg-white px-8 text-base font-semibold text-black transition-colors hover:bg-black/5"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative order-first md:order-last flex justify-center md:justify-end">
          <div className="absolute -inset-6 rounded-full bg-black/[0.02] blur-3xl" />
          
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl md:max-w-xs">
            <Image
              src="/me24.jpg"
              alt="Portrait of Lukwago Joel"
              fill
              quality={95}
              priority
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}