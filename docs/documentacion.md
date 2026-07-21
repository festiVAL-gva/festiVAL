# Documentación del proyecto TuriaFest

> Portal informativo de los principales festivales de música de la Comunidad Valenciana.
> Aplicación Angular 21 con SSR, arquitectura feature-sliced y boundaries forzados.

---

## Regla de mantenimiento

**Este documento debe actualizarse con cada commit que modifique la estructura del proyecto.** Si un commit añade, elimina o renombra carpetas o ficheros, los cambios deben reflejarse aquí en el mismo commit. Un `docs/documentacion.md` desactualizado es un bug.

Responsable: cualquier agente o persona que realice el commit. La regla se aplica tanto a humanos como a Claude.

---

## Estructura raíz

```
TuriaFest/
├── .agents/            → Skills compatibles con agentes de Cursor
├── .codex/             → Desarrollo asistido por IA para Codex (agentes, skills, commands)
├── .claude/            → Desarrollo asistido por IA para Claude Code (agentes, skills, workflows)
├── .vscode/            → Configuración del editor VS Code
├── design/             → Assets de diseño (mockups, paletas de color, fuentes fuente)
├── docs/               → Documentación del proyecto
├── public/             → Ficheros estáticos servidos tal cual (favicon, fuentes runtime,
│                          `festival-detail-{slug}.json` con datos verificados del festival)
├── src/                → Código fuente de la aplicación
├── scripts/            → Scripts de utilidad Node.js no relacionados con el build de Angular
├── .editorconfig       → Reglas de formato del editor (indentación, charset, trailing whitespace)
├── angular.json        → Configuración de Angular CLI (build, serve, test, lint, budgets, SSR)
├── eslint.config.js    → Configuración de ESLint (Angular ESLint + template accessibility)
├── package.json        → Dependencias, scripts npm y metadatos del proyecto
├── package-lock.json   → Lockfile de dependencias (versionado exacto)
├── AGENTS.md           → Contrato raíz para agentes ejecutados desde Cursor
├── README.md           → Presentación pública del proyecto para GitHub
├── tsconfig.json       → Configuración base de TypeScript (strict, paths aliases, target)
├── tsconfig.app.json   → Configuración TS para el build de la aplicación (extiende tsconfig.json)
└── tsconfig.spec.json  → Configuración TS para los tests (extiende tsconfig.json, incluye vitest/globals)
```

---

## `.agents/` — Skills para Cursor

Contiene una copia de las skills del proyecto adaptada para agentes ejecutados desde Cursor. Las
referencias al contrato principal apuntan a `AGENTS.md`; los patrones funcionales permanecen
alineados con las skills de `.claude/` y `.codex/`.

```
.agents/
└── skills/
    ├── <skill>/SKILL.md        → Contrato y patrones de cada área
    └── <skill>/references/     → Referencias extensas cargadas bajo demanda
```

---

## `.codex/` — Desarrollo asistido por IA para Codex

Contiene la configuración específica de Codex para agentes, skills y comandos del proyecto.

**Carpeta generada**: `.codex/` se regenera desde `.claude/` (fuente única de verdad) con `npm run sync:codex` (`scripts/sync-codex.mjs`). No se edita a mano, salvo los ficheros listados como *codex-only* en el script (actualmente `commands/merge-develop-into-branches.md`).

```
.codex/
├── AGENTS.md               → Contrato del proyecto para Codex
├── agents/                 → Agentes especializados por dominio
│   ├── contenido.toml      → Agente editorial: i18n, catálogo y microcopy
│   ├── prueba.toml         → Agente de testing: unit, component, E2E y gate
│   ├── rendimiento.toml    → Agente de rendimiento: SEO, bundles y SSR
│   ├── sistemas.toml       → Agente de arquitectura: servicios, estado y routing
│   └── vistas.toml         → Agente de UI: componentes, theming y responsive
├── commands/               → Comandos de workflow y automatización
│   ├── audit-structure.md  → Auditoría automatizada de arquitectura y estructura
│   ├── autocommit.md       → Workflow de commits semánticos; detecta issue key desde la rama
│   └── merge-develop-into-branches.md → Fusión directa de develop en ramas remotas (variante simple)
└── skills/                 → Skills reutilizables (mismo conjunto y formato SKILL.md que `.claude/skills/`, en paridad)
    ├── <skill>/SKILL.md                       → Frontmatter (name, description) + cuerpo; espejo 1:1 de `.claude/skills/`
    └── <skill>/references/                    → (opcional) Material de referencia pesado extraído del SKILL.md
```

---

## `.claude/` — Desarrollo asistido por IA

Contiene la configuración de agentes especializados, skills reutilizables y workflows para el desarrollo con Claude.

```
.claude/
├── .claude-plugin/
│   └── plugin.json          → Manifiesto del plugin (nombre y descripción del proyecto para Claude)
├── CLAUDE.md                → Guía del proyecto para desarrollo asistido con IA
├── launch.json              → Configuración del dev server para el preview de Claude Code
├── agents/                  → Agentes especializados con responsabilidades definidas
│   ├── contenido.md         → Agente editorial: i18n, curación del catálogo de festivales, microcopy UX
│   ├── prueba.md            → Agente de testing: unit, component, E2E, a11y, pre-commit gate
│   ├── rendimiento.md       → Agente de rendimiento: Core Web Vitals, SEO, SSR, bundles, JSON-LD
│   ├── sistemas.md          → Agente de arquitectura: servicios, estado, routing, interceptores, SSR
│   └── vistas.md            → Agente de UI: componentes, design system, theming, responsive, accesibilidad
├── commands/                → Comandos de workflow y automatización
│   ├── audit-structure.md    → Auditoría automatizada de arquitectura: valida estructura, tokens, skills
│   └── autocommit.md        → Workflow de commits semánticos (Conventional Commits); detecta issue key desde la rama
└── skills/                  → Skills reutilizables (formato Agent Skill: SKILL.md con frontmatter name/description)
    ├── <skill>/SKILL.md                 → Cada skill tiene su SKILL.md con frontmatter (name, description) y cuerpo
    ├── <skill>/references/              → (opcional) Material de referencia pesado extraído del SKILL.md
    │
    ├── accessibility/SKILL.md           → WCAG 2.1 AA: contraste, focus, ARIA, navegación por teclado
    ├── angular-developer/SKILL.md       → Skill oficial del Angular Team (Google): referencia de APIs de
    │                                      Angular 21 (signals, DI, routing, SSR…), adaptada al proyecto
    ├── api-integration/SKILL.md         → Servicios HTTP tipados, validación Zod en frontera, caching
    ├── asset-organization/SKILL.md      → Reglas obligatorias para carpetas, nombres y limpieza de assets visuales
    ├── cross-device-compat/SKILL.md     → Compatibilidad cross-browser/dispositivo: .browserslistrc, fallbacks
    │                                      color-mix() con marcador @compat, hover guards, reduced-motion
    ├── design-responsive-validation/SKILL.md → Identidad visual no genérica + validación responsive obligatoria
    ├── error-handling/SKILL.md          → FestivalError normalizado, Sentry, mensajes i18n al usuario
    ├── forms-validation/SKILL.md        → [SPEC de roadmap] Reactive Forms tipados, validadores custom, errores inline (aún no hay formularios)
    ├── i18n-commit-policy/SKILL.md      → Política de traducción en commits: sólo es.json en desarrollo, propagación a ca/en al cerrar
    ├── internationalization/SKILL.md    → Transloco, date-fns, locales es/ca/en, ICU MessageFormat
    ├── liquid-glass/SKILL.md            → Sistema Liquid Glass premium: superficies semitransparentes con blur,
    │   │                                  capas de profundidad, edge glow y accesibilidad
    │   └── references/examples.md         → 5 ejemplos completos de implementación (card, mapa, filtros, hero, Angular) (extraído)
    ├── maps/SKILL.md                    → MapLibre GL JS + Protomaps, lazy-loading, estilo dark custom
    ├── performance-optimization/SKILL.md → OnPush, @defer, imágenes WebP, budgets, SSR
    │   └── references/image-converter.md  → Pipeline Sharp scripts/convert-images.mjs (extraído)
    ├── project-structure/SKILL.md       → Estructura feature-sliced canónica (este documento la resume)
    │   └── references/eslint-boundaries.md → Config completa de eslint-plugin-boundaries (extraído)
    ├── routing-navigation/SKILL.md      → Esquema de URLs en español, loadChildren/loadComponent, resolvers
    ├── sanity-cms/SKILL.md              → Catálogo desde Sanity (CMS) vía @sanity/client: GROQ, cliente en data-access, Zod en frontera
    ├── search/SKILL.md                  → [SPEC de roadmap] MiniSearch: búsqueda fuzzy client-side con boost por campo (MiniSearch sin instalar)
    ├── seo-meta/SKILL.md                → Contrato SEO canónico, ownership, fases e índice normativo
    │   └── references/                  → Reglas SEO obligatorias por ámbito
    │       ├── technical-seo.md         → SSR/prerender, indexación, estados, redirects, robots y sitemap
    │       ├── route-metadata.md        → Title/description, OG, Twitter, canonical y fallbacks SSR
    │       ├── structured-data.md       → MusicEvent, BreadcrumbList, Organization y WebSite
    │       ├── content-local-international.md → SEO de festivales/artistas, local, freshness y hreflang
    │       ├── performance-editorial.md → Core Web Vitals, imágenes, mobile-first y SEO editorial
    │       └── testing-definition-of-done.md → Gates, evidencias y Definition of Done SEO
    ├── state-management/SKILL.md        → Signals, NgRx SignalStore, persistencia localStorage/idb-keyval
    ├── testing-patterns/SKILL.md        → Vitest, Playwright, pre-commit gate, data-testid, cobertura
    │   └── references/examples.md         → Ejemplos de test (Vitest, ATL, Zod) extraídos
    ├── theming-styling/SKILL.md         → Tokens SCSS, paleta dark premium, glassmorphism, motion; gate obligatorio de temas para UI nueva
    │   ├── references/tokens.md           → Catálogo completo de tokens primitivos/semánticos y escalas (extraído)
    │   └── references/theme-adaptation.md → Gate de adaptación claro/oscuro/sistema (antigua skill light-dark-mode, fusionada aquí)
    └── ui-components/SKILL.md           → Catálogo de componentes, variantes, interacciones, estados
```

---

## `design/` — Assets de diseño

Contiene recursos visuales como mockups, paletas de color, inspiraciones y otros materiales de diseño relacionados con el proyecto TuriaFest.

```
design/
├── font/                → Fuentes tipográficas del design system (sólo variable fonts originales)
│   ├── Inter/           → Inter variable font (UI text, data, hero default)
│   ├── JetBrains_Mono/  → JetBrains Mono variable font (mono: fechas, IDs, logs)
│   └── Sora/            → Sora variable font (headings, brand, hero emphasis)
├── info-festivales/     → Material gráfico de referencia para fichas informativas por festival
│   ├── bigsound/        → Logo, carteles por sede y creatividades por días de BIGSOUND
│   ├── latin/           → Logo, cartel base y cartel de Valencia de Latin Fest
│   ├── medusa/          → Logo, cartel por días y creatividades diarias de Medusa
│   ├── arenal/             → Logo y creatividades de artistas destacados de Arenal Sound
│   ├── reve/            → Logo y cartel base de REVE Fest
│   └── zevra/           → Logo, cartel por días y creatividades diarias de Zevra
├── logo/                → Logotipos y variantes de la marca
├── mockups/             → Referencias visuales y capturas de apoyo para iteraciones de UI
│   ├── Gemini_Generated_Image_l8rwoql8rwoql8rw.png → Mockup/export visual usado como referencia externa
│   └── image.png        → Captura de apoyo para validación visual del layout
└── palette/             → Paletas de color y esquemas cromáticos (palette1.svg, palette2.svg)
```

Las instancias estáticas (`*/static/`) y la familia Space Grotesk se eliminaron: la app sólo sirve los ejes variable desde `public/fonts/` y la fuente display canónica es **Sora**.

---

## `scripts/` — Utilidades de proyecto

Scripts Node.js ESM que complementan los comandos de Angular CLI. No forman parte del bundle.

```
scripts/
├── i18n-sync.mjs                      → Sincronizador de locales: lee es.json y propaga claves ausentes a ca.json
│                                        y en.json usando el valor español como placeholder. Acepta --check para
│                                        modo de sólo lectura (exit 1 si hay divergencias, útil en CI).
│                                        Uso: npm run i18n:sync | npm run i18n:check
├── convert-images.mjs                 → Conversor Sharp: recorre `src/assets/images-src/` recursivamente y genera
│                                        WebP en `src/assets/images/` (presets hero/og/default; soporte JXL vía djxl).
│                                        Uso: npm run images:convert
├── sync-codex.mjs                     → Regenera `.codex/` desde `.claude/` (fuente única): espejo de skills/ y
│                                        commands/ (con lista codex-only), agents/*.md → *.toml y AGENTS.md desde
│                                        CLAUDE.md. Acepta --check (exit 1 si había deriva).
│                                        Uso: npm run sync:codex | npm run sync:codex:check
├── merge-develop-into-branches.sh     → Variante simple: fusiona develop en cada rama remota (excepto main/develop/HEAD),
│                                        empuja a origin y termina en develop. Para en el primer conflicto (`set -e`).
│                                        Uso: npm run branches:merge-develop-into-all
└── update-branches-from-develop.sh    → Variante con agente: fusiona develop en cada rama remota (excepto main/develop/HEAD),
                                         empuja a origin y restaura la rama original. En conflicto sale con exit `2`,
                                         deja el merge activo y lista ficheros para que el agente resuelva (no aborta).
                                         Requiere working tree limpio. Uso: npm run branches:update-from-develop
```

---

## `docs/` — Documentación

```
docs/
├── documentacion.md     → Este fichero. Propósito de cada carpeta y función de cada fichero del proyecto.
├── fechas-festivales.md → Fechas verificadas por festival (fuente editorial del agente contenido).
└── presentacion-proyecto.md → Documento informativo del proyecto (presentación, contexto y objetivos).
```

---

## `public/` — Ficheros estáticos

Servidos directamente por el servidor sin procesamiento. No pasan por el pipeline de Angular.

```
public/
├── favicon.ico          → Icono del sitio mostrado en la pestaña del navegador
├── festival-detail-{arenal,bigsound,latin-fest,medusa,reve,zevra}.json
│                        → Datos verificados por festival (facts diarios: ubicación, género, precio,
│                          edad, horario). Cargados por FestivalDetailFactsService y validados con Zod.
└── fonts/               → Fuentes variable self-hosted servidas por el servidor
    ├── Inter-VariableFont_opsz,wght.ttf
    ├── Inter-Italic-VariableFont_opsz,wght.ttf
    ├── Sora-VariableFont_wght.ttf
    ├── JetBrainsMono-VariableFont_wght.ttf
    └── JetBrainsMono-Italic-VariableFont_wght.ttf
```

> Cuando arranque la fase CMS se reintroducirán las carpetas `sanity/` (Sanity Studio independiente con `sanity.config.ts` + schemas que reflejen los Zod de `@shared/domain/`) y `scripts/` (conversor Sharp PNG/JPEG → WebP). Se eliminaron del repositorio mientras estuvieron vacías para no dejar deuda visible.

---

## `src/` — Código fuente

### Ficheros raíz de `src/`

```
src/
├── index.html           → Documento HTML principal. `lang="es-ES"`, título `TuriaFest`,
│                          meta theme-color, favicon PNG + .ico, monta <fv-root>. Incluye un
│                          script inline bloqueante anti-parpadeo que aplica `data-theme` desde
│                          localStorage('fv-theme') antes del primer pintado (ver ThemeService).
├── main.ts              → Punto de entrada del cliente. Llama a bootstrapApplication con la
│                          configuración de app.config.ts.
├── main.server.ts       → Punto de entrada del servidor SSR. Bootstrap de la app con la
│                          configuración de app.config.server.ts para Angular Universal.
├── server.ts            → Servidor Express para SSR. Sirve ficheros estáticos de /browser,
│                          delega el resto a AngularNodeAppEngine para renderizado server-side.
│                          Puerto por defecto: 4000.
└── styles/              → Directorio de estilos globales (ver sección dedicada más abajo).
```

### `src/styles/` — Estilos globales

Partials SCSS consumidos por `styles.scss`. Los componentes importan mixins a través de `@use 'styles/mixins' as *` (resuelto por `stylePreprocessorOptions.includePaths: ["src"]`). El namespace canónico de tokens es `--fv-*`.

```
src/styles/
├── styles.scss          → Punto de entrada SCSS global. Compone los partials en orden de dependencia.
├── _tokens.scss         → Tokens primitivos SCSS (paleta cruda $fv-gray-*, $fv-violet-*, …). No expone CSS vars.
├── _semantic.scss       → Tokens semánticos como CSS custom properties --fv-bg-*, --fv-text-*, --fv-accent-*,
│                          --fv-border-*, --fv-gradient-*. Son los que consumen los componentes.
│                          `:root` es el tema CLARO; el mixin `fv-theme-dark` redefine los tokens
│                          de "chrome" (page/nav/footer/card-light/tile-dark…) y se aplica en
│                          `:root[data-theme="dark"]` y en `@media (prefers-color-scheme: dark)`
│                          cuando no hay `data-theme` (modo system).
├── _safari-compat.scss  → Capa de compatibilidad Safari < 16.2: fallbacks estáticos para
│                          color-mix() y ajustes específicos (ver skill cross-device-compat).
├── _typography.scss     → Escala tipográfica: --fv-text-*, --fv-leading-*, --fv-tracking-*.
├── _fonts.scss          → @font-face de Inter, Sora y JetBrains Mono (variable fonts self-hosted).
│                          Tokens de rol --fv-font-ui/heading/hero/hero-emphasis/festival-name/mono/brand,
│                          más clases utilitarias .fv-font-*.
├── _spacing.scss        → Escala de espaciado (base 4 px): --fv-space-0..10.
├── _radii.scss          → Escala de radios: --fv-radius-sm/md/lg/xl/2xl/pill.
├── _shadows.scss        → Sistema de elevación: --fv-shadow-card/elevated/focus/glow-violet.
├── _motion.scss         → Duraciones y curvas: --fv-duration-*, --fv-ease-*. Honra prefers-reduced-motion.
├── _breakpoints.scss    → Mapa SCSS $fv-breakpoints + mixin `from($bp)` (mobile-first).
├── _mixins.scss         → Mixins reutilizables: glass(), focus-ring, container, truncate, line-clamp.
├── _animations.scss     → Keyframes fv-fade-up, fv-pulse-soft, fv-live-dot, fv-glow-pulse y fv-featured-marquee.
├── _reset.scss          → Reset opinionado (box-sizing, márgenes, listas, foco, tipografía base).
└── utilities/           → Utilidades SCSS singulares
    └── _liquid-glass.scss → Mixin liquid-glass y clases .glass-* para el sistema Liquid Glass premium
```

### `src/environments/` — Configuración por entorno

```
src/environments/
├── environment.ts       → Entorno por defecto (development). `production: false`, `defaultLocale: 'es-ES'`,
│                          `baseUrl: 'http://localhost:4200'`, bloque `sanity`, bloque `maps`
│                          (styleUrl CARTO dark, center/zoom sobre la Comunidad Valenciana),
│                          bloque `sentry: { dsn: '' }` (vacío en dev). Exporta el tipo `Environment`.
└── environment.prod.ts  → Entorno de producción. `production: true`, `baseUrl: 'https://festival.example.com'`,
                           `useCdn: true`, `dataset: 'production'`. Bloque `maps`: styleUrl apunta
                           a `/assets/maps/festival-dark.json` (self-hosted Protomaps).
                           Bloque `sentry: { dsn: '' }` (rellenar con el DSN real antes del deploy).
```

### `src/assets/` — Recursos estáticos

```
src/assets/
├── branding/            → Assets de marca servidos en runtime
│   ├── festi-val-logo.webp → Logo principal (letras navy) usado por la cabecera en tema claro
│   ├── festi-val-logo-dark.webp → Variante del logo con letras blancas para el tema oscuro
│   │                              (mismo icono en color; conmutado por ThemeService en nav-bar/footer)
│   └── favicon.png         → Icono de marca de alta resolución usado como favicon moderno
├── i18n/                → Ficheros de traducción JSON. `es.json` es la fuente de verdad; el resto
│   │                      mantiene paridad de claves. La propagación a los locales soportados
│   │                      (`ca`, `en`) ocurre durante un commit (skill `i18n-commit-policy`).
│   ├── es.json          → Fuente de verdad es-ES. Claves con puntos (nav.home, home.hero.title…).
│   ├── ca.json          → Locale roadmap ca-ES-valencia.
│   └── en.json          → Locale roadmap en-GB.
├── icons/               → Iconos SVG adicionales a Lucide
│   └── .gitkeep
├── images/              → Imágenes WebP generadas por el conversor Sharp. Comiteadas, nunca editadas a mano.
│   ├── backgrounds/     → Fondos y hero images optimizadas para runtime
│   │   ├── home-hero-sunset-beach-800.webp
│   │   ├── home-hero-sunset-beach-1200.webp
│   │   └── home-hero-sunset-beach-1600.webp
│   ├── flags/           → Banderas de idioma en WebP (flag-es, flag-ca, flag-en) para el selector de la nav-bar.
│   │   ├── flag-es.webp
│   │   ├── flag-ca.webp
│   │   └── flag-en.webp
│   ├── festivals/       → Logos y carteles de festivales en WebP listos para runtime, por slug.
│   │   ├── bigsound/    → logo-bigsound.webp, cartel-bigsound-valencia-2026.webp
│   │   ├── latin-fest/  → logo-latin-fest.webp, cartel-latin-fest-{benidorm,valencia}-2026.webp
│   │   ├── medusa/      → logo-medusa-2026.webp, cartel-medusa-2026.webp, cartel-medusa-{jueves,viernes,sabado,domingo}-2026.webp
│   │   ├── arenal/         → logo-arenal.webp, cartel-arenal.webp
│   │   ├── reve/        → logo-reve.webp, cartel-reve-roig-arena-valencia-2026.webp
│   │   └── zevra/       → logo-zevra.webp, cartel-zevra-2026.webp, cartel-zevra-{viernes,sabado,domingo}-2026.webp
│   └── maps/            → Imágenes WebP del mapa de la Comunitat Valenciana usadas por home-festival-map.
│       ├── valencia-map.webp
│       ├── valencia-community-map-gradient.webp
│       └── valencia-community-map-gradient-cropped.webp
├── images-src/          → Imágenes fuente (PNG/JPEG). Comiteadas pero nunca servidas al usuario.
│   ├── backgrounds/     → Fuentes de fondos y hero images antes de la conversión
│   │   └── home-hero-sunset-beach.jpg
│   ├── maps/            → Fuentes del mapa antes de la conversión a WebP.
│   │   ├── valencia-map.png
│   │   └── valencia-community-map-gradient.webp
│   └── festivals/       → Carteles y creatividades fuente de cada festival (organizados por slug).
│       ├── bigsound/    → cartel-bigsound-valencia-2026.jpg
│       ├── latin-fest/  → cartel-latin-fest-benidorm-2026.png, cartel-latin-fest-valencia-2026.webp
│       ├── medusa/      → cartel-medusa-2026.jpg, cartel-medusa-{jueves,viernes,sabado,domingo}-2026.png
│       ├── arenal/      → (sin fuente local; runtime ya contiene logo-arenal.webp y cartel-arenal.webp)
│       ├── reve/        → cartel-reve-roig-arena-valencia-2026.jxl (JPEG XL, requiere conversión)
│       └── zevra/       → cartel-zevra-2026.jpg, cartel-zevra-{viernes,sabado,domingo}-2026.jpeg
└── maps/                → Fichero JSON de estilo MapLibre (tema dark del mapa)
    └── festival-dark.json  → Estilo MapLibre placeholder para producción (self-hosted Protomaps).
                               En desarrollo se usa el estilo CARTO dark desde environment.maps.styleUrl.
```

---

## `src/app/` — Aplicación Angular

### Ficheros raíz de la aplicación

```
src/app/
├── app.ts               → Componente raíz (selector: fv-root, OnPush). Root mínimo: delega todo el
│                          chrome en <fv-shell /> (layout/shell) y en el constructor inyecta
│                          HreflangService.apply(), ThemeService y PageTransitionService.
├── app.html             → Template del componente raíz: únicamente <fv-shell />.
├── app.scss             → Estilos del componente raíz. Define el fondo de página
│                          (--app-page-bg) sand sobre el que se asienta el mockup del header.
├── app.spec.ts          → Tests del componente raíz. Verifica creación y presencia de router-outlet.
├── app.config.ts        → Configuración de la aplicación cliente: registra es-ES (LOCALE_ID +
│                          registerLocaleData), provideRouter, provideClientHydration, provideHttpClient
│                          (withFetch), provideTransloco (availableLangs: es/ca/en, defaultLang: es,
│                          loader: TranslocoHttpLoader) y APP_INITIALIZER que precarga 'es'. Inicializa
│                          Sentry con el DSN de environment.sentry.dsn si está presente.
├── app.config.server.ts → Configuración de la aplicación servidor. Extiende app.config.ts con
│                          provideServerRendering y las rutas de SSR.
├── app.routes.ts        → Definición de rutas top-level. Cada feature se carga con loadChildren
│                          apuntando a su <feature>.routes.ts. Es el boundary de los lazy chunks.
└── app.routes.server.ts → Rutas de servidor SSR: `festivales/:slug` se sirve con RenderMode.Server
│                          (facts diarios bajo demanda) y el resto (`**`) se prerenderiza
│                          (RenderMode.Prerender).
```

### `src/app/core/` — Singletons cross-cutting

Proporcionados una sola vez en el root de la aplicación. Nunca importan de `features/`, `layout/` ni `shared/ui/`.

```
src/app/core/
├── interceptors/
│   └── error.interceptor.ts → errorInterceptor (HttpInterceptorFn): captura errores HTTP y los
│                               convierte en FestivalError vía fromHttpStatus(). Registrado en
│                               provideHttpClient(withInterceptors([errorInterceptor])).
├── handlers/
│   └── festival-error.handler.ts → FestivalErrorHandler (implements ErrorHandler): loguea
│                                    FestivalError en dev; en producción llama a
│                                    Sentry.captureException y muestra un mensaje i18n al usuario
│                                    vía NotificationService. Registrado en app.config.ts.
├── notifications/
│   └── notification.service.ts   → NotificationService (providedIn: 'root'): signal<AppNotification|null>
│                                    que expone show() y dismiss(). Desacoplado de ErrorHandler para
│                                    permitir notificaciones desde cualquier punto de la app.
├── initializers/        → Factorías APP_INITIALIZER: carga del catálogo desde Sanity, registro de
│   │                      locale, hidratación de preferencias de tema desde localStorage.
│   └── transloco.loader.ts → TranslocoHttpLoader: carga los ficheros JSON de traducción desde
│                            `/assets/i18n/<lang>.json`. Inyectado en provideTransloco (app.config.ts).
├── tokens/              → InjectionTokens tipados para configuración inyectable.
│   └── .gitkeep
└── platform/            → Helpers de SSR: wrappers de isPlatformBrowser, guardas para APIs
    ├── hreflang.service.ts → HreflangService: inyecta <link rel="alternate" hreflang="…"> para
    │                         es/ca/en y x-default en <head>. Usa environment.baseUrl. Llamado una
    │                         vez en el constructor de App.
    ├── theme.service.ts   → ThemeService: fuente de verdad del tema (signals, SSR-safe). Estados
    │                         light/dark/system (por defecto system → prefers-color-scheme). Aplica
    │                         `data-theme` en <html> para elecciones manuales, lo elimina en system,
    │                         persiste en localStorage('fv-theme'), reacciona a cambios de
    │                         matchMedia y sincroniza <meta name="theme-color">. Expone mode,
    │                         resolvedTheme, setMode() y toggle().
    ├── theme.service.spec.ts → Tests del ThemeService: default system (device light/dark),
    │                         cambio de dispositivo en runtime, toggle + persistencia, restauración
    │                         tras recarga y elección explícita por encima del dispositivo.
    ├── page-transition.service.ts → PageTransitionService (providedIn: 'root'): escucha los
    │                         eventos del Router (NavigationStart/End/Cancel/Error) y gestiona el
    │                         estado de la barra de progreso (signal<ProgressBarState>: hidden |
    │                         loading | completing). Solo activa 'loading' si la navegación supera
    │                         200 ms; pasa a 'completing' al terminar y vuelve a 'hidden' tras
    │                         500 ms. Instanciado en App para capturar eventos desde el inicio.
    └── page-transition.service.spec.ts → Tests del PageTransitionService.
```

### `src/app/layout/` — Shell de la aplicación

Cargado eagerly. Compone la estructura visual que envuelve todas las rutas.

```
src/app/layout/
├── shell/               → `ShellComponent` (selector `fv-shell`, OnPush). Compone el banner de
│   ├── shell.ts           notificaciones, la nav-bar, la barra de progreso de navegación, el
│   ├── shell.html         `<router-outlet>` dentro de `<main #mainEl>` y el footer. Maneja la
│   ├── shell.scss         animación `fv-page-enter` al cambiar de ruta (escucha `NavigationEnd`
│   └── shell.spec.ts      con `takeUntilDestroyed`). `app.ts` queda como root mínimo que delega
│                          en `<fv-shell />` e inicializa Hreflang/Theme/PageTransition.
├── nav-bar/             → Cabecera sticky del sitio (`position: sticky` en `:host`). Logo `assets/branding/festi-val-logo.webp`
│   ├── nav-bar.ts         vía `NgOptimizedImage` (`priority`), navegación principal (Home,
│   ├── nav-bar.html       Festivals, Calendar, Explore, About), icono de búsqueda y toggle de
│   ├── nav-bar.scss       tema (cableado a ThemeService: icono sol/luna, aria-pressed y
│   └── nav-bar.spec.ts    aria-label i18n nav.theme.toDark/toLight; visible también en móvil).
│                          Mobile-first: en <1024 px aparecen logo, búsqueda, toggle de tema y
│                          hamburguesa. aria-current="page" en el enlace activo vía
│                          routerLinkActive. Incluye el selector de idioma ES/CA/EN con banderas
│                          WebP (`assets/images/flags/`), menú accesible y claves `nav.language.*`.
├── nav-progress-bar/    → Indicador de navegación lenta. Solo aparece si la navegación tarda
│   ├── nav-progress-bar.ts    más de 200 ms (lazy chunks no cacheados). Barra de 3 px fija en
│   ├── nav-progress-bar.html  la parte superior (z-index 200, sobre el nav-bar). Gradiente de
│   ├── nav-progress-bar.scss  marca (#4E8CFF → #A855F7 → #FF5A7A → #F59E0B) con glow azul.
│   └── nav-progress-bar.spec.ts  Dos fases CSS: fv-progress-load (llena hasta ~80 %) →
│                          fv-progress-complete (llena a 100 % y se desvanece). Consume
│                          PageTransitionService. aria-label i18n (`nav.progress.loading`).
│                          Cableado en `shell.html`.
└── footer/              → Pie de página premium (superficie clara #F4F4FA). Divisoria superior sutil
    ├── footer.ts          y grid editorial de 4 columnas: marca (logo `NgOptimizedImage` + claim +
    ├── footer.html        iconos sociales monocromos Instagram/X/YouTube/Spotify) y columnas Explora,
    ├── footer.scss        Información y Legal con enlaces `routerLink`. Barra inferior con copyright.
    └── footer.spec.ts     Textos vía `TranslatePipe` (`footer.*`), tokens `--fv-*-footer`.
                           Mobile-first (1→2→4 columnas). Cableado en `shell.ts`/`shell.html`.
```

### `src/app/features/` — Slices verticales (lazy)

Cada feature es un chunk lazy independiente. Contiene su propia UI, datos y lógica. **Una feature nunca importa de otra feature.** La única superficie pública es `<feature>.routes.ts`.

#### Estructura interna de cada feature

```
features/<nombre>/
├── feature/             → Componente smart de la página, vinculado a la ruta. Inyecta stores
│   └── .gitkeep           y servicios de data-access/, pasa datos a ui/ mediante inputs.
├── ui/                  → Componentes presentacionales locales a esta feature. Sin HTTP ni stores.
│   └── .gitkeep           Reciben datos por input(), emiten eventos por output().
├── data-access/         → Stores (Signals/SignalStore), servicios HTTP, resolvers y schemas Zod
│   └── .gitkeep           locales a esta feature.
└── <nombre>.routes.ts   → Configuración obligatoria de rutas de la feature. Exporta
                           NOMBRE_ROUTES con loadComponent hacia feature/.
```

#### Features del proyecto

```
src/app/features/
├── calendar/            → Página de calendario cronológico por día (`/calendario`).
│   ├── feature/
│   │   ├── calendar.page.ts    → Página smart standalone (OnPush, Signals). Expande el
│   │   │                         catálogo a entradas diarias y agrupa los resultados por mes
│   │   │                         y fecha exacta, ordenando festivales pasados al final.
│   │   ├── calendar.page.html  → Hero editorial mínimo + timeline cronológico por día
│   │   │                         + estado vacío informativo.
│   │   ├── calendar.page.scss  → Layout responsive mobile-first: hero con borde inferior,
│   │   │                         date rail, tarjetas editoriales ligeras con cartel, badges
│   │   │                         por jornada y soporte light/dark.
│   │   └── calendar.page.spec.ts → Tests focalizados: render del hero, timeline y orden
│   │                               cronológico de festivales pasados.
│   ├── data-access/
│   │   └── calendar-catalogue.ts → Catálogo estático de 6 festivales para el calendario:
│   │                               filtros disponibles, rango de fechas diario, cartel,
│   │                               provincia, género y URL de detalle.
│   └── calendar.routes.ts       → Ruta lazy `loadComponent` hacia CalendarPageComponent.
│
├── festival-detail/     → Página de detalle de un festival, cargada vía `/festivales/:slug`.
│   ├── feature/
│   │   ├── festival-detail.page.ts   → Página smart standalone. Lee el slug de ActivatedRoute,
│   │   │                               resuelve la entrada del catálogo una única vez
│   │   │                               (findFestivalDetailEntry; el guard garantiza que existe) y la
│   │   │                               pasa por input [entry] a hero, overview y location-map.
│   │   │                               Inyecta ReviewRotationService (stats → hero) y
│   │   │                               FestivalDetailFactsService (facts → strip).
│   │   ├── festival-detail.page.html → Hero + facts strip + overview + mapa placeholder.
│   │   ├── festival-detail.page.scss → Layout de la página: espaciado vertical y responsive.
│   │   └── festival-detail.page.spec.ts → Tests: creación, stats al hero, facts strip visible.
│   ├── ui/
│   │   ├── festival-hero/            → Hero split 42/58 dirigido por la entrada del catálogo: breadcrumb, título, metadata, CTAs e imagen WebP por festival.
│   │   │   ├── festival-hero.ts         → FestivalHeroComponent (OnPush): `input.required<FestivalDetailEntry>('entry')`
│   │   │   │                              + `input<ReviewStats>('stats')`. Presentacional puro: copy y URLs
│   │   │   │                              vienen de la entry (claves `festival.detail.byFestival.<slug>.*`).
│   │   │   ├── festival-hero.html       → Layout slug-driven. Badge de reseñas condicional con `@if (hasStats())`.
│   │   │   ├── festival-hero.scss
│   │   │   └── festival-hero.spec.ts    → Tests: creación, badge oculto sin stats, plural, singular (slug='medusa').
│   │   ├── festival-detail-facts/    → Tira de datos clave (ubicación, género, precio, edad, horario).
│   │   │   ├── festival-detail-facts.ts   → Presentacional (OnPush): `input<FestivalDetailFacts | null>`.
│   │   │   ├── festival-detail-facts.html → 5 cards con iconos Lucide; enlaces oficiales en precio/horario.
│   │   │   ├── festival-detail-facts.scss → Grid responsive 1→2→5 columnas; tokens `--fv-*`.
│   │   │   └── festival-detail-facts.spec.ts
│   │   ├── festival-overview/        → Bloque editorial «Sobre el festival» dirigido por slug + chips de highlights.
│   │   │   ├── festival-overview.ts     → `input.required<FestivalDetailEntry>('entry')`. Construye claves
│   │   │   │                              `festival.detail.byFestival.<slug>.overview.*` desde entry.slug
│   │   │   │                              y monta vídeo, galería de fotos y carteles cuando la entry los define.
│   │   │   ├── festival-overview.html   → Copy editorial + medios REVE + galería de carteles + highlights accesibles.
│   │   │   ├── festival-overview.scss
│   │   │   └── festival-overview.spec.ts
│   │   ├── festival-featured-video/  → Vídeo destacado opcional por festival, optimizado para autoplay muted.
│   │   │   ├── festival-featured-video.ts   → `input.required<FestivalDetailVideo>('video')`, configura autoplay
│   │   │   │                                  browser-only y reintentos por eventos de media/viewport.
│   │   │   ├── festival-featured-video.html → `<video>` con poster, controls, playsinline y fallback i18n.
│   │   │   ├── festival-featured-video.scss → Frame cinematográfico con tokens y fallback compat.
│   │   │   └── festival-featured-video.spec.ts
│   │   ├── festival-photo-gallery/   → Carrusel fotográfico opcional con imagen activa, flechas y miniaturas.
│   │   │   ├── festival-photo-gallery.ts   → `input.required<FestivalPhotoGallery>('gallery')`, signal
│   │   │   │                                 `activeIndex` y navegación circular.
│   │   │   ├── festival-photo-gallery.html → Imagen principal con `NgOptimizedImage`, controles accesibles y rail.
│   │   │   ├── festival-photo-gallery.scss → Visor de altura estable para fotos verticales/horizontales.
│   │   │   └── festival-photo-gallery.spec.ts
│   │   ├── festival-poster-gallery/  → Composición editorial con cartel destacado + carrusel continuo de jornadas, ampliación modal y pausa por hover/foco.
│   │   │   ├── festival-poster-gallery.ts   → `input.required<FestivalDetailEntry>('entry')`, signals `isPaused`/`activePoster`,
│   │   │   │                                  `featuredPoster`/`carouselPosters` derivados de entry.posters y cierre por Escape.
│   │   │   ├── festival-poster-gallery.html → Sección condicional con bloque destacado y track duplicado para marquee,
│   │   │   │                                  botón por cartel y diálogo accesible para la vista ampliada.
│   │   │   ├── festival-poster-gallery.scss → Layout responsive mobile-first, animación `fv-poster-marquee`,
│   │   │   │                                  fallback de motion y tokens temáticos `--fv-*`.
│   │   │   └── festival-poster-gallery.spec.ts → Tests: render, duplicado del carrusel, pausa/reanudación,
│   │   │                                          apertura/cierre del diálogo y ocultación sin carteles.
│   │   └── festival-location-map/    → Iframe oficial de Google Maps (Share → Embed) centrado en la ubicación del festival.
│   │       ├── festival-location-map.ts   → `input.required<FestivalDetailEntry>('entry')`. Sanitiza con
│   │       │                                `DomSanitizer` la `entry.map.embedUrl` (formato `maps/embed?pb=…`,
│   │       │                                único formato de iframe no bloqueado por X-Frame-Options).
│   │       ├── festival-location-map.html → Iframe lazy sin marco (sin border/box-shadow), title i18n.
│   │       ├── festival-location-map.scss
│   │       └── festival-location-map.spec.ts
│   ├── data-access/                  → Servicios y datos del detalle.
│   │   ├── festival-detail-catalogue.ts → Catálogo tipado por slug con claves i18n del hero/overview,
│   │   │                               URLs oficiales/entradas, poster del hero, carteles por jornada
│   │   │                               (`FestivalDetailPoster[]`) y coordenadas para el mapa.
│   │   │                               Expone `findFestivalDetailEntry`, `isFestivalDetailSlug` y
│   │   │                               `FESTIVAL_DETAIL_SLUGS`.
│   │   ├── festival-detail.guard.ts → `festivalDetailGuard` (CanActivateFn). Valida `:slug` contra
│   │   │                               el catálogo; redirige a `/` cuando no existe.
│   │   ├── festival-detail.guard.spec.ts → Tests del guard: paso con slug del catálogo y
│   │   │                               redirección a `/` con slug desconocido.
│   │   ├── festival-detail-facts.model.ts → FestivalDetailFactsSchema (Zod) + tipo inferido.
│   │   ├── festival-detail-facts.service.ts → Carga `/festival-detail-{slug}.json?day=YYYY-MM-DD`
│   │   │                               desde `public/`, valida con Zod, refresca a medianoche.
│   │   ├── reviews.data.ts           → Catálogo estático de 60 reseñas originales en español:
│   │   │                               10 por festival × 6 slugs (bigsound, latin-fest, medusa,
│   │   │                               arenal, reve, zevra). Ratings 2–5, texto original. Exporta
│   │   │                               FESTIVAL_REVIEWS (array plano) y REVIEWS_BY_FESTIVAL
│   │   │                               (ReadonlyMap<string, readonly FestivalReview[]>).
│   │   ├── review-rotation.service.ts → ReviewRotationService (providedIn: 'root'): rotación
│   │   │                               diaria determinista de reseñas. getFeaturedReviews(slug,
│   │   │                               date?) devuelve 3 reseñas circulares usando semilla
│   │   │                               (utcDateKey × 1_000_003 + djb2Hash(slug)) >>> 0.
│   │   │                               getStats(slug) calcula media y total. Sin Math.random().
│   │   └── review-rotation.service.spec.ts → 12 tests: determinismo, rotación por festival,
│   │                                          días distintos, estado vacío, stats y wrap circular.
│   └── festival-detail.routes.ts    → Superficie pública. Expone FESTIVAL_DETAIL_ROUTES con
│                                       loadComponent hacia festival-detail.page.
│
├── festival-list/       → Listado de festivales (`/festivales`). Feature ligera sin data-access
│   │                      propia: consume el catálogo compartido `@shared/data-access/festival-catalogue`.
│   ├── feature/
│   │   ├── festival-list.page.ts   → Página smart standalone (OnPush). Expone FEATURED_FESTIVALS
│   │   │                             como grid de tarjetas enlazadas a `/festivales/:slug`.
│   │   ├── festival-list.page.html → Grid `role="list"` con tarjeta por festival (imagen ngSrc,
│   │   │                             fecha, nombre, ubicación) e i18n vía `| t`.
│   │   ├── festival-list.page.scss → Grid responsive con póster, overlay y tokens `--fv-*`.
│   │   └── festival-list.page.spec.ts → Tests: número de tarjetas, testid por slug e imagen.
│   └── festival-list.routes.ts     → Superficie pública. Expone FESTIVAL_LIST_ROUTES con loadComponent.
│
└── home/                → Página de inicio. Muestra festivales destacados, hero con glow
                           atmosférico, acceso rápido a búsqueda y filtros.
    ├── feature/
    │   ├── home.page.ts    → Página de inicio standalone. Orquesta el hero editorial, el calendario
    │   │                     `festival-calendar`, el carrusel `featured-festivals`, la FAQ
    │   │                     `home-faq` y el mapa interactivo `home-festival-map`, al que pasa
    │   │                     `FESTIVAL_LOCATIONS` (de `@shared/data-access`) vía el input `locations`.
    │   ├── home.page.html  → Hero con CTAs + calendario premium + carrusel de festivales + FAQ
    │   │                     editorial + mapa de pines.
    │   ├── home.page.scss  → Layout de la home: espaciado vertical, hero card y responsive.
    │   └── home.page.spec.ts → Tests del hero, calendario, sección de festivales, FAQ y sección de mapa.
    ├── ui/
    │   ├── festival-calendar/
    │   │   ├── festival-calendar.ts      → Componente local standalone del calendario editorial.
    │   │   │                               Presentacional: recibe `monthSegments` y `festivals` por
    │   │   │                               `input.required` desde home.page. Carrusel auto-rotativo
    │   │   │                               (5 s) con `activeIndex: signal`, `focusFestival()` para
    │   │   │                               hover sobre días destacados, selección tipada de días
    │   │   │                               rotulados y `afterNextRender` + `DestroyRef` (SSR-safe).
    │   │   ├── festival-calendar.html    → Header con título + subtítulo, fila de meses proporcional
    │   │   │                               (JUNIO/JULIO/AGOSTO 15/31/18), rail gradiente, ruler con
    │   │   │                               ticks + fechas de referencia y 5 cards posicionadas bajo
    │   │   │                               su fecha en desktop.
    │   │   ├── festival-calendar.scss    → Línea temporal horizontal con tokens semánticos, ticks
    │   │   │                               secundarios, días destacados decorados con ::before absoluto
    │   │   │                               (no expanden el grid), cards 10rem con fade entre slides y
    │   │   │                               fallback en grid para tablet/mobile.
    │   │   └── festival-calendar.spec.ts → Tests de render, días rotulados, índice activo, transición
    │   │                                   por `focusFestival()` y semántica del autoplay con fake timers.
    │   ├── featured-festivals/
    │   │   ├── featured-festivals.ts      → Componente local standalone con datos de festivales
    │   │   │                                destacados. Importa RouterLink: cada tarjeta enlaza a
    │   │   │                                `/festivales/:slug`.
    │   │   ├── featured-festivals.html    → Header "Festivales destacados" y tarjetas `<a>` con imagen,
    │   │   │                                fecha, nombre y ubicación, con routerLink por festival.
    │   │   ├── featured-festivals.scss    → Carrusel horizontal sin fondo propio: movimiento continuo
    │   │   │                                en desktop, avance cada 3 s en móvil y sin lift en hover.
    │   │   │                                `.featured-festivals__card` como bloque (display: block).
    │   │   └── featured-festivals.spec.ts → Tests de render y pista duplicada. Usa provideRouter([]).
    │   ├── home-faq/
    │   │   ├── home-faq.ts      → Componente standalone de FAQ editorial para la home. Mantiene
    │   │   │                      el estado abierto/cerrado con `signal<string|null>` y renderiza
    │   │   │                      6 preguntas frecuentes tipadas con claves i18n.
    │   │   ├── home-faq.html    → Sección con header editorial + grid responsive de acordeones
    │   │   │                      accesibles (`button`, `aria-expanded`, `aria-controls`).
    │   │   ├── home-faq.scss    → Tarjetas FAQ con borde, acento por item, icono plus rotado y
    │   │   │                      layout 1 columna móvil / 2 columnas tablet+.
    │   │   └── home-faq.spec.ts → Tests de render y toggle abrir/cerrar respuesta.
    │   ├── spotify-playlists/
    │   │   ├── spotify-playlists.ts      → Componente standalone que embebe playlists oficiales de
    │   │   │                               Spotify de cuatro festivales (Zevra, Medusa, Arenal Sound,
    │   │   │                               Latin Fest) mediante iframes. Usa DomSanitizer para
    │   │   │                               URLs seguras y TranslationKey tipada para i18n.
    │   │   ├── spotify-playlists.html    → Sección con título, subtítulo, grid responsivo (1/2/4 cols)
    │   │   │                               de tarjetas con logo del festival + iframe de Spotify.
    │   │   └── spotify-playlists.scss    → Glow radial, divisor sutil, tarjetas transparentes sobre
    │   │                                   fondo de página. Tokens semánticos y color-mix().
    │   └── home-festival-map/
    │       ├── home-festival-map.ts      → Componente interactivo de pines sobre imagen del mapa
    │       │                               valenciano. Recibe las localizaciones por
    │       │                               `input.required('locations')` (ui/ presentacional) y las
    │       │                               combina con su config local de pines/imágenes en un
    │       │                               `computed`. Signals para festival activo y panel visible.
    │       │                               Carrusel automático (setInterval 3 s) con
    │       │                               afterNextRender + DestroyRef.
    │       ├── home-festival-map.html    → Figura con imagen + lista de pines accesibles (aria-pressed)
    │       │                               + panel lateral con tarjeta del festival activo.
    │       ├── home-festival-map.scss    → Layout grid pane/panel; pines con tono por festival;
    │       │                               transiciones de tarjeta con blur. Sin tokens violeta.
    │       └── home-festival-map.spec.ts → Tests de render, pins, festival por defecto, activación
    │                                      y ciclo automático (vi.useFakeTimers).
    ├── data-access/
    │   ├── home-catalogue.ts → Catálogo estático de la home: CALENDAR_MONTH_SEGMENTS,
    │   │                       CALENDAR_FESTIVALS (7 entradas) y NEXT_FESTIVALS (countdown del
    │   │                       hero). Exporta los tipos CalendarMonth, CalendarMonthData,
    │   │                       CalendarFestivalEntry, CalendarTone, CalendarCardAlign y
    │   │                       NextFestivalEntry. home.page (feature/) lo consume y pasa los datos
    │   │                       a festival-calendar (ui/) por input. Los datos del carrusel destacado
    │   │                       viven en `@shared/data-access/festival-catalogue.ts` (compartido con
    │   │                       festival-list).
    │   └── festival-locations.ts → Array readonly de FestivalLocation con los 7 festivales semilla:
    │                           key (p. ej. `bigsound`, `reve`, `latinValencia`…), claves i18n,
    │                           startDate ISO, lat/lng, category, markerTone. Movido desde
    │                           shared/data-access (2026-07-04): su único consumidor es la feature
    │                           home (home.page → home-festival-map por input `locations`).
    └── home.routes.ts   → Superficie pública de la feature. Expone HOME_ROUTES con loadComponent
```

> `artist-detail/`, `search/` y `about/` están en el roadmap del proyecto y todavía no existen en el árbol: se documentarán aquí cuando se creen sus scaffolds.

### `src/app/shared/` — Toolbox horizontal

Código reutilizado por **2 o más features**. Nunca importa de `features/` ni de `layout/`. Un componente empieza en su feature y se promueve a `shared/` cuando una segunda feature lo necesita.

```
src/app/shared/
├── ui/                  → Componentes presentacionales compartidos por ≥ 2 features.
│   └── notification-banner/  → Banner de notificación accesible para mostrar errores al usuario.
│       ├── notification-banner.ts   → NotificationBannerComponent: lee NotificationService (signal),
│       │                              renderiza el banner con role="alert" y aria-live="polite".
│       ├── notification-banner.html → Renderiza el mensaje (i18n key | t) y botón de cierre.
│       ├── notification-banner.scss → Tokens semánticos: --fv-accent-danger, focus-ring mixin.
│       └── notification-banner.spec.ts → Tests: banner oculto sin notificación, alerta accesible
│                                         (role/aria-live/clase por tipo) y cierre por botón.
├── data-access/         → Servicios, datos y stores compartidos por ≥ 2 features. Hoy contiene el
│   │                      catálogo de festivales destacados y la capa i18n. Los servicios de catálogo
│   │                      (FestivalService, SearchService, stores…) se añadirán cuando arranque su fase.
│   │                      (festival-locations.ts se movió a features/home/data-access/ y
│   │                      map-loader.service.ts se eliminó junto a maplibre-gl el 2026-07-04 —
│   │                      ver historial.)
│   ├── festival-catalogue.ts → Catálogo readonly FEATURED_FESTIVALS (6 entradas: bigsound, latin-fest,
│   │                           medusa, arenal, reve, zevra) con claves i18n de fecha/nombre/ubicación
│   │                           e imagen (src, alt, width, height). Tipo FeaturedFestivalEntry.
│   │                           Consumido por featured-festivals (home ui/) y festival-list (feature/).
│   └── i18n/            → Capa i18n con Transloco.
│       ├── translations.ts            → Importa `es.json` vía `@assets/i18n/es.json`. Exporta
│       │                                `ES_TRANSLATIONS`, el tipo `Translations` y el tipo
│       │                                `TranslationKey` (literal union de dotted paths).
│       ├── translation.service.ts     → `TranslationService` (providedIn: 'root'). Inyecta
│       │                                `TranslocoService` de forma opcional: en producción delega
│       │                                en Transloco; en tests (sin Transloco provisto) usa el
│       │                                bundle estático ES_TRANSLATIONS. Expone `t(key)`,
│       │                                `setTranslations()` y la signal `activeLang`.
│       └── translation.service.spec.ts → Specs del servicio.
├── domain/              → Modelos de dominio: interfaces TypeScript + schemas Zod.
│   ├── festival.model.ts          → FestivalSchema (Zod) + tipos inferidos Festival y Artist.
│   │                                Forma canónica del catálogo: slug, nombre, provincia, ciudad,
│   │                                fechaInicio/Fin, generos, cartel, precioDesde, urlOficial,
│   │                                poster, ubicacion. Usado en la frontera HTTP (safeParse).
│   ├── festival-error.model.ts    → FestivalError (extends Error): code FestivalErrorCode,
│   │                                originalError. Método estático fromHttpStatus().
│   └── review.model.ts            → FestivalReviewSchema (Zod) + tipo inferido FestivalReview:
│                                    id, festivalSlug, author, rating (1–5), comment, date ISO,
│                                    verified, source?. Exporta también ReviewStats { averageRating,
│                                    totalCount }.
├── pipes/               → Pipes genéricos reutilizables.
│   ├── translate.pipe.ts      → Pipe impuro `| t` que delega en `TranslationService`.
│   │                            Lee la signal `activeLang` para que Angular detecte cambios
│   │                            de idioma y re-ejecute el pipe. Uso: `{{ 'nav.home' | t }}`.
│   └── translate.pipe.spec.ts → Spec del pipe sobre un host standalone.
├── directives/          → Directivas genéricas compartidas.
│   └── .gitkeep
├── util/                → Funciones puras sin dependencia de Angular: formateo, helpers,
│   └── .gitkeep           validators (dniValidator, dateRangeValidator, priceRangeValidator).
└── testing/             → Helpers de test reutilizables entre specs: fixtures, mocks de
    └── .gitkeep           HttpClient, fábricas de datos de prueba.
```

---

## Ficheros de configuración (detalle)

### `angular.json`

Configuración de Angular CLI para el proyecto `TuriaFest`:

- **Build**: builder `@angular/build:application`, entry browser `src/main.ts`, server `src/main.server.ts`, SSR con Express (`src/server.ts`).
- **Assets**: además de `public/` (servido en raíz), `src/assets/` se sirve bajo `/assets/` para imágenes, fuentes adicionales, iconos, etc.
- **Estilos**: SCSS como preprocesador, `stylePreprocessorOptions.includePaths: ["src"]` para permitir `@use 'styles/...'` desde componentes.
- **Budgets**: inicial ≤ 480 KB warning / 520 KB error; lazy chunks ≤ 80 KB warning / 120 KB error; component styles ≤ 8 KB warning / 12 KB error. (Cifras raw, sin gzip; `angular.json` es la fuente de verdad.)
- **Prefix**: `fv` (todos los componentes generados usan selector `fv-*`).
- **Lint**: builder `@angular-eslint/builder:lint`, patrones `src/**/*.ts` y `src/**/*.html`.
- **Schematics**: `angular-eslint` como colección de schematics, componentes SCSS por defecto.

### `tsconfig.json`

Configuración base de TypeScript:

- **Target**: ES2022, `module: "preserve"`, `strict: true`.
- **Path aliases**: `@core/*`, `@layout/*`, `@features/*`, `@shared/*` (ui, data-access, domain, util, pipes, directives, testing), `@env/*`, `@assets/*` (registrado en `eslint-plugin-boundaries` como elemento `asset`; sólo `shared` puede importarlo). El namespace SCSS se resuelve por `stylePreprocessorOptions.includePaths: ["src"]`; no hay alias TS para estilos.
- **Angular compiler**: templates estrictos, parámetros de inyección estrictos, inputs estrictos.

### `tsconfig.app.json`

Extiende `tsconfig.json`. Output en `out-tsc/app`. Incluye todo `src/**/*.ts` excepto `*.spec.ts`. Tipos: `node`.

### `tsconfig.spec.json`

Extiende `tsconfig.json`. Output en `out-tsc/spec`. Incluye `*.spec.ts` y `*.d.ts`. Tipos: `vitest/globals`.

### `eslint.config.js`

Configuración flat de ESLint:

- Para `**/*.ts`: reglas recomendadas de ESLint + TypeScript ESLint + Angular ESLint. Procesador de templates inline. Selectores forzados a prefix `fv-` (components kebab-case, directives camelCase). `eslint-plugin-boundaries` configurado con elementos `core / layout / feature / shared / app / env` y la matriz de dependencias `features → core/shared/env`, `layout → core/shared/env`, `shared → core/shared/env`, `core → core/shared/env`; la única superficie pública de una feature es su `<feature>.routes.ts`.
- Para `**/*.html`: reglas recomendadas de templates Angular + reglas de accesibilidad en templates.

### `.editorconfig`

Reglas de formato: UTF-8, espacios de 2, newline final, trim trailing whitespace. Comillas simples en TypeScript. Sin trim en Markdown.

### `package.json`

Scripts principales: `start` (ng serve), `build` (ng build), `test` (ng test), `lint` (ng lint), `watch` (ng build --watch), `i18n:sync` (propaga claves de es.json a ca.json/en.json), `i18n:check` (verifica paridad sin escribir; falla con exit 1 en CI). Prettier configurado inline. Dependencias principales: Angular 21, Express 5, RxJS 7, TypeScript 5.9, @jsverse/transloco 8.x. Dev: Angular CLI, Vitest, Angular ESLint.

---

## Regla de dependencias entre capas

```
features  →  shared  →  (nada)
features  →  core
layout    →  shared, core
core      →  core (solo a sí mismo)
```

- Una **feature nunca importa otra feature**.
- **shared nunca importa de features ni de layout**.
- **core nunca importa de features, layout ni shared/ui**.
- Dentro de una feature, **ui/ nunca importa de data-access/**.
- La **única superficie pública** de una feature es su `<feature>.routes.ts`.

Estas reglas están forzadas por `eslint-plugin-boundaries` (configurado en `eslint.config.js`).

---

## Historial de cambios estructurales

| Fecha | Cambio | Motivo |
| --- | --- | --- |
| 2026-07-17 | Se añadieron seis referencias normativas bajo `.codex/skills/seo-meta/references/` y su espejo generado en `.claude/skills/seo-meta/references/`. | Convertir `seo-meta` en un estándar SEO mantenible y verificable sin crear una nueva jerarquía documental. |
| 2026-07-21 | Se eliminó la feature `news/` y la ruta `/noticias`; el enlace «Noticias» del header apunta ahora al sitio externo `https://turiafestnoticias.es`. | Las noticias se publican en un portal propio; mantener una página vacía en la app duplicaba superficie sin contenido. |
