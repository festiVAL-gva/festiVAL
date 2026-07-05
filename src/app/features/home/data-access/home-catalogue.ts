import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type CalendarMonth = 'june' | 'july' | 'august';
export type CalendarTone = 'med-blue' | 'coral' | 'orange' | 'blue';
export type CalendarCardAlign = 'start' | 'center' | 'end';

export interface CalendarMonthData {
  readonly key: CalendarMonth;
  readonly labelKey: TranslationKey;
  readonly days: readonly string[];
}

export interface CalendarFestivalEntry {
  readonly slug: string;
  readonly routeSlug: string;
  readonly month: CalendarMonth;
  readonly dayLabel: string;
  readonly position: number;
  readonly shortMonthLabelKey: TranslationKey;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly genreKey: TranslationKey;
  readonly imageSrc: string;
  readonly tone: CalendarTone;
  readonly cardAlign: CalendarCardAlign;
  readonly cardOffset: string;
}

export interface NextFestivalEntry {
  readonly slug: string;
  readonly routeSlug: string;
  readonly startsAt: string;
  readonly titleAccentKey: TranslationKey;
  readonly titleKey: TranslationKey;
  readonly dateKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly genreKey: TranslationKey;
  readonly imageAltKey: TranslationKey;
  readonly primaryCtaKey: TranslationKey;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
}

export const CALENDAR_MONTH_SEGMENTS = [
  {
    key: 'june',
    labelKey: 'home.calendar.months.june',
    days: ['26', '27', '28', '29', '30'],
  },
  {
    key: 'july',
    labelKey: 'home.calendar.months.july',
    days: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ],
  },
  {
    key: 'august',
    labelKey: 'home.calendar.months.august',
    days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
  },
] as const satisfies readonly CalendarMonthData[];

export const NEXT_FESTIVALS = [
  {
    slug: 'bigsound',
    routeSlug: 'bigsound',
    startsAt: '2026-06-26T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.bigsound.titleAccent',
    titleKey: 'home.nextFestival.festivals.bigsound.title',
    dateKey: 'home.nextFestival.festivals.bigsound.date',
    locationKey: 'home.nextFestival.festivals.bigsound.location',
    genreKey: 'home.nextFestival.festivals.bigsound.genre',
    imageAltKey: 'home.nextFestival.festivals.bigsound.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.bigsound.primaryCta',
    image: {
      src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
      width: 550,
      height: 688,
    },
  },
  {
    slug: 'latin-fest-benidorm',
    routeSlug: 'latin-fest',
    startsAt: '2026-07-04T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.latinFestBenidorm.titleAccent',
    titleKey: 'home.nextFestival.festivals.latinFestBenidorm.title',
    dateKey: 'home.nextFestival.festivals.latinFestBenidorm.date',
    locationKey: 'home.nextFestival.festivals.latinFestBenidorm.location',
    genreKey: 'home.nextFestival.festivals.latinFestBenidorm.genre',
    imageAltKey: 'home.nextFestival.festivals.latinFestBenidorm.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.latinFestBenidorm.primaryCta',
    image: {
      src: '/assets/images/festivals/latin-fest/cartel-latin-fest-benidorm-2026.webp',
      width: 1048,
      height: 1394,
    },
  },
  {
    slug: 'reve',
    routeSlug: 'reve',
    startsAt: '2026-07-16T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.reve.titleAccent',
    titleKey: 'home.nextFestival.festivals.reve.title',
    dateKey: 'home.nextFestival.festivals.reve.date',
    locationKey: 'home.nextFestival.festivals.reve.location',
    genreKey: 'home.nextFestival.festivals.reve.genre',
    imageAltKey: 'home.nextFestival.festivals.reve.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.reve.primaryCta',
    image: {
      src: '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp',
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: 'latin-fest-valencia',
    routeSlug: 'latin-fest',
    startsAt: '2026-07-17T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.latinFestValencia.titleAccent',
    titleKey: 'home.nextFestival.festivals.latinFestValencia.title',
    dateKey: 'home.nextFestival.festivals.latinFestValencia.date',
    locationKey: 'home.nextFestival.festivals.latinFestValencia.location',
    genreKey: 'home.nextFestival.festivals.latinFestValencia.genre',
    imageAltKey: 'home.nextFestival.festivals.latinFestValencia.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.latinFestValencia.primaryCta',
    image: {
      src: '/assets/images/festivals/latin-fest/venue-valencia-recinto.webp',
      width: 1289,
      height: 980,
    },
  },
  {
    slug: 'zevra',
    routeSlug: 'zevra',
    startsAt: '2026-07-24T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.zevra.titleAccent',
    titleKey: 'home.nextFestival.festivals.zevra.title',
    dateKey: 'home.nextFestival.festivals.zevra.date',
    locationKey: 'home.nextFestival.festivals.zevra.location',
    genreKey: 'home.nextFestival.festivals.zevra.genre',
    imageAltKey: 'home.nextFestival.festivals.zevra.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.zevra.primaryCta',
    image: {
      src: '/assets/images/festivals/zevra/cartel-zevra-2026.webp',
      width: 1080,
      height: 1350,
    },
  },
  {
    slug: 'arenal',
    routeSlug: 'arenal',
    startsAt: '2026-07-30T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.arenal.titleAccent',
    titleKey: 'home.nextFestival.festivals.arenal.title',
    dateKey: 'home.nextFestival.festivals.arenal.date',
    locationKey: 'home.nextFestival.festivals.arenal.location',
    genreKey: 'home.nextFestival.festivals.arenal.genre',
    imageAltKey: 'home.nextFestival.festivals.arenal.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.arenal.primaryCta',
    image: {
      src: '/assets/images/festivals/arenal/cartel-arenal.webp',
      width: 1114,
      height: 1386,
    },
  },
  {
    slug: 'medusa',
    routeSlug: 'medusa',
    startsAt: '2026-08-13T00:00:00+02:00',
    titleAccentKey: 'home.nextFestival.festivals.medusa.titleAccent',
    titleKey: 'home.nextFestival.festivals.medusa.title',
    dateKey: 'home.nextFestival.festivals.medusa.date',
    locationKey: 'home.nextFestival.festivals.medusa.location',
    genreKey: 'home.nextFestival.festivals.medusa.genre',
    imageAltKey: 'home.nextFestival.festivals.medusa.imageAlt',
    primaryCtaKey: 'home.nextFestival.festivals.medusa.primaryCta',
    image: {
      src: '/assets/images/festivals/medusa/cartel-medusa-2026.webp',
      width: 1080,
      height: 1350,
    },
  },
] as const satisfies readonly NextFestivalEntry[];

export const CALENDAR_FESTIVALS = [
  {
    slug: 'bigsound',
    routeSlug: 'bigsound',
    month: 'june',
    dayLabel: '26',
    position: 1,
    shortMonthLabelKey: 'home.calendar.shortMonths.june',
    dateKey: 'home.calendar.cards.bigsound.date',
    nameKey: 'home.calendar.cards.bigsound.name',
    locationKey: 'home.calendar.cards.bigsound.location',
    genreKey: 'home.calendar.cards.bigsound.genre',
    imageSrc: '/assets/images/festivals/bigsound/logo-bigsound.webp',
    tone: 'med-blue',
    cardAlign: 'start',
    cardOffset: '0px',
  },
  {
    slug: 'latin-fest',
    routeSlug: 'latin-fest',
    month: 'july',
    dayLabel: '4',
    position: 18,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.latinFest.date',
    nameKey: 'home.calendar.cards.latinFest.name',
    locationKey: 'home.calendar.cards.latinFest.location',
    genreKey: 'home.calendar.cards.latinFest.genre',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    tone: 'coral',
    cardAlign: 'center',
    cardOffset: '0.75rem',
  },
  {
    slug: 'reve',
    routeSlug: 'reve',
    month: 'july',
    dayLabel: '16',
    position: 42,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.reve.date',
    nameKey: 'home.calendar.cards.reve.name',
    locationKey: 'home.calendar.cards.reve.location',
    genreKey: 'home.calendar.cards.reve.genre',
    imageSrc: '/assets/images/festivals/reve/logo-reve.webp',
    tone: 'orange',
    cardAlign: 'center',
    cardOffset: '0px',
  },
  {
    slug: 'latin-fest-valencia',
    routeSlug: 'latin-fest',
    month: 'july',
    dayLabel: '17',
    position: 44,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.latinFestValencia.date',
    nameKey: 'home.calendar.cards.latinFestValencia.name',
    locationKey: 'home.calendar.cards.latinFestValencia.location',
    genreKey: 'home.calendar.cards.latinFestValencia.genre',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    tone: 'coral',
    cardAlign: 'center',
    cardOffset: '0px',
  },
  {
    slug: 'zevra',
    routeSlug: 'zevra',
    month: 'july',
    dayLabel: '24',
    position: 58,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.zevra.date',
    nameKey: 'home.calendar.cards.zevra.name',
    locationKey: 'home.calendar.cards.zevra.location',
    genreKey: 'home.calendar.cards.zevra.genre',
    imageSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
    tone: 'orange',
    cardAlign: 'center',
    cardOffset: '3.25rem',
  },
  {
    slug: 'arenal',
    routeSlug: 'arenal',
    month: 'july',
    dayLabel: '30',
    position: 70,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.arenal.date',
    nameKey: 'home.calendar.cards.arenal.name',
    locationKey: 'home.calendar.cards.arenal.location',
    genreKey: 'home.calendar.cards.arenal.genre',
    imageSrc: '/assets/images/festivals/arenal/logo-arenal.webp',
    tone: 'orange',
    cardAlign: 'center',
    cardOffset: '0px',
  },
  {
    slug: 'medusa',
    routeSlug: 'medusa',
    month: 'august',
    dayLabel: '13',
    position: 99,
    shortMonthLabelKey: 'home.calendar.shortMonths.august',
    dateKey: 'home.calendar.cards.medusa.date',
    nameKey: 'home.calendar.cards.medusa.name',
    locationKey: 'home.calendar.cards.medusa.location',
    genreKey: 'home.calendar.cards.medusa.genre',
    imageSrc: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
    tone: 'blue',
    cardAlign: 'end',
    cardOffset: '0px',
  },
] as const satisfies readonly CalendarFestivalEntry[];
