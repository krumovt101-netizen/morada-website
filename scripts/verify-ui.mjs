/**
 * UI verification harness (Playwright). Run with the dev server up:
 *   npm run dev   →   node scripts/verify-ui.mjs
 *
 * Checks the contracts that matter for the scroll film: locales render clean,
 * the scrub canvas exists exactly where it should (and nowhere reduced-motion
 * or small screens can pay for it), the curtain is the page colour, the hero
 * loads eagerly while mid-page beats stay lazy, the honesty stamps are on,
 * and the live canvas actually shows a frame from the right sequence
 * (pixel-diff, not eyeballing).
 */
import { chromium } from "playwright";
import { readdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const results = [];
const fail = [];
const check = (name, ok, detail = "") => {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail.push(name);
};
const browser = await chromium.launch();

const SLOTS = ["descida", "porta", "sala", "cozinha", "quarto", "limiar", "varanda"];
const liveSlots = SLOTS.filter((s) => {
  try {
    return readdirSync(new URL(`../public/media/sequences/${s}`, import.meta.url)).some((f) =>
      f.startsWith("frame-"),
    );
  } catch {
    return false;
  }
});

// ---------- 1. Both locales: 200, one h1, zero console errors, lang fix, 404
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const l of ["pt", "en"]) {
    const resp = await page.goto(`${BASE}/${l}`, { waitUntil: "networkidle" });
    const h1 = await page.locator("h1").count();
    check(`/${l}`, resp.status() === 200 && h1 === 1, `status ${resp.status()}, h1 ${h1}`);
  }
  check("zero console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const enLang = await page.evaluate(() => document.documentElement.lang);
  check("/en corrects html lang", enLang === "en", `lang ${enLang}`);
  const r404 = await page.goto(`${BASE}/pt/nada`);
  check("404 page", r404.status() === 404);
  await ctx.close();
}

// ---------- 2. Desktop: one canvas per live film section; curtain == paper
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const canvases = await page.locator("canvas").count();
  check(
    `desktop: canvas per live film section (${liveSlots.length})`,
    canvases === liveSlots.length,
    `canvas ${canvases}`,
  );
  const curtainOk = await page.evaluate(() => {
    const paper = getComputedStyle(document.body).backgroundColor;
    const curtains = [...document.querySelectorAll("section .sticky > div.pointer-events-none.absolute")]
      .map((el) => getComputedStyle(el).backgroundColor);
    return curtains.length === 0 || curtains.every((c) => c === paper);
  });
  check("curtain colour == page paper", curtainOk);
  await ctx.close();
}

// ---------- 3. Reduced motion: posters only, never a canvas or a frame request
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const frameReqs = [];
  page.on("request", (r) => r.url().includes("frame-") && frameReqs.push(r.url()));
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const canvases = await page.locator("canvas").count();
  const posters = await page.locator('img[src*="/media/sequences/"]').count();
  check(
    "reduced-motion: no canvas, posters present, zero frame downloads",
    canvases === 0 && posters === liveSlots.length && frameReqs.length === 0,
    `canvas ${canvases}, posters ${posters}, frames ${frameReqs.length}`,
  );
  await ctx.close();
}

// ---------- 4. Mobile 390px: no canvas, no horizontal overflow
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const canvases = await page.locator("canvas").count();
  check("mobile: no horizontal overflow", overflow <= 0, `${overflow}px`);
  check("mobile: no scrub canvas", canvases === 0, `canvas ${canvases}`);
  await ctx.close();
}

// ---------- 5. Hero eager, mid-page beats lazy at the top of the page
if (liveSlots.length > 0) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const seqRequests = [];
  page.on("request", (r) => r.url().includes("/media/sequences/") && seqRequests.push(r.url()));
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  const heroFrames = seqRequests.filter((u) => u.includes("/descida/") && u.includes("frame-")).length;
  const lazySlots = liveSlots.filter((s) => s !== "descida" && s !== "porta");
  const lazyFrames = seqRequests.filter(
    (u) => lazySlots.some((s) => u.includes(`/${s}/`)) && u.includes("frame-"),
  ).length;
  if (liveSlots.includes("descida"))
    check("hero frames load eagerly", heroFrames > 0, `${heroFrames} frames`);
  check("deep film beats stay lazy at top", lazyFrames === 0, `${lazyFrames} frames`);
  await ctx.close();
}

// ---------- 6. Canvas shows a real frame of its own sequence (pixel-diff)
if (liveSlots.includes("descida")) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // let preload land
  const descidaCount = readdirSync(
    new URL("../public/media/sequences/descida", import.meta.url),
  ).filter((f) => f.startsWith("frame-")).length;
  await page.evaluate((n) => (window.__frameCount = n), descidaCount);
  const result = await page.evaluate(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { error: "no canvas" };
    const w = 160;
    const h = 90;
    const live = document.createElement("canvas");
    live.width = w;
    live.height = h;
    const lctx = live.getContext("2d");
    lctx.drawImage(canvas, 0, 0, w, h);
    const liveData = lctx.getImageData(0, 0, w, h).data;
    const diffTo = async (src) => {
      const img = new Image();
      img.src = src;
      try {
        await img.decode();
      } catch {
        throw new Error(`decode failed: ${src} (naturalWidth ${img.naturalWidth})`);
      }
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const cctx = c.getContext("2d");
      // cover-fit like the component
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      cctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      const data = cctx.getImageData(0, 0, w, h).data;
      let sum = 0;
      for (let i = 0; i < data.length; i += 4)
        sum += Math.abs(data[i] - liveData[i]) + Math.abs(data[i + 1] - liveData[i + 1]);
      return sum / (data.length / 4);
    };
    const pad = (n) => String(n).padStart(3, "0");
    const count = window.__frameCount;
    if (!Number.isInteger(count)) return { error: `bad frameCount ${count}` };
    const candidates = [1, 2, 3, 4].map((q) => 1 + Math.round(((count - 1) * (q - 1)) / 4));
    candidates.push(count);
    const diffs = {};
    try {
      for (const f of candidates)
        diffs[f] = await diffTo(`/media/sequences/descida/frame-${pad(f)}.webp`);
    } catch (e) {
      return { error: String(e) };
    }
    return { diffs };
  });
  if (result.error) {
    check("hero canvas pixel-diff", false, result.error);
  } else {
    const entries = Object.entries(result.diffs).map(([f, d]) => [Number(f), d]);
    const best = entries.reduce((a, b) => (b[1] < a[1] ? b : a));
    // At scroll 0 the head sits on frame 1: nearest candidate must be frame 1,
    // and diffs must grow with frame distance from it.
    // Far frames of a long move all plateau at "maximally different" — demand
    // strict growth for the near half, and allow ≤5% ripple in the plateau.
    const sorted = [...entries].sort((a, b) => a[0] - b[0]);
    const monotonic = sorted.every((e, i) => {
      if (i === 0) return true;
      const prev = sorted[i - 1][1];
      return i <= 2 ? e[1] > prev : e[1] >= prev * 0.95;
    });
    check(
      "hero canvas shows frame 1 at top",
      best[0] === 1,
      `best frame ${best[0]} (diff ${best[1].toFixed(1)})`,
    );
    check(
      "pixel-diffs grow with frame distance",
      monotonic,
      sorted.map((e) => `${e[0]}:${e[1].toFixed(0)}`).join(" "),
    );
  }
  await ctx.close();
}

// ---------- 7. Honesty stamps + honest alts
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pt`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const stamps = await page.getByText(/imagem de síntese|exemplo/i).count();
  const dishonest = await page.evaluate(() =>
    [...document.querySelectorAll('img[src*="/media/sequences/"]')].filter(
      (i) => i.alt && !/gerada por computador/i.test(i.alt),
    ).length,
  );
  check("honesty stamps present", stamps >= 3, `${stamps} stamps`);
  check("every generated image has an honest alt", dishonest === 0, `${dishonest} without`);
  check("skip-link target #main exists", (await page.locator("#main").count()) === 1);
  await ctx.close();
}

await browser.close();
console.log(results.join("\n"));
console.log(fail.length ? `\n${fail.length} FAILURES` : "\nALL PASS");
process.exit(fail.length ? 1 : 0);
