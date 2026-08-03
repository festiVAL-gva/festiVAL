import es from '../../i18n/es.json';

type Dictionary = Record<string, unknown>;

const dictionaries = {
  es: es as Dictionary,
} as const;

export type Locale = keyof typeof dictionaries;

function lookup(dict: Dictionary, key: string): string | undefined {
  const parts = key.split('.');
  let cursor: unknown = dict;
  for (const part of parts) {
    if (cursor === null || typeof cursor !== 'object' || !(part in cursor)) {
      return undefined;
    }
    cursor = (cursor as Dictionary)[part];
  }
  return typeof cursor === 'string' ? cursor : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{\{\s*(\w+)\s*\}\}|\{(\w+)\}/g, (_, doubleKey, singleKey) => {
    const key = (doubleKey ?? singleKey) as string;
    const value = params[key];
    return value === undefined ? '' : String(value);
  });
}

/**
 * Minimal i18n helper for Astro frontmatter / components.
 * Source of truth: `es.json` (symlinked from the Angular app).
 * ca/en stay on disk for parity checks but are not served in the MVP.
 */
export function t(
  key: string,
  params?: Record<string, string | number>,
  locale: Locale = 'es',
): string {
  const value = lookup(dictionaries[locale], key);
  if (value === undefined) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing key: ${key}`);
    }
    return key;
  }
  return interpolate(value, params);
}

export function createTranslator(locale: Locale = 'es') {
  return (key: string, params?: Record<string, string | number>) => t(key, params, locale);
}
