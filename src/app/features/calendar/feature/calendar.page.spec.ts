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

  it('renders the hero and chronological timeline groups', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-testid="calendar-page"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-timeline"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-month-2026-06"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-date-group-2026-06-26"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="calendar-card-bigsound-2026-06-26"]')).not.toBeNull();
  });

  it('keeps month groups in natural chronological order', () => {
    const root = fixture.nativeElement as HTMLElement;
    const renderedMonths = Array.from(
      root.querySelectorAll('[data-testid^="calendar-month-"]'),
    ).map((element) => element.getAttribute('data-testid'));

    expect(renderedMonths).toEqual([
      'calendar-month-2026-06',
      'calendar-month-2026-07',
      'calendar-month-2026-08',
    ]);
  });
});
