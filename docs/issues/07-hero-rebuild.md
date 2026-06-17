# 07 — Hero rebuild (cinematic moment #1)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Rebuild the Home page Hero with the locked copy, the new CTAs, the cinematic moment #1 motion, and verified mobile / reduced-motion fallbacks. This is the first user-facing tracer that proves the design system, motion primitives, parallax, and Lenis all compose correctly on a real production-quality page.

Copy (locked):
- **H1:** `We build AI solutions` (sentence case, no trailing period)
- **Sub:** `We help growing businesses move beyond off-the-shelf SaaS — building custom AI products and integrations designed around your data, owned by your team, and engineered to lower long-term software costs.`

CTAs:
- **Primary:** `Book a discovery call` → `/contact` (uses Button `primary` variant)
- **Secondary:** `See our work` → `/work` (uses Button `ghost` variant)

Hero badge: **removed** (the green-dot "Available for new projects" badge is deleted).

Visual treatment:
- Atmospheric warm-dark background with two soft glow orbs (warm tones, not the existing blue/purple)
- Generous vertical breathing room (`100vh` minimum, padded interior)
- Subhead capped at ~560px width for readability

Motion (cinematic moment #1):
- H1: character-by-character mask reveal, ~25ms stagger (via `RevealText unit="char"`)
- Subhead: word-by-word reveal, ~60ms stagger (via `RevealText unit="word"`), starts after H1 completes
- CTAs: scale-from-0.96 + fade, fires after subhead
- Glow orbs: scroll-tied parallax at 0.5x speed (via `useParallax`)
- Glow orbs: mouse-position parallax on desktop only (via `useMousePositionParallax`)

Fallbacks (verified via #03 gates):
- Mobile / touch: H1 + sub + CTAs fade in as a single fast group (~300ms each, no split-text); orbs static; no mouse parallax
- Reduced-motion: instant fade, no transforms, no parallax

## Acceptance criteria

- [ ] Hero copy matches spec exactly (H1, sub, CTA labels)
- [ ] Primary CTA links to `/contact`; secondary CTA links to `/work`
- [ ] Existing "Available for new projects" badge is removed from DOM (not just hidden)
- [ ] Character-by-character H1 reveal plays on initial page load (desktop) within ~1s
- [ ] Word-by-word subhead reveal plays after H1 completes
- [ ] CTAs scale-fade in after subhead
- [ ] Hero glow orbs use new warm-tone colors (not blue/purple)
- [ ] Hero orbs drift at ~0.5x scroll speed on desktop
- [ ] Hero orbs respond to mouse position (subtle drift opposite to cursor) on desktop
- [ ] Mobile: simple single fade-up; no split-text, no parallax, no mouse drift
- [ ] Reduced-motion: instant fade; no animation, no parallax
- [ ] No layout shift / CLS regressions
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on Home

## Blocked by

- #02
- #05
- #06
