# 15 — Approach page + phase diagrams

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The standalone `/approach` page — opinionated, specific, and price-transparent. The page that proves Spacecadet knows what it's doing by stating concrete POVs and naming engagement models with real numbers. Replaces the generic four-step process section currently on Solutions.

Page structure:

1. **Hero:** eyebrow ("Approach") + H1 + 1-paragraph POV statement on how Spacecadet engages on AI work. Example POV thrust: *"We don't do fixed-scope on AI work. AI projects are research projects, and research with a fixed scope produces fixed-scope output — not the right answer. Here's how we engage instead."*
2. **Three engagement models** — named, with scope / duration / deliverable / price range for each:
   - **Discovery Sprint** — 2 weeks, **$25–40k**, deliverable: build-vs-buy decision + technical roadmap + scoped POC plan
   - **Build Engagement** — 8–16 weeks, **$80–250k+**, deliverable: shipped product / integration / agent system
   - **Embedded Retainer** — ongoing, **$20–35k/mo**, deliverable: continuous AI capability for a product team
3. **Weekly rhythm** section — what a week looks like inside a Build Engagement: standup pattern, demo cadence, what gets shipped/reviewed/decided each week
4. **Stated POVs** — 4–6 named opinions that double as content. Each is one sentence + a 1–2 paragraph explanation. Examples (use these or sharpen):
   - "We always build evals before features."
   - "We don't use frameworks for agent orchestration unless they've been load-tested at our scale."
   - "We require access to real production data in week 1 or we don't take the engagement."
   - "We ship a working POC by week 4 or we restructure the engagement."
   - (Add 1–2 more from real studio practice.)
5. **Artifacts** section — small SVG diagrams of what gets produced at each phase (discovery doc, architecture diagram, eval suite, weekly demo deck). 3–4 diagrams total.
6. **CTA band** — "Start with a Discovery Sprint" + Button → `/contact`

Visual treatment:
- Each engagement model is a card-like block, ember-accented header, generous breathing room
- POV section uses serif-feeling typography moments (still Inter, just larger weight contrast) for the POV statements themselves — they're the quote-worthy moments

Motion vocabulary:
- H1: char-by-char reveal
- H2 section titles: word-by-word
- POV statements: line-by-line clip-mask reveal
- Diagrams: fade-in on scroll-into-view
- Mobile / reduced-motion: simple fade

## Acceptance criteria

- [ ] `/approach` route renders the new page
- [ ] POV statement in hero (one paragraph, opinionated)
- [ ] All three engagement models present with exact price ranges as locked: $25–40k, $80–250k+, $20–35k/mo
- [ ] Weekly rhythm section describes the actual operating cadence
- [ ] 4–6 stated POVs, each with name + explanation
- [ ] 3–4 SVG artifact diagrams committed to `/public/diagrams/`
- [ ] Bottom CTA Button links to `/contact`
- [ ] Engagement model data sourced from the same fixture as #11 (single source of truth)
- [ ] Motion vocabulary applied
- [ ] Mobile / reduced-motion fallbacks verified
- [ ] Lighthouse perf > 95 desktop, > 85 mobile

## Blocked by

- #02
- #05
