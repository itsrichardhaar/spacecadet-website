# 25 — JSON-LD structured data

**Type:** AFK
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Schema.org structured data (JSON-LD) embedded in every page, so search engines (Google) and AI search engines (Perplexity, ChatGPT search, Claude search) can cite Spacecadet accurately and present rich results.

JSON-LD shapes required:

1. **`Organization`** — on every page (in the root layout):
   - `@type: Organization`
   - `name: "Spacecadet"`
   - `url: "https://spacecadet.io"`
   - `logo: "https://spacecadet.io/logo.png"`
   - `description` — the locked sub-H1 (matches the Hero subhead phrasing)
   - `sameAs` — LinkedIn URL (+ GitHub if configured)
   - `address` — Raleigh, North Carolina

2. **`Service`** (one per capability) — embedded on `/capabilities` and on each capability section anchor:
   - `@type: Service`
   - `name: "Custom AI Products"` (etc.)
   - `description` — capability's PRD description
   - `provider: { @type: "Organization", name: "Spacecadet" }`
   - `serviceType: "AI product development"` (or specific to each capability)

3. **`Article`** (one per Insights post) — embedded on each `/insights/[slug]`:
   - `@type: Article`
   - `headline` — post title
   - `description` — post summary
   - `datePublished` — post date
   - `author: { @type: "Organization", name: "Spacecadet" }`
   - `publisher: { @type: "Organization", name: "Spacecadet", logo: { ... } }`
   - `image` — post cover image
   - `articleBody` — first 1000 chars of post content

4. **`CreativeWork`** (one per case study) — embedded on each `/work/[slug]`:
   - `@type: CreativeWork`
   - `name` — case study title
   - `description` — case study summary
   - `creator: { @type: "Organization", name: "Spacecadet" }`
   - `dateCreated` — case study year
   - `about` — the capability tag
   - `image` — cover image

5. **`BreadcrumbList`** — on every non-root page:
   - Breadcrumb trail (e.g., Home → Insights → Post Title)

Implementation:
- Create a single SEO module that exports JSON-LD generator functions
- Inject `<script type="application/ld+json">` per route via `generateMetadata` or a `Layout` segment
- Validate every generated JSON-LD against schema.org's validator (or use `schema-dts` for compile-time type safety)

Unit tests required:
- `Organization` shape matches schema.org spec
- `Service` shape correctly references each capability
- `Article` shape for a fixture Insights post
- `CreativeWork` shape for a fixture case study
- `BreadcrumbList` generates correct trail for nested routes

## Acceptance criteria

- [ ] SEO module exports generator functions for Organization / Service / Article / CreativeWork / BreadcrumbList
- [ ] Every page contains an `Organization` JSON-LD block (via root layout)
- [ ] `/capabilities` contains 4 `Service` JSON-LD blocks (one per capability)
- [ ] Every `/insights/[slug]` contains an `Article` JSON-LD block sourced from frontmatter
- [ ] Every `/work/[slug]` contains a `CreativeWork` JSON-LD block sourced from frontmatter
- [ ] Every non-root page contains a `BreadcrumbList` JSON-LD block with correct trail
- [ ] All JSON-LD validates against Google's Rich Results Test for each route type
- [ ] Unit tests pass for all generator functions
- [ ] Each JSON-LD block is rendered in HTML at SSR time (verify via view-source)

## Blocked by

- #24
