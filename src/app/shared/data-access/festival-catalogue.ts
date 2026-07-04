import type { TranslationKey } from './i18n/translations';

export interface FeaturedFestivalEntry {
  readonly slug: string;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

export const FEATURED_FESTIVALS: readonly FeaturedFestivalEntry[] = [
  {
    slug: 'bigsound',
    dateKey: 'home.featured.cards.bigsound.date',
    nameKey: 'home.featured.cards.bigsound.name',
    locationKey: 'home.featured.cards.bigsound.location',
    image: {
      src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
      alt: 'Cartel de Bigsound Festival Valencia 2026',
      width: 550,
      height: 688,
    },
  },
  {
    slug: 'latin-fest',
    dateKey: 'home.featured.cards.latinFest.date',
    nameKey: 'home.featured.cards.latinFest.name',
    locationKey: 'home.featured.cards.latinFest.location',
    image: {
      src: '/assets/images/festivals/latin-fest/cartel-latin-fest-valencia-2026.webp',
      alt: 'Cartel de Latin Fest Valencia 2026',
      width: 941,
      height: 1672,
    },
  },
  {
    slug: 'medusa',
    dateKey: 'home.featured.cards.medusa.date',
    nameKey: 'home.featured.cards.medusa.name',
    locationKey: 'home.featured.cards.medusa.location',
    image: {
      src: '/assets/images/festivals/medusa/cartel-medusa-2026.webp',
      alt: 'Cartel general de Medusa Festival 2026',
      width: 1080,
      height: 1350,
    },
  },
  {
    slug: 'arenal',
    dateKey: 'home.featured.cards.arenal.date',
    nameKey: 'home.featured.cards.arenal.name',
    locationKey: 'home.featured.cards.arenal.location',
    image: {
      src: '/assets/images/festivals/arenal/cartel-arenal.webp',
      alt: 'Cartel de Arenal Sound 2026',
      width: 1114,
      height: 1386,
    },
  },
  {
    slug: 'reve',
    dateKey: 'home.featured.cards.reve.date',
    nameKey: 'home.featured.cards.reve.name',
    locationKey: 'home.featured.cards.reve.location',
    image: {
      src: '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp',
      alt: 'Cartel de Reve Festival Roig Arena Valencia 2026',
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: 'zevra',
    dateKey: 'home.featured.cards.zevra.date',
    nameKey: 'home.featured.cards.zevra.name',
    locationKey: 'home.featured.cards.zevra.location',
    image: {
      src: '/assets/images/festivals/zevra/cartel-zevra-2026.webp',
      alt: 'Cartel general de Zevra Festival 2026',
      width: 1080,
      height: 1350,
    },
  },
];
