// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoSrc = path.resolve(rootDir, '../../src');

const site = process.env.PUBLIC_BASE_URL ?? 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  // Fully prerendered for the PoC; Cloudflare adapter keeps the door open for
  // on-demand SSR on specific routes without rewriting pages.
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    // @astrojs/preact stays in package.json for Phase 3 islands (filters, etc.).
    // Not registered here yet — avoids shipping Preact on zero-island pages.
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@lib': path.resolve(rootDir, 'src/lib'),
        '@components': path.resolve(rootDir, 'src/components'),
        '@layouts': path.resolve(rootDir, 'src/layouts'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Lets component SCSS `@use 'styles/breakpoints'` resolve against the
          // Angular design-system partials during the coexistence phase.
          loadPaths: [monorepoSrc],
        },
      },
    },
  },
});
