# 10 — Selected Work preview (Home section)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The "Selected Work" section on Home — 2 or 3 featured case-study tiles linking through to the full case study on `/work/[slug]`. Uses placeholders until #19 ships the real Work infrastructure, then auto-populates from the most recent / featured case studies in the MDX source.

Section structure:
- Eyebrow ("Selected work") + section title ("Recent builds" or similar)
- 2 or 3 tiles in a grid (3-col desktop, 1-col mobile)
- Each tile: cover image + capability tag (ember pill, sourced from #08 capability data) + project title + 1-line summary
- "See all work" CTA below the grid, links to `/work`

Hover behavior (per the locked motion vocabulary):
- Desktop: cover image swaps to a detail image or short looping video on hover; tile lifts ~4px with shadow deepening; title underline draws in left-to-right
- Touch: no hover; tap navigates directly

Entrance motion:
- Tiles stagger fade-up + slight scale (0.97 → 1) when section scrolls into view, ~80ms between tiles
- Section title uses word-by-word reveal
- All gated normally for mobile / reduced-motion

Placeholder data:
- Until #19 lands real case studies, this section reads from a temporary fixture with 3 placeholder tiles, each tagged with one of the four capabilities (Custom AI Product / AI Integration / Intelligent Agent). Replace fixture with live MDX query when #19 is merged.

## Acceptance criteria

- [ ] Section renders 2–3 tiles in a 3-col grid (desktop) / 1-col stack (mobile)
- [ ] Each tile shows cover image, capability tag (ember pill), title, 1-line summary
- [ ] Hover swap works on desktop (cover → detail)
- [ ] Tile lift + underline draw on hover work
- [ ] Touch: tap navigates without hover effects
- [ ] Stagger fade-up reveal plays on scroll-in (desktop); single fade on mobile
- [ ] Reduced-motion: instant render, no animation
- [ ] "See all work" CTA links to `/work`
- [ ] Section's tile data source documented for swap-in once #19 lands
- [ ] No layout shift / CLS regressions

## Blocked by

- #07
