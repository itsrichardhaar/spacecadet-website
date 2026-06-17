# 14 — Capabilities page + 4 SVG diagrams

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The standalone `/capabilities` page that expands all four capabilities in depth, with one custom SVG architectural diagram per capability. Each capability is its own anchor-linked section so Home tiles (#08) deep-link to the correct one (`/capabilities#ai-integrations`, etc.).

Page structure:
- **Hero:** eyebrow ("Capabilities") + H1 ("Everything we build, in detail" or similar) + 1-line subhead
- **Four capability sections**, in the order defined by #08's capability data module:
  1. Custom AI Products
  2. AI Integrations
  3. Intelligent Agents & Automation
  4. AI Strategy & Discovery
- **Bottom CTA:** "Have a project that crosses categories? Let's talk." + Button → `/contact`

Each capability section contains:
- H2 with the capability name (word-by-word reveal on scroll-in)
- Small SVG architectural diagram (line-only, ember + warm-neutral, transform-only animation if any)
- 2–4 paragraph description explaining what the work looks like
- Engagement-shape detail (duration, deliverable, IP/ownership note)
- "Recent work in this capability" — 1–2 case study tiles filtered by capability tag (sourced from #19's Work data)
- Subtle separator before the next capability section

SVG diagrams (one per capability, drawn flat / line-only / ember accent):
- **Custom AI Products** — small architectural sketch of "client + custom UI + AI model + proprietary data" with arrows
- **AI Integrations** — "before / after" sketch: existing software → existing software + AI layer
- **Intelligent Agents & Automation** — 3-node agent loop with a decision diamond
- **AI Strategy & Discovery** — discovery → roadmap → recommendation sequence

Source the capability data from the same module created in #08 — no duplicated content.

## Acceptance criteria

- [ ] `/capabilities` route renders the new page
- [ ] Page hero matches spec (eyebrow, H1, subhead)
- [ ] All 4 capability sections render in the locked order
- [ ] Each section's content sourced from the capability data module from #08
- [ ] Anchor links work: `/capabilities#custom-ai-products`, `#ai-integrations`, `#agents-automation`, `#ai-strategy` all scroll to correct sections
- [ ] Each section has an SVG diagram in place (committed to `/public/diagrams/`)
- [ ] Each section shows 1–2 relevant case study tiles (sourced from #19; placeholder if #19 not yet merged)
- [ ] Bottom CTA Button links to `/contact`
- [ ] Motion vocabulary applied: H2 word-by-word reveal, paragraph line-by-line, diagrams fade-in
- [ ] Mobile: simplified single-column layout, single fade entrance
- [ ] Reduced-motion: no animation
- [ ] Lighthouse perf > 95 desktop, > 85 mobile

## Blocked by

- #08
