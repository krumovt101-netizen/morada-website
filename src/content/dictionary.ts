/**
 * ALL USER-FACING COPY, both locales. Pages never hardcode a string.
 * =============================================================================
 * VOICE RULES (the house style, inherited and enforced):
 *   - A fact over an adjective, always. If a sentence could appear on any
 *     agency's site, it is wrong.
 *   - No luxury vocabulary: "exclusivo", "prestígio", "premium", "de sonho"
 *     are banned. This firm sells homes people actually live in.
 *   - No em-dashes in copy. Short sentences. PT is the voice of the house;
 *     EN follows it.
 *   - The film does the showing; the words stay out of its way. Captions are
 *     one line, chapter markers are roman numerals, like a table of contents.
 */

import type { Locale } from "./site";

type L = Record<Locale, string>;

export const t = (s: L, locale: Locale): string => s[locale];

export const DICT = {
  nav: {
    homes: { pt: "Casas", en: "Homes" } as L,
    services: { pt: "Como trabalhamos", en: "How we work" } as L,
    contact: { pt: "Contactos", en: "Contact" } as L,
    skip: { pt: "Saltar para o conteúdo", en: "Skip to content" } as L,
  },

  home: {
    hero: {
      kicker: { pt: "Morada · Lisboa", en: "Morada · Lisbon" } as L,
      l1: { pt: "Uma casa", en: "A home" } as L,
      l2: { pt: "vê-se por dentro.", en: "is seen from the inside." } as L,
      body: {
        pt: "Somos uma agência de bairro. Vendemos casas entre os 250 e os 850 mil euros, as casas em que as pessoas vivem de facto.",
        en: "We are a neighbourhood agency. We sell homes between 250 and 850 thousand euros, the homes people actually live in.",
      } as L,
      scrollCue: { pt: "Role para visitar", en: "Scroll to visit" } as L,
    },

    /* The film chapters. Kicker = roman numeral + room; line = one sentence. */
    film: {
      porta: {
        kicker: { pt: "II · A porta", en: "II · The door" } as L,
        line: { pt: "Entre.", en: "Come in." } as L,
      },
      sala: {
        kicker: { pt: "III · A sala", en: "III · The living room" } as L,
        line: {
          pt: "A manhã faz metade do trabalho.",
          en: "Morning does half the work.",
        } as L,
      },
      cozinha: {
        kicker: { pt: "IV · A cozinha", en: "IV · The kitchen" } as L,
        line: {
          pt: "Azulejo, pedra, uma janela.",
          en: "Tile, stone, one window.",
        } as L,
      },
      quarto: {
        kicker: { pt: "V · O quarto", en: "V · The bedroom" } as L,
        line: {
          pt: "As traseiras são silêncio.",
          en: "The back of the house is quiet.",
        } as L,
      },
      limiar: {
        kicker: { pt: "VI · A varanda", en: "VI · The balcony" } as L,
        line: { pt: "As portas abrem.", en: "The doors open." } as L,
      },
      varanda: {
        kicker: { pt: "VII · Lisboa", en: "VII · Lisbon" } as L,
        line: { pt: "Mude de morada.", en: "Change your address." } as L,
        cta: { pt: "Falar connosco", en: "Talk to us" } as L,
      },
    },

    intro: {
      kicker: { pt: "I · A agência", en: "I · The agency" } as L,
      title: {
        pt: "Uma agência de bairro",
        en: "A neighbourhood agency",
      } as L,
      p1: {
        pt: "A Morada vende casas em Lisboa. Não vendemos torres nem investimentos de catálogo: vendemos T2 e T3 em prédios com décadas, com obras honestas e preços que uma família consegue pagar.",
        en: "Morada sells homes in Lisbon. We do not sell towers or catalogue investments: we sell two and three bedroom flats in buildings with decades on them, honest renovations, prices a family can pay.",
      } as L,
      p2: {
        pt: "Cada casa que listamos foi visitada por nós, fotografada com a luz que tem e descrita sem adjetivos que não se possam verificar.",
        en: "Every home we list has been visited by us, photographed in its own light and described without adjectives that cannot be checked.",
      } as L,
    },

    listings: {
      title: { pt: "Casas em carteira", en: "Homes on our books" } as L,
      exampleNote: {
        pt: "Dados de exemplo. As casas reais entram aqui quando a agência abrir a carteira.",
        en: "Example data. Real homes replace these when the agency opens its books.",
      } as L,
    },

    services: {
      title: { pt: "Como trabalhamos", en: "How we work" } as L,
      steps: [
        {
          title: { pt: "Avaliação", en: "Valuation" } as L,
          body: {
            pt: "Dizemos quanto vale, com comparáveis reais do bairro, não com o número que gostaria de ouvir.",
            en: "We tell you what it is worth, with real comparables from the neighbourhood, not the number you would like to hear.",
          } as L,
        },
        {
          title: { pt: "Visitas", en: "Viewings" } as L,
          body: {
            pt: "Preparamos a casa, fotografamos de manhã e fazemos as visitas por si.",
            en: "We prepare the home, photograph it in the morning and host the viewings for you.",
          } as L,
        },
        {
          title: { pt: "Escritura", en: "Deed" } as L,
          body: {
            pt: "Acompanhamos do sinal à escritura, com o banco e o notário incluídos no caminho.",
            en: "We walk it from deposit to deed, bank and notary included.",
          } as L,
        },
      ],
    },

    contact: {
      title: { pt: "Fale connosco", en: "Talk to us" } as L,
      pending: {
        pt: "Os contactos desta agência estão por confirmar. Este site é uma maqueta com dados de exemplo.",
        en: "This agency's contacts are yet to be confirmed. This site is a mock-up with example data.",
      } as L,
      phoneLabel: { pt: "Telefone", en: "Phone" } as L,
      emailLabel: { pt: "Email", en: "Email" } as L,
      amiLabel: { pt: "Licença AMI", en: "AMI licence" } as L,
      pendingValue: { pt: "por confirmar", en: "to be confirmed" } as L,
      amiPending: { pt: "pendente", en: "pending" } as L,
    },
  },

  footer: {
    note: {
      pt: "Site em desenvolvimento. Imagens geradas por computador e dados de exemplo.",
      en: "Site in development. Computer-generated imagery and example data.",
    } as L,
  },

  common: {
    exampleStamp: { pt: "Exemplo", en: "Example" } as L,
    syntheticStamp: {
      pt: "Imagem de síntese",
      en: "Computer-generated image",
    } as L,
    syntheticAlt: {
      pt: "Imagem gerada por computador, não é um imóvel real",
      en: "Computer-generated image, not a real property",
    } as L,
  },
} as const;
