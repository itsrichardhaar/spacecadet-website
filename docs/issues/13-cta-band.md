# 13 — CTA band (Home section)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The final conversion section on Home, between the Insights preview and the Footer. A clean, restrained band with a single ember-accent CTA driving to Contact. The last thing a Home visitor sees before either leaving or converting.

Section content:
- Eyebrow (small caps, ember accent): "Get started"
- Section title (H2): "Have an AI problem you're trying to solve?" (or similar — single-line, declarative)
- 1-line subhead: brief invitation to talk (e.g., "Tell us what you're trying to build. We respond within one business day.")
- Single primary Button → `/contact`, label: "Book a discovery call"

Visual treatment:
- Full-bleed background with subtle ember radial-gradient wash (per parallax map: section gradient washes, 0.6x scroll)
- Centered content, max-width ~700px
- Generous vertical breathing room (~100px top + bottom on desktop)

Motion:
- Section title: word-by-word reveal on scroll-in
- Subhead: line-by-line clip-mask reveal
- Button: scale-from-0.96 + fade
- Background ember wash: parallax at 0.6x speed (decorative)
- Mobile / reduced-motion: simple fade-in, no parallax

## Acceptance criteria

- [ ] Section renders between Insights preview and Footer
- [ ] Title, subhead, single ember Button present and matching spec copy structure
- [ ] No secondary CTA — single conversion focus
- [ ] Button links to `/contact`
- [ ] Ember radial-gradient wash visible as background (decorative)
- [ ] Background parallax at 0.6x scroll speed on desktop
- [ ] Mobile: no parallax, simple static gradient
- [ ] Reduced-motion: instant render, no parallax, no entrance animation
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on Home

## Blocked by

- #07
