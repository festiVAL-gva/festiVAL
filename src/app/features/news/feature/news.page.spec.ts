import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';

import { NewsPageComponent } from './news.page';

@Component({ template: '' })
class FestivalListStubComponent {}

describe('NewsPageComponent', () => {
  let fixture: ComponentFixture<NewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPageComponent],
      providers: [
        provideRouter([
          { path: 'festivales', component: FestivalListStubComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsPageComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('renders one heading and the accessible empty state', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-testid="news-page"]')).not.toBeNull();
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelector('[data-testid="news-empty-state"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="news-empty-message"]')?.textContent?.trim()).toBeTruthy();
    expect(root.querySelector('article')).toBeNull();
  });

  it('keeps the empty page out of search indexes', () => {
    const robots = TestBed.inject(Meta).getTag('name="robots"');

    expect(robots?.content).toBe('noindex, follow');
  });

  it('navigates to the festival catalogue from the empty state', async () => {
    const router = TestBed.inject(Router);
    const cta = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="news-empty-cta"]',
    ) as HTMLAnchorElement;

    cta.click();
    await fixture.whenStable();

    expect(router.url).toBe('/festivales');
  });
});
