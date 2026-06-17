import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getInsightsPost, getInsightsPosts } from './insights';

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spacecadet-insights-test-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

function writePost(name: string, frontmatter: string, body = 'Lorem ipsum content here. '.repeat(20)) {
  fs.writeFileSync(
    path.join(tmpDir, name),
    `---\n${frontmatter}\n---\n\n${body}`,
    'utf-8',
  );
}

const VALID_FRONTMATTER = `title: "Sample post"
slug: sample-post
date: "2026-06-15"
summary: "A one-line summary."
tags:
  - ai
  - engineering`;

describe('getInsightsPosts — happy paths', () => {
  it('parses a valid post and exposes frontmatter + content + computed reading time', () => {
    writePost('sample.mdx', VALID_FRONTMATTER);
    const [post] = getInsightsPosts({ baseDir: tmpDir });
    expect(post.title).toBe('Sample post');
    expect(post.slug).toBe('sample-post');
    expect(post.date).toBe('2026-06-15');
    expect(post.summary).toBe('A one-line summary.');
    expect(post.tags).toEqual(['ai', 'engineering']);
    expect(post.draft).toBe(false);
    expect(post.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(post.content).toContain('Lorem ipsum');
  });

  it('uses the frontmatter reading-time override when present', () => {
    writePost(
      'override.mdx',
      `${VALID_FRONTMATTER}\nreadingTimeMinutes: 7`,
      'short body',
    );
    const [post] = getInsightsPosts({ baseDir: tmpDir });
    expect(post.readingTimeMinutes).toBe(7);
  });

  it('returns an empty array when the directory does not exist', () => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    expect(getInsightsPosts({ baseDir: tmpDir })).toEqual([]);
  });

  it('returns an empty array when the directory has no .mdx files', () => {
    fs.writeFileSync(path.join(tmpDir, 'readme.md'), '# not mdx');
    expect(getInsightsPosts({ baseDir: tmpDir })).toEqual([]);
  });

  it('orders posts by date desc (most recent first)', () => {
    writePost(
      'a-old.mdx',
      `title: "Old"
slug: old
date: "2026-01-01"
summary: "Old."`,
    );
    writePost(
      'b-new.mdx',
      `title: "New"
slug: new
date: "2026-06-01"
summary: "New."`,
    );
    writePost(
      'c-mid.mdx',
      `title: "Mid"
slug: mid
date: "2026-03-15"
summary: "Mid."`,
    );
    const slugs = getInsightsPosts({ baseDir: tmpDir }).map((p) => p.slug);
    expect(slugs).toEqual(['new', 'mid', 'old']);
  });
});

describe('getInsightsPosts — draft handling', () => {
  it('excludes drafts when includeDrafts: false', () => {
    writePost('a.mdx', VALID_FRONTMATTER);
    writePost(
      'b.mdx',
      `title: "Draft"
slug: draft
date: "2026-06-15"
summary: "Draft post."
draft: true`,
    );
    const posts = getInsightsPosts({ baseDir: tmpDir, includeDrafts: false });
    expect(posts.map((p) => p.slug)).toEqual(['sample-post']);
  });

  it('includes drafts when includeDrafts: true', () => {
    writePost('a.mdx', VALID_FRONTMATTER);
    writePost(
      'b.mdx',
      `title: "Draft"
slug: draft
date: "2026-06-15"
summary: "Draft post."
draft: true`,
    );
    const posts = getInsightsPosts({ baseDir: tmpDir, includeDrafts: true });
    expect(posts.map((p) => p.slug).sort()).toEqual(['draft', 'sample-post']);
  });
});

describe('getInsightsPosts — schema errors', () => {
  it('throws when a required field is missing', () => {
    writePost(
      'broken.mdx',
      `slug: missing-title
date: "2026-06-15"
summary: "No title here."`,
    );
    expect(() => getInsightsPosts({ baseDir: tmpDir })).toThrow(/title/);
  });

  it('throws when the date is malformed', () => {
    writePost(
      'bad-date.mdx',
      `title: "Bad date"
slug: bad-date
date: "June 15 2026"
summary: "Wrong format."`,
    );
    expect(() => getInsightsPosts({ baseDir: tmpDir })).toThrow(/date must be ISO/);
  });

  it('throws when the slug is not kebab-case', () => {
    writePost(
      'bad-slug.mdx',
      `title: "Bad slug"
slug: "Not Kebab"
date: "2026-06-15"
summary: "Spaces in slug."`,
    );
    expect(() => getInsightsPosts({ baseDir: tmpDir })).toThrow(/slug/);
  });
});

describe('getInsightsPost', () => {
  it('returns the matching post by slug', () => {
    writePost('a.mdx', VALID_FRONTMATTER);
    const post = getInsightsPost('sample-post', { baseDir: tmpDir });
    expect(post?.title).toBe('Sample post');
  });

  it('returns null when the slug does not exist', () => {
    writePost('a.mdx', VALID_FRONTMATTER);
    expect(getInsightsPost('does-not-exist', { baseDir: tmpDir })).toBeNull();
  });

  it('returns a draft post by slug even though listings exclude it', () => {
    writePost(
      'draft.mdx',
      `title: "Draft"
slug: draft
date: "2026-06-15"
summary: "Draft preview."
draft: true`,
    );
    expect(getInsightsPost('draft', { baseDir: tmpDir })?.slug).toBe('draft');
  });
});
