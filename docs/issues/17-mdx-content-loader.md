# 17 — MDX content loader

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

A typed MDX content loader that reads MDX files from `app/insights/` and `app/work/` directories with frontmatter parsing. Backbone for both Insights (#18) and Work (#19). Type-checks frontmatter so broken or missing fields fail at build time rather than at runtime.

Public interface:

- `getInsightsPosts({ includeDrafts?: boolean }): InsightsPost[]` — returns all Insights posts sorted by `date desc`
- `getInsightsPost(slug: string): InsightsPost | null` — single post by slug
- `getCaseStudies(): CaseStudy[]` — returns all case studies sorted by `date desc`
- `getCaseStudy(slug: string): CaseStudy | null` — single case study by slug
- `getCaseStudiesByCapability(capabilityId: CapabilityId): CaseStudy[]` — filter by capability tag

Schema (type-checked, fails build on violation):

```ts
// InsightsPost frontmatter
{
  title: string,
  slug: string,
  date: string,           // ISO YYYY-MM-DD
  summary: string,        // 1–2 sentence summary
  tags: string[],
  readingTimeMinutes: number,
  draft?: boolean,
}

// CaseStudy frontmatter
{
  title: string,
  slug: string,
  client: string,         // or anonymized industry term
  capability: CapabilityId,
  year: number,
  industry: string,
  engagementLength: string,
  teamSize: number,
  coverImage: string,
  detailImage?: string,   // for hover swap
  metrics: Array<{ label: string, value: string }>,
  techStack: string[],
  draft?: boolean,
}
```

Implementation notes:
- Use `gray-matter` or `next/mdx`'s built-in frontmatter parsing
- Validate frontmatter against the schemas at load time (Zod or similar); throw a build-time error on violation
- Drafts excluded from production builds (`NODE_ENV === 'production'`)
- Reading time computed for Insights only — accept frontmatter override; otherwise compute from word count

Unit tests required:
- Frontmatter parses correctly for a valid fixture
- Missing required field → schema error
- Malformed date → schema error
- Listing order: most recent first
- Drafts excluded in production mode, included in dev
- Filter-by-capability returns only matching case studies

## Acceptance criteria

- [ ] Loader module exports the 5 functions listed above
- [ ] Insights + CaseStudy frontmatter schemas defined and enforced
- [ ] Build fails clearly when an MDX file has malformed frontmatter
- [ ] Drafts excluded from production builds
- [ ] Listings sorted by date desc
- [ ] Unit tests cover all happy-path + error-path scenarios listed above
- [ ] Tests use file-system fixtures (small in-test MDX files), not mocks of the loader internals
- [ ] No external runtime dependencies beyond `gray-matter` (or equivalent) + schema validator

## Blocked by

- #01
