import { ChangeDetectionStrategy, Component, OnDestroy, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideNewspaper } from '@lucide/angular';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-news-page',
  imports: [RouterLink, LucideArrowRight, LucideNewspaper, TranslatePipe],
  templateUrl: './news.page.html',
  styleUrl: './news.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent implements OnDestroy {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #translation = inject(TranslationService);
  readonly #previousTitle = this.#title.getTitle();
  readonly #robotsTag: HTMLMetaElement | null;

  constructor() {
    this.#robotsTag = this.#meta.addTag(
      { name: 'robots', content: 'noindex, follow' },
      true,
    );

    effect(() => {
      this.#translation.activeLang();
      this.#title.setTitle(this.#translation.t('news.meta.title'));
    });
  }

  ngOnDestroy(): void {
    this.#title.setTitle(this.#previousTitle);
    if (this.#robotsTag) {
      this.#meta.removeTagElement(this.#robotsTag);
    }
  }
}
