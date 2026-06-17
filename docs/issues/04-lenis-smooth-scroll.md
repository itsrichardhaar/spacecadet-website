# 04 — Lenis smooth scroll on desktop

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Wire `@darkroom.engineering/lenis` at the app root, gated by the motion-gates module from #03. Smooth scroll is desktop-only; mobile, touch, and reduced-motion fall back to native browser scroll cleanly.

Behavior:
- On mount in a desktop browser without reduced-motion: instantiate Lenis with default easing (no slow/sluggish overrides — point is smoothness, not delay), hook `lenis.raf(time)` into `gsap.ticker`
- On touch devices, reduced-motion users, or below-desktop viewports: do not instantiate Lenis; native scroll behaves normally
- On gate change (e.g., user enables reduced-motion at runtime, or resizes from desktop to narrow): tear down Lenis, restore native scroll
- Cleanup on unmount: stop Lenis ticker registration, remove all event listeners

Smoke test verification (manual):
- Desktop Chrome / Safari / Firefox: scroll is butter-smooth, no scroll-jank
- iOS Safari + Android Chrome: scroll is native, pull-to-refresh works, swipe-back gesture works (iOS), pinch-zoom works
- Desktop with `prefers-reduced-motion: reduce` in OS settings: scroll is native, not Lenis-interpolated

## Acceptance criteria

- [ ] `@darkroom.engineering/lenis` (~5KB) installed
- [ ] GSAP installed (`gsap` package, free license post-2024 — verify license text in repo)
- [ ] Lenis instantiated at app root only when motion gates return desktop + not-reduced-motion
- [ ] Lenis `raf` hooked into `gsap.ticker` so all scroll-tied animations share the same RAF loop
- [ ] Tear-down on gate change (resize past breakpoint, reduced-motion toggle) restores native scroll
- [ ] No hydration warnings in console
- [ ] Manual verification: smooth desktop scroll, native iOS/Android scroll, native reduced-motion scroll, no broken gestures on touch
- [ ] Lighthouse: no perf regression vs. baseline

## Blocked by

- #03
