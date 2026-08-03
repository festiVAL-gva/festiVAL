import { describe, expect, it } from 'vitest';

import { FestivalDetailFactsSchema } from '../domain/festival-detail-facts.model';
import { createJsonFestivalRepository } from './adapters/json-adapter';
import { FESTIVAL_DETAIL_SLUGS } from './catalogue';

describe('json festival repository', () => {
  const repo = createJsonFestivalRepository();

  it('lists the seed catalogue slugs', async () => {
    const slugs = await repo.listSlugs();
    expect(slugs).toEqual([...FESTIVAL_DETAIL_SLUGS]);
    expect(slugs).toContain('arenal');
  });

  it('returns catalogue entry metadata for a known slug', async () => {
    const entry = await repo.getBySlug('arenal');
    expect(entry?.nombre).toBe('Arenal Sound');
    expect(entry?.hero.startDate).toBe('2026-07-30');
  });

  it('returns null for an unknown slug', async () => {
    expect(await repo.getBySlug('no-existe')).toBeNull();
  });

  it('loads and validates verified facts from monorepo JSON', async () => {
    const facts = await repo.getFacts('arenal');
    expect(facts).not.toBeNull();
    const parsed = FestivalDetailFactsSchema.parse(facts);
    expect(parsed.slug).toBe('arenal');
    expect(parsed.location.city).toBe('Burriana');
    expect(parsed.ticket.fromPrice).toBe(40);
  });
});
