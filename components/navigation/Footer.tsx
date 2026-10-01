import { NAV_LINKS, SOCIAL_LINKS } from "@/data/Navigation";
import Link from "next/link";
import { Plus_Jakarta, playwrite } from "@/lib/fonts";

const linkClass = `${Plus_Jakarta.className} text-sm leading-none text-black/60 transition-colors hover:text-black`;

export function Footer() {
  return (
    <footer className={`${Plus_Jakarta.className} border-t border-black/10 bg-white`}>
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className={`${playwrite.className} font-black text-xl leading-none text-black`}>
              Lukwago Joel
            </p>
            <p className="mt-3 text-sm text-black/60">Kampala, Uganda</p>
           
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-black">Pages</h2>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:lukwagojoel@example.com"
                  className={linkClass}
                >
                  Email me
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-black">Elsewhere</h2>
            <ul className="mt-3 space-y-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-black/50">
            © {new Date().getFullYear()} Lukwago Joel. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-xs text-black/50 transition-colors hover:text-black"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}