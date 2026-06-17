# 06 — Parallax primitive

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The `useParallax` hook that powers the five decorative parallax targets defined in the PRD. Decorative layers only — never text, cards, or content imagery. All transform-only, GPU-only, RAF-throttled.

Public interface:

- `useParallax(ref, speed)` — applies `translate3d` to the element based on scroll position. `speed` is a multiplier of native scroll (0.4–0.8 range per the spec). Hooks into the shared `gsap.ticker` so it shares the RAF loop with Lenis.
- `useMousePositionParallax(ref, opts)` — bonus primitive for the hero orbs: drifts the element 5–15px opposite to cursor based on mouse position over a target area. Desktop-only via motion gates; throttled to RAF.

Gating (via #03):
- Touch / mobile → both hooks no-op entirely (parallax disabled)
- Reduced-motion → both hooks no-op entirely
- Desktop → parallax active

Constraints:
- Only `transform: translate3d` — no `top`, `background-position`, `margin`, etc.
- Throttle all listeners (scroll + mousemove) to RAF; no untamed handlers
- Cleanup: remove listeners on unmount, kill any ScrollTrigger instances

Apply to existing hero glow orbs (`.hero__glow--1`, `.hero__glow--2`) as a smoke test — they should drift at 0.5x scroll on desktop and stay still on mobile / reduced-motion.

## Acceptance criteria

- [ ] `useParallax` and `useMousePositionParallax` hooks exported from the motion-primitives module
- [ ] Both hooks no-op on touch and reduced-motion
- [ ] Applied to existing hero orbs at speed 0.5; verified to drift at ~0.5x scroll rate on desktop
- [ ] Mouse-position parallax verified on desktop hero orbs
- [ ] Animated property is `transform: translate3d` exclusively (verify via DevTools — no other properties animating)
- [ ] No frame drops on a mid-tier laptop scroll test (Lighthouse perf > 90)
- [ ] Listeners cleaned up on unmount (verified by unmount + scroll test in DevTools)

## Blocked by

- #04 (needs Lenis ticker integration)
- #05 (shares motion-primitives module structure)
