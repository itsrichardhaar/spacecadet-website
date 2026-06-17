# 30 — Real case study content (launch blocker)

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Replace the 3 placeholder case studies from #19 with 3 real client case studies. **This is a hard launch blocker per the PRD — the site cannot ship to production with placeholder case studies.**

Content scope (per the locked case study template):

For each of the 3 case studies, produce:

1. **Cover image** — real client product screenshot (preferred) or anonymized abstraction with client consent
2. **Detail image** — for hover swap on Work tiles
3. **Frontmatter:**
   - `title` — descriptive (e.g., "Replacing a $X/yr vendor with a custom RAG agent")
   - `client` — real name (with permission) or industry descriptor ("A Series-A logistics startup")
   - `capability` — one of the four (must match capability data ids)
   - `year`, `industry`, `engagementLength`, `teamSize`
   - `metrics` — 3 real metrics with `label` + `value` (e.g., `{ label: "Annual SaaS spend replaced", value: "$84K" }`)
   - `techStack` — real list of models / infrastructure / key libraries used
4. **Body content** (MDX):
   - **Problem** (2–3 paragraphs) — the client's pre-Spacecadet situation, what they tried, why off-the-shelf wasn't viable
   - **What we built** (2–4 paragraphs + 2–4 product screenshots / diagrams)
   - **Approach / phases** (phase-by-phase breakdown specific to this engagement)
   - **Outcome** (2–3 paragraphs alongside the 3 metrics from frontmatter)
   - **Client quote** — pulled from a real technical buyer (CTO / founder), with their name + title

Coverage requirement (3 case studies, one per capability):
1. **Custom AI Products** — a net-new build
2. **AI Integrations** — an integration into existing software (ideally one that replaced a vendor SaaS)
3. **Intelligent Agents & Automation** — an agentic workflow / automation

Quality bar (non-negotiable for launch):
- Real client name (or honest anonymization with industry context)
- Real metrics, real screenshots
- Real quote from a technical buyer
- Honest about scope and outcome — no overclaiming
- Tech stack is specific (model names, framework names, infrastructure choices)
- Each case study reads as a 5–8 minute case study, not a 1-minute summary

NDA handling:
- If a client cannot be named publicly, use industry-descriptor anonymization ("A Series-A B2B fintech startup") — but the screenshots and metrics still need to be real or close-to-real (e.g., blur sensitive fields rather than removing screenshots entirely)
- If no client engagement can be told honestly: replace that capability's placeholder with an "AI-adjacent" engagement framed transparently OR remove the capability's tile from the launch grid and add it later

## Acceptance criteria

- [ ] 3 real case study MDX files in `app/work/` with `draft: false` (none have `draft: true`)
- [ ] 1 case study per non-Strategy capability (Custom AI Product / AI Integration / Intelligent Agent)
- [ ] Each case study has all required frontmatter fields populated with real values
- [ ] Each case study body has all 4 narrative sections (Problem / What we built / Approach / Outcome)
- [ ] Each case study has 3 real metrics with `label` + `value`
- [ ] Each case study has a real client quote with name + title
- [ ] Each case study has at least 1 cover image + 2 product screenshots / diagrams (real or honestly anonymized)
- [ ] Each case study has a `detailImage` for hover swap on Work tiles
- [ ] All 3 placeholder MDX files from #19 are removed
- [ ] Visually verified on `/work` index and `/work/[slug]` for each
- [ ] No remaining "placeholder" / "Lorem ipsum" content anywhere in the case studies
- [ ] Client consent confirmed for all named clients (HITL — Richard's responsibility)

## Blocked by

- #19
