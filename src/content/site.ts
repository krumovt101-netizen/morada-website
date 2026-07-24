/**
 * HOUSE CONFIGURATION
 * =============================================================================
 * Everything the client will want to change without opening a page. One place,
 * one file.
 *
 * STATE OF THIS FILE: "Morada" is a PLACEHOLDER BRAND. There is no confirmed
 * firm, domain, phone, email, or licence behind this site yet — it is a
 * design-complete template for a small Lisbon residential agency (price point
 * modeled on mid-range Idealista listings, €285k–€850k). Every unconfirmed
 * fact is `null`, not invented: an invented phone number makes someone call a
 * stranger, and an invented AMI licence number is a legal problem, not a
 * design choice. Portuguese law requires the AMI licence number on any
 * real-estate mediation site — the footer shows "AMI pendente" until the real
 * client supplies it.
 */

export const SITE = {
  /** Placeholder brand name. ONE line to change when the real client signs. */
  name: "Morada",

  /**
   * DOMAIN UNCONFIRMED — placeholder that feeds canonicals, sitemap and
   * structured data. The ONLY line to change when a real domain exists.
   */
  url: "https://www.morada-lisboa.pt",
  domainConfirmed: false,

  city: "Lisboa",
  country: "Portugal",

  /** No confirmed contacts exist. While null, the site says "por confirmar". */
  phone: {
    display: null as string | null,
    e164: null as string | null,
  },
  email: {
    general: null as string | null,
  },

  /**
   * AMI: the real-estate mediation licence number (Decreto-Lei 15/2013).
   * REQUIRED on the site of any real agency. Never invented; the footer
   * shows a pending note while this is null.
   */
  ami: null as string | null,

  social: {
    instagram: null as string | null,
  },
} as const;

export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Is there any publishable contact channel? Governs every contact CTA. */
export const hasContact = (): boolean =>
  SITE.phone.e164 !== null || SITE.email.general !== null;
