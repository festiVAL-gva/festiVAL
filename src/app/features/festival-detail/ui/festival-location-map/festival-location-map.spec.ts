import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { FestivalLocationMapComponent } from './festival-location-map';

describe('FestivalLocationMapComponent', () => {
  let fixture: ComponentFixture<FestivalLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalLocationMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalLocationMapComponent);
    fixture.componentRef.setInput('entry', findFestivalDetailEntry('medusa')!);
    fixture.detectChanges();
  });

  it('renders the location map section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-location-map"]')).not.toBeNull();
  });

  it('renders an iframe with the festival coordinates', () => {
    const iframe = fixture.nativeElement.querySelector('iframe.festival-location-map__iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('google.com/maps/embed');
    expect(iframe.getAttribute('src')).toContain('Medusa%20Festival');
  });
});
