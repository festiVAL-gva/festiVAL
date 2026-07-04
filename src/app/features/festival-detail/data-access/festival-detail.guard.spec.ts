import { TestBed } from '@angular/core/testing';
import {
  convertToParamMap,
  provideRouter,
  UrlTree,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
} from '@angular/router';

import { festivalDetailGuard } from './festival-detail.guard';

function runGuard(slug: string): unknown {
  const route = { paramMap: convertToParamMap({ slug }) } as ActivatedRouteSnapshot;
  return TestBed.runInInjectionContext(() =>
    festivalDetailGuard(route, {} as RouterStateSnapshot),
  );
}

describe('festivalDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('allows navigation for a catalogue slug', () => {
    expect(runGuard('medusa')).toBe(true);
  });

  it('redirects to home for an unknown slug', () => {
    const result = runGuard('not-a-slug');
    expect(result).toBeInstanceOf(UrlTree);
    expect(String(result)).toBe('/');
  });
});
