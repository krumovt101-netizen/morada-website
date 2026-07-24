import ScrollSequence from "../ScrollSequence";
import { ExampleStamp } from "../ExampleStamp";
import { DICT, t } from "@/content/dictionary";
import { sequence } from "@/content/media";
import type { Locale } from "@/content/site";

/**
 * The opening shot: the site starts INSIDE the film. A drone descent over
 * Lisbon rooftops down to the building's door, scrubbed by scroll, with the
 * title over it. Ink type over bright footage gets a soft light halo plus a
 * paper scrim rising from the bottom third; edgeFade="out" because a hero
 * must never wake up covered.
 */
export function FilmHero({ locale }: { locale: Locale }) {
  const d = DICT.home.hero;
  const seq = sequence("descida");

  const overlay = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/15 to-transparent"
      />
      <div className="relative flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[96rem] px-5 pb-12 sm:px-8 sm:pb-16">
          <p className="t-data text-ink-dim">{t(d.kicker, locale)}</p>
          <h1 className="t-display mt-5 text-[clamp(3rem,10vw,10rem)] text-ink [text-shadow:0_1px_40px_rgba(245,241,233,0.6)]">
            <span className="block">{t(d.l1, locale)}</span>
            <span className="block sm:pl-[8vw]">{t(d.l2, locale)}</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <p className="t-lede max-w-md text-lg text-ink">
              {t(d.body, locale)}
            </p>
            <p className="t-data text-ink-dim" aria-hidden="true">
              {t(d.scrollCue, locale)} ↓
            </p>
          </div>
        </div>
      </div>
      {seq?.stock && (
        <span className="absolute right-5 top-20 z-10 sm:right-8">
          <ExampleStamp locale={locale} kind="synthetic" />
        </span>
      )}
    </>
  );

  if (!seq || seq.frameCount === 0) {
    return (
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper-2">
        {overlay}
      </section>
    );
  }

  return (
    <section className="relative bg-paper">
      <ScrollSequence
        base={seq.base}
        frameCount={seq.frameCount}
        scrollLength={seq.scrollLength}
        priority
        edgeFade="out"
        posterAlt={`${t(seq.alt, locale)}. ${t(DICT.common.syntheticAlt, locale)}`}
      >
        {overlay}
      </ScrollSequence>
    </section>
  );
}
