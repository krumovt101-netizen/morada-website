import { DICT, t } from "@/content/dictionary";
import type { Locale } from "@/content/site";

export function ServicesSection({ locale }: { locale: Locale }) {
  const d = DICT.home.services;
  return (
    <section id="servicos" className="rule bg-paper-2">
      <div className="mx-auto w-full max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="t-headline text-3xl text-ink sm:text-4xl">
          {t(d.title, locale)}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {d.steps.map((step, i) => (
            <li key={i} className="border-t border-rule-strong pt-5">
              <p className="t-numeral text-sm text-azulejo-deep">
                0{i + 1}
              </p>
              <h3 className="t-headline mt-3 text-xl text-ink">
                {t(step.title, locale)}
              </h3>
              <p className="t-body mt-3 text-sm text-ink-dim">
                {t(step.body, locale)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
