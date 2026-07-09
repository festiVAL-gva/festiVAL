import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { FestivalPhotoGalleryComponent } from './festival-photo-gallery';

describe('FestivalPhotoGalleryComponent', () => {
  let fixture: ComponentFixture<FestivalPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalPhotoGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalPhotoGalleryComponent);
    fixture.componentRef.setInput('gallery', findFestivalDetailEntry('reve')!.photoGallery!);
    fixture.detectChanges();
  });

  it('renders the photo gallery section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-photo-gallery"]')).not.toBeNull();
  });

  it('places the press photo as the featured image', () => {
    const featuredImage = fixture.nativeElement.querySelector('.festival-photo-gallery__feature img');

    expect(featuredImage?.getAttribute('alt')).toBe(
      'Fotografía principal de prensa de Reve Festival con estética azul y rosa',
    );
    expect(featuredImage?.getAttribute('width')).toBe('1600');
    expect(featuredImage?.getAttribute('height')).toBe('900');
  });

  it('renders every photo as a thumbnail', () => {
    expect(fixture.nativeElement.querySelectorAll('.festival-photo-gallery__strip img')).toHaveLength(7);
  });

  it('changes the active image with the next control', () => {
    fixture.nativeElement.querySelector('[data-testid="festival-photo-gallery-next"]').click();
    fixture.detectChanges();

    const activeImage = fixture.nativeElement.querySelector(
      '[data-testid="festival-photo-gallery-active-image"]',
    );

    expect(activeImage?.getAttribute('alt')).toBe('María Becerra actuando en concierto');
  });

  it('changes the active image from a thumbnail', () => {
    fixture.nativeElement.querySelector('[data-testid="festival-photo-gallery-thumb-3"]').click();
    fixture.detectChanges();

    const activeImage = fixture.nativeElement.querySelector(
      '[data-testid="festival-photo-gallery-active-image"]',
    );

    expect(activeImage?.getAttribute('alt')).toBe('Imagen promocional de C Marí');
  });
});
