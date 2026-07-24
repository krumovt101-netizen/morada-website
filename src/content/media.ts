/**
 * THE FILM
 * =============================================================================
 * The homepage is one continuous journey through a single Lisbon apartment,
 * told in 7 scroll-scrubbed shots. Continuity is REAL: the film is chained by
 * 8 boundary stills (A–H) where the END frame of shot N is literally the same
 * image as the START frame of shot N+1. All footage is COMPUTER-GENERATED
 * (Higgsfield) and shows no real, listed property — while `stock` is true,
 * every shot carries an on-screen "Imagem de síntese" stamp, the alt text
 * says the same to screen-reader users, and the production build refuses to
 * compile (scripts/check-content.mjs; ALLOW_EXAMPLE=1 for previews).
 *
 * MASTER STYLE BLOCK — the single source of truth appended verbatim to every
 * still and video prompt. Do not fork it per shot; one grade is what makes
 * seven shots read as one film:
 *
 *   Camera: height 1.55 m indoors, level horizon, gimbal-locked, deep focus.
 *   Motion: one continuous dolly at constant linear velocity, identical speed
 *   at the first frame and the last frame.
 *   Light: soft morning daylight, sun low and off-frame to the east,
 *   cool-neutral white balance.
 *   Grade: neutral, low contrast, clean digital.
 *   Architecture: walls, window frames and door frames remain perfectly
 *   straight and stable throughout. Furniture stays fixed in place.
 *   Scene: empty of people. All surfaces free of text and signage.
 *   Proportions: realistic for a 120 m² apartment.
 *
 * Material kit (fixed by the master living-room still, D): oak herringbone
 * floor, white plaster walls, tall windows with linen curtains, worn brass
 * hardware, muted sage and walnut furniture. Modest and lived-in, not luxury.
 *
 * PIPELINE (see the gym repo's scroll-video-animation skill): boundary stills
 * → user approval → Higgsfield video (start_image+end_image, 5 s, no audio)
 * → ffmpeg fps=12 scale=1600 → cwebp q80 (+poster q82) → ≤5 MB per sequence.
 * `frameCount: 0` keeps a sequence switched off; it must equal the REAL file
 * count once frames exist. Higgsfield job ids go in `credit` so any shot is
 * traceable and regenerable.
 */

import type { Locale } from "./site";

type L = Record<Locale, string>;

/**
 * The on-screen "computer-generated image" stamps. ON by default: they protect
 * whoever shows this site from it being read as a real, existing listing. The
 * build gate does NOT depend on this flag and stays armed regardless.
 */
export const SHOW_STOCK_TAGS = true;

export interface SequenceShot {
  slot: string;
  base: string;
  /** 0 = sequence off. Must equal the real number of frame-* files. */
  frameCount: number;
  /** Section height in viewports of scroll. */
  scrollLength: number;
  /** true = generated footage, not a real property. Blocks production build. */
  stock: boolean;
  /** Higgsfield job id of the source video, for provenance/regeneration. */
  credit?: string;
  alt: L;
}

/**
 * The seven shots, in page order. Boundary stills: A aerial → B façade →
 * C entry hall → D living room (MASTER) → E kitchen → F bedroom → G balcony
 * threshold → H balcony view (H bookends A: same skyline, ground level).
 */
export const SEQUENCES: SequenceShot[] = [
  {
    slot: "descida",
    base: "/media/sequences/descida",
    frameCount: 50,
    scrollLength: 3,
    stock: true,
    credit: "higgsfield:eee82bb9-8228-4c3b-9108-37374d6373b7",
    alt: {
      pt: "Descida lenta de drone sobre os telhados de Lisboa, do alto até à porta de um prédio de meio do século",
      en: "A slow drone descent over Lisbon rooftops, from high above down to the door of a mid-century building",
    },
  },
  {
    slot: "porta",
    base: "/media/sequences/porta",
    frameCount: 61,
    scrollLength: 2.5,
    stock: true,
    credit: "higgsfield:6949385a-7b06-4e1d-965c-658e780373c4",
    alt: {
      pt: "Travelling contínuo a atravessar a porta de entrada para o hall de um apartamento com chão de madeira",
      en: "A continuous dolly through the front door into the entry hall of an apartment with a wooden floor",
    },
  },
  {
    slot: "sala",
    base: "/media/sequences/sala",
    frameCount: 61,
    scrollLength: 2.5,
    stock: true,
    credit: "higgsfield:1bb2fac6-c40a-473c-9104-33bcada94335",
    alt: {
      pt: "Travelling pelo corredor até à sala ampla, com luz de manhã a entrar pelas janelas altas",
      en: "A dolly down the hallway into the wide living room, morning light through tall windows",
    },
  },
  {
    slot: "cozinha",
    base: "/media/sequences/cozinha",
    frameCount: 61,
    scrollLength: 2.5,
    stock: true,
    credit: "higgsfield:1af37982-7b61-440b-87aa-365ac6e76ae2",
    alt: {
      pt: "Deslocação lateral da sala para a cozinha, com azulejo na parede e uma janela sobre o lava-loiça",
      en: "A lateral glide from the living room into the kitchen, tiled wall and a window over the sink",
    },
  },
  {
    slot: "quarto",
    base: "/media/sequences/quarto",
    frameCount: 61,
    scrollLength: 2.5,
    stock: true,
    credit: "higgsfield:42f51caa-58d0-477d-a191-c2eeb096c522",
    alt: {
      pt: "Travelling da cozinha, pelo corredor, até ao quarto com portas de varanda entreabertas",
      en: "A dolly from the kitchen, across the hall, into the bedroom with balcony doors ajar",
    },
  },
  {
    slot: "limiar",
    base: "/media/sequences/limiar",
    frameCount: 61,
    scrollLength: 2.5,
    stock: true,
    credit: "higgsfield:63193f8e-ad96-4ad0-a8f0-e47804e06fc6",
    alt: {
      pt: "Aproximação constante às portas de varanda abertas, com a cidade luminosa lá fora",
      en: "A steady push toward the open balcony doors, the bright city beyond",
    },
  },
  {
    slot: "varanda",
    base: "/media/sequences/varanda",
    /* Head trimmed 20 frames: the shot resumes mid-passage where `limiar`
       left off, instead of replaying the approach from further back. */
    frameCount: 41,
    scrollLength: 3,
    stock: true,
    credit: "higgsfield:d2136a68-6b96-4f1d-a8f4-6a6ce09af31c",
    alt: {
      pt: "Passagem pelas portas da varanda até à vista sobre os telhados de Lisboa e o Tejo",
      en: "Passing through the balcony doors to the view over Lisbon rooftops and the Tagus",
    },
  },
];

export const sequence = (slot: string): SequenceShot | undefined =>
  SEQUENCES.find((s) => s.slot === slot);

/** Feeds the build gate: generated sequences that are live on the page. */
export const stockSequences = () =>
  SEQUENCES.filter((s) => s.stock && s.frameCount > 0);
