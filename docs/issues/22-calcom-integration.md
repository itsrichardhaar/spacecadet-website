# 22 — Cal.com inline embed (Contact page)

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Wire the Cal.com inline embed into the Contact page slot prepared in #21. Branded styling, real account, real availability — buyers can book a 30-min discovery call directly from the page.

HITL steps required (Richard's actions):
- Create or verify Cal.com account for Spacecadet
- Configure a 30-minute "AI Discovery Call" event type with desired availability rules (e.g., 9–5 ET, 1 week out, 24h notice required)
- Add the studio profile (name, photo, bio paragraph for the booking page)
- Provide the Cal.com event link to the implementing agent (e.g., `spacecadet/ai-discovery`)

Implementation:
- Install `@calcom/embed-react`
- Replace the `data-calcom-slot` placeholder from #21 with the live `<Cal>` component embedding the event
- Apply design-token-driven styling overrides (Cal.com supports a `config` prop with theme + color customization — match ember accent + warm dark base + Inter typeface)
- Embed renders inline within the Contact page (no popup/modal mode)
- Mobile: embed adapts to single-column; verify touch interactions don't conflict with page scroll

Analytics events (will be wired more fully in #27):
- Fire a `calcom_iframe_loaded` event when the embed has rendered
- Fire a `calcom_booking_completed` event when Cal.com signals a successful booking (via embed callback)

## Acceptance criteria

- [ ] Cal.com account configured with a 30-min AI Discovery Call event type
- [ ] Cal.com event link provided to implementation
- [ ] `@calcom/embed-react` installed
- [ ] Live Cal.com embed renders in the left column of `/contact`
- [ ] Embed styled to match site palette (ember accent, warm dark, Inter)
- [ ] Booking flow tested end-to-end: select time → enter details → confirmation appears
- [ ] Mobile embed responsive and touch-friendly
- [ ] Analytics events fire (iframe loaded, booking completed) and are visible in console / event log
- [ ] No console errors when embed loads
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on `/contact`

## Blocked by

- #21
