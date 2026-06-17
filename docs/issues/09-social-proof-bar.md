# 09 — Social proof bar (Home section)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

A Home page section directly below the Hero that signals "real businesses work with Spacecadet" via either client logos or trust copy. Placeholder content is acceptable until real logos are sourced.

Behavior:
- Desktop: horizontal logo strip with infinite marquee loop (~30s per cycle, pauseable on hover, pure CSS or RAF-throttled)
- Mobile: static row of logos, no animation, horizontally scrollable if needed
- Reduced-motion: static row, no marquee
- If no logos available at launch: section accepts a typographic fallback (e.g., "Trusted by teams at" + a comma-separated list, or omit the section entirely behind a feature flag in the section data)

Visual treatment:
- Monochrome logos (warm-paper text color, low opacity ~0.5–0.7) — never multicolor brand logos against the dark background; that always looks chaotic
- Subtle ember accent on the hover state for desktop marquee
- Section height tight (~80px), full bleed
- Eyebrow label above: "Trusted by ambitious teams" or similar (short)

Initial placeholders: 5–8 placeholder text-only "logos" using Inter wordmarks at a fixed size. Real logos swap in as part of #30 / launch prep when supplied.

## Acceptance criteria

- [ ] Section renders directly below Hero on Home
- [ ] Desktop: marquee loops infinitely, animation paused on hover
- [ ] Marquee uses transform-only animation; no layout properties animated
- [ ] Mobile: static, no marquee, horizontal scroll if logos exceed viewport width
- [ ] Reduced-motion: static, no marquee
- [ ] Section logos sourced from a small data array — easy to swap real logos in later
- [ ] If logos array is empty, section either shows typographic fallback or hides entirely (feature flag)
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on Home
- [ ] No accessibility regression (logos have alt text; marquee section is `aria-label`ed)

## Blocked by

- #07
