import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FestivalListPageComponent } from './festival-list.page';

describe('FestivalListPageComponent', () => {
  let component: FestivalListPageComponent;
  let fixture: ComponentFixture<FestivalListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalListPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the page header', () => {
    const root = fixture.nativeElement as HTMLElement;
    const title = root.querySelector('.festival-list__title');
    const subtitle = root.querySelector('.festival-list__subtitle');

    expect(title?.textContent?.trim()).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toBeTruthy();
  });

  it('renders a card for each festival', () => {
    const root = fixture.nativeElement as HTMLElement;
    const cards = root.querySelectorAll('[data-testid^="festival-card-"]');

    expect(cards.length).toBe(component.festivals.length);
  });

  it('links each card to the festival detail page', () => {
    const root = fixture.nativeElement as HTMLElement;
    const firstCard = root.querySelector('[data-testid="festival-card-bigsound"]');

    expect(firstCard).not.toBeNull();
    expect(firstCard?.getAttribute('href')).toBe('/festivales/bigsound');
  });
});
