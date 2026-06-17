import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  getCaseStudies,
  getCaseStudy,
  getCaseStudiesByCapability,
} from './work';

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spacecadet-work-test-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

function writeStudy(name: string, frontmatter: string, body = 'Case study body.') {
  fs.writeFileSync(
    path.join(tmpDir, name),
    `---\n${frontmatter}\n---\n\n${body}`,
    'utf-8',
  );
}

const VALID_FRONTMATTER = `title: "Custom AI for a logistics startup"
slug: logistics-startup
date: "2026-05-01"
client: "An anonymous Series-A logistics startup"
capability: custom-ai-products
year: 2026
industry: Logistics
engagementLength: "12 weeks"
teamSize: 3
coverImage: /work/logistics/cover.png
metrics:
  - label: SaaS spend replaced
    value: "$84K / year"
  - label: Vendor tools replaced
    value: "4"
techStack:
  - Claude 3.5 Sonnet
  - Postgres + pgvector
  - Next.js`;

describe('getCaseStudies — happy paths', () => {
  it('parses a valid case study end-to-end', () => {
    writeStudy('logistics.mdx', VALID_FRONTMATTER);
    const [study] = getCaseStudies({ baseDir: tmpDir });
    expect(study.title).toBe('Custom AI for a logistics startup');
    expect(study.slug).toBe('logistics-startup');
    expect(study.capability).toBe('custom-ai-products');
    expect(study.year).toBe(2026);
    expect(study.teamSize).toBe(3);
    expect(study.metrics).toHaveLength(2);
    expect(study.metrics[0]).toEqual({
      label: 'SaaS spend replaced',
      value: '$84K / year',
    });
    expect(study.techStack).toContain('Next.js');
    expect(study.draft).toBe(false);
    expect(study.content).toContain('Case study body.');
  });

  it('returns an empty array when the directory does not exist', () => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    expect(getCaseStudies({ baseDir: tmpDir })).toEqual([]);
  });

  it('orders case studies by date desc', () => {
    writeStudy(
      'a.mdx',
      VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: a').replace(
        'date: "2026-05-01"',
        'date: "2026-01-15"',
      ),
    );
    writeStudy(
      'b.mdx',
      VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: b').replace(
        'date: "2026-05-01"',
        'date: "2026-04-10"',
      ),
    );
    writeStudy(
      'c.mdx',
      VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: c').replace(
        'date: "2026-05-01"',
        'date: "2026-06-01"',
      ),
    );
    const slugs = getCaseStudies({ baseDir: tmpDir }).map((s) => s.slug);
    expect(slugs).toEqual(['c', 'b', 'a']);
  });
});

describe('getCaseStudies — draft handling', () => {
  it('excludes drafts by default in production-mode tests', () => {
    writeStudy('a.mdx', VALID_FRONTMATTER);
    writeStudy(
      'b.mdx',
      `${VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: drafty')}
draft: true`,
    );
    const studies = getCaseStudies({ baseDir: tmpDir, includeDrafts: false });
    expect(studies.map((s) => s.slug)).toEqual(['logistics-startup']);
  });

  it('includes drafts when includeDrafts: true', () => {
    writeStudy('a.mdx', VALID_FRONTMATTER);
    writeStudy(
      'b.mdx',
      `${VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: drafty')}
draft: true`,
    );
    const studies = getCaseStudies({ baseDir: tmpDir, includeDrafts: true });
    expect(studies.map((s) => s.slug).sort()).toEqual([
      'drafty',
      'logistics-startup',
    ]);
  });
});

describe('getCaseStudies — schema errors', () => {
  it('throws on an unknown capability', () => {
    writeStudy(
      'bad-cap.mdx',
      VALID_FRONTMATTER.replace(
        'capability: custom-ai-products',
        'capability: unknown-thing',
      ),
    );
    expect(() => getCaseStudies({ baseDir: tmpDir })).toThrow(/capability/);
  });

  it('throws when metrics is empty', () => {
    writeStudy(
      'no-metrics.mdx',
      VALID_FRONTMATTER.replace(
        /metrics:[\s\S]+?techStack:/,
        'metrics: []\ntechStack:',
      ),
    );
    expect(() => getCaseStudies({ baseDir: tmpDir })).toThrow(/metric/);
  });

  it('throws when techStack is empty', () => {
    writeStudy(
      'no-tech.mdx',
      VALID_FRONTMATTER.replace(
        /techStack:[\s\S]*$/,
        'techStack: []',
      ),
    );
    expect(() => getCaseStudies({ baseDir: tmpDir })).toThrow(/tech/);
  });
});

describe('getCaseStudy', () => {
  it('returns the matching study by slug', () => {
    writeStudy('a.mdx', VALID_FRONTMATTER);
    expect(getCaseStudy('logistics-startup', { baseDir: tmpDir })?.year).toBe(2026);
  });

  it('returns null when slug does not exist', () => {
    writeStudy('a.mdx', VALID_FRONTMATTER);
    expect(getCaseStudy('missing', { baseDir: tmpDir })).toBeNull();
  });
});

describe('getCaseStudiesByCapability', () => {
  it('returns only studies tagged with the requested capability', () => {
    writeStudy('custom.mdx', VALID_FRONTMATTER);
    writeStudy(
      'integration.mdx',
      VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: integration-one')
        .replace('capability: custom-ai-products', 'capability: ai-integrations'),
    );
    writeStudy(
      'integration-two.mdx',
      VALID_FRONTMATTER.replace('slug: logistics-startup', 'slug: integration-two')
        .replace('capability: custom-ai-products', 'capability: ai-integrations'),
    );

    const integrations = getCaseStudiesByCapability('ai-integrations', {
      baseDir: tmpDir,
    });
    expect(integrations.map((s) => s.slug).sort()).toEqual([
      'integration-one',
      'integration-two',
    ]);

    const products = getCaseStudiesByCapability('custom-ai-products', {
      baseDir: tmpDir,
    });
    expect(products.map((s) => s.slug)).toEqual(['logistics-startup']);

    const agents = getCaseStudiesByCapability('agents-automation', {
      baseDir: tmpDir,
    });
    expect(agents).toEqual([]);
  });
});
