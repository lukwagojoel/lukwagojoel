import Link from "next/link";
import { NAV_LINKS } from "../../data/Navigation";
import { MobileMenu } from "./Mobile";
import { Plus_Jakarta, playwrite } from "@/lib/fonts";

const linkClass = `${Plus_Jakarta.className} text-sm leading-none text-black/60 transition-colors hover:text-black`;

export function Header() {
  const mid = Math.ceil(NAV_LINKS.length / 2);
  const leftLinks = NAV_LINKS.slice(0, mid);
  const rightLinks = NAV_LINKS.slice(mid);

  return (
    <header className="sticky top-0 z-40 w-full overflow-x-clip border-b border-black/10 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid h-14 w-full max-w-5xl grid-cols-[1fr_auto] items-center px-4 sm:px-5 md:grid-cols-[1fr_auto_1fr]">
        {/* Left links */}
        <nav aria-label="Primary" className="hidden md:block min-w-0">
          <ul className="flex items-center justify-start gap-6">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Name */}
        <Link
          href="/"
          className={`${playwrite.className} py-4 min-w-0 truncate text-xl font-black leading-none text-black sm:text-2xl md:text-center`}
        >
          Lukwago Joel
        </Link>

        {/* Right links + mobile menu */}
        <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-6 md:gap-6">
          <nav aria-label="Secondary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {rightLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact"
            className={`${Plus_Jakarta.className} hidden h-8 items-center rounded-full border border-black/10 bg-black px-4 text-sm leading-none text-white transition-opacity hover:opacity-80 md:inline-flex`}
          >
            Contact
          </Link>

          <div className="shrink-0 md:hidden">
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}