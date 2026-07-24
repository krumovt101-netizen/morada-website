import { DICT, t } from "@/content/dictionary";
import type { Locale } from "@/content/site";

export function IntroSection({ locale }: { locale: Locale }) {
  const d = DICT.home.intro;
  return (
    <section id="intro" className="bg-paper">
      <div className="mx-auto grid w-full max-w-[96rem] gap-x-16 gap-y-8 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="t-data text-ink-dim">{t(d.kicker, locale)}</p>
          <h2 className="t-headline mt-4 text-3xl text-ink sm:text-4xl">
            {t(d.title, locale)}
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="t-lede text-xl text-ink">{t(d.p1, locale)}</p>
          <p className="t-body mt-6 text-ink-dim">{t(d.p2, locale)}</p>
        </div>
      </div>
    </section>
  );
}
