/**
 * MDX loader for case studies (Work).
 *
 * Reads `*.mdx` files from `app/work/`, parses frontmatter with
 * gray-matter, validates it against CaseStudyFrontmatterSchema, and
 * returns typed case studies. Throws at load time on malformed
 * frontmatter so problems surface at build time, not at runtime.
 *
 * Drafts are included in dev and excluded in production by default.
 *
 * Tests pass `baseDir` to point at a fixtures directory instead of
 * the default `app/work/`.
 *
 * Server-only. Imports `node:fs` and `node:path`; do not call from a
 * client component.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { CapabilityId } from '@/lib/capabilities';
import { CaseStudyFrontmatterSchema, type CaseStudy } from './schemas';

const DEFAULT_DIR = path.join(process.cwd(), 'app', 'work');

export interface WorkLoadOptions {
  baseDir?: string;
  includeDrafts?: boolean;
}

/**
 * Returns every case study in the configured directory, sorted by
 * date desc (most recent first).
 */
export function getCaseStudies(opts: WorkLoadOptions = {}): CaseStudy[] {
  const dir = opts.baseDir ?? DEFAULT_DIR;
  const includeDrafts = opts.includeDrafts ?? process.env.NODE_ENV !== 'production';

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'));

  const studies = files.map((name) => loadCaseStudyFile(path.join(dir, name)));

  return studies
    .filter((s) => includeDrafts || !s.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * Returns a single case study by slug, or null if not found. Drafts
 * are included so draft routes can preview during development.
 */
export function getCaseStudy(
  slug: string,
  opts: Omit<WorkLoadOptions, 'includeDrafts'> = {},
): CaseStudy | null {
  const all = getCaseStudies({ ...opts, includeDrafts: true });
  return all.find((study) => study.slug === slug) ?? null;
}

/**
 * Returns case studies filtered to a single capability tag, preserving
 * the date-desc order from `getCaseStudies`.
 */
export function getCaseStudiesByCapability(
  capability: CapabilityId,
  opts: WorkLoadOptions = {},
): CaseStudy[] {
  return getCaseStudies(opts).filter((s) => s.capability === capability);
}

function loadCaseStudyFile(filePath: string): CaseStudy {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);

  const validation = CaseStudyFrontmatterSchema.safeParse(parsed.data);
  if (!validation.success) {
    const issues = validation.error.issues
      .map((i) => `  • ${i.path.join('.') || '<root>'}: ${i.message}`)
      .join('\n');
    throw new Error(
      `Invalid case-study frontmatter in ${path.basename(filePath)}:\n${issues}`,
    );
  }

  return {
    ...validation.data,
    content: parsed.content,
  };
}
