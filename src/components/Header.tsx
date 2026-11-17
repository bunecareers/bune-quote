import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo, buttonPrimary } from "./ui";

// `path` is the part after the locale (e.g. "/privacy"), so the language
// switcher keeps the visitor on the same page.
export function Header({ dict, lang, path = "" }: { dict: Dictionary; lang: Locale; path?: string }) {
  const home = `/${lang}`;
  const links = [
    [`${home}#how`, dict.nav.how],
    [`${home}#example`, dict.nav.example],
    [`${home}#pilot`, dict.nav.pilot],
    [`${home}#faq`, dict.nav.faq],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={home} aria-label="Bune Quote" className="flex items-baseline gap-3">
          <Logo />
          <span className="hidden text-xs text-muted lg:inline">{dict.brand.by}</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-line p-0.5 text-xs font-medium" aria-label={dict.nav.language}>
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}${path}`}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded-full px-2.5 py-1 uppercase transition ${
                  l === lang ? "bg-ink text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
          <a href={`${home}#contact`} className={`${buttonPrimary} px-4! py-2! max-sm:hidden!`}>
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
