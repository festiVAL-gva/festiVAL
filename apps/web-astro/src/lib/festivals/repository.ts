import type { FestivalDetailFacts } from '@lib/domain/festival-detail-facts.model';
import type { FestivalDetailEntry, FestivalDetailSlug } from './catalogue';

/**
 * Festival catalogue repository. Pages depend only on this interface so the
 * JSON adapter (PoC) can be swapped for Sanity without touching `src/pages/`.
 */
export interface FestivalRepository {
  listSlugs(): Promise<readonly FestivalDetailSlug[]>;
  getBySlug(slug: string): Promise<FestivalDetailEntry | null>;
  getFacts(slug: string): Promise<FestivalDetailFacts | null>;
}
