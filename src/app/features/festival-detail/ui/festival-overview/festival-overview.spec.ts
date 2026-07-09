import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { FestivalOverviewComponent } from './festival-overview';

describe('FestivalOverviewComponent', () => {
  let fixture: ComponentFixture<FestivalOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalOverviewComponent);
    fixture.componentRef.setInput('entry', findFestivalDetailEntry('medusa')!);
    fixture.detectChanges();
  });

  it('renders the overview section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-overview"]')).not.toBeNull();
  });

  it('renders the five highlight items', () => {
    expect(fixture.nativeElement.querySelectorAll('.festival-overview__highlight')).toHaveLength(5);
  });

  it('renders the featured video only when the festival provides one', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-featured-video"]')).toBeNull();

    fixture.componentRef.setInput('entry', findFestivalDetailEntry('reve')!);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="festival-featured-video"]')).not.toBeNull();
  });

  it('renders the photo gallery only when the festival provides one', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-photo-gallery"]')).toBeNull();

    fixture.componentRef.setInput('entry', findFestivalDetailEntry('reve')!);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="festival-photo-gallery"]')).not.toBeNull();
  });
});
