# 12 — Insights preview (Home section)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

A Home section showing the 3 most recent Insights posts, each linking through to `/insights/[slug]`. Uses placeholder MDX posts until #18 ships the real Insights infrastructure, then auto-populates from MDX frontmatter ordered by date desc.

Section content:
- Eyebrow ("Insights") + section title ("Recent writing" or "Latest thinking")
- 3 post tiles in a 3-col row (desktop) / 1-col stack (mobile)
- Each tile: post date (small, muted) + post title + 1–2 sentence summary + reading time
- "See all writing" CTA below the grid, links to `/insights`

Hover behavior:
- Desktop: title underline draws in left-to-right; tile lifts ~3px
- Touch: no hover; tap navigates

Entrance motion:
- Section title: word-by-word reveal
- Tiles: stagger fade-up + slight scale, ~80ms between tiles
- Underline draw-in animates only on hover, not on entrance

Placeholder data:
- Until #18 lands, this section reads from a temporary fixture with 3 placeholder posts. Replace with live MDX query (ordered by `date desc`, sliced to 3) when #18 is merged.

## Acceptance criteria

- [ ] Section renders 3 most-recent Insights post tiles
- [ ] Each tile shows date, title, 1–2 sentence summary, reading time
- [ ] Underline draws in on hover (desktop); no underline animation on entrance
- [ ] Tile lift on hover works (desktop only)
- [ ] Touch: tap navigates without hover effects
- [ ] Stagger fade-up plays on scroll-in (desktop); single fade on mobile
- [ ] Reduced-motion: instant render
- [ ] "See all writing" CTA links to `/insights`
- [ ] Tile data source documented for swap-in once #18 lands
- [ ] No subscribe-popup, no interrupters

## Blocked by

- #07
