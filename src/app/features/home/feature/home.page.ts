import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCalendar } from '@lucide/angular';

import { FeaturedFestivalsComponent } from '../ui/featured-festivals/featured-festivals';
import { FestivalCalendarComponent } from '../ui/festival-calendar/festival-calendar';
import { HomeFaqComponent } from '../ui/home-faq/home-faq';
import { HomeFestivalMapComponent } from '../ui/home-festival-map/home-festival-map';
import { SpotifyPlaylistsComponent } from '../ui/spotify-playlists/spotify-playlists';
import { NEXT_FESTIVALS, type NextFestivalEntry } from '../data-access/home-catalogue';
import { FESTIVAL_LOCATIONS } from '@shared/data-access/festival-locations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

interface CountdownState {
  readonly days: string;
  readonly hours: string;
  readonly minutes: string;
  readonly seconds: string;
}

@Component({
  selector: 'fv-home-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    LucideArrowRight,
    LucideCalendar,
    FestivalCalendarComponent,
    FeaturedFestivalsComponent,
    HomeFaqComponent,
    HomeFestivalMapComponent,
    SpotifyPlaylistsComponent,
    TranslatePipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly #destroyRef = inject(DestroyRef);
  #countdownIntervalId: ReturnType<typeof setInterval> | null = null;

  protected readonly festivalLocations = FESTIVAL_LOCATIONS;
  protected readonly now = signal(Date.now());
  protected readonly nextFestival = computed(() =>
    this.#findNextFestival(this.now()),
  );
  protected readonly nextFestivalImage = computed(() => [this.nextFestival()] as const);
  protected readonly nextFestivalCountdown = computed(() =>
    this.#buildCountdown(this.nextFestival().startsAt, this.now()),
  );
  protected readonly countdownItems = computed(() => {
    const countdown = this.nextFestivalCountdown();
    return [
      { value: countdown.days, labelKey: 'home.nextFestival.countdown.days' },
      { value: countdown.hours, labelKey: 'home.nextFestival.countdown.hours' },
      { value: countdown.minutes, labelKey: 'home.nextFestival.countdown.minutes' },
      { value: countdown.seconds, labelKey: 'home.nextFestival.countdown.seconds' },
    ] as const;
  });

  constructor() {
    afterNextRender(() => {
      this.#countdownIntervalId = setInterval(() => {
        this.now.set(Date.now());
      }, 1000);
    });
    this.#destroyRef.onDestroy(() => {
      if (this.#countdownIntervalId !== null) {
        clearInterval(this.#countdownIntervalId);
      }
    });
  }

  #findNextFestival(now: number): NextFestivalEntry {
    return (
      NEXT_FESTIVALS.find((festival) => new Date(festival.startsAt).getTime() > now) ??
      NEXT_FESTIVALS[NEXT_FESTIVALS.length - 1]
    );
  }

  #buildCountdown(startsAt: string, now: number): CountdownState {
    const diff = Math.max(new Date(startsAt).getTime() - now, 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }
}
