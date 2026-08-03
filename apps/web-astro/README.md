# TuriaFest — Astro PoC (`apps/web-astro`)

Sister app for the Angular → Astro migration. Angular at the monorepo root remains the production site until cutover.

## Stack (locked decisions)

| Concern | Choice |
| --- | --- |
| Islands | Preact only where interactive (`client:*`) |
| Theme | Vanilla inline anti-FOUC + toggle (no island) |
| Data | `FestivalRepository` + JSON adapter today → Sanity later |
| `/festivales/[slug]` | `prerender` + `getStaticPaths` |
| i18n | `es` only, no locale prefix; `ca`/`en` files kept for parity |
| Hosting | `@astrojs/cloudflare` (static output for PoC) |

## Commands

```bash
cd apps/web-astro
cp .env.example .env   # optional
npm install
npm run dev            # http://localhost:4321
npm run build
npm run test:run
```

## Vertical slice (Phase 2)

- `/` — PoC index linking to seed festivals
- `/festivales/[slug]` — hero + facts + overview + map embed + SEO head + MusicEvent JSON-LD

Shared assets (`fonts`, images) and `es.json`/`ca.json`/`en.json` are symlinked from the Angular tree so content stays single-sourced during coexistence.
