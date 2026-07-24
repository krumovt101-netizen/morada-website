import type { Metadata } from "next";
import { Figtree, Newsreader, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

/**
 * The three voices (see globals.css):
 *
 * NEWSREADER is the voice of the house. An editorial serif with an optical
 * axis (opsz): thin and monumental at display sizes, readable at caption
 * sizes. Normal style only; the italic would double the payload and no
 * moment of the design asks for it yet.
 *
 * FIGTREE is the interface: rounded-humanist, plain, approachable.
 * SPLINE SANS MONO is the data voice: prices, areas, chapter markers.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
});

export const metadata: Metadata = {
  /* Domain unconfirmed. See SITE.url in src/content/site.ts: same decision,
     changed in both places at once. */
  metadataBase: new URL("https://www.morada-lisboa.pt"),
  title: {
    default: "Morada, Lisboa",
    template: "%s · Morada",
  },
  description:
    "Agência imobiliária de bairro em Lisboa. Casas entre os 250 e os 850 mil euros, visitadas e descritas sem adjetivos por verificar.",
  openGraph: {
    type: "website",
    siteName: "Morada",
    locale: "pt_PT",
    alternateLocale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${newsreader.variable} ${figtree.variable} ${splineMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
