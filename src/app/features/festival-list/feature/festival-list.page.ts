import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideCalendar, LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { FEATURED_FESTIVALS } from '@features/home/data-access/home-catalogue';

@Component({
  selector: 'fv-festival-list-page',
  imports: [NgOptimizedImage, RouterLink, LucideCalendar, LucideMapPin, TranslatePipe],
  templateUrl: './festival-list.page.html',
  styleUrl: './festival-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalListPageComponent {
  readonly festivals = FEATURED_FESTIVALS;
}
