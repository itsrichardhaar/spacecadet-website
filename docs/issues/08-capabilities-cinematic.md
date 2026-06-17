# 08 — Capability data module + Capabilities cinematic (moment #2)

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Two related deliverables in one slice:

1. **Capability data module** — single typed source of truth for the four capabilities. Consumed by this slice, the standalone Capabilities page (#14), and Work case study tagging (#19).
2. **Home page Capabilities cinematic section (moment #2)** — scroll-pinned section that progressively reveals each of the four capability tiles as the user scrolls. The atmospheric centerpiece of the Home page.

Capability data (locked from PRD):

```ts
// Shape only — production data lives in module
{
  id: 'custom-ai-products' | 'ai-integrations' | 'agents-automation' | 'ai-strategy',
  name: string,           // "Custom AI Products"
  summary: string,        // one-line hook
  description: string,    // 2–3 sentence expansion
  buyer: string,          // who lands here
  engagementShape: {
    duration: string,     // "8–16 weeks"
    deliverable: string,  // "shipped product/integration..."
    ipNote: string,       // "IP transfers to client"
  },
  diagramHref: string,    // path to SVG diagram (placeholder until #14)
}
```

Order: Custom AI Products → AI Integrations → Intelligent Agents & Automation → AI Strategy & Discovery.

Cinematic moment #2 (Home only):
- Section pins for ~2 viewport heights (via GSAP ScrollTrigger pin)
- As user scrolls through pinned section, each capability tile moves into focus sequentially with text + visual choreographed (~4 progressive states)
- Tile in focus: full opacity, full scale, ember accent highlight; tiles out of focus: dimmed, slightly scaled down
- Each tile links through to its anchor on `/capabilities` (e.g., `/capabilities#ai-integrations`)
- On desktop only — mobile gets a vertical stacked grid of static tiles, no pinning, no choreography
- Reduced-motion: static stacked grid, no pinning, full opacity

## Acceptance criteria

- [ ] Capability data module exports typed array of 4 capabilities in the locked order
- [ ] Tests verify the data shape matches the schema (one test per capability)
- [ ] Home `/capabilities-section` renders the cinematic on desktop with ScrollTrigger pin
- [ ] Each tile reaches "in focus" state at the correct scroll position
- [ ] Tile content (name, summary, diagram) sourced from the capability data module — no duplicated literals
- [ ] Each tile links to the corresponding anchor on `/capabilities`
- [ ] Mobile: vertical static stack, no pinning, no choreography
- [ ] Reduced-motion: vertical static stack, no animation
- [ ] No layout shift during the pin phase (verify via Lighthouse CLS)
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on Home

## Blocked by

- #07
