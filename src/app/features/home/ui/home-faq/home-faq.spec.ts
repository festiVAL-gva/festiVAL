import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFaqComponent } from './home-faq';

describe('HomeFaqComponent', () => {
  let fixture: ComponentFixture<HomeFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFaqComponent);
    fixture.detectChanges();
  });

  it('renders the faq section and all triggers', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-testid="home-faq"]')).not.toBeNull();
    expect(root.querySelectorAll('[data-testid^="home-faq-trigger-"]')).toHaveLength(6);
  });

  it('opens and closes an answer when the trigger is clicked', () => {
    const root = fixture.nativeElement as HTMLElement;
    const trigger = root.querySelector('[data-testid="home-faq-trigger-tickets"]') as HTMLButtonElement;
    const panel = root.querySelector('[data-testid="home-faq-panel-tickets"]') as HTMLElement;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hasAttribute('hidden')).toBe(false);

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);
  });
});
