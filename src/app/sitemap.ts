import type { MetadataRoute } from "next";
import { LOCALES, SITE } from "@/content/site";

/** Generated at build time. Required for static export if ever enabled. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));
}
