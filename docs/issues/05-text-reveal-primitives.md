# 05 — Text reveal motion primitives

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The motion-primitives module for text entrance animations: a small set of React hooks and a wrapper component that every subsequent slice uses to apply consistent text reveals. Wraps GSAP + ScrollTrigger + SplitText (all free post-2024 GSAP license).

Public interface:

- `useScrollReveal(ref, opts)` — fades + transforms an element into view via ScrollTrigger; fires `once: true` (no replay on re-scroll). Options: `delay`, `duration`, `easing`, `from` (transform start state).
- `useSplitTextReveal(ref, opts)` — splits text by `unit: 'char' | 'word' | 'line'`, applies a clip-mask + transform reveal with configurable `stagger`. Used by `RevealText` below.
- `<RevealText unit="char|word|line" stagger={ms} as="h1">{children}</RevealText>` — wrapper component composing `useSplitTextReveal`. Used for all heading and body entrance animations.

Gating (via #03):
- Reduced-motion → renders text statically, no transform, no split, full opacity from the start
- Touch / mobile → text fades in with a single fast fade-up (~300ms, no stagger, no split)
- Desktop → full character/word/line choreographed reveal per the spec

Spec from the PRD motion vocabulary:
- H1 / Hero heading → char-by-char mask reveal, ~25ms stagger
- H2 / Section title → word-by-word mask reveal, ~60ms stagger
- Body / paragraph → line-by-line clip-mask reveal, ~80ms stagger
- Reserve `char` for hero + 1–2 other moments — overuse kills the effect

Performance constraints:
- Only `transform` + `opacity` animated; no layout properties
- SplitText DOM operations happen at mount, not per-frame
- ScrollTrigger uses `once: true` to allow GC after firing

Smoke test on existing Home heading: drop `<RevealText unit="char" stagger={25}>` around the current hero H1 and verify the reveal plays on initial load.

## Acceptance criteria

- [ ] `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText` installed and imported correctly
- [ ] Hooks + `RevealText` component exported from a single motion-primitives module
- [ ] Reduced-motion fallback: text renders statically (no split, no transform)
- [ ] Touch fallback: text uses single fade-up, not split-text choreography
- [ ] Desktop: char / word / line reveals play with correct staggers
- [ ] `once: true` verified — text does not replay when scrolled back into view
- [ ] No layout-shift / CLS regressions on Lighthouse
- [ ] Smoke test: existing hero H1 wrapped in `<RevealText unit="char">` plays correctly across desktop / mobile / reduced-motion

## Blocked by

- #03
