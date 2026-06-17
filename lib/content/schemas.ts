/**
 * Zod schemas for MDX content frontmatter.
 *
 * These are the contract for any file the loaders accept. Schemas are
 * validated at *load time* — broken or missing fields fail fast with a
 * clear error so problems surface at build time, not at runtime.
 *
 * Shared by lib/content/insights.ts and lib/content/work.ts.
 */
import { z } from 'zod';
import { capabilities, type CapabilityId } from '@/lib/capabilities';

const capabilityIds = capabilities.map((c) => c.id) as [
  CapabilityId,
  ...CapabilityId[],
];

// ── Insights ───────────────────────────────────────────────────────

export const InsightsPostFrontmatterSchema = z.object({
  title: z.string().min(1, 'title is required'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'slug must be kebab-case [a-z0-9-]'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be ISO YYYY-MM-DD'),
  summary: z.string().min(1, 'summary is required'),
  tags: z.array(z.string()).default([]),
  /** Optional override; computed from word count if omitted. */
  readingTimeMinutes: z.number().positive().optional(),
  draft: z.boolean().default(false),
});

export type InsightsPostFrontmatter = z.infer<typeof InsightsPostFrontmatterSchema>;

export interface InsightsPost extends InsightsPostFrontmatter {
  /** Raw MDX body, already stripped of frontmatter. */
  content: string;
  /** Always present after `loadInsightsPost` (computed if absent in frontmatter). */
  readingTimeMinutes: number;
}

// ── Case studies ───────────────────────────────────────────────────

export const CaseStudyMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const CaseStudyFrontmatterSchema = z.object({
  title: z.string().min(1, 'title is required'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'slug must be kebab-case [a-z0-9-]'),
  /** ISO YYYY-MM-DD used for listing order. */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be ISO YYYY-MM-DD'),
  client: z.string().min(1, 'client is required (real name or anonymized industry term)'),
  capability: z.enum(capabilityIds),
  year: z.number().int().gte(2020).lte(2035),
  industry: z.string().min(1),
  engagementLength: z.string().min(1),
  teamSize: z.number().int().positive(),
  coverImage: z.string().min(1),
  detailImage: z.string().optional(),
  metrics: z.array(CaseStudyMetricSchema).min(1, 'at least one metric is required'),
  techStack: z.array(z.string()).min(1, 'at least one tech-stack entry is required'),
  draft: z.boolean().default(false),
});

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatterSchema>;

export interface CaseStudy extends CaseStudyFrontmatter {
  /** Raw MDX body, already stripped of frontmatter. */
  content: string;
}
