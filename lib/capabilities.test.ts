import { describe, expect, it } from 'vitest';
import { capabilities, getCapability, type Capability } from './capabilities';

describe('capabilities data module', () => {
  it('exports exactly 4 capabilities in the locked order', () => {
    expect(capabilities).toHaveLength(4);
    expect(capabilities.map((c) => c.id)).toEqual([
      'custom-ai-products',
      'ai-integrations',
      'agents-automation',
      'ai-strategy',
    ]);
  });

  it('has unique IDs across all entries', () => {
    const ids = capabilities.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(capabilities)('$id', (cap: Capability) => {
    it('has all required scalar fields populated', () => {
      expect(cap.name).toBeTruthy();
      expect(cap.summary).toBeTruthy();
      expect(cap.description).toBeTruthy();
      expect(cap.buyer).toBeTruthy();
    });

    it('has a fully populated engagementShape', () => {
      expect(cap.engagementShape.duration).toBeTruthy();
      expect(cap.engagementShape.deliverable).toBeTruthy();
      expect(cap.engagementShape.ipNote).toBeTruthy();
    });

    it('has a diagramHref pointing at an SVG asset', () => {
      expect(cap.diagramHref).toMatch(/\.svg$/);
    });

    it('summary is one line (no newlines, under ~120 chars)', () => {
      expect(cap.summary).not.toMatch(/\n/);
      expect(cap.summary.length).toBeLessThanOrEqual(120);
    });

    it('description is 2–3 sentences', () => {
      const sentenceCount = cap.description.split(/[.!?]\s/).filter(Boolean).length;
      expect(sentenceCount).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('getCapability', () => {
  it('returns the matching capability for each known id', () => {
    expect(getCapability('custom-ai-products')?.name).toBe('Custom AI Products');
    expect(getCapability('ai-integrations')?.name).toBe('AI Integrations');
    expect(getCapability('agents-automation')?.name).toBe('Intelligent Agents & Automation');
    expect(getCapability('ai-strategy')?.name).toBe('AI Strategy & Discovery');
  });

  it('returns undefined for an unknown id', () => {
    // @ts-expect-error — testing runtime behavior with an invalid id
    expect(getCapability('does-not-exist')).toBeUndefined();
  });
});
