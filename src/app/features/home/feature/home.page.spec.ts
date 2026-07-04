import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, vi } from 'vitest';

import { HomePageComponent } from './home.page';

interface HomePageClockHandle {
  readonly now: {
    set(value: number): void;
  };
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-03T12:00:00+02:00'));

    globalThis.IntersectionObserver ??= class {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds: number[] = [];

      disconnect(): void {
        return;
      }
      observe(): void {
        return;
      }
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      unobserve(): void {
        return;
      }
    } as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the image card', () => {
    const image = fixture.nativeElement.querySelector('.home-page__image');

    expect(image?.getAttribute('ngsrc') ?? image?.getAttribute('src')).toContain(
      '/assets/images/backgrounds/home-hero-sunset-beach-1200.webp',
    );
  });

  it('renders the hero copy and static buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const overlay = root.querySelector('.home-page__overlay');
    const title = root.querySelector('[data-testid="home-hero-title"]');
    const description = root.querySelector('[data-testid="home-hero-description"]');
    const buttons = root.querySelectorAll('[data-testid="home-hero-actions"] .home-page__button');

    expect(overlay).not.toBeNull();
    expect(title?.textContent?.trim()).toBeTruthy();
    expect(description?.textContent?.trim()).toBeTruthy();
    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.getAttribute('type')).toBe('button');
    expect(buttons[1]?.getAttribute('type')).toBe('button');
  });

  it('renders the next festival editorial block for Latin Fest', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('[data-testid="home-next-festival"]');
    const title = root.querySelector('[data-testid="home-next-festival-title"]');
    const countdownCards = root.querySelectorAll('.home-next-festival__countdown-card');
    const primaryCta = root.querySelector(
      '[data-testid="home-next-festival-primary-cta"]',
    ) as HTMLAnchorElement | null;
    const secondaryCta = root.querySelector(
      '[data-testid="home-next-festival-secondary-cta"]',
    ) as HTMLAnchorElement | null;

    expect(section).not.toBeNull();
    expect(title?.textContent?.trim()).toContain('Latin Fest');
    expect(countdownCards).toHaveLength(4);
    expect(primaryCta?.getAttribute('href')).toBe('/festivales/latin-fest');
    expect(secondaryCta?.getAttribute('href')).toBe('/calendario');
  });

  it('moves the next festival block forward when the countdown target is reached', () => {
    const root = fixture.nativeElement as HTMLElement;
    const clockHandle = component as unknown as HomePageClockHandle;

    clockHandle.now.set(new Date('2026-07-04T00:00:00+02:00').getTime());
    fixture.detectChanges();

    const primaryCta = root.querySelector(
      '[data-testid="home-next-festival-primary-cta"]',
    ) as HTMLAnchorElement | null;
    const image = root.querySelector<HTMLImageElement>('.home-next-festival__image');

    expect(primaryCta?.getAttribute('href')).toBe('/festivales/reve');
    expect(image?.getAttribute('ng-reflect-ng-src') ?? image?.getAttribute('src')).toContain(
      '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp',
    );
  });

  it('renders the calendar, featured festivals, faq section and the interactive map section', async () => {
    const deferBlocks = await fixture.getDeferBlocks();
    for (const block of deferBlocks) {
      await block.render(DeferBlockState.Complete);
    }
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const calendar = root.querySelector('[data-testid="festival-calendar"]');
    const featured = root.querySelector('[data-testid="featured-festivals"]');
    const faq = root.querySelector('[data-testid="home-faq"]');
    const section = root.querySelector('[data-testid="home-festival-map"]');

    expect(calendar).not.toBeNull();
    expect(calendar?.querySelectorAll('[data-testid="festival-calendar-card"]')).toHaveLength(7);
    expect(featured).not.toBeNull();
    expect(featured?.querySelectorAll('[data-testid="featured-festivals-card-name"]')).toHaveLength(
      14,
    );
    expect(faq).not.toBeNull();
    expect(faq?.querySelectorAll('[data-testid^="home-faq-trigger-"]')).toHaveLength(6);
    expect(section).not.toBeNull();
    expect(section?.querySelectorAll('[data-testid="home-festival-map-pin"]')).toHaveLength(7);
  });
});
