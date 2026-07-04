import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PageTransitionService } from '@core/platform/page-transition.service';
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
}
