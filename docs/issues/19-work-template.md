# 19 — Work index + case study template + placeholders + hover swap

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The full Work infrastructure: `/work` index page (3-col grid + featured hero tile) and `/work/[slug]` case study detail template. **Three placeholder case studies** populate the page during design phase — real client content swaps in via #30 before launch.

`/work` index page:
- Hero: eyebrow ("Selected work") + H1 ("Recent builds" or similar) + 1-line subhead
- **Featured tile (2-col wide, top of grid):** the most recent case study presented prominently
- **3-col grid below:** all other case studies in uniform tiles
- Each tile: cover image + capability tag (ember pill, sourced from capability data #08) + title + 1-line summary + year
- Hover behavior (desktop): cover image swaps to a detail image on hover; tile lifts ~4px; underline draws in on title

`/work/[slug]` case study detail template (renders the full 9-section structure):

1. **Cover hero** — full-bleed, client name + title + year + capability tag, hero image with subtle parallax (per parallax map: 0.85x scroll)
2. **At-a-glance bar** — single horizontal strip: industry / engagement length / capabilities used / team size / year
3. **The problem** — 2–3 paragraphs on the client's situation and why off-the-shelf wasn't an option
4. **What we built** — description + 2–4 product screenshots or diagrams
5. **Approach / phases** — Discovery → Build → Ship phase breakdown specific to this engagement
6. **Outcome** — 3 prominent metrics with **count-up animation** + 2–3 paragraphs of qualitative result
7. **Tech stack** — compact callout: models, infra, key technologies (one-liner per tech)
8. **Client quote** — pull-quote from a technical buyer (CTO / founder), with their name + title + headshot optional
9. **Up next** — 2 related case study tiles + CTA: "Want to talk about a similar build?" → `/contact`

Placeholder case studies (3 MDX files in `app/work/`):
- 1 × Custom AI Products placeholder
- 1 × AI Integrations placeholder
- 1 × Intelligent Agents & Automation placeholder
- Each marked `draft: true` so they don't leak to production until real content from #30 replaces them
- Each contains realistic-shape filler content: real-looking metrics ("Reduced $X in annual SaaS spend"), 4-week phase breakdowns, mock screenshots in `/public/work/[slug]/` (use abstract placeholder gradients keyed to ember palette, not Lorem-Ipsum-textured stock)

Motion:
- Index entrance: stagger fade-up + scale on tiles (per locked vocab)
- Detail page H1: char-by-char reveal
- Cover image: scroll-tied parallax 0.85x
- Outcome metrics: count-up tween + fade
- Quote: line-by-line reveal
- Mobile / reduced-motion fallbacks

## Acceptance criteria

- [ ] `/work` route renders the index with featured hero tile + 3-col grid
- [ ] `/work/[slug]` route renders the full 9-section case study detail
- [ ] Index reads from `getCaseStudies()` and shows featured + remaining
- [ ] 3 placeholder MDX case studies committed (`draft: true`), one per non-Strategy capability
- [ ] Hover image swap works on desktop tiles (cover → detail)
- [ ] Tile lift + underline draw on hover work (desktop)
- [ ] Touch: tap navigates without hover effects
- [ ] Outcome metrics animate count-up when scrolled into view
- [ ] Cover image parallax at 0.85x speed (desktop)
- [ ] Up-next section shows 2 related case studies + CTA
- [ ] Tech stack callout renders compact
- [ ] Mobile / reduced-motion fallbacks verified
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on both routes
- [ ] Once #19 lands, #10 (Home Selected Work preview) and #14 (Capabilities page case study tiles) source from live MDX, not fixtures

## Blocked by

- #17
