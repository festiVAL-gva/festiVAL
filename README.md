# 🎵 festiVAL

> Tu portal de los principales festivales de música de la Comunidad Valenciana.

---

## 📖 Descripción

**festiVAL** es una aplicación web informativa desarrollada con **Angular 21 + SSR** para reunir, en un solo sitio, la información más útil de los principales festivales de música de la Comunidad Valenciana. La página está pensada para ayudar a una persona a entender rápidamente qué festivales hay, cuándo se celebran, dónde se hacen y qué tipo de experiencia ofrece cada uno.

No es una plataforma de venta de entradas ni una red social. Su función es servir como **portal de descubrimiento y consulta**: muestra fechas, ubicaciones, géneros, carteles visuales, precios orientativos, enlaces oficiales y contexto general para que el usuario compare opciones antes de decidir a cuál festival quiere ir.

La interfaz está orientada principalmente a **móvil**, usa **español (es-ES)** como idioma principal y se centra en un catálogo inicial de festivales relevantes de **Valencia, Alicante y Castellón**.

---

## 🎯 De qué va la página

La web gira alrededor de una idea simple: **facilitar la planificación festivalera dentro de la Comunidad Valenciana**.

En lugar de obligar al usuario a saltar entre Instagram, carteles sueltos, webs oficiales y mapas externos, `festiVAL` concentra la información base en una experiencia única y visual:

- Qué festivales hay en la temporada.
- En qué ciudad y provincia se celebran.
- Qué fechas ocupan dentro del verano.
- Qué estilo musical domina en cada evento.
- Qué precio de entrada orientativo tiene cada festival.
- Dónde ampliar información o comprar entradas desde su web oficial.

El objetivo de producto es que una persona pueda entrar en la web y responder rápido a preguntas como:

- "¿Qué festivales urbanos hay este verano en Valencia o Alicante?"
- "¿Cuál me encaja mejor por fechas?"
- "¿Qué evento parece más grande o más alineado con mis gustos?"
- "¿Dónde se celebra exactamente y dónde miro la información oficial?"

---

## 🧭 Qué puede hacer el usuario hoy

Actualmente la aplicación ya permite este recorrido:

1. **Entrar en la home** y descubrir el enfoque general de la temporada mediante una portada visual, un bloque del próximo festival, una selección destacada, un mapa y secciones editoriales.
2. **Abrir el catálogo de festivales** en `/festivales` y ver las tarjetas principales del catálogo actual.
3. **Entrar en la ficha de un festival** en `/festivales/:slug` para consultar información ampliada, enlaces oficiales, precio orientativo, datos de acceso, contexto del evento y ubicación.
4. **Consultar el calendario** en `/calendario` para ver los festivales ordenados cronológicamente según sus días de celebración.

Hoy la web funciona sobre todo como una **guía curada de consulta**. La experiencia se apoya en contenido visual, fichas por festival y navegación clara entre portada, listado, detalle y calendario.

---

## 🎪 Catálogo actual

El catálogo inicial documentado en la aplicación incluye estos festivales:

- **Bigsound Festival**
- **Latin Fest**
- **Medusa Festival**
- **Reggaeton Beach Festival**
- **Reve Festival**
- **Zevra Festival**

La home y el calendario también refuerzan el contexto geográfico de la temporada mediante ubicaciones dentro de la Comunidad Valenciana.

---

## ✨ Características

- 🎪 **Portal de descubrimiento** — Reúne festivales destacados de la Comunidad Valenciana en una sola experiencia.
- 🏠 **Home editorial** — Portada con hero visual, próximo festival, selección destacada, mapa, FAQ y playlists.
- 📄 **Fichas individuales** — Cada festival tiene una página propia con resumen, datos útiles, enlaces y ubicación.
- 🗓️ **Calendario de temporada** — Vista cronológica para entender rápidamente cuándo cae cada festival.
- 📍 **Contexto geográfico** — La aplicación sitúa los eventos dentro del territorio valenciano y facilita la lectura por ubicación.
- 📱 **Responsive** — Experiencia adaptada a móvil, tablet y escritorio.
- ⚡ **SSR + prerenderizado** — Base preparada para rendimiento y SEO en rutas relevantes.

---

## 🚧 Qué no hace todavía

Para evitar confusiones, esto sigue fuera del alcance actual o está en fase futura:

- No vende entradas directamente.
- No requiere cuenta ni registro.
- No incorpora todavía flujos sociales o favoritos persistentes.
- No expone todavía un buscador público completo ni una capa de filtros avanzada en la interfaz actual.

---

## 🛠️ Tech Stack

Las decisiones canónicas viven en [`.codex/AGENTS.md`](.codex/AGENTS.md). Resumen:

| Capa             | Tecnología                            |
| ---------------- | ------------------------------------- |
| Framework        | Angular 21 (standalone, Signals, SSR) |
| Lenguaje         | TypeScript 5.x (strict)               |
| Estilos          | SCSS + design tokens (`--fv-*`)       |
| Iconos           | Lucide (`lucide-angular`)             |
| Fechas           | date-fns + `locale/es`                |
| Validación       | Zod (en frontera HTTP)                |
| Mapas            | MapLibre GL JS + Protomaps            |
| Búsqueda         | MiniSearch                            |
| CMS              | Sanity (headless)                     |
| Hosting          | Cloudflare Pages + Workers            |
| Analítica        | Cloudflare Web Analytics              |
| Errores          | Sentry                                |
| Tests            | Vitest, Angular Testing Library, Playwright (E2E roadmap) |

Quedan **fuera de scope** por decisión arquitectónica: Tailwind, Material/PrimeNG, Algolia/Typesense, GraphQL, Redis, Stripe, Nx/Turborepo.

---

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 20
- npm 11+
- [Git](https://git-scm.com/)

### Pasos

```bash
git clone https://github.com/R4r4s/festiVAL.git
cd festiVAL
npm install
npm start
```

La aplicación arranca en [http://localhost:4200](http://localhost:4200) y se recarga automáticamente al detectar cambios.

---

## 📜 Scripts disponibles

| Comando                       | Descripción                                              |
| ----------------------------- | -------------------------------------------------------- |
| `npm start`                   | Servidor de desarrollo en `http://localhost:4200`        |
| `npm run build`               | Build de producción en `dist/`                           |
| `npm test`                    | Tests unitarios (Vitest)                                 |
| `npm run lint`                | Linter (ESLint + Angular ESLint + boundaries)            |
| `npm run watch`               | Build en modo desarrollo con observación de cambios      |
| `npm run serve:ssr:festiVAL`  | Sirve el build SSR (Express, puerto 4000)                |

---

## 📁 Estructura del proyecto

Arquitectura **feature-sliced** con boundaries forzados por ESLint. El detalle completo vive en [`.codex/skills/project-structure/SKILL.md`](.codex/skills/project-structure/SKILL.md). Resumen:

```
src/app/
├── core/        # singletons cross-cutting (interceptores, ErrorHandler, initializers, SSR helpers)
├── layout/      # shell de la app (shell, nav-bar, footer), cargado eagerly
├── features/    # vertical slices, cada una un chunk lazy
│   └── <feature>/
│       ├── feature/        # página smart vinculada a la ruta
│       ├── ui/             # componentes presentacionales locales
│       ├── data-access/    # stores, servicios HTTP, resolvers, schemas Zod
│       └── <feature>.routes.ts   # ÚNICA superficie pública de la feature
└── shared/      # reutilizable entre ≥ 2 features; nunca importa de una feature
    ├── ui/ data-access/ domain/ pipes/ directives/ util/ testing/
```

Reglas duras (forzadas por `eslint-plugin-boundaries`):

- Una feature **nunca** importa de otra feature.
- `shared/` nunca importa de `features/` ni de `layout/`.
- La única superficie pública de una feature es su `<feature>.routes.ts`.
- No hay barrel files (`index.ts`), no hay NgModules, todo es standalone.

El catálogo completo de carpetas y ficheros se mantiene en [`docs/documentacion.md`](docs/documentacion.md).

---

## 🔄 Commits y workflow

El trabajo se ancla a **GitHub Issues**. Para commitear, usa **`/autocommit`**: pregunta el **número de issue** (repetido hasta `0` para terminar), agrupa los cambios por propósito semántico, añade `(#n)` al mensaje y aplica los gates obligatorios (lint+test, auditoría 100/100, paridad i18n, doc-sync).

Las reglas viven en [`.codex/commands/autocommit.md`](.codex/commands/autocommit.md) y en su equivalente para Claude Code [`.claude/commands/autocommit.md`](.claude/commands/autocommit.md).

Flujo habitual:

```
GitHub Issue → Desarrollo → /autocommit → Pull Request → Review → Done
```

---

## 🤖 Desarrollo asistido por IA

Este proyecto está preparado para colaboración con **Codex** y **Claude Code**.

Regla de uso:

- Cuando trabajes con **Codex**, usa la carpeta `.codex/` como fuente principal.
- Cuando trabajes con **Claude Code**, usa la carpeta `.claude/`.

Configuración de Claude Code:

- `.claude/CLAUDE.md` — contrato del proyecto.
- `.claude/agents/` — agentes especializados (sistemas, vistas, contenido, prueba, rendimiento).
- `.claude/skills/` — patrones reutilizables (project-structure, theming-styling, api-integration, …).
- `.claude/commands/` — workflows automatizados (`/audit-structure`, `/autocommit`).

Configuración de Codex:

- `.codex/AGENTS.md` — contrato del proyecto para Codex.
- `.codex/agents/` — agentes especializados para Codex.
- `.codex/skills/` — patrones reutilizables para Codex.
- `.codex/commands/` — workflows automatizados para Codex.

Antes de cualquier modificación es **obligatorio** leer `AGENTS.md` en `.codex/` y los skills aplicables al área tocada. Si se trabaja con Claude Code, también debe respetarse su configuración paralela en `.claude/`.

---

## 👤 Autor

Proyecto desarrollado por **Rares Ngheru**.

- ✉️ Email: [rngheru@gmail.com](mailto:rngheru@gmail.com)
- 🐙 GitHub: [@R4r4s](https://github.com/R4r4s)
