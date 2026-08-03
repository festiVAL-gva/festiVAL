import { describe, expect, it } from 'vitest';

import { t } from './t';

describe('i18n t()', () => {
  it('resolves dotted keys from es.json', () => {
    expect(t('nav.festivals')).toBe('Festivales');
    expect(t('festival.detail.hero.cta.tickets')).toBe('COMPRAR ENTRADAS');
  });

  it('interpolates single-brace and double-brace params', () => {
    expect(
      t('festival.detail.facts.age.authorization', { from: 0, to: 15 }),
    ).toContain('0');
    expect(
      t('festival.detail.locationMap.iframeTitle', { festival: 'Arenal Sound' }),
    ).toBe('Mapa de ubicación de Arenal Sound');
  });
});
