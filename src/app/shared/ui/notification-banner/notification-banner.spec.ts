import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBannerComponent } from './notification-banner';
import { NotificationService } from '@core/notifications/notification.service';

describe('NotificationBannerComponent', () => {
  let component: NotificationBannerComponent;
  let fixture: ComponentFixture<NotificationBannerComponent>;
  let notifications: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationBannerComponent);
    component = fixture.componentInstance;
    notifications = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders nothing when there is no active notification', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-testid="notification-banner"]')).toBeNull();
  });

  it('renders an accessible alert banner when a notification is shown', () => {
    notifications.show({ messageKey: 'error.network', type: 'error' });
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const banner = root.querySelector('[data-testid="notification-banner"]');

    expect(banner).not.toBeNull();
    expect(banner?.getAttribute('role')).toBe('alert');
    expect(banner?.getAttribute('aria-live')).toBe('polite');
    expect(banner?.classList).toContain('notification-banner--error');
  });

  it('dismisses the banner when the close button is clicked', () => {
    notifications.show({ messageKey: 'error.network', type: 'error' });
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const closeButton = root.querySelector<HTMLButtonElement>('.notification-banner__close');
    closeButton?.click();
    fixture.detectChanges();

    expect(notifications.notification()).toBeNull();
    expect(root.querySelector('[data-testid="notification-banner"]')).toBeNull();
  });
});
