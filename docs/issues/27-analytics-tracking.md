# 27 — Analytics + event tracking

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Privacy-friendly analytics installed across the site, with explicit event tracking on key conversion moments. Two providers:

1. **Vercel Analytics** — Web Vitals + traffic + page views (auto via the Vercel Analytics package)
2. **Plausible** — privacy-friendly product-team-quality insights, custom events (~$9/mo for studio-size traffic)

HITL setup:
- Plausible account configured for `spacecadet.io`
- Plausible site verification code in place
- Vercel Analytics enabled in Vercel project settings

Implementation:

- Install `@vercel/analytics` and add `<Analytics />` to root layout
- Install `plausible-tracker` (or use Plausible's standard script) — add to root layout
- Build a small `trackEvent(name, props)` helper that fans out to both providers (Vercel can take `track()` calls for custom events; Plausible takes named events with optional props)
- No cookies, no PII, no consent banner needed (Plausible is GDPR-friendly out of the box; Vercel Analytics is anonymous)

Events to track (call `trackEvent()` from the relevant components):

| Event name | Fires when | Properties |
|---|---|---|
| `cta_click_book_call` | "Book a discovery call" CTA clicked | `location: 'hero' | 'cta-band' | 'capability-page' | etc.` |
| `cta_click_see_work` | "See our work" CTA clicked | `location` |
| `contact_form_started` | First field of contact form gains focus | (none) |
| `contact_form_submitted` | Contact form successful submit | `budget_bracket`, `capability_interest`, `timeline` |
| `contact_form_error` | Contact form submit errored | `error_kind` |
| `calcom_iframe_loaded` | Cal.com embed has rendered | (none) |
| `calcom_booking_completed` | Cal.com signals successful booking | (none) |
| `insights_post_read_complete` | User scrolls past 80% of an Insights post body | `slug` |
| `case_study_viewed` | A `/work/[slug]` page renders | `slug`, `capability` |

Implementation notes:
- All event helpers should be no-ops in development unless `NEXT_PUBLIC_ANALYTICS_DEV=true` is set
- Avoid double-counting — `case_study_viewed` fires once per page render, not on every effect re-run
- The `insights_post_read_complete` scroll trigger uses IntersectionObserver on an end-of-content sentinel

## Acceptance criteria

- [ ] Vercel Analytics installed and visible in Vercel dashboard
- [ ] Plausible installed and visible in Plausible dashboard
- [ ] `trackEvent()` helper exported from analytics module
- [ ] All 9 events from the table wired up at the correct call sites
- [ ] No cookies set by either provider (verify in DevTools → Application → Cookies)
- [ ] No PII (no email addresses, names, or message content) sent in any event
- [ ] Events suppressed in development by default
- [ ] Smoke test: trigger each event manually and verify it appears in both dashboards within 1–2 minutes
- [ ] No console errors from either provider on any page

## Blocked by

- #07
