import type { TranslationKey } from './i18n/translations';

export interface FeaturedFestivalEntry {
  readonly slug: string;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly image: { readonly src: string; readonly alt: string };
}

export const FEATURED_FESTIVALS: readonly FeaturedFestivalEntry[] = [
  {
    slug: 'bigsound',
    dateKey: 'home.featured.cards.bigsound.date',
    nameKey: 'home.featured.cards.bigsound.name',
    locationKey: 'home.featured.cards.bigsound.location',
    image: { src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp', alt: 'Bigsound Festival' },
  },
  {
    slug: 'latin-fest',
    dateKey: 'home.featured.cards.latinFest.date',
    nameKey: 'home.featured.cards.latinFest.name',
    locationKey: 'home.featured.cards.latinFest.location',
    image: { src: '/assets/images/festivals/latin-fest/cartel-latin-fest-valencia-2026.webp', alt: 'Latin Fest' },
  },
  {
    slug: 'medusa',
    dateKey: 'home.featured.cards.medusa.date',
    nameKey: 'home.featured.cards.medusa.name',
    locationKey: 'home.featured.cards.medusa.location',
    image: { src: '/assets/images/festivals/medusa/cartel-medusa-2026.webp', alt: 'Medusa Festival' },
  },
  {
    slug: 'arenal',
    dateKey: 'home.featured.cards.arenal.date',
    nameKey: 'home.featured.cards.arenal.name',
    locationKey: 'home.featured.cards.arenal.location',
    image: { src: '/assets/images/festivals/arenal/cartel-arenal.webp', alt: 'Arenal Sound' },
  },
  {
    slug: 'reve',
    dateKey: 'home.featured.cards.reve.date',
    nameKey: 'home.featured.cards.reve.name',
    locationKey: 'home.featured.cards.reve.location',
    image: { src: '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp', alt: 'Reve Festival' },
  },
  {
    slug: 'zevra',
    dateKey: 'home.featured.cards.zevra.date',
    nameKey: 'home.featured.cards.zevra.name',
    locationKey: 'home.featured.cards.zevra.location',
    image: { src: '/assets/images/festivals/zevra/cartel-zevra-2026.webp', alt: 'Zevra Festival' },
  },
];
