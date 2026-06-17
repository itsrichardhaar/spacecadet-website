# Spacecadet Site Redesign — PRD

**Status:** Ready for agent
**Created:** 2026-06-16
**Scope:** Full site redesign + CRA → Next.js migration + new content + new motion system + new lead-gen pipeline

---

## Problem Statement

Spacecadet's current website (`spacecadet.io`) misrepresents the business. It presents Spacecadet as a generic four-discipline studio (software development, product/UX design, AI consulting, marketing strategy) for "ambitious companies" — language that competes against every other dev shop and small agency. The positioning is too broad to convert qualified buyers, and the visual + motion design (single fade-up everywhere, blue/purple gradient, Inter-only, no case studies, no Insights, fake-submission contact form, $10k budget brackets) reads as a small generic agency rather than a credible AI-native product studio.

Concretely, the current site fails on five axes:

1. **Positioning** is too broad — visitors cannot tell what Spacecadet specifically does and who it specifically serves
2. **Proof is absent** — there is no Work / Case Studies page, no Insights, and the vanity stats actively undermine credibility ("4 Core Disciplines" contradicts an AI-native focus)
3. **Visual identity is commodity** — the blue/purple gradient and Inter-only setup is the most-copied AI/SaaS aesthetic of the last five years
4. **Motion is monotone** — a single CSS fade-up is the entire animation vocabulary, with no hierarchy or variation
5. **Lead-gen is broken** — the contact form does not actually submit anywhere (uses a `setTimeout` fake), the qualifying questions and budget brackets pull in time-wasters, and there is no high-intent path (calendar booking) for ready buyers
6. **Tech foundation is dying** — the site runs on Create React App, which is deprecated and produces a client-side-only bundle that hurts SEO and AEO

This combination means qualified AI-product buyers (founders, CTOs, PMs at funded startups and businesses replacing third-party SaaS with custom AI) bounce within seconds because the site provides no evidence Spacecadet is the right partner, and the visitors who do convert are typically poor-fit budget-mismatched leads filtered in by the broad positioning.

## Solution

Rebuild Spacecadet's site from the ground up as an **AI-native product studio** site that clearly states what Spacecadet builds, who it builds for, why it's defensible, and provides credible proof + a high-intent conversion path.

The redesign locks the following:

- **Positioning:** AI-native product studio. Wedge: "the AI products you can't buy off the shelf" — custom AI products and integrations for businesses with proprietary data, regulated workflows, or AI core to their differentiation, replacing recurring third-party SaaS costs.
- **Hero copy:** H1 *"We build AI solutions"* + a subhead that carries the wedge: *"We help growing businesses move beyond off-the-shelf SaaS — building custom AI products and integrations designed around your data, owned by your team, and engineered to lower long-term software costs."*
- **Information architecture:** 7 pages — Home, Work (case studies, new), Capabilities (renamed from Solutions, rewritten), Approach (opinionated process page, new), Insights (blog, new), About, Contact. The Pricing page is removed.
- **Capabilities:** 4 buyer-journey-aligned categories — Custom AI Products, AI Integrations, Intelligent Agents & Automation, AI Strategy & Discovery.
- **Visual lineage:** Atmospheric AI-studio direction (Brale, Anthropic, Cresta) with Linear-level discipline. Single warm ember accent on warm dark; no gradient. Inter typography. Type + color + custom SVG diagrams + real case-study screenshots; no stock, no AI-generated imagery.
- **Motion system:** GSAP + ScrollTrigger + SplitText, with Lenis smooth scroll on desktop only. Varied entrance vocabulary per text role (char-by-char H1, word-by-word H2, line-by-line body, scale-fade cards/buttons, count-up stats). Three cinematic scroll moments: Hero, Capabilities explainer, Case Study presentation. Subtle parallax on five decorative-only targets. Hover behaviors restrained: button fill + arrow, text-link underline draw, Work tile hover image swap. Mobile gets stripped motion + native scroll. Reduced-motion strips to instant fade.
- **Lead-gen:** Dual-path Contact page — Cal.com 30-min discovery booking (primary) + structured qualifying form (secondary) backed by Resend with conditional auto-reply. Budget floor raised from $10k to $25k.
- **Tech stack:** Migrate from CRA to Next.js 15 (App Router) on Vercel. MDX-backed Insights and Work content. Resend SDK for form backend. Cal.com embed for calendar.
- **Phasing:** ~5–6 week phased build (Foundation → Marketing Core → Proof + Content → Launch), with hard launch blockers: no placeholder case studies in prod, no fewer than 3 Insights posts at launch, no faked form submission, mobile + reduced-motion fallbacks verified.

After launch, the site should (a) convert qualified AI-product buyers at a higher rate than today by self-qualifying through specific positioning, (b) provide enough proof (case studies + Insights) that LLM search engines (Perplexity, ChatGPT search, Claude search) cite Spacecadet accurately as an AI-native product studio, (c) filter out budget-mismatched leads before they reach Richard's inbox, and (d) provide a foundation that scales with each new shipped case study and Insights post without requiring redesign.

## User Stories

### Visitor / prospective buyer (general)

1. As a prospective buyer landing on the home page, I want to see in 5 seconds what Spacecadet builds and who it builds for, so that I can decide whether to invest more time exploring.
2. As a prospective buyer, I want the hero subhead to name the specific outcome (replace third-party SaaS, own the system, lower software costs), so that I immediately understand the commercial value.
3. As a prospective buyer who is skeptical of agency marketing, I want to see real case studies with technical depth, screenshots, and metrics, so that I trust Spacecadet has actually shipped AI-native work.
4. As a prospective buyer, I want each capability category to be specific and engagement-shaped (Custom Product / Integration / Agent / Strategy), so that I can self-identify which kind of engagement I need.
5. As a prospective buyer reading the Capabilities page, I want to see a small architectural diagram with each capability, so that I understand what the work actually looks like and not just marketing copy.
6. As a prospective buyer who isn't sure if I'm ready to commit, I want a clearly named lower-commitment entry point (the Discovery Sprint), so that I can engage at the right level for my current state.
7. As a prospective buyer wanting to understand how Spacecadet works, I want an Approach page with opinionated POVs and named engagement models with price ranges, so that I know what to expect before booking a call.
8. As a prospective buyer, I want to see what Spacecadet refuses to do (the "What we say no to" section), so that I trust the studio has standards and isn't desperate for any project.
9. As a prospective buyer ready to engage, I want to book a 30-minute discovery call directly from the Contact page, so that I don't have to write a brief before talking.
10. As a prospective buyer not yet ready to call, I want to send a structured brief instead, so that Spacecadet can read context before we speak.
11. As a prospective buyer submitting the form, I want clear next-step expectations after submission, so that I know what happens and when.
12. As a prospective buyer whose budget is below Spacecadet's floor, I want a polite redirect rather than silence, so that I don't waste time waiting for a response.
13. As a prospective buyer using a mid-tier laptop or 2-year-old phone, I want the site to load and render quickly without dropped frames, so that I'm not annoyed by performance issues that contradict the "professional startup" claim.

### Mobile visitor

14. As a visitor on a phone, I want the site to use native scroll without smooth-scroll interception, so that iOS gestures (swipe-back, pull-to-refresh) and pinch-zoom work normally.
15. As a visitor on a phone, I want animations stripped to fast simple fades, so that scrolling is responsive and the touch experience takes priority.
16. As a visitor on a phone, I want parallax effects disabled, so that scroll feels natural and I don't experience motion sickness.
17. As a visitor on a tablet, I want the experience tuned for touch (no smooth scroll, no parallax, simplified motion), so that the site feels native rather than retrofitted.

### Accessibility-sensitive visitor

18. As a visitor with `prefers-reduced-motion: reduce` set in my OS, I want all animations to collapse to instant fades, so that I'm not exposed to motion that could trigger vestibular discomfort.
19. As a visitor relying on assistive technology, I want every CTA, link, and form field to be keyboard-accessible and screen-reader-labeled correctly, so that I can complete the conversion flow without barriers.

### Insights reader

20. As an Insights reader, I want long-form, opinionated posts written from real client experience, so that I can evaluate the studio's thinking and judge whether to engage commercially.
21. As an Insights reader, I want technical content (code samples, architecture diagrams) where relevant, so that I can validate the studio's technical depth.
22. As an Insights reader, I want posts dated and surfaced by recency, so that I can tell whether the studio is actively publishing.
23. As an Insights reader, I want a clean reading experience with no subscribe-popup interrupters, so that I can focus on the content.
24. As an Insights reader, I want each post to end with a soft contact link, so that I have a clear next step if the post resonated.
25. As an Insights reader interested in a specific topic, I want the URL structure to be human-readable (e.g., `/insights/build-vs-buy-ai`), so that I can share, bookmark, or remember the link.

### Work / case study reader

26. As a visitor viewing the Work index, I want to scan featured and additional case studies in a clean grid, so that I can quickly find the kind of project most relevant to mine.
27. As a visitor opening a case study, I want a structured walk through the problem, what was built, the approach, the outcome with metrics, the tech stack, and a client quote, so that I get both narrative and proof.
28. As a visitor reading a case study, I want the outcome metrics to animate in on scroll (count-up), so that I notice and remember them.
29. As a visitor hovering a Work tile, I want a subtle image swap to a more detailed view, so that I get a preview of the project before clicking through.
30. As a visitor reading a case study, I want a related-work suggestion at the bottom, so that I can continue exploring proof rather than dead-end at the page.

### Search engine / LLM crawler (SEO + AEO)

31. As Google's crawler, I want fully server-rendered HTML on every page, so that I can index the content reliably.
32. As an LLM search engine (Perplexity, ChatGPT search, Claude search), I want the hero block to contain a clear declarative summary of what Spacecadet does, so that I can cite it accurately when asked "what does Spacecadet do."
33. As a search engine, I want structured data (JSON-LD) describing Spacecadet as an Organization, the four Capabilities as Services, and Insights posts as Articles, so that I can present rich results.
34. As a search engine, I want a sitemap and a `robots.txt`, so that I can discover all pages efficiently.
35. As a search engine, I want each page to have unique, descriptive meta titles and descriptions, so that I can rank and display them appropriately.
36. As a search engine, I want Open Graph and Twitter card images per page (dynamically generated), so that shared links render rich previews.

### Content editor (Richard / studio principal)

37. As the studio owner publishing a new Insights post, I want to write it in MDX with frontmatter (title, date, tags, summary), so that I can ship a post via PR without touching backend infrastructure.
38. As the studio owner publishing a new case study, I want to write it in MDX using a shared case-study template that accepts cover image, at-a-glance facts, problem, approach, outcome, tech stack, and quote, so that consistency is automatic.
39. As the studio owner, I want the Capabilities data defined once and consumed by Home, Capabilities page, and case study tags, so that I never have to update the same list in multiple places.
40. As the studio owner, I want my Contact form submissions to arrive in my inbox with the qualifying answers pre-formatted, so that I can triage in 10 seconds.
41. As the studio owner, I want a conditional auto-reply that thanks all submitters and includes a calendar link only for budgets ≥ $25k, so that I'm not manually replying to budget-mismatched leads.
42. As the studio owner, I want analytics that show me which pages convert and which posts drive traffic, without compromising visitor privacy, so that I can iterate on what works.

### Developer

43. As a developer maintaining the site, I want a single motion-primitives module exposing hooks (`useScrollReveal`, `useParallax`, `useSplitTextReveal`), so that every entrance animation is consistent without duplicating GSAP setup.
44. As a developer, I want motion gates (`useReducedMotion`, `useIsTouchDevice`, `useIsDesktop`) used by every motion primitive, so that accessibility and mobile fallbacks are enforced centrally and not per-page.
45. As a developer, I want design tokens defined as CSS custom properties in one file, so that color, type scale, and motion timings can be adjusted globally.
46. As a developer, I want the Lenis bootstrap to live in a single root location with reduced-motion + touch detection baked in, so that smooth-scroll behavior is not accidentally enabled in the wrong context.
47. As a developer, I want the Contact form module to expose a clean submit interface that the API route fulfills, so that I can swap Resend for another provider later without rewriting form code.
48. As a developer, I want the MDX content loader to type-check frontmatter, so that broken or missing frontmatter fields fail at build time rather than at runtime.
49. As a developer, I want the SEO module to generate metadata, JSON-LD, sitemap entries, and OG images from a single per-route configuration, so that SEO consistency is automatic.
50. As a developer, I want tests for the deep modules (motion gates, contact form, contact API, MDX loader, SEO module), so that regressions in business logic are caught before deployment.
51. As a developer, I want the site to migrate from CRA to Next.js 15 before any other work begins, so that downstream decisions (SEO, MDX, image optimization, RSC) don't have to be retrofitted.

## Implementation Decisions

### Stack migration (precondition for all other work)

- Migrate from `react-scripts` (CRA) to **Next.js 15 with App Router**. This is Phase 0 of the build and is a hard precondition for SSR/SSG-dependent decisions (SEO, AEO, MDX content, image optimization, edge functions, dynamic OG images).
- Hosting moves to **Vercel** (native Next.js integration, free tier covers studio use, edge functions for the Contact route handler).
- TypeScript upgraded from 4.9 to 5.x.
- Drop unused dependencies: `@mui/material`, `@emotion/react`, `@emotion/styled` (only icons were being used, not components).
- Replace `@mui/icons-material` with `lucide-react` (~30% smaller, more on-brand).

### Modules

1. **Motion primitives module** — exposes `useScrollReveal(config)`, `useParallax(speed)`, and `useSplitTextReveal({ unit: 'char' | 'word' | 'line', stagger })`. Wraps GSAP, ScrollTrigger, and SplitText. ScrollTrigger uses `once: true` for entrance animations (no replay on re-scroll). All motion primitives consume the motion gates module and no-op when motion should not run. **(deep)**
2. **Motion gates module** — exposes `useReducedMotion()`, `useIsTouchDevice()`, `useIsDesktop()`. Single source of truth for motion eligibility. All motion primitives and the Lenis bootstrap depend on this. **(deep)**
3. **Lenis bootstrap** — instantiates Lenis at the app root on desktop only, hooks `lenis.raf` into `gsap.ticker`, removes itself when reduced-motion is set or on touch. Implements `@darkroom.engineering/lenis`.
4. **Design tokens** — CSS custom properties for the warm ember palette (single chromatic accent on warm dark), type scale, spacing scale, motion durations, motion easings. Defined in a single `tokens.css` consumed globally.
5. **Component library (atomic)** — `Button` (variants: primary, ghost, with arrow), `Card`, `Section`, `Container`, `Eyebrow`, `RevealText` (wrapper that takes `unit` + `stagger` props and renders children with the appropriate entrance). Replaces the inline-className pattern in the current codebase.
6. **Capability data module** — single typed export of the four capabilities (Custom AI Products / AI Integrations / Intelligent Agents & Automation / AI Strategy & Discovery), each with id, name, summary, description, diagram SVG reference, and engagement-shape metadata. Consumed by Home cinematic, Capabilities page, and Work case-study tagging.
7. **Cinematic scenes (3)** — Hero reveal scene (char-by-char H1 + mouse-position parallax on hero orbs), Capabilities scroll-pinned scene (~2 viewport heights, progressively reveals each of the four capabilities), Case study scroll-tied scene (cover image + text choreographed together). Each scene composes the motion primitives module.
8. **Contact form module** — handles state, client-side validation (required fields, email format, budget selected), submission to `/api/contact`, success/error UI states. Returns a clean interface so the Resend implementation can swap without consumer changes. **(deep)**
9. **Contact API route** (`POST /api/contact`) — validates payload server-side, sends primary notification email to `richard@spacecadet.io` via Resend with all qualifying answers pre-formatted, sends conditional auto-reply to submitter (thanks + calendar link if budget ≥ $25k, polite redirect if below). **(deep)**
10. **Cal.com embed wrapper** — thin React component over `@calcom/embed-react`, applies design-token-based styling overrides, fires analytics events on booking events.
11. **MDX content loader** — reads MDX files from `app/insights/` and `app/work/` directories with typed frontmatter parsing. Returns metadata for listing pages and full content for detail pages. Backbone for both Insights and Work. **(deep)**
12. **Work case study template** — detail page layout that reads MDX via loader and renders the locked structure: cover hero → at-a-glance bar → problem → what we built → approach → outcome (with count-up metrics) → tech stack → client quote → up-next/CTA. Supports hover image swap on Work index tiles.
13. **Insights post template** — long-form layout reading MDX via loader. Code blocks highlighted via `rehype-shiki`. Optional inline SVG diagrams. No subscribe-popup interrupters; bottom-of-post soft CTA only.
14. **SEO / AEO module** — generates per-route metadata (title, description, OG, Twitter), JSON-LD structured data (Organization for the site, Service per Capability, Article per Insights post), sitemap, and dynamic OG images via `next/og`. **(deep)**
15. **Analytics module** — bootstraps Vercel Analytics and Plausible (~$9/mo, privacy-friendly). Exposes a small event helper consumed by Cal.com wrapper, Contact form, and major CTAs.

### Page-level decisions

- **Home page sections (7):** Hero → Social proof bar → Capabilities (cinematic moment) → Selected Work (2–3 featured tiles) → How We Engage snippet → Insights preview → CTA band. The vanity stats section is removed.
- **Hero CTAs:** Primary "Book a discovery call" → Contact. Secondary "See our work" → Work. The "Available for new projects" badge is removed.
- **Capabilities page:** Each of the four capabilities is its own anchor-linked section with H2 + small SVG architectural diagram + 2–3 paragraph description + named example engagement shape.
- **Approach page:** Opens with a POV statement on AI-engagement principles. Three named engagement models with explicit price ranges (Discovery Sprint $25–40k / Build Engagement $80–250k+ / Embedded Retainer $20–35k/mo). Weekly rhythm description. 4–6 stated POVs (e.g., "We always build evals before features," "We require real production data access in week 1"). Artifact diagrams.
- **About page:** Origin paragraph → Beliefs (3–5 specific stances) → Team (no headshot grid; one principal-level treatment) → "What we say no to" section (non-negotiable).
- **Insights:** Long-form MDX posts, 1,500–2,500 words, opinionated, first-person plural, no subscribe interrupters, bottom-of-post CTA only. Launch with 6 seed posts; sustaining cadence of 2/month.
- **Contact page:** Two-column hero — Cal.com embed (primary path, "Book a 30-min discovery call") on one side, structured form (secondary path, "Or send us a detailed brief") on the other. Form fields: name, email, company, role, capability interest (dropdown matching the four capabilities), project stage, timeline, budget (floor $25k), open prompt ("What are you trying to solve, and why now?"). Below the dual path: email link (`hello@spacecadet.io`), response time, location. LinkedIn retained; Twitter and Dribbble dropped from socials.

### Visual + motion contract

- **Color:** Single warm ember accent (target `~#FF8A3D`) on warm dark (target `~#0C0A09`). Warm-paper text (target `~#F5F1EB`) instead of pure white. No gradient blends — accent appears solid, never blended.
- **Typography:** Inter only. Weight scale 300–900 retained. No serif. Mono not introduced unless required for inline code.
- **Imagery:** Type + color + custom SVG diagrams (4 capability + 3–4 approach phase + occasional inline Insights) + real case study screenshots. No stock photography, no AI-generated imagery, no headshot grid.
- **Motion vocabulary (text entrance, by role):**
  - H1 / Hero heading → character-by-character mask reveal, ~25ms stagger (reserved for hero + 1–2 other moments)
  - H2 / Section title → word-by-word mask reveal, ~60ms stagger
  - Eyebrow / small-caps label → letter-spacing-expand + fade
  - Body / paragraph → line-by-line clip-mask reveal, ~80ms stagger
  - Button / CTA → scale-from-0.96 + fade
  - Stat number → count-up tween + fade
  - Card grid → stagger fade-up + scale (0.97 → 1)
- **Cinematic moments (3 only):** Hero reveal, Capabilities scroll-pinned (~2 viewport heights), Case study scroll-tied.
- **Parallax (5 targets, decorative only):** Hero glow orbs (0.5x scroll), section gradient washes (0.6x), grain overlay (0.7x), case study covers (0.85x), capability decoratives (0.7x). Plus mouse-position parallax on hero orbs (desktop only). Never on text, cards, or content imagery.
- **Hover (restrained):** Button fill + arrow translate; text-link underline draw-in (left to right); Work tile cover→detail image swap. No magnetic hover, no cursor-follow border glow, no 3D card tilt, no custom cursor, no click ripple.
- **Mobile/touch:** Lenis disabled, parallax disabled, all entrance reveals collapse to a single fast fade-up (~300ms, no stagger, no split-text). Native scroll preserved. Hover collapses to active state.
- **Reduced-motion:** All motion strips to instant fade only. No transforms, no parallax, no scroll-tied animation.
- **Performance budget:** All scroll-tied and parallax animations restricted to `transform` + `opacity`. No animated layout properties. RAF-throttled mousemove handlers. Target Lighthouse 95+ desktop, 85+ mobile.

### Lead-gen / Contact contract

- **Form payload:** name, email, company, role, capability interest, project stage, timeline, budget bracket, open message.
- **Budget brackets:** $25–50k / $50–100k / $100–250k / $250k+ / Not sure yet. The old "Under $10k" and "$10–25k" brackets are removed.
- **Auto-reply rules:** Submissions with `budget ≥ $25k` (or "Not sure yet") receive a thank-you with a Cal.com booking link. Submissions below the floor receive a polite redirect explaining the studio's engagement floor.
- **Submission destination:** `richard@spacecadet.io` (via Resend SDK; domain DNS for Resend must be configured pre-launch).
- **Calendar:** Cal.com inline embed, 30-minute slots, 1-week availability window.

### Content launch state

- **Work page:** Launches with 3 placeholder case studies during design + staging only. Real client case studies (one per capability category: Custom AI Product, AI Integration, Intelligent Agent) must replace placeholders before public launch.
- **Insights:** Launches with 6 seed posts; the most recent must be dated within 2 weeks of public launch. Sustaining cadence is 2 posts per month minimum.
- **Capabilities + Approach + About:** All written copy must be in place before launch.

### Phasing

- **Phase 0 (1 week):** Migrate CRA → Next.js 15. Establish design tokens. Install + configure GSAP, ScrollTrigger, SplitText, Lenis. Build atomic component library. Configure Vercel hosting + Resend account.
- **Phase 1 (2 weeks):** Home (all 7 sections including cinematic moments 1 & 2), Capabilities, Approach, About, Contact (with Cal.com embed + Resend-backed form). Apply motion vocabulary site-wide. Implement mobile + reduced-motion fallbacks. Establish performance baseline.
- **Phase 2 (2 weeks, partially overlapping with Phase 1 final week):** Work page (index + 3 case study details with placeholder content), Insights infrastructure (MDX setup, post template, listing page), 6 seed Insights posts, SVG diagrams (capability + approach + inline Insights as needed). Real case study content swap-in (gated as launch blocker).
- **Phase 3 (1 week):** Final Lighthouse + real-device performance audit. SEO/AEO check: sitemap, robots.txt, JSON-LD validation, OG image verification, per-page meta descriptions. Analytics installed and verified. Domain cutover. Soft-launch monitoring window (24–48 hours).

### Hard launch blockers

- Placeholder case studies in production are not permitted (staging only)
- Insights launches with fewer than 3 posts is not permitted
- Contact form must submit to Resend in production (no `setTimeout` fakes)
- Mobile + `prefers-reduced-motion` fallbacks must be verified on real devices before launch
- Resend domain DNS must be configured before launch (catch this in Phase 0 — easy to miss)

## Testing Decisions

### Testing philosophy

Tests verify **external behavior**, not implementation details. A good test for this site:

- Calls the module's public interface (a hook, a function, an API endpoint) and asserts on the return value or side effect
- Does not depend on internal state, internal function names, or DOM structure of components it does not own
- Survives a refactor of the module's internals as long as the public behavior is unchanged
- Mocks external boundaries (Resend SDK, `window.matchMedia`, `navigator`) rather than internal collaborators

Pure visual / motion correctness is verified by **manual QA + Lighthouse + real-device testing**, not unit tests. Trying to assert "the hero text reveals character-by-character" in code is high-cost / low-ROI; verifying it by eye in browser is correct.

### Modules with tests

1. **Motion gates module** (#2) — tests verify `useReducedMotion`, `useIsTouchDevice`, `useIsDesktop` correctly read `window.matchMedia` and `navigator` signals, react to changes, and clean up listeners. Mock `matchMedia` and `navigator` fixtures.
2. **Contact form module** (#8) — tests verify required-field validation, email format validation, budget-selected validation, submission-success state transitions, submission-error state transitions. No actual HTTP requests; mock the submit callback.
3. **Contact API route** (#9) — tests verify payload validation (rejects malformed input), successful Resend SDK invocation (mocked), correct conditional auto-reply branching by budget bracket. Mock the Resend SDK at the boundary.
4. **MDX content loader** (#11) — tests verify frontmatter parsing, type-checking of frontmatter against the schema (rejects missing or malformed fields), correct ordering of listing output (most recent first), and proper handling of draft posts. Use file-system fixtures.
5. **SEO / AEO module** (#14) — tests verify metadata generation per route, JSON-LD structured data correctness (Organization, Service, Article shapes), sitemap entries, and OG image URL construction. Pure functions, no mocking required.

### Modules without unit tests (verified by manual QA / Lighthouse / real-device)

- Motion primitives (#1) — browser-only behavior, low unit-test ROI
- Lenis bootstrap (#3) — third-party glue, behavior verified by real-device scroll testing
- Design tokens (#4) — data file, no logic
- Component library (#5) — visual review (Storybook or in-context), not unit tests
- Capability data (#6) — typed data, no logic
- Cinematic scenes (#7) — visual + motion correctness, manual QA
- Cal.com embed wrapper (#10) — third-party integration, smoke-tested manually
- Work case study template (#12) — visual layout, manual QA
- Insights post template (#13) — visual layout, manual QA
- Analytics module (#15) — verify events fire via Vercel/Plausible dashboards post-launch

### Prior art in the codebase

The current codebase has no test infrastructure beyond CRA defaults (Jest + React Testing Library scaffolding in `App.test.tsx`). Test infrastructure will be re-established under Next.js: Vitest for unit tests (faster than Jest, native ESM, better Next 15 compatibility), with `@testing-library/react` for any React-aware tests. Place tests adjacent to the module they test (e.g., `motion-gates.ts` + `motion-gates.test.ts`).

## Out of Scope

- **Real case study content writing.** The PRD covers the case study template and structure; the actual narrative copy, screenshots, and metrics for the three launch case studies are supplied by the studio principal (Richard) and are not part of this build's scope. Their absence is, however, a hard launch blocker.
- **Real Insights post writing.** Same as above — the PRD covers the post template and Insights infrastructure; the seed-post copy is supplied by Richard. The PRD has recommended six seed topics for direction.
- **Brand identity work beyond color and type.** Logo, business cards, presentation templates, social-media graphics, email signatures, and any other brand collateral are outside this engagement. The redesign only touches what appears on `spacecadet.io`.
- **CRM integration.** The form sends to email via Resend with structured fields. Pipeline / opportunity tracking inside a CRM (HubSpot, Pipedrive, Attio) is not included. Adding a CRM later is straightforward (the Resend handler can fan out to a CRM webhook), but the launch path is email-only.
- **Subscriber / newsletter management.** Insights posts will not include subscribe widgets or email-capture beyond an optional simple footer signup (deferred decision — can be added later via Resend Audiences or ConvertKit).
- **A/B testing infrastructure.** No experimentation framework is installed. Iteration is qualitative post-launch (read inbound leads, adjust copy).
- **Multi-language support / i18n.** English only.
- **Cookie banner / GDPR / consent management.** Plausible is privacy-friendly and does not require consent banners in most jurisdictions. Vercel Analytics is anonymous. If Spacecadet later adds tracking that requires consent, a consent layer can be added then.
- **Custom CMS.** Content (Insights, Work, Capabilities) lives as MDX in the repository, shipping via PRs. No CMS is installed.
- **Realtime / chat features.** No live chat widget, no Intercom, no Drift.
- **Third-party social proof widgets.** No Trustpilot, no G2, no Capterra embeds. Social proof is presented as a logo bar (when logos are available) or omitted at launch.
- **Career / hiring page.** Out of scope for this redesign. Can be added later as a new route.
- **E-commerce / product checkout.** Spacecadet is a service business; no checkout, no Stripe integration, no productized service purchases.

## Further Notes

- **The H1 ("We build AI solutions") is broader than the locked positioning thesis.** This was a deliberate trade by the studio principal — the H1 prioritizes search-volume keywords and accessible language, with the subhead carrying the wedge (custom, ownership, replace third-party SaaS). If post-launch lead quality drifts toward low-budget chatbot/integration work, the H1 should be tightened. The H1 is the cheapest lever to adjust the funnel without redesigning anything else.
- **The Springer Studios org-level profile in user instructions does not apply to this project.** Spacecadet is a fully independent brand. Any future work on this codebase should ignore the Springer Studios context and use Spacecadet's own positioning (captured in this PRD).
- **The current contact email is `hello@spacecadet.io`.** This should be verified before launch — Resend will require DNS configuration on this domain. If `hello@` is not desired as the actual destination, route to a personal address while keeping `hello@` as the published address.
- **The current site lists Raleigh, North Carolina as the studio location.** This is preserved unless instructed otherwise.
- **The current site links to LinkedIn, Twitter, and Dribbble.** Twitter and Dribbble are dropped (wrong signal for AI-product studio positioning); LinkedIn is kept; GitHub is added if Spacecadet has a public org worth showing.
- **Performance is treated as a hard constraint, not a nice-to-have.** Every animation decision was evaluated for transform-only + GPU-only execution. If the build produces a Lighthouse score below 95 desktop / 85 mobile, the launch is blocked until the regression is identified and resolved.
- **All animation work assumes GSAP, ScrollTrigger, and SplitText are used under the standard GSAP free license (post-2024).** Verify license terms in build-time output. No paid GSAP plugins are required.
- **Insights publishing cadence is the highest-risk content commitment in this plan.** A stale blog is worse than no blog. If the 2/month cadence cannot be sustained after launch, drop Insights from primary navigation and move existing posts to a less-prominent location rather than letting the page atrophy in place.
- **Real case study writing is the most likely launch slipper.** Quality case studies (technical depth + metrics + client quotes) take more time than expected. Begin drafting them in parallel with Phase 0 / Phase 1 to avoid blocking launch in Phase 3.
