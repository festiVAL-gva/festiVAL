import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideChevronLeft, LucideChevronRight, LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import {
  CALENDAR_FESTIVALS,
  CALENDAR_FESTIVAL_COLOURS,
  type CalendarFestival,
  type CalendarFestivalCategory,
} from '../data-access/calendar-catalogue';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  festivals: CalendarFestival[];
}

interface CalendarWeek {
  days: CalendarDay[];
}

interface FestivalSpan {
  festival: CalendarFestival;
  startCol: number;
  span: number;
  colour: { bg: string; text: string };
}

const MONTH_NAMES_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

@Component({
  selector: 'fv-calendar-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    LucideChevronLeft,
    LucideChevronRight,
    LucideMapPin,
    TranslatePipe,
  ],
  host: { class: 'fv-calendar-page-host' },
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  protected readonly weekdays = WEEKDAY_LABELS;

  protected readonly currentMonth = signal(new Date().getMonth());
  protected readonly currentYear = signal(new Date().getFullYear());

  protected readonly monthLabel = computed(() =>
    `${MONTH_NAMES_ES[this.currentMonth()]} de ${this.currentYear()}`,
  );

  protected readonly weeks = computed(() => this.buildWeeks());

  protected readonly festivalSpansByWeek = computed(() => {
    const weeks = this.weeks();
    return weeks.map(week => this.computeSpansForWeek(week));
  });

  protected readonly agendaEntries = computed(() => {
    const month = this.currentMonth();
    const year = this.currentYear();
    return CALENDAR_FESTIVALS
      .filter(f => {
        const start = new Date(f.startDate);
        const end = new Date(f.endDate);
        return (start.getMonth() === month && start.getFullYear() === year) ||
               (end.getMonth() === month && end.getFullYear() === year) ||
               (start < new Date(year, month, 1) && end > new Date(year, month + 1, 0));
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .map(f => ({
        festival: f,
        colour: CALENDAR_FESTIVAL_COLOURS[f.category],
        dateLabel: this.formatDateRange(f),
      }));
  });

  protected hoveredFestival = signal<CalendarFestival | null>(null);
  protected hoverPosition = signal<{ x: number; y: number } | null>(null);

  protected previousMonth(): void {
    const m = this.currentMonth();
    if (m === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(v => v - 1);
    }
  }

  protected nextMonth(): void {
    const m = this.currentMonth();
    if (m === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(v => v + 1);
    }
  }

  protected goToday(): void {
    const now = new Date();
    this.currentMonth.set(now.getMonth());
    this.currentYear.set(now.getFullYear());
  }

  protected onFestivalHover(festival: CalendarFestival, event: MouseEvent): void {
    this.hoveredFestival.set(festival);
    this.hoverPosition.set({ x: event.clientX, y: event.clientY });
  }

  protected onFestivalLeave(): void {
    this.hoveredFestival.set(null);
    this.hoverPosition.set(null);
  }

  protected getCategoryColour(category: CalendarFestivalCategory): { bg: string; text: string } {
    return CALENDAR_FESTIVAL_COLOURS[category];
  }

  protected trackByDay(_: number, day: CalendarDay): number {
    return day.date.getTime();
  }

  protected trackByWeek(index: number): number {
    return index;
  }

  protected trackBySpan(_: number, span: FestivalSpan): string {
    return `${span.festival.slug}-${span.startCol}`;
  }

  protected formatDateRange(festival: CalendarFestival): string {
    const start = new Date(festival.startDate);
    const end = new Date(festival.endDate);
    const startDay = start.getDate();
    const endDay = end.getDate();
    const monthName = MONTH_NAMES_ES[start.getMonth()].toLowerCase().slice(0, 3);

    if (start.getMonth() === end.getMonth()) {
      return `${startDay} – ${endDay} ${monthName}`;
    }
    const endMonth = MONTH_NAMES_ES[end.getMonth()].toLowerCase().slice(0, 3);
    return `${startDay} ${monthName} – ${endDay} ${endMonth}`;
  }

  private buildWeeks(): CalendarWeek[] {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDow = firstDay.getDay();
    if (startDow === 0) startDow = 7;
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (startDow - 1));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weeks: CalendarWeek[] = [];
    const current = new Date(startDate);

    while (current <= lastDay || weeks.length < 5) {
      const days: CalendarDay[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(current);
        const dayFestivals = CALENDAR_FESTIVALS.filter(f => {
          const fStart = new Date(f.startDate);
          const fEnd = new Date(f.endDate);
          fStart.setHours(0, 0, 0, 0);
          fEnd.setHours(0, 0, 0, 0);
          return date >= fStart && date <= fEnd;
        });

        days.push({
          date,
          day: date.getDate(),
          isCurrentMonth: date.getMonth() === month,
          isToday: date.getTime() === today.getTime(),
          festivals: dayFestivals,
        });
        current.setDate(current.getDate() + 1);
      }
      weeks.push({ days });

      if (weeks.length >= 6) break;
    }

    return weeks;
  }

  private computeSpansForWeek(week: CalendarWeek): FestivalSpan[] {
    const seen = new Set<string>();
    const spans: FestivalSpan[] = [];

    for (let col = 0; col < 7; col++) {
      for (const festival of week.days[col].festivals) {
        if (seen.has(festival.slug)) continue;
        seen.add(festival.slug);

        let span = 1;
        for (let j = col + 1; j < 7; j++) {
          if (week.days[j].festivals.some(f => f.slug === festival.slug)) {
            span++;
          } else {
            break;
          }
        }

        spans.push({
          festival,
          startCol: col,
          span,
          colour: CALENDAR_FESTIVAL_COLOURS[festival.category],
        });
      }
    }

    return spans;
  }
}
