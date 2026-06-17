# 28 — Performance audit (Lighthouse 95+/85+)

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Run a full Lighthouse audit on every public route. Fix any regressions until each page hits the locked performance targets. Performance is a hard launch blocker per the PRD — this is the gate.

Targets:
- **Desktop:** Lighthouse Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- **Mobile:** Lighthouse Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

Routes to audit:
- `/`
- `/work`
- `/work/[slug]` — sample at least 2 case study pages
- `/capabilities`
- `/approach`
- `/about`
- `/insights`
- `/insights/[slug]` — sample at least 2 Insights posts
- `/contact`

Run audits in production-equivalent build (`pnpm build && pnpm start`) against the Vercel preview deploy, not against the dev server (dev mode produces inflated bundle sizes).

Common regressions to investigate:
- **LCP** — large hero images / fonts not preloaded → preload critical fonts, optimize hero images via `<Image>`
- **CLS** — late-loading fonts / images without dimensions / animations changing layout → font-display: swap with proper fallback metrics, all images get width/height attributes
- **TBT** — large JS bundle / hydration cost → check that motion primitives are tree-shaken; verify Lenis + GSAP load lazily where possible
- **JS bundle size** — verify no unused dependencies linger; verify route-level code splitting works
- **Cumulative animation cost** — verify all motion is transform/opacity only via DevTools Performance recorder

Manual checks alongside Lighthouse:
- Devtools Performance recording on Home scroll: no frames dropped, no long tasks > 50ms during scroll
- Devtools Memory snapshot: no listener leaks after navigating away from a page with motion primitives
- Network panel: all critical resources < 100KB compressed; font subset includes only used glyphs

## Acceptance criteria

- [ ] Every public route audited at production build via Vercel preview
- [ ] All routes meet desktop targets (≥ 95 across all four Lighthouse categories)
- [ ] All routes meet mobile targets (≥ 85 Performance, ≥ 95 others)
- [ ] No CLS regressions on any page (target: CLS < 0.1)
- [ ] No frame drops during Home scroll on a mid-tier laptop (Performance recorder)
- [ ] No memory leaks from motion primitives across page navigations
- [ ] Lighthouse audit results captured (screenshot or JSON) for each route and committed to `docs/perf-audit-2026-XX.md`
- [ ] Any regressions identified are either fixed or explicitly waived with documented rationale

## Blocked by

- #26 (SEO complete)
- #27 (Analytics installed)
