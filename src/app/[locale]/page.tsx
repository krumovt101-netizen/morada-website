import { notFound } from "next/navigation";
import { FilmHero } from "@/components/home/FilmHero";
import { FilmBeat } from "@/components/home/FilmBeat";
import { IntroSection } from "@/components/home/IntroSection";
import { ListingsSection } from "@/components/home/ListingsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { DICT, t } from "@/content/dictionary";
import { isLocale, type Locale } from "@/content/site";

/**
 * The homepage IS the film: one continuous journey through a single Lisbon
 * apartment, seven scroll-scrubbed shots chained by shared boundary frames.
 * Content sections sit between shots as tonal rests. Consecutive FilmBeats
 * (porta→sala, quarto→limiar→varanda) read as cross-dissolves through the
 * paper curtain; a FilmBeat with frameCount 0 renders nothing, so the page
 * stays whole while the film is still being generated.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const f = DICT.home.film;

  return (
    <>
      <FilmHero locale={l} />
      <IntroSection locale={l} />
      <FilmBeat
        slot="porta"
        kicker={t(f.porta.kicker, l)}
        line={t(f.porta.line, l)}
        locale={l}
      />
      <FilmBeat
        slot="sala"
        kicker={t(f.sala.kicker, l)}
        line={t(f.sala.line, l)}
        locale={l}
        align="right"
      />
      <ListingsSection locale={l} />
      <FilmBeat
        slot="cozinha"
        kicker={t(f.cozinha.kicker, l)}
        line={t(f.cozinha.line, l)}
        locale={l}
      />
      <ServicesSection locale={l} />
      <FilmBeat
        slot="quarto"
        kicker={t(f.quarto.kicker, l)}
        line={t(f.quarto.line, l)}
        locale={l}
        align="right"
      />
      <FilmBeat
        slot="limiar"
        kicker={t(f.limiar.kicker, l)}
        line={t(f.limiar.line, l)}
        locale={l}
      />
      <FilmBeat
        slot="varanda"
        kicker={t(f.varanda.kicker, l)}
        line={t(f.varanda.line, l)}
        locale={l}
        big
      >
        <a
          href="#contactos"
          className="t-data inline-block bg-azulejo px-6 py-3.5 text-paper transition-colors hover:bg-azulejo-deep"
        >
          {t(f.varanda.cta, l)} →
        </a>
      </FilmBeat>
      <ContactSection locale={l} />
    </>
  );
}
