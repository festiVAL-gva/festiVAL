import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

import type {
  FestivalGalleryPhoto,
  FestivalPhotoGallery,
} from '../../data-access/festival-detail-catalogue';

@Component({
  selector: 'fv-festival-photo-gallery',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './festival-photo-gallery.html',
  styleUrl: './festival-photo-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalPhotoGalleryComponent {
  readonly gallery = input.required<FestivalPhotoGallery>();
  protected readonly activeIndex = signal(0);
  protected readonly previousLabelKey =
    'festival.detail.byFestival.reve.overview.photoGallery.controls.previous' as TranslationKey;
  protected readonly nextLabelKey =
    'festival.detail.byFestival.reve.overview.photoGallery.controls.next' as TranslationKey;

  protected readonly featuredPhoto = computed<FestivalGalleryPhoto | null>(
    () => this.gallery().photos.find((photo) => photo.featured) ?? this.gallery().photos[0] ?? null,
  );

  protected readonly photos = computed<readonly FestivalGalleryPhoto[]>(() => {
    const featured = this.featuredPhoto();
    if (!featured) return [];
    return [featured, ...this.gallery().photos.filter((photo) => photo !== featured)];
  });

  protected readonly activePhoto = computed<FestivalGalleryPhoto | null>(() => {
    const photos = this.photos();
    if (!photos.length) return null;
    return photos[this.activeIndex() % photos.length] ?? photos[0] ?? null;
  });
  protected readonly activePhotos = computed<readonly FestivalGalleryPhoto[]>(() => {
    const activePhoto = this.activePhoto();
    return activePhoto ? [activePhoto] : [];
  });

  protected previousPhoto(): void {
    const total = this.photos().length;
    if (!total) return;
    this.activeIndex.update((index) => (index - 1 + total) % total);
  }

  protected nextPhoto(): void {
    const total = this.photos().length;
    if (!total) return;
    this.activeIndex.update((index) => (index + 1) % total);
  }

  protected selectPhoto(index: number): void {
    this.activeIndex.set(index);
  }
}
