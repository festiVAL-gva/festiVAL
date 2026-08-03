# Checklist de paridad — rutas migradas

Usar esta lista al cerrar cada ruta Angular → Astro. Marcar solo con evidencia (view-source, Lighthouse, axe, build stats).

## URLs

- [ ] Path español idéntico al Angular (sin prefijo de locale en MVP)
- [ ] Slug inmutable; renombres documentados con 301
- [ ] Unknown slug → HTTP 404 (no soft-404 con status 200)
- [ ] Enlaces internos relativos correctos (`/`, `/festivales`, …)

## Meta / SEO

- [ ] `<title>` único, patrón `seo-meta` (≤ ~60 chars editorial)
- [ ] `<meta name="description">` verificada, ≤ ~155 chars
- [ ] `<link rel="canonical">` absoluto HTTPS (desde `PUBLIC_BASE_URL` / `site`)
- [ ] Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (+ alt/dims)
- [ ] Twitter card equivalente
- [ ] `hreflang` solo para locales **live** (`es` + `x-default` en MVP; no ca/en)
- [ ] HTML útil sin JavaScript (view-source)
- [ ] JSON-LD `MusicEvent` (+ `BreadcrumbList` si aplica) en `<head>`, facts verificados
- [ ] Entrada en sitemap (`@astrojs/sitemap`) cuando la ruta es indexable
- [ ] `robots` explícito `noindex` si la ruta no es indexable

## Datos

- [ ] Lectura vía `FestivalRepository` (no fetch en cliente)
- [ ] Validación Zod en boundary
- [ ] Copy vía `t()` / `es.json` (sin strings hardcodeados de UI)
- [ ] Fechas con formato editorial (`12 – 16 jul 2026`) cuando se muestren formateadas

## Estilos / tema

- [ ] Tokens `--fv-*` (sin colores hardcodeados en componentes)
- [ ] Light / dark / system funcionan; anti-FOUC sin FOUC visible
- [ ] Responsive: desktop / laptop / tablet / mobile (floor 320px)
- [ ] Touch targets ≥ 44px en controles interactivos

## Rendimiento

- [ ] JS cliente de la ruta medido (objetivo: ≪ Angular; ideal ~0 KB en páginas 100% `.astro`)
- [ ] LCP hero con `width`/`height` + `fetchpriority="high"` cuando aplique
- [ ] Build Cloudflare dentro del presupuesto Workers (vigilar 1 MB gz en plan free)
- [ ] Sin hidratar islas innecesarias (Preact solo con `client:*` justificado)

## Accesibilidad (WCAG 2.1 AA)

- [ ] Jerarquía de headings coherente (un `h1`)
- [ ] Contraste AA en light y dark
- [ ] Focus visible en CTAs / nav / theme toggle
- [ ] `iframe` de mapa con `title` descriptivo
- [ ] axe-core sin violations serias en la ruta

## Evidencia PoC `/festivales/[slug]` (Fase 2)

| Check | Estado | Notas |
| --- | --- | --- |
| Prerender 6 slugs seed | ✅ | `getStaticPaths` → `dist/client/festivales/*/index.html` |
| Hero + facts + overview + map embed | ✅ | Sin galerías/vídeo/reviews (Fase 3) |
| SEO head + MusicEvent | ✅ | title, description, canonical, OG, Twitter, BreadcrumbList |
| Theme vanilla | ✅ | anti-FOUC + toggle inline; sin isla |
| JSON adapter + Zod | ✅ | `FestivalRepository`; Sanity adapter pendiente |
| Bundle cliente ~0 (sin islas) | ✅ | `find dist/client -name '*.js'` → 0 ficheros; solo CSS + scripts inline |
