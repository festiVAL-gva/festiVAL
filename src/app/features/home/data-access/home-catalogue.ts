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

export const CALENDAR_MONTH_SEGMENTS = [
  {
    key: 'june',
    labelKey: 'home.calendar.months.june',
    days: ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  },
  {
    key: 'july',
    labelKey: 'home.calendar.months.july',
    days: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
    ],
  },
  {
    key: 'august',
    labelKey: 'home.calendar.months.august',
    days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
  },
] as const satisfies readonly CalendarMonthData[];

export const CALENDAR_FESTIVALS = [
  {
    slug: 'bigsound',
    month: 'june',
    dayLabel: '20',
    position: 7,
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
    month: 'july',
    dayLabel: '4',
    position: 30,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.latinFest.date',
    nameKey: 'home.calendar.cards.latinFest.name',
    locationKey: 'home.calendar.cards.latinFest.location',
    genreKey: 'home.calendar.cards.latinFest.genre',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    tone: 'coral',
    cardAlign: 'end',
    cardOffset: '0.75rem',
  },
  {
    slug: 'latin-fest-valencia',
    month: 'july',
    dayLabel: '17',
    position: 49,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.latinFestValencia.date',
    nameKey: 'home.calendar.cards.latinFestValencia.name',
    locationKey: 'home.calendar.cards.latinFestValencia.location',
    genreKey: 'home.calendar.cards.latinFestValencia.genre',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    tone: 'coral',
    cardAlign: 'start',
    cardOffset: '0px',
  },
  {
    slug: 'zevra',
    month: 'july',
    dayLabel: '24',
    position: 60,
    shortMonthLabelKey: 'home.calendar.shortMonths.july',
    dateKey: 'home.calendar.cards.zevra.date',
    nameKey: 'home.calendar.cards.zevra.name',
    locationKey: 'home.calendar.cards.zevra.location',
    genreKey: 'home.calendar.cards.zevra.genre',
    imageSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
    tone: 'orange',
    cardAlign: 'start',
    cardOffset: '3.25rem',
  },
  {
    slug: 'arenal',
    month: 'july',
    dayLabel: '30',
    position: 69,
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
    month: 'august',
    dayLabel: '8',
    position: 84,
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
