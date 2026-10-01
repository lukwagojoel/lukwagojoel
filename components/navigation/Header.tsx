import Link from "next/link";
import { NAV_LINKS } from "../../data/Navigation";
import { MobileMenu } from "./Mobile";
import { Plus_Jakarta, playwrite } from "@/lib/fonts";

const linkClass = `${Plus_Jakarta.className}  text-sm leading-none text-black/60 transition-colors hover:text-black`;

export function Header() {
  const mid = Math.ceil(NAV_LINKS.length / 2);
  const leftLinks = NAV_LINKS.slice(0, mid);
  const rightLinks = NAV_LINKS.slice(mid);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Left links (desktop) */}
        <nav aria-label="Primary" className="hidden md:block">
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

        {/* Name: left on mobile, centred on desktop */}
        <Link
          href="/"
          className={`${playwrite.className} text-2xl leading-none text-black md:text-center font-black`}
        >
          Lukwago Joel
        </Link>

        {/* Right links + contact (desktop), menu button (mobile) */}
        <div className="flex items-center justify-end gap-6">
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
            className={`${Plus_Jakarta.className} hidden h-8 items-center rounded-full bg-black px-4 text-lg leading-none text-white transition-opacity hover:opacity-80 md:inline-flex`}
          >
            Contact
          </Link>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}