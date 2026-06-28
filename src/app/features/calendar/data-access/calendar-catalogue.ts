export type CalendarFestivalCategory = 'electronic' | 'urban' | 'pop' | 'latin';

export interface CalendarFestival {
  readonly slug: string;
  readonly name: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly category: CalendarFestivalCategory;
  readonly poster: string;
  readonly genres: readonly string[];
  readonly detailUrl: string;
}

export const CALENDAR_FESTIVAL_COLOURS: Record<CalendarFestivalCategory, { bg: string; text: string }> = {
  electronic: { bg: 'var(--fv-accent-blue)',     text: '#fff' },
  urban:      { bg: 'var(--fv-accent-violet)',   text: '#fff' },
  pop:        { bg: 'var(--fv-accent-orange)',   text: '#fff' },
  latin:      { bg: 'var(--fv-accent-pink)',     text: '#fff' },
};

export const CALENDAR_FESTIVALS: readonly CalendarFestival[] = [
  {
    slug: 'bigsound',
    name: 'Bigsound Festival',
    location: 'Valencia',
    startDate: '2026-06-26',
    endDate: '2026-06-27',
    category: 'pop',
    poster: '/assets/images/festivals/bigsound/logo-bigsound.webp',
    genres: ['indie', 'pop', 'electrónica'],
    detailUrl: '/festivales/bigsound',
  },
  {
    slug: 'rbf',
    name: 'Reggaeton Beach Festival',
    location: 'Benidorm, Alicante',
    startDate: '2026-07-04',
    endDate: '2026-07-05',
    category: 'urban',
    poster: '/assets/images/festivals/rbf/logo-rbf.webp',
    genres: ['reggaeton', 'urbano'],
    detailUrl: '/festivales/rbf',
  },
  {
    slug: 'reve',
    name: 'Reve Festival',
    location: 'Valencia',
    startDate: '2026-07-16',
    endDate: '2026-07-17',
    category: 'pop',
    poster: '/assets/images/festivals/reve/logo-reve.webp',
    genres: ['pop', 'directo'],
    detailUrl: '/festivales/reve',
  },
  {
    slug: 'latin-fest',
    name: 'Latin Fest',
    location: 'Valencia · Benidorm',
    startDate: '2026-07-17',
    endDate: '2026-07-18',
    category: 'latin',
    poster: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    genres: ['latin', 'reggaeton'],
    detailUrl: '/festivales/latin-fest',
  },
  {
    slug: 'zevra',
    name: 'Zevra Festival',
    location: 'Cullera, Valencia',
    startDate: '2026-07-24',
    endDate: '2026-07-27',
    category: 'urban',
    poster: '/assets/images/festivals/zevra/logo-zevra.webp',
    genres: ['urbano', 'reggaeton', 'electrónica'],
    detailUrl: '/festivales/zevra',
  },
  {
    slug: 'medusa',
    name: 'Medusa Festival',
    location: 'Cullera, Valencia',
    startDate: '2026-08-07',
    endDate: '2026-08-11',
    category: 'electronic',
    poster: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
    genres: ['electrónica', 'techno', 'house'],
    detailUrl: '/festivales/medusa',
  },
];
