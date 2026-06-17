# 24 — Per-route metadata + static OG images

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Per-route SEO metadata for every page on the site, plus static Open Graph and Twitter card images. Uses Next.js 15's `next/metadata` conventions. This is the SEO foundation; JSON-LD (#25) and dynamic OG generation (#26) layer on top.

Routes that need metadata:
- `/` (Home)
- `/work` (Work index)
- `/work/[slug]` (every case study)
- `/capabilities` (Capabilities page)
- `/approach` (Approach page)
- `/about` (About page)
- `/insights` (Insights index)
- `/insights/[slug]` (every Insights post)
- `/contact` (Contact page)

For each route, generate:

- **`title`** — page-specific, ends with " · Spacecadet" (e.g., "Custom AI products you own · Spacecadet")
- **`description`** — 140–160 chars, page-specific, contains primary keywords ("AI products", "AI integrations", "AI-native studio", etc.), reads as a real sentence
- **OG image** — 1200x630, page-specific. **For this slice:** static images committed to `/public/og/`. (Dynamic OG image generation via `next/og` lands in #26.) Initial set: 1 generic site OG + 1 per top-level route + a generic case-study OG + a generic Insights OG (use the generics for dynamic routes until #26).
- **OG type** — `website` for marketing pages, `article` for Insights posts
- **Twitter card** — `summary_large_image`, twitter handle (`@spacecadet` if configured, otherwise omit)
- **Canonical URL** — `https://spacecadet.io/[route]`

Implementation:
- Use Next.js `generateMetadata` per route segment
- Centralize the base metadata config (site name, default OG, default Twitter handle) in a single shared module
- Dynamic routes (case studies, Insights posts) read frontmatter (via #17) and use post/case-study title + summary + cover image
- Ensure no duplicate titles or descriptions across routes (every page is unique)

## Acceptance criteria

- [ ] Every static route has unique `title` and `description` set via `generateMetadata`
- [ ] Every Insights post has unique metadata sourced from its MDX frontmatter
- [ ] Every case study has unique metadata sourced from its MDX frontmatter
- [ ] All routes have OG image set (static images committed to `/public/og/`)
- [ ] OG type is `website` for marketing pages, `article` for Insights posts
- [ ] Twitter card metadata set to `summary_large_image` site-wide
- [ ] Canonical URLs set per route
- [ ] No duplicate `title` or `description` across pages (verify by listing and dedupe)
- [ ] View-source on each route shows the correct meta tags in raw HTML (SSR confirmed, not client-only)
- [ ] OG images render correctly when site URL is pasted into a link-preview tool (e.g., Twitter / Slack / LinkedIn)

## Blocked by

- #07 (Home)
- #14 (Capabilities)
- #15 (Approach)
- #16 (About)
- #18 (Insights)
- #19 (Work)
- #21 (Contact)
