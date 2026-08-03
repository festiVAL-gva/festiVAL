/** Absolute site origin with no trailing slash. */
export function getBaseUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_BASE_URL?.replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }
  // `site` from astro.config is available at build via Astro.site in pages;
  // this helper is the fallback for pure lib code.
  return 'http://localhost:4321';
}

export function absoluteUrl(pathOrUrl: string, baseUrl = getBaseUrl()): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${baseUrl}${path}`;
}

export function canonicalFor(path: string, baseUrl = getBaseUrl()): string {
  if (path === '' || path === '/') {
    return `${baseUrl}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalized.replace(/\/$/, '')}`;
}
