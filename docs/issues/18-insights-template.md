# 18 — Insights index + post template + 1 placeholder post

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

The full Insights infrastructure: a listing page at `/insights` and a detail page at `/insights/[slug]`. One placeholder MDX post lives in `app/insights/` to verify the template works end-to-end. Real seed posts are added in #31.

`/insights` index page:
- Hero: eyebrow ("Insights") + H1 ("Writing on AI products" or similar) + 1-line subhead
- List of all posts (read via `getInsightsPosts()` from #17), sorted by date desc
- Each list entry: date, title, summary, reading time, "Read →" link
- No featured-post tile here — clean list, equal weight
- Per the locked Insights direction: no subscribe-popup, no interrupters, no sidebar; bottom of page links to RSS feed only (RSS in scope as a small extra)

`/insights/[slug]` post template:
- Header block: post title (large), date, reading time, optional tag list
- Body: rendered MDX with code blocks highlighted via `rehype-shiki` (warm theme matching the ember palette)
- Inline elements supported: paragraphs, headings, lists, blockquotes, images, code blocks, code inline, internal links
- Bottom of post: "Continue reading" panel — 2 next-posts (or just one if newest), then a soft CTA: "Working on something like this? Let's talk." → `/contact`
- Reading width capped at ~720px for long-form readability
- No subscribe-popup, no sticky CTA, no in-article interrupters

Motion:
- Index list: stagger fade-up on scroll-in, underline draws in on title hover
- Post template: H1 char-by-char reveal on initial load; body line-by-line reveal as it scrolls in (gentle — long-form should feel calm, not animated-at)
- Mobile / reduced-motion: simple fade

Placeholder post:
- Single MDX file at `app/insights/placeholder-test-post.mdx` with realistic frontmatter (date set to "today" for development) and ~500 words of representative content (paragraphs, a code block, a list, an image embed) so the template can be visually verified
- Mark this post as `draft: true` so it doesn't leak to production until #31 swaps in real content

## Acceptance criteria

- [ ] `/insights` route renders the index page
- [ ] `/insights/[slug]` route renders a post detail page via MDX
- [ ] Index reads from `getInsightsPosts()` and sorts by date desc
- [ ] Placeholder post exists at `app/insights/placeholder-test-post.mdx` with `draft: true`
- [ ] Code blocks highlighted via `rehype-shiki` with warm theme
- [ ] Bottom of post shows next-post panel + soft CTA to `/contact`
- [ ] No subscribe-popup or sticky interrupter on either page
- [ ] RSS feed available at `/insights/feed.xml` (basic implementation; cover the locked-in placeholder + future posts)
- [ ] Motion vocabulary applied (gentle for long-form)
- [ ] Mobile / reduced-motion fallbacks verified
- [ ] Lighthouse perf > 95 desktop, > 85 mobile on both routes
- [ ] Reading-time computed correctly (verify against placeholder content)

## Blocked by

- #17
