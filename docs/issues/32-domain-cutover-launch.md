# 32 — Domain cutover + soft launch monitoring

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Cut over `spacecadet.io` from the current CRA site to the new Vercel deployment. Monitor for 24–48 hours to catch any production-only regressions. This is the final slice — once it completes, the redesign is live.

Pre-cutover gate (verify ALL hard launch blockers from PRD before this slice runs):
- [ ] All 3 real case studies live (#30 complete, no placeholders)
- [ ] All 6 real Insights posts live (#31 complete, no placeholders)
- [ ] Contact form submits via Resend in production (#23 complete, no `setTimeout` fakes)
- [ ] Mobile + reduced-motion fallbacks verified on real devices (#29 complete)
- [ ] Lighthouse targets met across all routes (#28 complete)
- [ ] All SEO + structured data + sitemap in place (#24, #25, #26 complete)
- [ ] Analytics installed and reporting (#27 complete)
- [ ] Resend DNS records active and verified (verified during #23)

Cutover steps:
1. Verify Vercel production deployment is healthy on the preview URL
2. Confirm Vercel project's "Production Domain" setting is configured for `spacecadet.io` and `www.spacecadet.io`
3. Update domain DNS at the registrar to point to Vercel's nameservers (or update A / CNAME records per Vercel's instructions)
4. Wait for DNS propagation (typically 10 minutes — 24 hours depending on TTL on existing records)
5. Verify HTTPS / Let's Encrypt cert provisioned automatically by Vercel
6. Verify `www` → root redirect (or root → `www`, depending on preference)
7. Submit updated sitemap to Google Search Console (and Bing Webmaster Tools if used)

Soft launch monitoring (24–48 hours after cutover):
- Monitor Vercel Analytics dashboard for 4xx / 5xx error rates — target near-zero
- Monitor Plausible for traffic anomalies (sudden bounce-rate increase, etc.)
- Monitor Resend dashboard for delivery failures
- Test the live Contact form: submit a real brief from outside the organization → verify Richard receives the notification + the auto-reply arrives
- Test a live Cal.com booking end-to-end
- Spot-check 3–5 random pages on real devices (iPhone, Android, desktop)
- Verify the redirect from any deep links on the old site (if applicable — e.g., does old `/pricing` resolve gracefully, or 404 cleanly?)

Old URL handling:
- The old site had `/pricing` — that URL is no longer in the new IA. Decide: 410 Gone vs 301 redirect to `/approach` (recommended) vs 404. Set redirect rule in Vercel config.

Rollback plan (if something is critically broken):
- Vercel's "Promote to Production" can promote any previous deployment with one click — keep the previous successful deployment available as a fast rollback option
- Worst case: DNS can be reverted to the old CRA hosting within ~10 minutes

## Acceptance criteria

- [ ] All hard launch blockers verified complete before cutover begins
- [ ] DNS updated to point `spacecadet.io` (and `www.spacecadet.io`) to Vercel
- [ ] HTTPS certificate active on production domain
- [ ] `www` ↔ root redirect configured per chosen convention
- [ ] Sitemap submitted to Google Search Console
- [ ] Old `/pricing` URL handled (301 to `/approach`)
- [ ] 24–48h monitoring window complete
- [ ] No critical 4xx / 5xx errors during monitoring window
- [ ] Test brief submitted and Richard received both notification + auto-reply
- [ ] Test Cal.com booking completed successfully
- [ ] Spot-check on 3 device types confirmed no production-only regressions
- [ ] Rollback plan tested (verified Vercel "Promote" works on a non-production deployment)
- [ ] Launch announcement (LinkedIn post / email to existing contacts) handled by Richard, post-monitoring

## Blocked by

- #29
- #30
- #31
