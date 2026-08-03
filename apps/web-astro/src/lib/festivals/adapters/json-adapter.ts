import {
  FestivalDetailFactsSchema,
  type FestivalDetailFacts,
} from '@lib/domain/festival-detail-facts.model';
import {
  FESTIVAL_DETAIL_SLUGS,
  findFestivalDetailEntry,
  type FestivalDetailEntry,
  type FestivalDetailSlug,
} from '../catalogue';
import type { FestivalRepository } from '../repository';

import arenal from '../../../data/facts/festival-detail-arenal.json';
import bigsound from '../../../data/facts/festival-detail-bigsound.json';
import latinFest from '../../../data/facts/festival-detail-latin-fest.json';
import medusa from '../../../data/facts/festival-detail-medusa.json';
import reve from '../../../data/facts/festival-detail-reve.json';
import zevra from '../../../data/facts/festival-detail-zevra.json';

/**
 * Build-time facts keyed by slug. JSON files are symlinked from monorepo
 * `public/festival-detail-*.json` so editors keep a single source of truth.
 * Explicit imports avoid `node:fs` (Cloudflare prerender) and keep Vitest happy.
 */
const FACTS_BY_SLUG: Readonly<Record<FestivalDetailSlug, unknown>> = {
  arenal,
  bigsound,
  'latin-fest': latinFest,
  medusa,
  reve,
  zevra,
};

/**
 * Build-time adapter that reads verified facts from the Angular-era JSON files.
 * Swap for a Sanity adapter later — pages keep using `FestivalRepository`.
 */
export function createJsonFestivalRepository(): FestivalRepository {
  return {
    async listSlugs(): Promise<readonly FestivalDetailSlug[]> {
      return FESTIVAL_DETAIL_SLUGS;
    },

    async getBySlug(slug: string): Promise<FestivalDetailEntry | null> {
      return findFestivalDetailEntry(slug);
    },

    async getFacts(slug: string): Promise<FestivalDetailFacts | null> {
      if (!(slug in FACTS_BY_SLUG)) {
        return null;
      }
      try {
        return FestivalDetailFactsSchema.parse(
          FACTS_BY_SLUG[slug as FestivalDetailSlug],
        );
      } catch {
        return null;
      }
    },
  };
}
