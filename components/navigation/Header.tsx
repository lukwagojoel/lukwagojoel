import Link from "next/link";
import { NAV_LINKS } from "../../data/Navigation";
import { MobileMenu } from "./Mobile";


export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-black"
        >
          Lukwago Joel
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-black/60 transition-colors hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-8 items-center rounded-full bg-black px-4 text-sm font-medium text-white transition-opacity hover:opacity-80 md:inline-flex"
          >
            Contact
          </Link>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}