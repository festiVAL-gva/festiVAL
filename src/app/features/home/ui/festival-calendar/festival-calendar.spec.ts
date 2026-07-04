import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FestivalCalendarComponent } from './festival-calendar';

describe('FestivalCalendarComponent', () => {
  let fixture: ComponentFixture<FestivalCalendarComponent>;
  let component: FestivalCalendarComponent;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [FestivalCalendarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the timeline title and festival cards', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(
      root.querySelector('[data-testid="festival-calendar-title"]')?.textContent?.trim(),
    ).toBeTruthy();
    expect(root.querySelectorAll('[data-testid="festival-calendar-card"]')).toHaveLength(7);
  });

  it('renders three month labels, the gradient rail and the full day scale', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('.festival-calendar__month')).toHaveLength(3);
    expect(root.querySelector('.festival-calendar__rail')).not.toBeNull();
    expect(root.querySelectorAll('.festival-calendar__day').length).toBeGreaterThan(60);
  });

  it('marks the first timeline festival as the initially active card', () => {
    expect(component.activeIndex()).toBe(0);
    expect(component.isActive(0)).toBe(true);
    expect(component.isActive(1)).toBe(false);
  });

  it('switches the active festival when focusFestival() is called', () => {
    const third = component.festivals[2];
    component.focusFestival(third);

    expect(component.activeIndex()).toBe(2);
    expect(component.isActive(2)).toBe(true);
    expect(component.isActive(0)).toBe(false);
  });

  it('cycles the active card automatically every 5 seconds in timeline order', () => {
    expect(component.activeIndex()).toBe(0);
    expect(component.festivals.map((festival) => festival.slug)).toEqual([
      'bigsound',
      'latin-fest',
      'reve',
      'latin-fest-valencia',
      'zevra',
      'arenal',
      'medusa',
    ]);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(1);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(2);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(3);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(4);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(5);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(6);

    vi.advanceTimersByTime(5000);
    expect(component.activeIndex()).toBe(0);
  });

  it('restarts the autoplay timer when a festival day is focused', () => {
    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe(0);

    component.focusFestival(component.festivals[2]);
    expect(component.activeIndex()).toBe(2);

    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe(2);

    vi.advanceTimersByTime(2000);
    expect(component.activeIndex()).toBe(3);
  });

  it('returns null for non-featured days and the festival for featured ones', () => {
    expect(component.festivalForDay('june', '16')).toBeNull();
    expect(component.festivalForDay('june', '26')).not.toBeNull();
    expect(component.festivalForDay('august', '13')?.slug).toBe('medusa');
  });

  it('labels only the editorial reference days on the scale', () => {
    expect(component.isLabeledDay('july', '4')).toBe(true);
    expect(component.isLabeledDay('july', '5')).toBe(false);
    expect(component.isLabeledDay('july', '16')).toBe(true);
    expect(component.isLabeledDay('august', '18')).toBe(true);
  });

  it('renders the Arenal card with the logo asset', () => {
    const root = fixture.nativeElement as HTMLElement;
    const arenalIndex = component.festivals.findIndex((festival) => festival.slug === 'arenal');
    const arenalCard = root.querySelectorAll<HTMLElement>('[data-testid="festival-calendar-card"]')[arenalIndex];
    const image = arenalCard?.querySelector<HTMLImageElement>('img');

    expect(arenalIndex).toBeGreaterThan(-1);
    expect(image).not.toBeNull();
    expect(image?.getAttribute('ng-reflect-ng-src') ?? image?.getAttribute('src')).toContain(
      '/assets/images/festivals/arenal/logo-arenal.webp',
    );
  });
});
