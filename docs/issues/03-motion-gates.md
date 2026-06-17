# 03 — Motion gates module

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Single source of truth for "should this motion run." Every motion primitive, the Lenis bootstrap, and any future scroll/parallax/cinematic scene consume these gates — accessibility and mobile fallbacks are enforced centrally, never duplicated per consumer.

Public interface — three React hooks:

- `useReducedMotion()` → returns `true` when `(prefers-reduced-motion: reduce)` is set, reacts to changes at runtime, cleans up listener on unmount
- `useIsTouchDevice()` → returns `true` for touch-primary devices (phones, tablets). Detection by `window.matchMedia('(pointer: coarse)')` combined with `'ontouchstart' in window`. Memoized at mount.
- `useIsDesktop()` → returns `true` when device is not touch AND viewport is ≥ desktop breakpoint (token-driven). Reacts to resize.

Implementation notes:
- All three hooks must be SSR-safe — return a sensible default (`false` for reduced-motion, `false` for touch, `true` for desktop) during server render, then resync on client mount with no hydration-mismatch warnings
- Hooks throttle resize / matchMedia change handling to `requestAnimationFrame`
- Module exports a `motionEligible()` helper combining the gates ("desktop AND not reduced-motion") for the most common gating case

Unit tests required:
- `useReducedMotion` reads `matchMedia` correctly, reacts to changes, cleans up listener
- `useIsTouchDevice` returns expected value for known fixtures (mock `matchMedia` + `navigator`)
- `useIsDesktop` reacts to viewport changes
- SSR-default behavior: hooks return defaults without throwing when `window` is undefined
- `motionEligible()` truth table

## Acceptance criteria

- [ ] Three hooks exported from a single motion-gates module
- [ ] All hooks SSR-safe (no hydration mismatches, no `window` reference at module top level)
- [ ] Unit tests pass for all three hooks + `motionEligible()` helper (Vitest)
- [ ] Listeners cleaned up on unmount (verified by test)
- [ ] Module has no external runtime dependencies (only React + standard Web APIs)
- [ ] Documented usage example in module's leading comment block

## Blocked by

- #01
