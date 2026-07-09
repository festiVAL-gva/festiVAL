import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { FestivalFeaturedVideoComponent } from './festival-featured-video';

describe('FestivalFeaturedVideoComponent', () => {
  let fixture: ComponentFixture<FestivalFeaturedVideoComponent>;
  let play: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [FestivalFeaturedVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalFeaturedVideoComponent);
    fixture.componentRef.setInput('video', findFestivalDetailEntry('reve')!.featuredVideo!);
    fixture.detectChanges();
  });

  afterEach(() => {
    play.mockRestore();
  });

  it('renders the featured video section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-featured-video"]')).not.toBeNull();
  });

  it('autoplays muted with native controls', () => {
    const video = fixture.nativeElement.querySelector(
      '[data-testid="festival-featured-video-media"]',
    ) as HTMLVideoElement;

    expect(video).not.toBeNull();
    expect(video.hasAttribute('controls')).toBe(true);
    expect(video.hasAttribute('autoplay')).toBe(true);
    expect(video.hasAttribute('loop')).toBe(true);
    expect(video.hasAttribute('muted')).toBe(true);
    expect(video.getAttribute('preload')).toBe('auto');
    expect(video.muted).toBe(true);
    expect(video.defaultMuted).toBe(true);
    expect(video.autoplay).toBe(true);
  });

  it('requests playback after the video element is initialized', async () => {
    const localFixture = TestBed.createComponent(FestivalFeaturedVideoComponent);
    localFixture.componentRef.setInput('video', findFestivalDetailEntry('reve')!.featuredVideo!);
    localFixture.detectChanges();

    expect(play).toHaveBeenCalled();
  });

  it('retries playback after media readiness events', () => {
    const video = fixture.nativeElement.querySelector(
      '[data-testid="festival-featured-video-media"]',
    ) as HTMLVideoElement;
    const previousCalls = play.mock.calls.length;

    video.dispatchEvent(new Event('canplay'));

    expect(play.mock.calls.length).toBeGreaterThan(previousCalls);
  });

  it('points to the optimized Reve video asset', () => {
    const video = fixture.nativeElement.querySelector(
      '[data-testid="festival-featured-video-media"]',
    ) as HTMLVideoElement;

    expect(video.getAttribute('src')).toBe('/assets/images/festivals/reve/reve-maria-becerra-live-2026.mp4');
  });
});
