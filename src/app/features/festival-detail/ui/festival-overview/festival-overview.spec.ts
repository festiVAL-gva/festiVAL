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
});
