import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DICT, t } from "@/content/dictionary";
import { LOCALES, isLocale, SITE, type Locale } from "@/content/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === "pt";
  return {
    title: {
      default: pt ? "Morada, Lisboa" : "Morada, Lisbon",
      template: "%s · Morada",
    },
    description: pt
      ? "Agência imobiliária de bairro em Lisboa. Casas entre os 250 e os 850 mil euros, visitadas e descritas sem adjetivos por verificar."
      : "A neighbourhood estate agency in Lisbon. Homes between 250 and 850 thousand euros, visited and described without unverifiable adjectives.",
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  /**
   * Structured data. Only fields that EXIST go in: phone, email and the AMI
   * licence are unconfirmed, and an invented field here becomes a published
   * fact the firm is answerable for. Nulls are removed before serialising,
   * never written as null.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: `${SITE.url}/${l}`,
    ...(SITE.phone.e164 ? { telephone: SITE.phone.e164 } : {}),
    ...(SITE.email.general ? { email: SITE.email.general } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: "PT",
    },
    areaServed: SITE.city,
  };

  return (
    <>
      {/* <html lang> lives in the root layout, above this segment, and says
          "pt". On /en routes this corrects it before first paint so screen
          readers announce English as English. Crawlers get the hreflang
          alternates from the metadata. */}
      {l !== "pt" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(l)}`,
          }}
        />
      )}
      <script
        type="application/ld+json"
        // The object is ours and static; no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="t-data sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-azulejo focus:px-4 focus:py-3 focus:text-paper"
      >
        {t(DICT.nav.skip, l)}
      </a>
      <Header locale={l} />
      {/* Each page owns its top spacing: the hero runs under the fixed bar. */}
      <main id="main">{children}</main>
      {/* Film grain: ONE fixed layer over the whole document. */}
      <div className="grain-site" aria-hidden="true" />
      <Footer locale={l} />
    </>
  );
}
