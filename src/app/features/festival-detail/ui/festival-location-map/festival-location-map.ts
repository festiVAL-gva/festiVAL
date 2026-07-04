import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

import type { FestivalDetailEntry } from '../../data-access/festival-detail-catalogue';

@Component({
  selector: 'fv-festival-location-map',
  imports: [TranslatePipe],
  templateUrl: './festival-location-map.html',
  styleUrl: './festival-location-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalLocationMapComponent {
  readonly #sanitizer = inject(DomSanitizer);
  readonly #i18n = inject(TranslationService);

  readonly entry = input.required<FestivalDetailEntry>();

  protected readonly mapTitle = computed(() => {
    const name = this.#i18n.t(this.entry().map.nameKey);
    return this.#i18n
      .t('festival.detail.locationMap.iframeTitle')
      .replace('{festival}', name);
  });

  protected readonly mapSrc = computed<SafeResourceUrl>(() =>
    this.#sanitizer.bypassSecurityTrustResourceUrl(this.entry().map.embedUrl),
  );
}
