import type { ReactNode } from "react";
import ScrollSequence from "../ScrollSequence";
import { ExampleStamp } from "../ExampleStamp";
import { DICT, t } from "@/content/dictionary";
import { sequence } from "@/content/media";
import type { Locale } from "@/content/site";

/**
 * One shot of the film: a scroll-scrubbed sequence with a bottom-third
 * caption. Frames only download when the shot comes near (lazy);
 * reduced-motion and small screens get the poster. The paper scrim under
 * the caption is the light inversion of a dark site's vault scrim: ink
 * text needs a calm bright ground, so the gradient rises FROM paper.
 */
export function FilmBeat({
  slot,
  kicker,
  line,
  locale,
  big = false,
  align = "left",
  children,
}: {
  slot: string;
  kicker: string;
  line: string;
  locale: Locale;
  /** The closing shot speaks at hero scale: an ending does not whisper. */
  big?: boolean;
  align?: "left" | "right";
  children?: ReactNode;
}) {
  const seq = sequence(slot);
  if (!seq || seq.frameCount === 0) return null;

  return (
    <section className="relative bg-paper text-ink">
      <ScrollSequence
        base={seq.base}
        frameCount={seq.frameCount}
        scrollLength={seq.scrollLength}
        lazy
        edgeFade="both"
        posterAlt={`${t(seq.alt, locale)}. ${t(DICT.common.syntheticAlt, locale)}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/15 to-transparent"
        />
        <div className="relative flex h-full flex-col justify-end">
          <div
            className={`mx-auto w-full max-w-[96rem] px-5 pb-14 sm:px-8 sm:pb-16 ${
              align === "right" ? "text-right" : ""
            }`}
          >
            <p className="t-data text-ink-dim">{kicker}</p>
            <p
              className={`t-display mt-4 text-ink ${
                align === "right" ? "ml-auto" : ""
              } ${big ? "max-w-none text-[clamp(2.8rem,9vw,9rem)]" : "max-w-3xl text-[clamp(1.9rem,4.5vw,4rem)]"}`}
            >
              {line}
            </p>
            {children && <div className="mt-9">{children}</div>}
          </div>
        </div>
        {seq.stock && (
          <span className="absolute right-5 top-6 z-10 sm:right-8">
            <ExampleStamp locale={locale} kind="synthetic" />
          </span>
        )}
      </ScrollSequence>
    </section>
  );
}
