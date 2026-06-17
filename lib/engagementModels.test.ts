import { describe, expect, it } from 'vitest';
import {
  engagementModels,
  getEngagementModel,
  type EngagementModel,
} from './engagementModels';

describe('engagement models data module', () => {
  it('exports exactly 3 models in the locked buyer-journey order', () => {
    expect(engagementModels).toHaveLength(3);
    expect(engagementModels.map((m) => m.id)).toEqual([
      'discovery-sprint',
      'build-engagement',
      'embedded-retainer',
    ]);
  });

  it('has unique IDs across all entries', () => {
    const ids = engagementModels.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(engagementModels)('$id', (model: EngagementModel) => {
    it('has all required scalar fields populated', () => {
      expect(model.name).toBeTruthy();
      expect(model.shortScope).toBeTruthy();
      expect(model.duration).toBeTruthy();
      expect(model.priceRange).toBeTruthy();
      expect(model.deliverable).toBeTruthy();
      expect(model.buyer).toBeTruthy();
    });

    it('shortScope is single-line and concise (under ~80 chars)', () => {
      expect(model.shortScope).not.toMatch(/\n/);
      expect(model.shortScope.length).toBeLessThanOrEqual(80);
    });

    it('priceRange contains a dollar sign (sanity check)', () => {
      expect(model.priceRange).toMatch(/\$/);
    });
  });
});

describe('getEngagementModel', () => {
  it('returns the matching model for each known id', () => {
    expect(getEngagementModel('discovery-sprint')?.name).toBe('Discovery Sprint');
    expect(getEngagementModel('build-engagement')?.name).toBe('Build Engagement');
    expect(getEngagementModel('embedded-retainer')?.name).toBe('Embedded Retainer');
  });

  it('returns undefined for an unknown id', () => {
    // @ts-expect-error — testing runtime behavior with an invalid id
    expect(getEngagementModel('unknown')).toBeUndefined();
  });
});
