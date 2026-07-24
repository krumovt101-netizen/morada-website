import { DICT, t } from "@/content/dictionary";
import { SITE, hasContact, type Locale } from "@/content/site";

/**
 * No confirmed channel exists yet, and the section says so instead of
 * inventing one: a made-up phone number makes someone call a stranger.
 * The rows render real values the day site.ts has them; until then each
 * shows its honest pending state.
 */
export function ContactSection({ locale }: { locale: Locale }) {
  const d = DICT.home.contact;
  const rows = [
    { label: t(d.phoneLabel, locale), value: SITE.phone.display },
    { label: t(d.emailLabel, locale), value: SITE.email.general },
    { label: t(d.amiLabel, locale), value: SITE.ami },
  ];
  return (
    <section id="contactos" className="rule bg-paper">
      <div className="mx-auto grid w-full max-w-[96rem] gap-x-16 gap-y-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="t-headline text-3xl text-ink sm:text-4xl">
            {t(d.title, locale)}
          </h2>
          {!hasContact() && (
            <p className="t-body mt-5 max-w-md text-ink-dim">
              {t(d.pending, locale)}
            </p>
          )}
        </div>
        <dl className="self-end">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-6 border-t border-rule py-4"
            >
              <dt className="t-data text-ink-dim">{row.label}</dt>
              <dd
                className={`t-numeral text-sm ${row.value ? "text-ink" : "text-ink-dim"}`}
              >
                {row.value ??
                  (row.label === t(d.amiLabel, locale)
                    ? t(d.amiPending, locale)
                    : t(d.pendingValue, locale))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
