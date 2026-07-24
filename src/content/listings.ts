/**
 * LISTINGS — ALL EXAMPLE DATA.
 * =============================================================================
 * There is no real portfolio behind this site. These three entries exist so
 * the listings section shows its real shape, sized to the price point of a
 * small Lisbon residential agency (mid-range Idealista band, €285k–€850k).
 * Every entry is `example: true`: the card carries an on-screen "Exemplo"
 * stamp, the alt text says so, and the production build refuses to compile
 * while any remain (scripts/check-content.mjs; ALLOW_EXAMPLE=1 for previews).
 *
 * When the real agency opens its books: replace these entries with real
 * homes, set `example: false`, and the stamps and the build gate disarm
 * themselves. Prices in euros, areas in m², nothing invented beyond what is
 * plainly labeled as an example.
 */

import type { Locale } from "./site";

type L = Record<Locale, string>;

export interface Listing {
  id: string;
  typology: "T2" | "T3";
  neighbourhood: string;
  areaM2: number;
  price: number;
  blurb: L;
  /** true = invented example entry. Blocks the production build. */
  example: boolean;
}

export const LISTINGS: Listing[] = [
  {
    id: "alvalade-t2",
    typology: "T2",
    neighbourhood: "Alvalade",
    areaM2: 74,
    price: 365000,
    blurb: {
      pt: "Prédio de 1952, terceiro andar, sala virada a nascente.",
      en: "A 1952 building, third floor, living room facing east.",
    },
    example: true,
  },
  {
    id: "campo-ourique-t3",
    typology: "T3",
    neighbourhood: "Campo de Ourique",
    areaM2: 118,
    price: 620000,
    blurb: {
      pt: "Esquina com duas frentes, cozinha renovada em 2023.",
      en: "A corner flat with two aspects, kitchen renovated in 2023.",
    },
    example: true,
  },
  {
    id: "penha-franca-t2",
    typology: "T2",
    neighbourhood: "Penha de França",
    areaM2: 68,
    price: 295000,
    blurb: {
      pt: "Último andar, varanda a poente sobre o casario.",
      en: "Top floor, west balcony over the rooftops.",
    },
    example: true,
  },
];

/** Formats 365000 → "365 000 €" (PT convention, thin spaces omitted). */
export const formatPrice = (price: number): string =>
  `${price.toLocaleString("pt-PT").replace(/ /g, " ")} €`;
