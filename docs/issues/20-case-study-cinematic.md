# 20 — Case study scroll-tied cinematic (moment #3)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Cinematic moment #3 — applied to the cover hero of every case study detail page. As the user scrolls into the cover hero, the cover image and the title/metadata text choreograph together in a scroll-tied reveal that holds attention for one beat, then releases into the at-a-glance bar.

Spec:
- Cover image enters via a slow upward parallax (0.85x scroll, established in #19) AND a slight clip-mask reveal (image scales from ~0.96 to 1.0 over the entry phase)
- Title + client + capability tag enter staggered: title char-by-char (~25ms), client + tag word-by-word (~60ms)
- Hold for ~30vh of scroll — the cover stays prominent before transition to at-a-glance bar
- At-a-glance bar fades into view as cover begins to scroll away
- Entire scene runs through GSAP ScrollTrigger pinned to the cover container

Performance constraints:
- All animation is `transform` + `opacity` only
- ScrollTrigger pin uses `pinSpacing: true` to avoid layout collapse during pin
- Cinematic disabled below the desktop breakpoint
- Reduced-motion: cover renders statically with no choreography, no parallax, no pin

## Acceptance criteria

- [ ] Cover hero of every case study (`/work/[slug]`) plays the cinematic on initial scroll-in
- [ ] Cover image scales + parallaxes during entry
- [ ] Title + client + tag staggered reveal
- [ ] At-a-glance bar fades in as cover scrolls away
- [ ] Pin behavior preserves layout (no collapse, no scroll jump)
- [ ] Cinematic disabled on touch / mobile — cover renders statically with normal scroll
- [ ] Reduced-motion: static cover, no choreography
- [ ] No CLS regression
- [ ] Lighthouse perf > 95 desktop, > 85 mobile

## Blocked by

- #19
