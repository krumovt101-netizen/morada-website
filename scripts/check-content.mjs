/**
 * Content safety gate.
 *
 * Refuses a production build while the site contains:
 *
 *   1. Example listings (listings.ts, `example: true`). They are invented
 *      homes at invented prices; publishing them as real is misrepresentation.
 *
 *   2. Generated footage that is live on the page (media.ts, `stock: true`
 *      with frameCount > 0). It is computer-generated imagery of no real,
 *      listed property.
 *
 * This is a gate, not a warning. For previews and demos (with the on-screen
 * stamps still armed) run with ALLOW_EXAMPLE=1.
 */
import { readFileSync } from "node:fs";

const read = (f) => readFileSync(new URL(`../src/content/${f}`, import.meta.url), "utf8");

/** Count only inside the exported array, not in the file's comments. */
function countAfter(src, marker, pattern) {
  const i = src.indexOf(marker);
  if (i === -1) return 0;
  return (src.slice(i).match(pattern) ?? []).length;
}

const examples = countAfter(read("listings.ts"), "export const LISTINGS", /example:\s*true/g);

const media = read("media.ts");
// Split the array source into one chunk per entry (each begins at `slot:`);
// brace-matching regexes break on the nested alt objects.
const fromArray = media.slice(media.indexOf("export const SEQUENCES"));
const liveStock = fromArray
  .split(/(?=slot:)/)
  .slice(1)
  .filter((entry) => /stock:\s*true/.test(entry) && !/frameCount:\s*0\b/.test(entry)).length;

const problems = [];
if (examples > 0)
  problems.push(`${examples} example listing(s) in src/content/listings.ts (example: true)`);
if (liveStock > 0)
  problems.push(
    `${liveStock} generated sequence(s) live on the page in src/content/media.ts (stock: true, frameCount > 0)`,
  );

if (problems.length === 0) {
  console.log("[content] listings and footage confirmed.");
  process.exit(0);
}

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;

if (process.env.ALLOW_EXAMPLE === "1") {
  console.warn(`\n${yellow("[content] letting it pass (preview):")}`);
  for (const p of problems) console.warn(yellow(`  - ${p}`));
  console.warn(yellow("  This must NOT ship as a real agency's production site.\n"));
  process.exit(0);
}

console.error(`\n${red("[content] the production build is blocked:")}`);
for (const p of problems) console.error(red(`  - ${p}`));
console.error("\nWhat to do:");
if (examples > 0) {
  console.error("  Listings: replace the example entries with real homes and set");
  console.error("            example to false in src/content/listings.ts.");
}
if (liveStock > 0) {
  console.error("  Footage:  replace generated sequences with real filming, or mark");
  console.error("            the real ones stock: false in src/content/media.ts.");
}
console.error("\nTo build anyway (preview, demo — stamps stay on):");
console.error("  ALLOW_EXAMPLE=1 npm run build\n");
process.exit(1);
