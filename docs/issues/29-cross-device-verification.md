# 29 — Cross-device verification

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Real-device test pass across the matrix that matters for an AI-product studio's buyers. Verify the locked mobile + reduced-motion fallbacks behave correctly on actual hardware (Chrome DevTools mobile emulation is not sufficient — too many subtle gestures and rendering differences).

Test matrix:

| Device | Browser | What to verify |
|---|---|---|
| **iPhone (latest iOS Safari)** | Safari | Touch scroll is native, no Lenis hijacking; pull-to-refresh works; swipe-back gesture works; pinch-zoom works; no parallax; all entrance animations collapse to single fade; Cal.com embed is touch-friendly; form fields don't trigger zoom-on-focus |
| **iPhone (older — iOS 16 or 17 if available)** | Safari | Same as above; check older Safari rendering compatibility |
| **Android (latest Chrome)** | Chrome | Touch scroll is native; no parallax; form fields usable; Cal.com embed renders; tap targets are ≥ 44px |
| **iPad** | Safari | Treated as touch device — no Lenis; no parallax; dual-path Contact layout adapts cleanly |
| **Desktop Chrome (Mac)** | Chrome | Smooth Lenis scroll; all parallax active; mouse-position parallax on hero; cinematic moments play; reduced-motion toggle in OS strips motion correctly |
| **Desktop Safari (Mac)** | Safari | Same as Chrome desktop |
| **Desktop Firefox** | Firefox | Same as Chrome desktop; verify GSAP / ScrollTrigger / SplitText behavior matches |
| **Desktop with `prefers-reduced-motion: reduce` set in OS** | Any | All animations strip to instant fade; no parallax; no Lenis; site fully functional and readable |

Per-page checks on each device:
- Home Hero: appropriate motion behavior for that device class
- Home Capabilities cinematic: scroll-pin works (desktop) / stacked grid (mobile)
- Work case study scroll-tied cinematic: works (desktop) / static (mobile)
- Contact dual path: layout adapts (desktop two-col / mobile stacked)
- Insights post: long-form reading experience is comfortable on mobile

Issues to log:
- Anything that doesn't match the spec → log as a follow-up bug fix issue (not necessarily blocking unless severe)
- Browser-specific rendering quirks → document workarounds
- Performance differences (older devices that fall below mobile Lighthouse target) → consider further motion downgrades for low-end touch devices

## Acceptance criteria

- [ ] All 8 environments in the test matrix exercised
- [ ] All locked fallback behaviors verified:
  - Mobile: native scroll, no parallax, no Lenis, simplified motion
  - Reduced-motion: instant fades only, no transforms, no parallax
  - Desktop: smooth scroll, full motion vocabulary, parallax active
- [ ] iOS gestures (swipe-back, pull-to-refresh, pinch-zoom) unaffected by the site
- [ ] No form fields trigger zoom-on-focus on iOS (font-size on inputs ≥ 16px)
- [ ] Cal.com embed works on mobile (touch + visual)
- [ ] Test results captured in `docs/cross-device-2026-XX.md` with per-device pass/fail + notes
- [ ] Any failures either fixed during this slice or logged as follow-up issues (with severity)

## Blocked by

- #28
