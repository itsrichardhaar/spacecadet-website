# 26 — Sitemap + robots.txt + dynamic OG image generation

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Three crawler-facing deliverables that complete the SEO foundation:

1. **`sitemap.xml`** — lists every page on the site, regenerated at build time
2. **`robots.txt`** — crawler directives, pointer to sitemap
3. **Dynamic Open Graph image generation** via `next/og` — every Insights post and case study gets a per-page OG image automatically generated from a single template, replacing the static OG images from #24

### Sitemap

- Generate via Next.js's built-in `sitemap.ts` convention at app root
- Include all static routes: `/`, `/work`, `/capabilities`, `/approach`, `/about`, `/insights`, `/contact`
- Include all dynamic routes: `/insights/[slug]` (every published, non-draft post), `/work/[slug]` (every published case study)
- Each entry: `loc`, `lastModified` (from MDX frontmatter date), `changeFrequency`, `priority`
- Hosted at `https://spacecadet.io/sitemap.xml`

### robots.txt

- Generate via Next.js's `robots.ts` convention
- Allow: `User-agent: *`, `Disallow: /api`
- Reference sitemap: `Sitemap: https://spacecadet.io/sitemap.xml`
- Hosted at `https://spacecadet.io/robots.txt`

### Dynamic OG images (`next/og`)

- One reusable OG template route handler at `/og` (or `/[...slug]/opengraph-image.tsx` per Next.js convention)
- Renders 1200×630 PNG via `ImageResponse`
- Layout: warm dark background + ember accent + page-specific title + Spacecadet wordmark
- Per-route variation:
  - **Marketing pages** (Home, Capabilities, Approach, About, Contact): static OG images (kept from #24) — these are stable and don't need dynamic generation
  - **Insights posts** (`/insights/[slug]`): dynamic OG with post title + post date + Spacecadet wordmark
  - **Case studies** (`/work/[slug]`): dynamic OG with case study title + client name + capability tag + Spacecadet wordmark
- Caching: `Content-Type: image/png` with `Cache-Control: public, max-age=31536000, immutable` (one year — change content = change URL)

## Acceptance criteria

- [ ] `https://spacecadet.io/sitemap.xml` returns valid XML with all routes (static + dynamic) listed
- [ ] Each sitemap entry has `lastModified`, `changeFrequency`, `priority`
- [ ] `https://spacecadet.io/robots.txt` returns the expected directives
- [ ] Sitemap and robots both reference the production domain
- [ ] Dynamic OG image route renders 1200×630 PNG for any Insights post
- [ ] Dynamic OG image route renders 1200×630 PNG for any case study
- [ ] Each Insights post's `openGraph.images` now points to its dynamic OG URL (replacing the generic static one from #24)
- [ ] Each case study's `openGraph.images` now points to its dynamic OG URL
- [ ] OG images render correctly in Twitter Card Validator, LinkedIn Post Inspector, Slack link unfurl
- [ ] OG image PNGs cached aggressively in production
- [ ] Sitemap regenerates on each build (verified by adding a post and rebuilding)

## Blocked by

- #24
