/**
 * MDX loader for Insights posts.
 *
 * Reads `*.mdx` files from `app/insights/`, parses frontmatter with
 * gray-matter, validates it against InsightsPostFrontmatterSchema, and
 * returns typed posts. Throws at load time on malformed frontmatter
 * so problems surface at build time, not at runtime.
 *
 * Drafts are included in dev and excluded in production by default.
 *
 * Tests pass `baseDir` to point at a fixtures directory instead of
 * the default `app/insights/`.
 *
 * Server-only. Imports `node:fs` and `node:path`; do not call from a
 * client component. Pages calling this should be server components.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { InsightsPostFrontmatterSchema, type InsightsPost } from './schemas';

const DEFAULT_DIR = path.join(process.cwd(), 'app', 'insights');
const WORDS_PER_MINUTE = 220;

export interface InsightsLoadOptions {
  /** Override the directory the loader scans (used by tests). */
  baseDir?: string;
  /**
   * Override the draft-exclusion behaviour. By default drafts are
   * included in dev (`NODE_ENV !== 'production'`) and excluded in
   * production.
   */
  includeDrafts?: boolean;
}

/**
 * Returns every Insights post in the configured directory, sorted by
 * date desc (most recent first).
 */
export function getInsightsPosts(opts: InsightsLoadOptions = {}): InsightsPost[] {
  const dir = opts.baseDir ?? DEFAULT_DIR;
  const includeDrafts = opts.includeDrafts ?? process.env.NODE_ENV !== 'production';

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'));

  const posts = files.map((name) => loadInsightsFile(path.join(dir, name)));

  return posts
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * Returns a single Insights post by slug, or null if not found.
 * Drafts are included regardless of `includeDrafts` so that draft
 * routes can preview during development.
 */
export function getInsightsPost(
  slug: string,
  opts: Omit<InsightsLoadOptions, 'includeDrafts'> = {},
): InsightsPost | null {
  const all = getInsightsPosts({ ...opts, includeDrafts: true });
  return all.find((post) => post.slug === slug) ?? null;
}

function loadInsightsFile(filePath: string): InsightsPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);

  const validation = InsightsPostFrontmatterSchema.safeParse(parsed.data);
  if (!validation.success) {
    const issues = validation.error.issues
      .map((i) => `  • ${i.path.join('.') || '<root>'}: ${i.message}`)
      .join('\n');
    throw new Error(
      `Invalid Insights frontmatter in ${path.basename(filePath)}:\n${issues}`,
    );
  }

  const meta = validation.data;
  const readingTimeMinutes = meta.readingTimeMinutes ?? computeReadingTime(parsed.content);

  return {
    ...meta,
    readingTimeMinutes,
    content: parsed.content,
  };
}

function computeReadingTime(text: string, wpm: number = WORDS_PER_MINUTE): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
