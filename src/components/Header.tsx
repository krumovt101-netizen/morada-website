import Link from "next/link";
import { DICT, t } from "@/content/dictionary";
import { LOCALES, SITE, type Locale } from "@/content/site";

/**
 * One fixed bar: wordmark, three anchors, the language switch. It sits over
 * the film hero, so it carries its own soft paper veil (blur + tint) instead
 * of trusting the footage to stay bright behind ink text.
 */
export function Header({ locale }: { locale: Locale }) {
  const nav = [
    { href: "#casas", label: t(DICT.nav.homes, locale) },
    { href: "#servicos", label: t(DICT.nav.services, locale) },
    { href: "#contactos", label: t(DICT.nav.contact, locale) },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-rule/60 bg-paper/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between px-5 py-4 sm:px-8">
        <Link href={`/${locale}`} className="t-headline text-xl text-ink">
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-6 sm:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="t-data hidden text-ink-dim transition-colors hover:text-ink sm:inline"
            >
              {item.label}
            </a>
          ))}
          <span className="t-data flex items-center gap-2">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                aria-current={l === locale ? "page" : undefined}
                className={
                  l === locale
                    ? "text-ink underline underline-offset-4"
                    : "text-ink-dim transition-colors hover:text-ink"
                }
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </span>
        </nav>
      </div>
    </header>
  );
}
