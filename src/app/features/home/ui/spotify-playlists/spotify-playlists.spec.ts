import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlaylistsComponent } from './spotify-playlists';

describe('SpotifyPlaylistsComponent', () => {
  let component: SpotifyPlaylistsComponent;
  let fixture: ComponentFixture<SpotifyPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyPlaylistsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotifyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders a card for each playlist', () => {
    const root = fixture.nativeElement as HTMLElement;
    const cards = root.querySelectorAll('[data-testid^="spotify-playlists-card-"]');

    expect(cards.length).toBe(4);
  });

  it('renders the section title', () => {
    const root = fixture.nativeElement as HTMLElement;
    const title = root.querySelector('[data-testid="spotify-playlists-title"]');

    expect(title?.textContent?.trim()).toBeTruthy();
  });

  it('embeds a Spotify iframe per playlist', () => {
    const root = fixture.nativeElement as HTMLElement;
    const iframes = root.querySelectorAll('.spotify-playlists__iframe');

    expect(iframes.length).toBe(4);
    iframes.forEach((iframe) => {
      expect(iframe.getAttribute('title')).toBeTruthy();
    });
  });
});
