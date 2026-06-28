import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucidePlus } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

interface HomeFaqEntry {
  readonly id: string;
  readonly questionKey: TranslationKey;
  readonly answerKey: TranslationKey;
  readonly accentColor: string;
}

const HOME_FAQ_ENTRIES: readonly HomeFaqEntry[] = [
  {
    id: 'tickets',
    questionKey: 'home.faq.items.tickets.question',
    answerKey: 'home.faq.items.tickets.answer',
    accentColor: 'var(--fv-accent-med-blue)',
  },
  {
    id: 'genres',
    questionKey: 'home.faq.items.genres.question',
    answerKey: 'home.faq.items.genres.answer',
    accentColor: 'var(--fv-accent-orange)',
  },
  {
    id: 'provinces',
    questionKey: 'home.faq.items.provinces.question',
    answerKey: 'home.faq.items.provinces.answer',
    accentColor: 'var(--fv-accent-coral)',
  },
  {
    id: 'family',
    questionKey: 'home.faq.items.family.question',
    answerKey: 'home.faq.items.family.answer',
    accentColor: 'var(--fv-accent-blue)',
  },
  {
    id: 'details',
    questionKey: 'home.faq.items.details.question',
    answerKey: 'home.faq.items.details.answer',
    accentColor: 'var(--fv-accent-warning)',
  },
  {
    id: 'dates',
    questionKey: 'home.faq.items.dates.question',
    answerKey: 'home.faq.items.dates.answer',
    accentColor: 'var(--fv-accent-med-blue)',
  },
] as const;

@Component({
  selector: 'fv-home-faq',
  imports: [LucidePlus, TranslatePipe],
  templateUrl: './home-faq.html',
  styleUrl: './home-faq.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFaqComponent {
  protected readonly entries = HOME_FAQ_ENTRIES;
  protected readonly openItemId = signal<string | null>(null);

  protected toggle(itemId: string): void {
    this.openItemId.update((current) => (current === itemId ? null : itemId));
  }

  protected isOpen(itemId: string): boolean {
    return this.openItemId() === itemId;
  }
}
