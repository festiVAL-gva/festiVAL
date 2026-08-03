/**
 * Editorial catalogue for festival detail pages (MVP fields).
 * Port of Angular `festival-detail-catalogue.ts` — posters/video/gallery omitted
 * until Phase 3. Keep slugs immutable.
 */

export type FestivalDetailSlug =
  | 'bigsound'
  | 'latin-fest'
  | 'medusa'
  | 'arenal'
  | 'reve'
  | 'zevra';

export interface FestivalDetailEntry {
  readonly slug: FestivalDetailSlug;
  readonly nombre: string;
  readonly hero: {
    readonly titleKey: string;
    readonly subtitleKey: string;
    readonly breadcrumbCurrentKey: string;
    readonly locationKey: string;
    readonly datesKey: string;
    /** ISO 8601 range for the <time datetime> attribute. */
    readonly datetime: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly poster: {
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      readonly fit: 'cover' | 'contain';
    };
    readonly ticketUrl: string;
    readonly officialUrl: string;
  };
  readonly map: {
    readonly lat: number;
    readonly lng: number;
    readonly nameKey: string;
    readonly embedUrl: string;
  };
}

function byFestivalKey(slug: FestivalDetailSlug, suffix: string): string {
  const ns = slug === 'latin-fest' ? 'latinFest' : slug;
  return `festival.detail.byFestival.${ns}.${suffix}`;
}

const ENTRIES: readonly FestivalDetailEntry[] = [
  {
    slug: 'bigsound',
    nombre: 'Bigsound Festival',
    hero: {
      titleKey: byFestivalKey('bigsound', 'hero.title'),
      subtitleKey: byFestivalKey('bigsound', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('bigsound', 'name'),
      locationKey: byFestivalKey('bigsound', 'hero.location'),
      datesKey: byFestivalKey('bigsound', 'hero.dates'),
      datetime: '2026-06-26/2026-06-27',
      startDate: '2026-06-26',
      endDate: '2026-06-27',
      poster: {
        src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
        alt: 'Cartel de Bigsound Festival Valencia 2026',
        width: 550,
        height: 688,
        fit: 'contain',
      },
      ticketUrl: 'https://bigsoundfestival.com/entradas',
      officialUrl: 'https://bigsoundfestival.com/',
    },
    map: {
      lat: 39.42903614897183,
      lng: -0.46784232712277507,
      nameKey: byFestivalKey('bigsound', 'name'),
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.46784232712277507!3d39.42903614897183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBigsound%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'latin-fest',
    nombre: 'Latin Fest',
    hero: {
      titleKey: byFestivalKey('latin-fest', 'hero.title'),
      subtitleKey: byFestivalKey('latin-fest', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('latin-fest', 'name'),
      locationKey: byFestivalKey('latin-fest', 'hero.location'),
      datesKey: byFestivalKey('latin-fest', 'hero.dates'),
      datetime: '2026-07-17/2026-07-18',
      startDate: '2026-07-17',
      endDate: '2026-07-18',
      poster: {
        src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
        alt: 'Identidad visual de Latin Fest',
        width: 1615,
        height: 969,
        fit: 'contain',
      },
      ticketUrl: 'https://latinfest.es/entradas',
      officialUrl: 'https://latinfest.es/',
    },
    map: {
      lat: 39.49454399416732,
      lng: -0.364468709822233,
      nameKey: byFestivalKey('latin-fest', 'name'),
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.364468709822233!3d39.49454399416732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLatin%20Fest!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'medusa',
    nombre: 'Medusa Festival',
    hero: {
      titleKey: byFestivalKey('medusa', 'hero.title'),
      subtitleKey: byFestivalKey('medusa', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('medusa', 'name'),
      locationKey: byFestivalKey('medusa', 'hero.location'),
      datesKey: byFestivalKey('medusa', 'hero.dates'),
      datetime: '2026-08-13/2026-08-17',
      startDate: '2026-08-13',
      endDate: '2026-08-17',
      poster: {
        src: '/assets/images/festivals/medusa/hero-medusa-festival-2026.webp',
        alt: 'Escenario principal del Medusa Festival iluminado de noche',
        width: 1500,
        height: 843,
        fit: 'cover',
      },
      ticketUrl: 'https://www.medusasunbeach.com/entradas',
      officialUrl: 'https://www.medusasunbeach.com/',
    },
    map: {
      lat: 39.15434989735872,
      lng: -0.243329265792136,
      nameKey: byFestivalKey('medusa', 'name'),
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.9344114099663!2d-0.24821091725818373!3d39.15420425848115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61c974d60e370b%3A0xec9f97427f2d1590!2sMedusa%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'arenal',
    nombre: 'Arenal Sound',
    hero: {
      titleKey: byFestivalKey('arenal', 'hero.title'),
      subtitleKey: byFestivalKey('arenal', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('arenal', 'name'),
      locationKey: byFestivalKey('arenal', 'hero.location'),
      datesKey: byFestivalKey('arenal', 'hero.dates'),
      datetime: '2026-07-30/2026-08-02',
      startDate: '2026-07-30',
      endDate: '2026-08-02',
      poster: {
        src: '/assets/images/festivals/arenal/cartel-arenal.webp',
        alt: 'Cartel de Arenal Sound 2026',
        width: 1114,
        height: 1386,
        fit: 'contain',
      },
      ticketUrl: 'https://arenalsound.com/comprar/',
      officialUrl: 'https://arenalsound.com/',
    },
    map: {
      lat: 39.865027,
      lng: -0.066728,
      nameKey: byFestivalKey('arenal', 'name'),
      embedUrl: 'https://maps.google.com/maps?q=39.865027,-0.066728&z=15&output=embed',
    },
  },
  {
    slug: 'reve',
    nombre: 'Reve Festival',
    hero: {
      titleKey: byFestivalKey('reve', 'hero.title'),
      subtitleKey: byFestivalKey('reve', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('reve', 'name'),
      locationKey: byFestivalKey('reve', 'hero.location'),
      datesKey: byFestivalKey('reve', 'hero.dates'),
      datetime: '2026-07-16/2026-07-16',
      startDate: '2026-07-16',
      endDate: '2026-07-16',
      poster: {
        src: '/assets/images/festivals/reve/cartel-reve-horizontal-2026.webp',
        alt: 'Cartel horizontal de Reve Festival Roig Arena Valencia 2026',
        width: 1600,
        height: 900,
        fit: 'cover',
      },
      ticketUrl: 'https://revefestival.com/entradas',
      officialUrl: 'https://revefestival.com/',
    },
    map: {
      lat: 39.44921869967149,
      lng: -0.3643244397614549,
      nameKey: byFestivalKey('reve', 'name'),
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.3643244397614549!3d39.44921869967149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sReve%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'zevra',
    nombre: 'Zevra Festival',
    hero: {
      titleKey: byFestivalKey('zevra', 'hero.title'),
      subtitleKey: byFestivalKey('zevra', 'hero.subtitle'),
      breadcrumbCurrentKey: byFestivalKey('zevra', 'name'),
      locationKey: byFestivalKey('zevra', 'hero.location'),
      datesKey: byFestivalKey('zevra', 'hero.dates'),
      datetime: '2026-07-24/2026-07-27',
      startDate: '2026-07-24',
      endDate: '2026-07-27',
      poster: {
        src: '/assets/images/festivals/zevra/logo-zevra.webp',
        alt: 'Identidad visual de Zevra Festival',
        width: 3212,
        height: 1276,
        fit: 'contain',
      },
      ticketUrl: 'https://zevrafestival.com/entradas',
      officialUrl: 'https://zevrafestival.com/',
    },
    map: {
      lat: 39.154847058872114,
      lng: -0.2437427679436067,
      nameKey: byFestivalKey('zevra', 'name'),
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.2437427679436067!3d39.154847058872114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZevra%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
] as const;

const BY_SLUG = new Map(ENTRIES.map((entry) => [entry.slug, entry]));

export const FESTIVAL_DETAIL_SLUGS: readonly FestivalDetailSlug[] = ENTRIES.map(
  (entry) => entry.slug,
);

export function findFestivalDetailEntry(slug: string): FestivalDetailEntry | null {
  return BY_SLUG.get(slug as FestivalDetailSlug) ?? null;
}

export function isFestivalDetailSlug(slug: string): slug is FestivalDetailSlug {
  return BY_SLUG.has(slug as FestivalDetailSlug);
}

export function overviewKeys(slug: FestivalDetailSlug) {
  const ns = slug === 'latin-fest' ? 'latinFest' : slug;
  const base = `festival.detail.byFestival.${ns}.overview`;
  return {
    paragraph1: `${base}.paragraph1`,
    paragraph2: `${base}.paragraph2`,
    highlights: {
      beach: `${base}.highlights.beach`,
      camping: `${base}.highlights.camping`,
      foodTrucks: `${base}.highlights.foodTrucks`,
      afterparties: `${base}.highlights.afterparties`,
      activities: `${base}.highlights.activities`,
    },
  } as const;
}
