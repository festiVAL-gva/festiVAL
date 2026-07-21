# Publicar noticias en TuriaFest

Añade una o varias noticias al apartado `/noticias` sin inventar información y respetando la arquitectura, el diseño y la política editorial del proyecto.

## Objetivo

Publicar contenido periodístico verificable sobre festivales de la Comunitat Valenciana. La tarea termina cuando la noticia aparece correctamente en el listado, su detalle es accesible cuando corresponda y todas las validaciones aplicables están en verde.

Este comando **no crea commits ni hace push** salvo que el usuario lo pida expresamente.

## Información necesaria

Antes de editar, recopila para cada noticia:

- Título.
- Resumen breve.
- Fecha y hora de publicación en ISO 8601.
- Cuerpo completo o fuente oficial desde la que redactarlo.
- Festival, artista, provincia o categoría relacionada.
- URL de la fuente oficial.
- Autor o entidad responsable, si se conoce.
- Imagen de portada, texto alternativo, procedencia y permiso de uso.

Si falta un dato que cambia materialmente el contenido, detente y pregunta al usuario. No inventes fechas, carteles, precios, declaraciones, ubicaciones, fuentes ni nombres.

## Revisión obligatoria

Lee antes de modificar:

- `AGENTS.md`.
- La implementación actual de `src/app/features/news/`.
- Las skills `contenido`, `project-structure`, `internationalization`, `asset-organization`, `seo-meta`, `accessibility`, `theming-styling`, `design-responsive-validation` y `testing-patterns`.

Consulta también `docs/documentacion.md` si la publicación requiere crear, mover o eliminar archivos.

## Flujo de trabajo

### 1. Auditar la implementación actual

Comprueba:

- Cómo obtiene datos la feature `news`.
- Si ya existe un catálogo, servicio, schema o ruta de detalle.
- Qué campos y componentes usan las noticias existentes.
- Si Sanity está realmente configurado para noticias.

No crees una segunda fuente de datos. Usa la fuente que ya exista.

Si todavía no existe una fuente de noticias:

1. Mantén todo dentro de `src/app/features/news/`.
2. Crea el modelo, schema o catálogo mínimo en `data-access/`.
3. Valida datos externos con Zod en la frontera.
4. No conectes Sanity ni otra API sin configuración y credenciales reales del proyecto.
5. No crees carpetas vacías ni barrels `index.ts`.

### 2. Validar la noticia

Verifica:

- El slug es `kebab-case`, ASCII, descriptivo e inmutable una vez publicado.
- La fecha es válida y no contradice la fuente.
- El título y el resumen no exageran ni añaden hechos no confirmados.
- La URL oficial utiliza HTTPS.
- El cuerpo diferencia claramente hechos, citas y contexto editorial.
- La noticia no duplica otra entrada existente.

### 3. Preparar imágenes

Cuando haya portada:

- Sigue `asset-organization`.
- Conserva el original en `src/assets/images-src/news/<slug>/`.
- Publica la versión optimizada en `src/assets/images/news/<slug>/`.
- Usa WebP para raster y nombres en kebab-case.
- Registra dimensiones reales y un `alt` descriptivo.
- No uses imágenes sin procedencia o permiso de uso.
- No deformes ni recortes texto, logos o carteles editoriales.

Si no hay una imagen válida, usa el estado visual sin portada previsto por el diseño. No reutilices una imagen de otro festival como relleno.

### 4. Añadir contenido

- Mantén el listado en `/noticias`.
- Usa `/noticias/:slug` para el detalle cuando exista una página de artículo.
- Ordena por fecha de publicación descendente.
- Mantén componentes standalone, OnPush y lazy loading.
- Pasa datos desde la página smart a componentes presentacionales mediante inputs.
- No hagas llamadas HTTP desde componentes.
- No hardcodees copy en HTML o TypeScript.

Durante desarrollo, añade o modifica copy únicamente en `src/assets/i18n/es.json`. Las traducciones `ca` y `en` se sincronizan al ejecutar `/autocommit`, conforme a `i18n-commit-policy`.

### 5. Actualizar el estado vacío

- Si sigue sin haber noticias, conserva el estado vacío.
- Al publicar la primera noticia, muestra el listado y oculta el estado vacío mediante datos, no borrando manualmente el markup necesario.
- Retira `noindex, follow` cuando exista contenido editorial real indexable.
- No dejes metadatos de una noticia anterior al navegar entre rutas.

### 6. SEO

Para cada noticia indexable configura:

- `<title>` específico.
- Meta description fiel al resumen.
- URL canónica.
- Open Graph y Twitter Card.
- Imagen social adecuada cuando exista.
- JSON-LD `NewsArticle` con titular, fechas, autor, imagen y URL.

No publiques schema incompleto o con valores inventados. Los slugs publicados no se renombran sin redirección 301.

### 7. Accesibilidad y responsive

Comprueba:

- Un único `h1` por página.
- Jerarquía correcta de encabezados.
- Fecha dentro de `<time datetime="…">`.
- Enlaces con propósito comprensible.
- `alt` correcto en imágenes; decorativas con `alt=""`.
- Foco visible y navegación por teclado.
- Contraste WCAG 2.1 AA en claro y oscuro.
- Sin scroll horizontal ni contenido cortado a 320, 768, 1024 y 1440 px.

### 8. Tests y validación

Añade o actualiza tests para:

- Render de la noticia o tarjeta.
- Orden cronológico.
- Enlace al detalle.
- Estado vacío con cero noticias.
- Metadatos y schema cuando se añadan.
- Datos inválidos si existe schema Zod.

Ejecuta:

```bash
npm run lint
npm test -- --run
npm run build
```

Verifica visualmente `/noticias` y, si existe, `/noticias/:slug` en claro y oscuro a 320, 768, 1024 y 1440 px.

## Seguridad editorial

Nunca publiques:

- Rumores sin fuente oficial.
- Datos personales no necesarios.
- Credenciales, tokens o URLs privadas.
- Imágenes sin derechos claros.
- Texto copiado íntegramente de terceros cuando no haya permiso.
- Enlaces de compra que no sean oficiales.

## Informe final

Resume:

- Noticias añadidas y slugs.
- Fuentes oficiales utilizadas.
- Assets creados o modificados.
- Rutas y metadatos actualizados.
- Tests, lint, build y validación responsive.
- Información pendiente o decisiones que requieran revisión humana.
