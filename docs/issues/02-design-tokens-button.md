# 02 — Design tokens + Button component (visual identity tracer)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Establish the new visual identity by (a) defining the full design-token system as CSS custom properties and (b) shipping the first atomic component (`Button`) that consumes them, applied across every existing page. This slice is the visual tracer — when it lands, the whole site visibly shifts to the new palette and the buttons everywhere demonstrate the token system is working end-to-end.

Design tokens (single source in a `tokens.css` consumed globally):
- **Color:** single warm ember accent (target `~#FF8A3D`) on warm dark base (target `~#0C0A09`); warm-paper text (target `~#F5F1EB`); 5-step warm-neutral scale with subtle warm undertone; border / surface tokens. No gradients — accent appears solid, never blended. Existing blue/purple gradient variables removed.
- **Typography:** Inter only; type scale tokens for display, h1, h2, h3, body, eyebrow, mono. Weight scale 300–900.
- **Spacing:** standard 4/8/12/16/24/32/48/64/96/128 scale as tokens.
- **Radius:** small / medium / large tokens.
- **Motion durations + easings:** named tokens (fast 150ms, base 220ms, slow 320ms; ease-out cubic, ease-in-out, etc.) for use by motion primitives in #05.

Button component:
- Variants: `primary` (ember fill, warm-paper text), `ghost` (transparent, border, warm-paper text)
- States: rest, hover (fill darkens / lightens, arrow translates ~5px right), active, focus (keyboard-visible ring), disabled
- Optional trailing arrow icon (replace `@mui/icons-material` with `lucide-react` — install Lucide and use `ArrowRight`)
- Accessible: real `<button>` or `<a>` element, focus ring visible, `:focus-visible` selector
- Replace every existing call-site of inline button markup with the `Button` component

Out of scope: motion primitives (#05), Lenis (#04), Card/Section/Container atomics (introduce as #07 needs them).

## Acceptance criteria

- [ ] `tokens.css` exists at app root, imported once globally, exposes color / type / spacing / radius / motion tokens
- [ ] All existing blue/purple accent CSS variables removed; ember accent + warm-dark base in use site-wide
- [ ] `Button` component with `primary` and `ghost` variants renders correctly on every existing page that used buttons
- [ ] `lucide-react` installed; `@mui/icons-material` removed (verify no remaining imports)
- [ ] Hover state: fill shifts + arrow translates ~5px right with `ease-out` 200–250ms
- [ ] Focus ring visible on keyboard navigation; no ring on mouse focus (`:focus-visible`)
- [ ] Buttons render correctly in mobile viewports (`<768px`)
- [ ] No regressions on any existing page — every page still renders fully (with new colors); no broken links or layout
- [ ] Visual check: site clearly reads as warm-ember-on-dark, not blue/purple

## Blocked by

- #01
