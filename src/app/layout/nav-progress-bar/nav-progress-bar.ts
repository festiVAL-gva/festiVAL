import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PageTransitionService } from '@core/platform/page-transition.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-nav-progress-bar',
  imports: [TranslatePipe],
  templateUrl: './nav-progress-bar.html',
  styleUrl: './nav-progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavProgressBarComponent {
  protected readonly transition = inject(PageTransitionService);
  protected readonly loadingLabelKey: TranslationKey = 'nav.progress.loading';
}
