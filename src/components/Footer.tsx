import { DICT, t } from "@/content/dictionary";
import { SITE, type Locale } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const c = DICT.home.contact;
  return (
    <footer className="rule bg-paper">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="t-headline text-lg text-ink">
            {SITE.name} · {SITE.city}
          </p>
          <p className="t-data mt-2 text-ink-dim">
            {t(c.amiLabel, locale)}: {SITE.ami ?? t(c.amiPending, locale)}
          </p>
        </div>
        <p className="t-body max-w-md text-sm text-ink-dim">
          {t(DICT.footer.note, locale)}
        </p>
      </div>
    </footer>
  );
}
