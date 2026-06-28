import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { FestivalCalendarComponent } from '@features/home/ui/festival-calendar/festival-calendar';

@Component({
  selector: 'fv-calendar-page',
  imports: [TranslatePipe, FestivalCalendarComponent],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {}
