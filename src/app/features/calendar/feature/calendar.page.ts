import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { format, differenceInCalendarDays, eachDayOfInterval, parseISO } from 'date-fns';
import { ca, enGB, es } from 'date-fns/locale';
import { LucideArrowRight, LucideMapPin } from '@lucide/angular';
import type { Locale } from 'date-fns';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

import {
  CALENDAR_FESTIVALS,
  CALENDAR_GENRE_FILTERS,
  CALENDAR_MONTH_FILTERS,
  CALENDAR_PROVINCE_FILTERS,
  CALENDAR_SEASON,
  type CalendarFestival,
  type CalendarGenreFilter,
  type CalendarMonthFilter,
  type CalendarProvinceFilter,
} from '../data-access/calendar-catalogue';

type BadgeTone = 'single' | 'start' | 'middle' | 'final';

interface CalendarExpandedEntry {
  readonly festival: CalendarFestival;
  readonly date: Date;
  readonly isoDate: string;
  readonly dayNumber: number;
  readonly totalDays: number;
}

interface CalendarCardView {
  readonly id: string;
  readonly festival: CalendarFestival;
  readonly rangeLabel: string;
  readonly badgeKey: TranslationKey;
  readonly badgeTone: BadgeTone;
  readonly badgeParams?: Record<string, number>;
}

interface CalendarDateGroupView {
  readonly isoDate: string;
  readonly weekdayLabel: string;
  readonly dateLabel: string;
  readonly cards: readonly CalendarCardView[];
}

interface CalendarMonthGroupView {
  readonly id: string;
  readonly title: string;
  readonly days: readonly CalendarDateGroupView[];
}

const DATE_LOCALES = {
  es,
  ca,
  en: enGB,
} as const;

const FILTER_MONTH_NUMBERS: Record<Exclude<CalendarMonthFilter, 'all'>, number> = {
  june: 5,
  july: 6,
  august: 7,
  september: 8,
};

const EXPANDED_CALENDAR_ENTRIES = CALENDAR_FESTIVALS.flatMap((festival) => expandFestivalDays(festival))
  .sort((left, right) => left.isoDate.localeCompare(right.isoDate) || left.festival.name.localeCompare(right.festival.name));

@Component({
  selector: 'fv-calendar-page',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, LucideArrowRight, LucideMapPin, TranslatePipe],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  protected readonly monthFilterOptions = CALENDAR_MONTH_FILTERS;
  protected readonly provinceFilterOptions = CALENDAR_PROVINCE_FILTERS;
  protected readonly genreFilterOptions = CALENDAR_GENRE_FILTERS;
  protected readonly season = CALENDAR_SEASON;
  protected readonly festivalCount = CALENDAR_FESTIVALS.length;

  protected readonly selectedMonth = signal<CalendarMonthFilter>('all');
  protected readonly selectedProvince = signal<CalendarProvinceFilter>('all');
  protected readonly selectedGenre = signal<CalendarGenreFilter>('all');

  protected readonly hasActiveFilters = computed(
    () =>
      this.selectedMonth() !== 'all' ||
      this.selectedProvince() !== 'all' ||
      this.selectedGenre() !== 'all',
  );

  protected readonly filteredEntries = computed(() =>
    EXPANDED_CALENDAR_ENTRIES
      .filter((entry) => this.matchesMonth(entry) && this.matchesProvince(entry) && this.matchesGenre(entry))
      .sort((left, right) => compareCalendarEntries(left, right, startOfToday())),
  );

  protected readonly visibleDayCount = computed(
    () => new Set(this.filteredEntries().map((entry) => entry.isoDate)).size,
  );

  protected readonly visibleFestivalCount = computed(
    () => new Set(this.filteredEntries().map((entry) => entry.festival.slug)).size,
  );

  protected readonly monthGroups = computed<readonly CalendarMonthGroupView[]>(() => {
    const locale = resolveLocale(this.#i18n.activeLang());
    const monthGroups = new Map<string, { title: string; days: Map<string, CalendarDateGroupView> }>();

    for (const entry of this.filteredEntries()) {
      const monthId = format(entry.date, 'yyyy-MM');
      const monthTitle = capitalize(format(entry.date, 'LLLL yyyy', { locale }));
      const monthGroup = ensureMonthGroup(monthGroups, monthId, monthTitle);
      const dayGroup = monthGroup.days.get(entry.isoDate) ?? {
        isoDate: entry.isoDate,
        weekdayLabel: capitalize(format(entry.date, 'EEEE', { locale })),
        dateLabel: format(entry.date, 'd MMMM', { locale }),
        cards: [],
      };

      monthGroup.days.set(entry.isoDate, {
        ...dayGroup,
        cards: [...dayGroup.cards, buildCardView(entry, locale)],
      });
    }

    return Array.from(monthGroups.entries(), ([id, monthGroup]) => ({
      id,
      title: monthGroup.title,
      days: Array.from(monthGroup.days.values()),
    }));
  });

  readonly #i18n = inject(TranslationService);

  protected selectMonth(filter: CalendarMonthFilter): void {
    this.selectedMonth.set(filter);
  }

  protected selectProvince(filter: CalendarProvinceFilter): void {
    this.selectedProvince.set(filter);
  }

  protected selectGenre(filter: CalendarGenreFilter): void {
    this.selectedGenre.set(filter);
  }

  protected clearFilters(): void {
    this.selectedMonth.set('all');
    this.selectedProvince.set('all');
    this.selectedGenre.set('all');
  }

  protected provinceFilterTestId(filter: CalendarProvinceFilter): string {
    return filter === 'Castellón' ? 'castellon' : filter.toLowerCase();
  }

  private matchesMonth(entry: CalendarExpandedEntry): boolean {
    const month = this.selectedMonth();
    return month === 'all' ? true : entry.date.getMonth() === FILTER_MONTH_NUMBERS[month];
  }

  private matchesProvince(entry: CalendarExpandedEntry): boolean {
    const province = this.selectedProvince();
    return province === 'all' ? true : entry.festival.province === province;
  }

  private matchesGenre(entry: CalendarExpandedEntry): boolean {
    const genre = this.selectedGenre();
    return genre === 'all' ? true : entry.festival.genre === genre;
  }
}

function expandFestivalDays(festival: CalendarFestival): readonly CalendarExpandedEntry[] {
  const start = parseISO(festival.startDate);
  const end = parseISO(festival.endDate);
  const totalDays = differenceInCalendarDays(end, start) + 1;

  return eachDayOfInterval({ start, end }).map((date) => ({
    festival,
    date,
    isoDate: format(date, 'yyyy-MM-dd'),
    dayNumber: differenceInCalendarDays(date, start) + 1,
    totalDays,
  }));
}

function ensureMonthGroup(
  groups: Map<string, { title: string; days: Map<string, CalendarDateGroupView> }>,
  id: string,
  title: string,
): { title: string; days: Map<string, CalendarDateGroupView> } {
  const current = groups.get(id);
  if (current) return current;

  const created = {
    title,
    days: new Map<string, CalendarDateGroupView>(),
  };
  groups.set(id, created);
  return created;
}

function buildCardView(entry: CalendarExpandedEntry, locale: Locale): CalendarCardView {
  const badge = buildBadge(entry.dayNumber, entry.totalDays);

  return {
    id: `${entry.festival.slug}-${entry.isoDate}`,
    festival: entry.festival,
    rangeLabel: formatFestivalRange(entry.festival.startDate, entry.festival.endDate, locale),
    badgeKey: badge.key,
    badgeTone: badge.tone,
    badgeParams: badge.params,
  };
}

function buildBadge(
  dayNumber: number,
  totalDays: number,
): { key: TranslationKey; tone: BadgeTone; params?: Record<string, number> } {
  if (totalDays === 1) {
    return { key: 'calendarPage.badges.singleDay', tone: 'single' };
  }

  if (dayNumber === 1) {
    return { key: 'calendarPage.badges.start', tone: 'start' };
  }

  if (dayNumber === totalDays) {
    return { key: 'calendarPage.badges.lastDay', tone: 'final' };
  }

  return {
    key: 'calendarPage.badges.dayOfTotal',
    tone: 'middle',
    params: { day: dayNumber, total: totalDays },
  };
}

function formatFestivalRange(startIso: string, endIso: string, locale: Locale): string {
  const start = parseISO(startIso);
  const end = parseISO(endIso);

  if (startIso === endIso) {
    return format(start, 'd MMMM', { locale });
  }

  const isSameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (isSameMonth) {
    return `${format(start, 'd', { locale })}–${format(end, 'd MMMM', { locale })}`;
  }

  return `${format(start, 'd MMMM', { locale })}–${format(end, 'd MMMM', { locale })}`;
}

function compareCalendarEntries(
  left: CalendarExpandedEntry,
  right: CalendarExpandedEntry,
  today: Date,
): number {
  const leftEnded = hasFestivalEnded(left.festival, today);
  const rightEnded = hasFestivalEnded(right.festival, today);

  if (leftEnded !== rightEnded) {
    return leftEnded ? 1 : -1;
  }

  return left.isoDate.localeCompare(right.isoDate) || left.festival.name.localeCompare(right.festival.name);
}

function hasFestivalEnded(festival: CalendarFestival, today: Date): boolean {
  return parseISO(festival.endDate) < today;
}

function startOfToday(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function resolveLocale(lang: string): Locale {
  if (lang.startsWith('ca')) return DATE_LOCALES.ca;
  if (lang.startsWith('en')) return DATE_LOCALES.en;
  return DATE_LOCALES.es;
}

function capitalize(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}
