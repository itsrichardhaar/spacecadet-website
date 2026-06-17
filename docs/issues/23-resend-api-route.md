# 23 — Resend API route + DNS + conditional auto-reply

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The real Contact form backend. Replaces the mock submit from #21 with a Vercel route handler that validates the payload server-side, sends a formatted email to Richard via Resend, and sends a conditional auto-reply to the submitter based on budget bracket.

HITL steps required (Richard's actions):
- Create or verify Resend account
- Add `spacecadet.io` as a verified sending domain in Resend
- Configure SPF, DKIM, and DMARC DNS records as Resend specifies
- Provide the Resend API key as a Vercel environment variable (`RESEND_API_KEY`)
- Confirm destination email (default `richard@spacecadet.io`)
- Confirm the Cal.com booking link to embed in the auto-reply (from #22)

Implementation — `POST /api/contact` route handler:

Server-side payload validation (using Zod or similar — same schema as the client-side form in #21):
- Reject with 400 if any required field is missing or malformed
- Reject with 400 if email is not RFC-format valid

On valid payload:

1. **Primary notification email** to `richard@spacecadet.io`:
   - Subject: `[Spacecadet] New brief from [name] @ [company] — budget [bracket]`
   - Body: structured fields formatted as a scannable list — name, email, company, role, capability interest, project stage, timeline, budget, problem narrative
   - Sender: `Spacecadet Contact <noreply@spacecadet.io>` (or whatever sender Richard configures)

2. **Conditional auto-reply** to submitter:
   - **If budget ≥ $25k OR budget = "Not sure yet":**
     - Subject: "We received your brief — here's what happens next"
     - Body: thanks + 3-bullet next-steps (read within 24h / calendar link if we're a fit / call discussion) + Cal.com booking link (from #22) for "If you'd prefer to grab time directly"
   - **If budget < $25k (the explicit lower brackets if anyone bypasses client-side validation):**
     - Subject: "Thanks for reaching out"
     - Body: polite redirect — "Our typical engagement floor is $25k for a Discovery Sprint. If your project might grow into that scope, write us back with more context. Meanwhile, here are some resources that might help: [Insights link]"
   - Sender: same as primary

3. **Response to client:** 200 OK with `{ status: 'sent' }` after both emails dispatch successfully; 500 with `{ error: '...' }` if Resend fails

Implementation notes:
- Use the `resend` Node SDK
- Wrap Resend calls in try/catch; if Resend fails, return 500 to the client so the form shows the error state from #21
- Rate-limit the route (~5 requests/min/IP) using Vercel's built-in edge rate limiting or a simple in-memory token bucket
- Add a basic honeypot field on the form (hidden input that real users won't fill) — reject submissions with non-empty honeypot

Unit tests required:
- Payload validation: malformed payloads rejected with 400
- Resend SDK invoked with correct primary-email arguments (mock Resend SDK)
- Resend SDK invoked with correct auto-reply arguments for budget ≥ $25k case
- Resend SDK invoked with correct auto-reply arguments for budget < $25k case (polite redirect)
- 500 returned when Resend throws
- Honeypot: non-empty honeypot returns 200 silently (don't reveal it's a honeypot) but doesn't actually call Resend

Manual smoke test:
- Submit a real form with budget ≥ $25k → verify Richard receives notification, submitter receives auto-reply with calendar link
- Submit with hypothetical low-budget (via direct curl bypassing the form) → verify auto-reply is the polite redirect

## Acceptance criteria

- [ ] Resend account configured, domain verified, DNS records published
- [ ] `RESEND_API_KEY` set in Vercel project env
- [ ] `POST /api/contact` route handler implemented
- [ ] Server-side validation rejects malformed payloads with 400
- [ ] Honeypot field on form rejects bot submissions silently
- [ ] Rate limiting in place (~5 req/min/IP)
- [ ] Primary notification email arrives at `richard@spacecadet.io` with all fields formatted scannably
- [ ] Conditional auto-reply branches correctly by budget bracket — confirmed by smoke tests
- [ ] Auto-reply for high-budget includes Cal.com booking link
- [ ] Auto-reply for low-budget is a polite redirect, no calendar link
- [ ] Resend failure returns 500 to client; client shows error state from #21
- [ ] Unit tests pass for all server-side branches
- [ ] Real submission from `/contact` reaches Richard's inbox (smoke test)
- [ ] Submitter receives correctly-branched auto-reply (smoke test)
- [ ] Mock `setTimeout` submission code from prior CRA Contact page is fully removed

## Blocked by

- #21
