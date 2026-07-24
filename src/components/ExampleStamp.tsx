import { DICT, t } from "@/content/dictionary";
import type { Locale } from "@/content/site";

/**
 * The honesty stamp. "Exemplo" marks invented listing data; "Imagem de
 * síntese" marks generated footage. Visible on screen on purpose: it
 * protects whoever presents this site from it being read as a real
 * portfolio. Disarming it is a content decision (see media.ts/listings.ts),
 * never a styling one.
 */
export function ExampleStamp({
  locale,
  kind = "example",
  className = "",
}: {
  locale: Locale;
  kind?: "example" | "synthetic";
  className?: string;
}) {
  const label =
    kind === "synthetic"
      ? t(DICT.common.syntheticStamp, locale)
      : t(DICT.common.exampleStamp, locale);
  return (
    <span
      className={`t-data inline-block border border-rule-strong bg-paper/85 px-2.5 py-1.5 text-ink-dim ${className}`}
    >
      {label}
    </span>
  );
}
