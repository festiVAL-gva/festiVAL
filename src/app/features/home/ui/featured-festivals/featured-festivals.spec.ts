import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FeaturedFestivalsComponent } from './featured-festivals';

describe('FeaturedFestivalsComponent', () => {
  let component: FeaturedFestivalsComponent;
  let fixture: ComponentFixture<FeaturedFestivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedFestivalsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders one card per canonical festival', () => {
    const root = fixture.nativeElement as HTMLElement;
    const canonicalGroup = root.querySelector('.featured-festivals__group:not([aria-hidden])');
    const names = canonicalGroup?.querySelectorAll('[data-testid="featured-festivals-card-name"]');

    expect(names).toHaveLength(component.festivals.length);
  });

  it('does not pause the carousel when the pointer enters or leaves the viewport', () => {
    const root = fixture.nativeElement as HTMLElement;
    const viewport = root.querySelector('[data-testid="featured-festivals-viewport"]');

    viewport?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(component.isPaused()).toBe(false);

    viewport?.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(component.isPaused()).toBe(false);
  });

  it('pauses only while the viewport has keyboard focus', () => {
    const root = fixture.nativeElement as HTMLElement;
    const viewport = root.querySelector('[data-testid="featured-festivals-viewport"]');

    viewport?.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();
    expect(component.isPaused()).toBe(true);

    viewport?.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    expect(component.isPaused()).toBe(false);
  });

  it('renders the Arenal featured card with the poster asset', () => {
    const root = fixture.nativeElement as HTMLElement;
    const card = root.querySelector<HTMLElement>('[data-testid="featured-festivals-card-arenal"]');
    const image = card?.querySelector<HTMLImageElement>('img');

    expect(image).not.toBeNull();
    expect(image?.getAttribute('ng-reflect-ng-src') ?? image?.getAttribute('src')).toContain(
      '/assets/images/festivals/arenal/cartel-arenal.webp',
    );
  });
});
