import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  input,
} from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

import type { FestivalDetailVideo } from '../../data-access/festival-detail-catalogue';

@Component({
  selector: 'fv-festival-featured-video',
  imports: [TranslatePipe],
  templateUrl: './festival-featured-video.html',
  styleUrl: './festival-featured-video.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalFeaturedVideoComponent implements AfterViewInit, OnDestroy {
  readonly video = input.required<FestivalDetailVideo>();

  readonly #platformId = inject(PLATFORM_ID);
  readonly #retryDelays = [0, 250, 1000, 2500] as const;
  readonly #retryIds: number[] = [];
  #observer?: IntersectionObserver;

  @ViewChild('media', { static: true })
  private readonly media?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.#platformId)) return;

    const video = this.media?.nativeElement;
    if (!video) return;

    this.configureAutoplay(video);
    this.observeViewport(video);
    this.queueAutoplay(video);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('pageshow', this.handlePageShow);
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
    this.#observer = undefined;

    if (isPlatformBrowser(this.#platformId)) {
      for (const id of this.#retryIds) {
        window.clearTimeout(id);
      }
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      window.removeEventListener('pageshow', this.handlePageShow);
    }
    this.#retryIds.length = 0;
  }

  protected startAutoplay(event?: Event): void {
    if (!isPlatformBrowser(this.#platformId)) return;

    const video =
      event?.target instanceof HTMLVideoElement ? event.target : this.media?.nativeElement;

    if (!video) return;

    this.queueAutoplay(video);
  }

  private configureAutoplay(video: HTMLVideoElement): void {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
  }

  private queueAutoplay(video = this.media?.nativeElement): void {
    if (!video) return;

    this.configureAutoplay(video);
    this.tryPlay(video);

    for (const delay of this.#retryDelays) {
      const id = window.setTimeout(() => this.tryPlay(video), delay);
      this.#retryIds.push(id);
    }
  }

  private tryPlay(video: HTMLVideoElement): void {
    if (!video.paused && !video.ended) return;

    this.configureAutoplay(video);
    try {
      void video.play()?.catch(() => undefined);
    } catch {
      // Browsers can still reject autoplay under user or OS-level media policies.
    }
  }

  private observeViewport(video: HTMLVideoElement): void {
    if (!('IntersectionObserver' in window)) return;

    this.#observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.queueAutoplay(video);
        }
      },
      { threshold: 0.35 },
    );
    this.#observer.observe(video);
  }

  private readonly handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible') {
      this.queueAutoplay();
    }
  };

  private readonly handlePageShow = (): void => {
    this.queueAutoplay();
  };
}
