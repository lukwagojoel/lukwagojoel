
import Link from "next/link";
import { Plus_Jakarta, playwrite } from "@/lib/fonts";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-5">
      <div className="w-full max-w-2xl text-center">
        <p
          className={`${Plus_Jakarta.className} mb-5 text-sm font-medium uppercase tracking-[0.2em] text-black/40`}
        >
          Error 404
        </p>

        <h1
          className={`${playwrite.className} text-[clamp(5rem,18vw,12rem)] font-black leading-[0.8] tracking-tight text-black`}
        >
          404
        </h1>

        <div className="mx-auto mt-10 max-w-md">
          <h2
            className={`${Plus_Jakarta.className} text-2xl font-semibold tracking-tight text-black sm:text-3xl`}
          >
            This page doesn&apos;t exist.
          </h2>

          <p
            className={`${Plus_Jakarta.className} mt-3 text-sm leading-6 text-black/50 sm:text-base`}
          >
            Looks like you took a wrong turn. The page you&apos;re looking for
            may have moved or no longer exists.
          </p>

          <div className="mt-7 flex justify-center">
            <Link
              href="/"
              className={`${Plus_Jakarta.className} inline-flex h-11 items-center rounded-full bg-black px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0`}
            >
              Back to home
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

