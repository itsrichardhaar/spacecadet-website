# 16 — About page

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Rewrite `/about` to match the new positioning. Four sections, in this order, each doing one specific job. The "What we say no to" section is non-negotiable — it's the most distinctive credibility move on the page.

Page structure:

1. **Origin** — one paragraph. What you saw in the market that made Spacecadet necessary, why AI-native specifically (not general dev), why a studio (not a product company). Past tense + specific. No generic "we founded Spacecadet because we love AI" filler.

2. **Beliefs** — 3–5 specific stances about how AI products get built. Each is one sentence + a short paragraph of explanation. Examples (use these as starting points; sharpen with real conviction):
   - "Most AI integrations fail because the model is the easy part."
   - "Owning your data beats renting an API."
   - "A working POC beats a polished plan."
   - "We never let AI features ship without evals."
   - "Vertical-specific AI beats horizontal AI tooling."

3. **Team** — one principal-level treatment per person (no headshot-grid). For each: optional photo, short backgrounder paragraph, LinkedIn link. Single-person studio is fine — present it confidently.

4. **What we say no to** — non-negotiable section. Explicit list of project types Spacecadet refuses, framed positively as the standards Spacecadet keeps. Examples to seed with:
   - "We don't take projects where the AI is decorative."
   - "We don't do fixed-scope on AI builds."
   - "We don't engage without access to real production data."
   - "We don't ghost — every engagement gets a clean wrap-up doc."
   - (Add 1–2 more.)

5. **Bottom CTA** — "If this sounds like the right fit, let's talk." + Button → `/contact`

Visual treatment:
- Plain, restrained, type-dominant — no decorative imagery (per art direction F)
- Each section has an eyebrow + H2 + body
- "What we say no to" section visually distinct: ember accent on the list bullets, maybe a thin border treatment

Motion:
- H1: char-by-char reveal
- Section titles: word-by-word
- Belief / refusal items: stagger fade-up, ~80ms between items
- Mobile / reduced-motion fallbacks

## Acceptance criteria

- [ ] `/about` route renders the new page
- [ ] Four sections present in the locked order: Origin / Beliefs / Team / What we say no to
- [ ] No headshot grid; team treated principal-level (1 per principal)
- [ ] "What we say no to" section is present and contains 4–5 specific refusals
- [ ] Beliefs section contains 3–5 specific stances
- [ ] Bottom CTA Button links to `/contact`
- [ ] Motion vocabulary applied
- [ ] Mobile / reduced-motion fallbacks verified
- [ ] Lighthouse perf > 95 desktop, > 85 mobile

## Blocked by

- #02
- #05
