# 11 — How We Engage snippet (Home section)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

A compact section on Home that previews the three engagement models defined in the Approach page (#15) and drives traffic to `/approach`. NOT a full process explainer — just enough to set up the deeper page and signal "we have an opinion about how to engage."

Section content:
- Eyebrow ("How we engage") + section title (e.g., "Three ways to work with us")
- 3 small cards in a row (3-col desktop, 1-col mobile), one per engagement model:
  - **Discovery Sprint** — "2 weeks · scoped POC + roadmap"
  - **Build Engagement** — "8–16 weeks · shipped product or integration"
  - **Embedded Retainer** — "Ongoing · continuous AI capability for your team"
- Each card: name + one-line scope summary + small ember chevron icon
- "See our full approach" CTA below the grid, links to `/approach`

Note: This section does NOT show full price ranges — those live on `/approach` where they belong with the full context. The Home snippet is the teaser.

Entrance motion:
- Section title: word-by-word reveal
- Cards: stagger fade-up + scale, ~80ms between cards
- Mobile / reduced-motion: simple fade-in

## Acceptance criteria

- [ ] Section renders 3 engagement-model cards
- [ ] Card labels and one-line summaries match the PRD's locked engagement model names
- [ ] No price ranges shown in this section (price ranges only on `/approach`)
- [ ] "See our full approach" CTA links to `/approach`
- [ ] Card data sourced from a small data fixture (single source for this section + #15)
- [ ] Entrance motion plays on scroll-in (desktop); single fade on mobile
- [ ] Reduced-motion: instant render
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on Home

## Blocked by

- #07
