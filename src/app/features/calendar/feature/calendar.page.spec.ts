import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, vi } from 'vitest';

import { CalendarPageComponent } from './calendar.page';

describe('CalendarPageComponent', () => {
  let fixture: ComponentFixture<CalendarPageComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-28T12:00:00'));

    await TestBed.configureTestingModule({
      imports: [CalendarPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarPageComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the hero, filter bar, and chronological timeline groups', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-testid="calendar-page"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-filter-month-july"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-timeline"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-month-2026-06"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-date-group-2026-06-26"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-card-bigsound-2026-06-26"]')).not.toBeNull();
  });

  it('filters to an empty state and can clear the filters again', () => {
    const root = fixture.nativeElement as HTMLElement;
    const provinceButton = root.querySelector(
      '[data-testid="calendar-filter-province-castellon"]',
    ) as HTMLButtonElement | null;

    expect(provinceButton).not.toBeNull();

    provinceButton?.click();
    fixture.detectChanges();

    expect(provinceButton?.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('[data-testid="calendar-empty-state"]')).not.toBeNull();

    const resetButton = root.querySelector(
      '[data-testid="calendar-reset-filters"]',
    ) as HTMLButtonElement | null;

    expect(resetButton).not.toBeNull();

    resetButton?.click();
    fixture.detectChanges();

    expect(root.querySelector('[data-testid="calendar-empty-state"]')).toBeNull();
    expect(
      root.querySelector('[data-testid="calendar-date-group-2026-06-26"]'),
    ).not.toBeNull();
  });

  it('moves festivals that have already ended below upcoming ones', () => {
    const root = fixture.nativeElement as HTMLElement;
    const renderedMonths = Array.from(root.querySelectorAll('[data-testid^="calendar-month-"]')).map(
      (element) => element.getAttribute('data-testid'),
    );

    expect(renderedMonths[0]).toBe('calendar-month-2026-07');
    expect(renderedMonths.at(-1)).toBe('calendar-month-2026-06');
  });
});
