# 31 — Real Insights seed posts (launch blocker)

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Replace the placeholder Insights post from #18 with 6 real seed posts. **This is a hard launch blocker — the site cannot ship to production with fewer than 3 posts on Insights**, and the locked commitment is to launch with 6.

Per the PRD's locked Insights direction:
- 1,500–2,500 words each
- Long-form, opinionated, first-person plural ("we" voice)
- Written from real client experience or real technical experimentation, not summarizing news
- Each ends with a soft CTA: "Working on something like this? Let's talk." → `/contact`
- No subscribe interrupters, no in-article ads
- Most recent post dated within 2 weeks of public launch
- After launch: sustaining cadence of 2 posts/month minimum

Recommended seed topics (from the PRD grilling — adjust based on real expertise):

1. **"The build-vs-buy question every AI buyer should run before talking to a studio"** — articulates Spacecadet's own filtering logic publicly; attracts the right buyers and screens out the wrong ones
2. **"Why we build evals before features in AI projects"** — technical credibility + states a POV
3. **"What custom AI products cost, and what they're worth"** — addresses the unspoken pricing question; positions $25k floor as informed not arbitrary
4. **"RAG isn't enough: when proprietary data needs more than retrieval"** — technical specificity, AEO bait, signals shipped experience
5. **"How we run a 2-week Discovery sprint"** — process-as-content; doubles as a sales asset
6. **"Three AI integrations we wouldn't build, and what we'd build instead"** — opinionated, distinctive, demonstrates judgment

Each post requires:
- Frontmatter (`title`, `slug`, `date`, `summary` 1–2 sentences, `tags`, `readingTimeMinutes`, `draft: false`)
- Body content as MDX with appropriate use of:
  - Code blocks (where technical)
  - Inline images / diagrams (where they reinforce a point — not decorative)
  - Internal links to other Spacecadet pages where relevant
  - External links to source material with `rel="noopener noreferrer"`
- Bottom-of-post soft CTA

Quality bar (non-negotiable):
- Reads as Richard's actual thinking, not generic AI commentary
- Has at least one strong opinion that not every studio would say
- If technical, has at least one concrete example (snippet, diagram, or real-world scenario from work)
- Avoids generic AI buzzwords ("revolutionary," "transformation," "leverage")

## Acceptance criteria

- [ ] 6 real Insights MDX files in `app/insights/` with `draft: false`
- [ ] Most recent post dated within 2 weeks of intended launch
- [ ] All posts have complete frontmatter (title, slug, date, summary, tags, readingTimeMinutes)
- [ ] All posts are 1,500–2,500 words
- [ ] All posts written first-person plural
- [ ] All posts end with the soft CTA to `/contact`
- [ ] No posts contain subscribe-popup, ads, or in-article interrupters
- [ ] No posts contain placeholder content
- [ ] Placeholder post from #18 (`placeholder-test-post.mdx`) is removed
- [ ] `/insights` index lists all 6 in date-desc order
- [ ] Each individual post route renders without errors
- [ ] All posts pass through the SEO module (per-route metadata + JSON-LD Article structured data)

## Blocked by

- #18
