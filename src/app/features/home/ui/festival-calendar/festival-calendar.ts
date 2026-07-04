import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

import type {
  CalendarFestivalEntry,
  CalendarMonth,
  CalendarMonthData,
} from '../../data-access/home-catalogue';

const INITIAL_ACTIVE_FESTIVAL_INDEX = 0;
const AUTOPLAY_INTERVAL_MS = 5000;

type FestivalDayLookup = Record<string, CalendarFestivalEntry>;
type LabeledDayLookup = Record<CalendarMonth, ReadonlySet<string>>;

const LABELED_DAYS: LabeledDayLookup = {
  june: new Set(['16', '20', '24', '26', '28', '30']),
  july: new Set(['1', '4', '8', '12', '16', '17', '21', '24', '28', '31']),
  august: new Set(['1', '4', '8', '12', '13', '16', '18']),
};

@Component({
  selector: 'fv-festival-calendar',
  imports: [NgOptimizedImage, RouterLink, LucideMapPin, TranslatePipe],
  templateUrl: './festival-calendar.html',
  styleUrl: './festival-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalCalendarComponent {
  readonly monthSegments = input.required<readonly CalendarMonthData[]>();

  readonly festivals = input.required<readonly CalendarFestivalEntry[]>();

  readonly festivalDays = computed(() =>
    this.festivals().reduce<FestivalDayLookup>((lookup, festival) => {
      lookup[`${festival.month}:${festival.dayLabel}`] = festival;
      return lookup;
    }, {}),
  );

  // ── Estado del carrusel ─────────────────────────────────────────────────
  /** Índice del festival actualmente visible. */
  readonly activeIndex = signal(INITIAL_ACTIVE_FESTIVAL_INDEX);

  readonly #destroyRef = inject(DestroyRef);
  #intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => this.#startAutoplay());
    this.#destroyRef.onDestroy(() => this.#stopAutoplay());
  }

  /** El usuario pasa el ratón por encima del día destacado de un festival. */
  focusFestival(festival: CalendarFestivalEntry): void {
    const idx = this.festivals().findIndex((f) => f.slug === festival.slug);
    if (idx >= 0) {
      this.activeIndex.set(idx);
      this.#restartAutoplay();
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex() === index;
  }

  #startAutoplay(): void {
    this.#intervalId = setInterval(() => {
      this.activeIndex.update((index) => (index + 1) % this.festivals().length);
    }, AUTOPLAY_INTERVAL_MS);
  }

  #stopAutoplay(): void {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  #restartAutoplay(): void {
    this.#stopAutoplay();
    this.#startAutoplay();
  }

  trackBySlug(_index: number, festival: CalendarFestivalEntry): string {
    return festival.slug;
  }

  festivalForDay(month: CalendarMonth, day: string): CalendarFestivalEntry | null {
    return this.festivalDays()[`${month}:${day}`] ?? null;
  }

  isLabeledDay(month: CalendarMonth, day: string): boolean {
    return LABELED_DAYS[month].has(day);
  }
}
