# Handoff — o filme da homepage

Estado em 2026-08-06. Para quem pega no projeto a seguir.

## O que está feito e verificado

A homepage é um filme de 7 planos scroll-scrub encadeados por fotogramas de
fronteira partilhados (o último fotograma do plano N é o primeiro do plano N+1).
Estrutura, dados e regras: cabeçalho de `src/content/media.ts`.

Nesta última ronda foram refeitos os dois planos com quebras de continuidade:

- **`descida`** — o drone agora desce sobre o MESMO prédio em que a `porta`
  abre (antes transformava-se noutro edifício a meio do voo). Extraído a
  10 fps (não 12) para caber nos 5 MB a 1600 px.
- **`limiar`** — movimento único do quarto até às portas da varanda, sem o
  salão inventado a meio; o último fotograma é exatamente o primeiro da
  `varanda`.

Junções medidas por PSNR: descida→porta 47 dB, quarto→limiar 47 dB,
limiar→varanda 47 dB (a banda das junções aprovadas é 24–34 dB; acima de 40
é re-encode do mesmo fotograma). `scripts/verify-ui.mjs`: ALL PASS.

## Fontes de alta qualidade (`source/`)

| Ficheiro | O que é |
|---|---|
| `descida-master-1080p.mp4` | Master 1920×1080 do novo plano aéreo (Seedance 2.0) |
| `limiar-master-1080p.mp4` | Master 1920×1080 do novo quarto→varanda |
| `aerial-A2-master-2k.png` | Fotograma aéreo A′ em 2K (3856×2160) — o início do filme |
| `aerial-A2-original.png` | O A′ original do nano banana antes do upscale |

Os masters dos outros cinco planos não estão no repositório, mas todos os
vídeos são regeneráveis: o id de job Higgsfield de cada plano está no campo
`credit` em `src/content/media.ts`. Os fotogramas de fronteira extraem-se do
próprio repositório (ex.: `dwebp public/media/sequences/porta/frame-001.webp -o still-B.png`).

## Receita de extração (de master a sequência)

```bash
ffmpeg -i master.mp4 -vf "fps=12,scale=1600:-2" png/frame-%03d.png   # descida: fps=10
for f in png/frame-*.png; do cwebp -q 80 -m 6 "$f" -o "seq/$(basename "${f%.png}").webp"; done
cwebp -q 82 png/<último>.png -o seq/poster.webp                      # poster = último fotograma
```

Regras: ≤ 5 MB por diretório (descer q, depois fps, antes de descer largura —
todos os planos são 1600 px); `frameCount` em `media.ts` = contagem REAL de
ficheiros. **Ancoragem das junções** (foi isto que tornou as junções exatas):
substituir o fotograma 1 pelo still de fronteira do plano anterior e fundir os
últimos 4 fotogramas em blend progressivo (25/50/75/100 %) para o still do
plano seguinte.

## Verificar antes de dar por feito

```bash
npm run lint
ALLOW_EXAMPLE=1 npm run build          # build de preview
npm run dev                            # depois, noutra shell:
node scripts/verify-ui.mjs             # tem de dar ALL PASS
```

`npm run build` sem a flag FALHA de propósito (`scripts/check-content.mjs`):
é o portão que impede produção com dados de exemplo. Não o "consertar".

## Por fazer

- Dados reais: nome da firma, domínio, telefone, email, **número AMI**
  (obrigatório por lei), imóveis reais. Enquanto faltarem, os selos
  "Imagem de síntese" ficam ligados e o portão bloqueia produção.
- Direção aprovada mas não construída: transformar a homepage num
  **plano-sequência único** — um só canvas fixo com os 396 fotogramas
  encadeados (as junções já são exatas), painéis de conteúdo (intro,
  imóveis, serviços, contactos) a deslizar em paralaxe sobre fotogramas
  parados nas fronteiras dos planos, sem cortinas entre planos. Fallback
  móvel/reduced-motion mantém a estrutura atual de posters.
- Deploy: Vercel, automático no push para `main`.
