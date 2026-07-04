import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type CalendarMonthFilter = 'all' | 'june' | 'july' | 'august';
export type CalendarProvinceFilter = 'all' | 'Valencia' | 'Alicante' | 'Castellón';
export type CalendarGenreFilter = 'all' | 'electronic' | 'urban' | 'latin' | 'pop';
export type CalendarGenre = Exclude<CalendarGenreFilter, 'all'>;
export type CalendarFestivalSlug =
  | 'bigsound'
  | 'latin-fest-benidorm'
  | 'latin-fest'
  | 'zevra'
  | 'arenal'
  | 'medusa'
  | 'reve';

export interface CalendarFilterOption<T extends string> {
  readonly id: T;
  readonly labelKey: TranslationKey;
}

export interface CalendarFestival {
  readonly slug: CalendarFestivalSlug;
  readonly name: string;
  readonly locationLabel: string;
  readonly province: Exclude<CalendarProvinceFilter, 'all'>;
  readonly genre: CalendarGenre;
  readonly genreLabelKey: TranslationKey;
  readonly startDate: string;
  readonly endDate: string;
  readonly poster: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly detailUrl: string;
  readonly accentColor: string;
}

export const CALENDAR_SEASON = 2026;

export const CALENDAR_MONTH_FILTERS = [
  { id: 'all', labelKey: 'calendarPage.filters.months.all' },
  { id: 'june', labelKey: 'calendarPage.filters.months.june' },
  { id: 'july', labelKey: 'calendarPage.filters.months.july' },
  { id: 'august', labelKey: 'calendarPage.filters.months.august' },
] as const satisfies readonly CalendarFilterOption<CalendarMonthFilter>[];

export const CALENDAR_PROVINCE_FILTERS = [
  { id: 'all', labelKey: 'calendarPage.filters.provinces.all' },
  { id: 'Valencia', labelKey: 'calendarPage.filters.provinces.valencia' },
  { id: 'Alicante', labelKey: 'calendarPage.filters.provinces.alicante' },
  { id: 'Castellón', labelKey: 'calendarPage.filters.provinces.castellon' },
] as const satisfies readonly CalendarFilterOption<CalendarProvinceFilter>[];

export const CALENDAR_GENRE_FILTERS = [
  { id: 'all', labelKey: 'calendarPage.filters.genres.all' },
  { id: 'electronic', labelKey: 'calendarPage.filters.genres.electronic' },
  { id: 'urban', labelKey: 'calendarPage.filters.genres.urban' },
  { id: 'latin', labelKey: 'calendarPage.filters.genres.latin' },
  { id: 'pop', labelKey: 'calendarPage.filters.genres.pop' },
] as const satisfies readonly CalendarFilterOption<CalendarGenreFilter>[];

export const CALENDAR_FESTIVALS = [
  {
    slug: 'bigsound',
    name: 'Bigsound Festival',
    locationLabel: 'Parc Central de Torrent · Valencia',
    province: 'Valencia',
    genre: 'pop',
    genreLabelKey: 'calendarPage.filters.genres.pop',
    startDate: '2026-06-26',
    endDate: '2026-06-27',
    poster: {
      src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
      alt: 'Cartel de Bigsound Festival Valencia 2026',
      width: 550,
      height: 688,
    },
    detailUrl: '/festivales/bigsound',
    accentColor: 'var(--fv-accent-orange)',
  },
  {
    slug: 'latin-fest-benidorm',
    name: 'Latin Fest Benidorm',
    locationLabel: 'Benidorm · Alicante',
    province: 'Alicante',
    genre: 'latin',
    genreLabelKey: 'calendarPage.filters.genres.latin',
    startDate: '2026-07-04',
    endDate: '2026-07-05',
    poster: {
      src: '/assets/images/festivals/latin-fest/cartel-latin-fest-benidorm-2026.webp',
      alt: 'Cartel de Latin Fest Benidorm 2026',
      width: 1048,
      height: 1394,
    },
    detailUrl: '/festivales/latin-fest',
    accentColor: 'var(--fv-accent-coral)',
  },
  {
    slug: 'latin-fest',
    name: 'Latin Fest Valencia',
    locationLabel: 'Valencia · Valencia',
    province: 'Valencia',
    genre: 'latin',
    genreLabelKey: 'calendarPage.filters.genres.latin',
    startDate: '2026-07-17',
    endDate: '2026-07-18',
    poster: {
      src: '/assets/images/festivals/latin-fest/cartel-latin-fest-valencia-2026.webp',
      alt: 'Cartel de Latin Fest Valencia 2026',
      width: 941,
      height: 1672,
    },
    detailUrl: '/festivales/latin-fest',
    accentColor: 'var(--fv-accent-coral)',
  },
  {
    slug: 'zevra',
    name: 'Zevra Festival',
    locationLabel: 'Cullera · Valencia',
    province: 'Valencia',
    genre: 'urban',
    genreLabelKey: 'calendarPage.filters.genres.urban',
    startDate: '2026-07-24',
    endDate: '2026-07-27',
    poster: {
      src: '/assets/images/festivals/zevra/cartel-zevra-2026.webp',
      alt: 'Cartel general de Zevra Festival 2026',
      width: 1080,
      height: 1350,
    },
    detailUrl: '/festivales/zevra',
    accentColor: 'var(--fv-accent-violet)',
  },
  {
    slug: 'arenal',
    name: 'Arenal Sound',
    locationLabel: 'Playa El Arenal · Burriana',
    province: 'Castellón',
    genre: 'pop',
    genreLabelKey: 'calendarPage.filters.genres.pop',
    startDate: '2026-07-30',
    endDate: '2026-08-02',
    poster: {
      src: '/assets/images/festivals/arenal/cartel-arenal.webp',
      alt: 'Cartel de Arenal Sound 2026',
      width: 1114,
      height: 1386,
    },
    detailUrl: '/festivales/arenal',
    accentColor: 'var(--fv-accent-orange)',
  },
  {
    slug: 'medusa',
    name: 'Medusa Festival',
    locationLabel: 'Playa de Cullera · Valencia',
    province: 'Valencia',
    genre: 'electronic',
    genreLabelKey: 'calendarPage.filters.genres.electronic',
    startDate: '2026-08-13',
    endDate: '2026-08-17',
    poster: {
      src: '/assets/images/festivals/medusa/cartel-medusa-2026.webp',
      alt: 'Cartel general de Medusa Festival 2026',
      width: 1080,
      height: 1350,
    },
    detailUrl: '/festivales/medusa',
    accentColor: 'var(--fv-accent-blue)',
  },
  {
    slug: 'reve',
    name: 'Reve Festival',
    locationLabel: 'Roig Arena · Valencia',
    province: 'Valencia',
    genre: 'pop',
    genreLabelKey: 'calendarPage.filters.genres.pop',
    startDate: '2026-07-16',
    endDate: '2026-07-16',
    poster: {
      src: '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp',
      alt: 'Cartel de Reve Festival Roig Arena Valencia 2026',
      width: 1920,
      height: 1080,
    },
    detailUrl: '/festivales/reve',
    accentColor: 'var(--fv-accent-orange)',
  },
] as const satisfies readonly CalendarFestival[];
