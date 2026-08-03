import { absoluteUrl, canonicalFor } from './urls';
import type { FestivalDetailEntry } from '@lib/festivals/catalogue';
import type { FestivalDetailFacts } from '@lib/domain/festival-detail-facts.model';

export interface SeoMeta {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly canonicalUrl: string;
  readonly image: {
    readonly url: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly indexable: boolean;
}

function clipDescription(text: string, max = 155): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) {
    return normalized;
  }
  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const clipped = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${clipped}…`;
}

export function buildFestivalSeo(
  entry: FestivalDetailEntry,
  facts: FestivalDetailFacts | null,
  overviewParagraph: string,
  baseUrl: string,
): SeoMeta {
  const year = entry.hero.startDate.slice(0, 4);
  const title = `${entry.nombre} ${year}: cartel, fechas y entradas | TuriaFest`;
  const location = facts
    ? `${facts.location.city}, ${facts.location.province}`
    : undefined;
  const rawDescription = location
    ? `${overviewParagraph} Ubicación: ${location}.`
    : overviewParagraph;

  const canonicalPath = `/festivales/${entry.slug}`;

  return {
    title,
    description: clipDescription(rawDescription),
    canonicalPath,
    canonicalUrl: canonicalFor(canonicalPath, baseUrl),
    image: {
      url: absoluteUrl(entry.hero.poster.src, baseUrl),
      alt: entry.hero.poster.alt,
      width: entry.hero.poster.width,
      height: entry.hero.poster.height,
    },
    indexable: true,
  };
}
