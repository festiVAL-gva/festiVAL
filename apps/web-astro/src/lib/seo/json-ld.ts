import type { FestivalDetailEntry } from '@lib/festivals/catalogue';
import type { FestivalDetailFacts } from '@lib/domain/festival-detail-facts.model';
import { absoluteUrl } from './urls';

/**
 * Builds a MusicEvent JSON-LD graph from verified catalogue + facts.
 * Omits inventable fields; only emits what the page also shows.
 */
export function buildMusicEventJsonLd(
  entry: FestivalDetailEntry,
  facts: FestivalDetailFacts | null,
  description: string,
  baseUrl: string,
): Record<string, unknown> {
  const canonicalUrl = `${baseUrl}/festivales/${entry.slug}`;
  const locationName = facts
    ? `${facts.location.city}, ${facts.location.province}`
    : undefined;

  const graph: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': `${canonicalUrl}#event`,
    name: entry.nombre,
    startDate: entry.hero.startDate,
    endDate: entry.hero.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: canonicalUrl,
    image: [absoluteUrl(entry.hero.poster.src, baseUrl)],
    description,
    sameAs: entry.hero.officialUrl,
  };

  if (locationName && facts) {
    graph.location = {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: facts.location.city,
        addressRegion: facts.location.province,
        addressCountry: 'ES',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: entry.map.lat,
        longitude: entry.map.lng,
      },
    };
  }

  if (facts) {
    graph.offers = {
      '@type': 'Offer',
      url: facts.ticket.officialUrl,
      price: facts.ticket.fromPrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    };
  }

  return graph;
}

export function buildBreadcrumbJsonLd(
  entry: FestivalDetailEntry,
  festivalName: string,
  baseUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Festivales',
        item: `${baseUrl}/festivales`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: festivalName,
        item: `${baseUrl}/festivales/${entry.slug}`,
      },
    ],
  };
}
