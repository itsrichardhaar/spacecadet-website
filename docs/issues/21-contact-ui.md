# 21 — Contact UI (dual path + qualifying form + mock submit)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The full Contact page UI with the dual-path layout (Cal.com slot + structured form) and complete form validation. The form posts to a mock endpoint that simulates success/error responses — the real Resend backend lands in #23. The Cal.com embed is wired in #22.

Page structure:
- **Hero:** eyebrow ("Contact") + H1 ("Let's talk about what you're building" or similar)
- **Two-column dual path:**
  - **Left column (primary):** Header "Book a 30-min discovery call" + Cal.com embed placeholder (an empty bordered container labeled `data-calcom-slot`; the embed wires in via #22)
  - **Right column (secondary):** Header "Or send us a detailed brief" + the structured qualifying form
- **Below dual path:** Three info rows — email (`hello@spacecadet.io`), response time ("Within 24 hours"), location ("Raleigh, North Carolina · Remote-first")
- **Socials:** LinkedIn link (kept), GitHub link (added if applicable). **Twitter and Dribbble removed.**

Form fields (in order):
1. **Name** (required) + **Email** (required, format-validated)
2. **Company** (required)
3. **Role** (required, dropdown): Founder / CTO / CEO / VP Engineering / PM / Other
4. **What you're looking to build** (required, dropdown): Custom AI Product / AI Integration / Intelligent Agent / AI Strategy / Not sure yet
5. **Project stage** (required, dropdown): Idea / Strategy / Building / Stuck
6. **Timeline** (required, dropdown): Within 4 weeks / 1–3 months / 3–6 months / Just exploring
7. **Budget range** (required, dropdown): **$25–50k / $50–100k / $100–250k / $250k+ / Not sure yet**
   - The old "Under $10k" and "$10–25k" brackets are removed
8. **Tell us about the problem** (required, textarea) — placeholder text: "What are you trying to solve, and why now?"
9. **Submit** Button (primary variant, label: "Send brief")

Validation:
- All required fields validated client-side before submission
- Email format checked
- Submit button disabled while required fields are empty
- On invalid field: inline error message + ember-accent focus ring on the offending field
- Submit button shows spinner during submission (~600ms simulated delay)
- On mock success: form replaced with success state — "Brief received." + 3-bullet explanation of next steps:
  1. "Richard reads your brief within 24 hours."
  2. "If we're a fit, you'll get a calendar link for a 30-min discovery call."
  3. "On the call, we'll discuss your problem in depth and decide together what's next."
  - Plus a "Meanwhile, read our latest thinking" link → `/insights`
- On mock error: inline error message at top of form, "Something went wrong. Please try again or email us directly at hello@spacecadet.io"

Motion:
- H1 char-by-char reveal
- Form fields fade-up stagger (~60ms between groups)
- Success state: scale-fade transition from form to success message
- Mobile: stack columns vertically (form above calendar slot, or vice versa — verify which order in design)
- Reduced-motion: instant transitions

Unit tests required (covered in #08 / Contact form module deep-test):
- Required field validation
- Email format validation
- Submit disabled while invalid
- Success state transition on mock success
- Error state on mock error

## Acceptance criteria

- [ ] `/contact` route renders dual-path layout (desktop) / stacked layout (mobile)
- [ ] All 8 form fields present in the exact order above
- [ ] Budget brackets are the locked set: $25–50k / $50–100k / $100–250k / $250k+ / Not sure yet
- [ ] Old budget brackets ($10k brackets) are removed
- [ ] Capability interest dropdown matches the four capabilities from #08 data
- [ ] Client-side validation works: required fields enforced, email format checked
- [ ] Submit button disabled while required fields empty
- [ ] Spinner shows during simulated submit
- [ ] Success state shows 3-bullet next-steps + Insights link
- [ ] Error state shows inline error message
- [ ] Cal.com slot container present (empty; will be filled by #22)
- [ ] Email, response time, location info present below dual path
- [ ] LinkedIn link present; Twitter and Dribbble removed
- [ ] Unit tests pass for required-field validation, email format, success/error state transitions
- [ ] Mobile: stacked layout, all fields usable, no horizontal scroll
- [ ] Reduced-motion fallback verified

## Blocked by

- #02
