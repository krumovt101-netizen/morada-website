import { ExampleStamp } from "../ExampleStamp";
import { DICT, t } from "@/content/dictionary";
import { LISTINGS, formatPrice } from "@/content/listings";
import type { Locale } from "@/content/site";

/**
 * The books. While every entry is `example: true` the cards are stamped and
 * deliberately not links: there is nothing real to click through to yet.
 */
export function ListingsSection({ locale }: { locale: Locale }) {
  const d = DICT.home.listings;
  return (
    <section id="casas" className="rule bg-paper">
      <div className="mx-auto w-full max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="t-headline text-3xl text-ink sm:text-4xl">
            {t(d.title, locale)}
          </h2>
          <p className="t-body max-w-sm text-sm text-ink-dim">
            {t(d.exampleNote, locale)}
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {LISTINGS.map((home) => (
            <li
              key={home.id}
              className="relative border border-rule bg-paper-2 p-6 sm:p-7"
            >
              {home.example && (
                <ExampleStamp
                  locale={locale}
                  className="absolute right-4 top-4"
                />
              )}
              <p className="t-data text-ink-dim">{home.typology}</p>
              <h3 className="t-headline mt-3 text-2xl text-ink">
                {home.neighbourhood}
              </h3>
              <p className="t-body mt-3 text-sm text-ink-dim">
                {t(home.blurb, locale)}
              </p>
              <p className="t-numeral mt-6 flex items-baseline justify-between border-t border-rule pt-4 text-ink">
                <span className="text-sm text-ink-dim">{home.areaM2} m²</span>
                <span className="text-lg">{formatPrice(home.price)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
