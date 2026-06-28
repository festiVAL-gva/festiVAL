import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type CalendarMonthFilter = 'all' | 'june' | 'july' | 'august' | 'september';
export type CalendarProvinceFilter = 'all' | 'Valencia' | 'Alicante' | 'Castellón';
export type CalendarGenreFilter = 'all' | 'electronic' | 'urban' | 'latin' | 'pop';
export type CalendarGenre = Exclude<CalendarGenreFilter, 'all'>;
export type CalendarFestivalSlug =
  | 'bigsound'
  | 'latin-fest'
  | 'zevra'
  | 'rbf'
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
  { id: 'september', labelKey: 'calendarPage.filters.months.september' },
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
    locationLabel: 'Valencia · Valencia',
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
    slug: 'latin-fest',
    name: 'Latin Fest',
    locationLabel: 'Valencia · Benidorm',
    province: 'Valencia',
    genre: 'latin',
    genreLabelKey: 'calendarPage.filters.genres.latin',
    startDate: '2026-07-05',
    endDate: '2026-07-05',
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
    startDate: '2026-07-17',
    endDate: '2026-07-20',
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
    slug: 'rbf',
    name: 'Reggaeton Beach Festival',
    locationLabel: 'Benidorm · Alicante',
    province: 'Alicante',
    genre: 'urban',
    genreLabelKey: 'calendarPage.filters.genres.urban',
    startDate: '2026-07-25',
    endDate: '2026-07-26',
    poster: {
      src: '/assets/images/festivals/rbf/logo-rbf.webp',
      alt: 'Identidad visual de Reggaeton Beach Festival',
      width: 640,
      height: 640,
    },
    detailUrl: '/festivales/rbf',
    accentColor: 'var(--fv-accent-violet)',
  },
  {
    slug: 'medusa',
    name: 'Medusa Festival',
    locationLabel: 'Cullera · Valencia',
    province: 'Valencia',
    genre: 'electronic',
    genreLabelKey: 'calendarPage.filters.genres.electronic',
    startDate: '2026-08-05',
    endDate: '2026-08-10',
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
    locationLabel: 'Valencia · Valencia',
    province: 'Valencia',
    genre: 'pop',
    genreLabelKey: 'calendarPage.filters.genres.pop',
    startDate: '2026-09-12',
    endDate: '2026-09-12',
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
