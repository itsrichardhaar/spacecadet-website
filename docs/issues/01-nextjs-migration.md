# 01 — Next.js 15 migration on Vercel

**Type:** HITL
**Label:** ready-for-agent
**Source PRD:** `docs/prd/redesign-2026.md`

## What to build

Migrate the project from Create React App (`react-scripts`) to Next.js 15 using the App Router, hosted on Vercel. All existing pages (Home, About, Solutions, Pricing, Contact) port over and render identically to today — no visual changes, no content changes. This slice exists to prove the build / deploy pipeline works on the new stack so every subsequent slice has a foundation.

In scope:
- New Next.js 15 App Router project structure (`app/` directory, route segments per existing page)
- TypeScript upgraded from 4.9 to 5.x
- Existing CSS-based styling preserved (do not refactor to CSS modules / Tailwind yet — token work happens in #02)
- Existing `useInView` hook ported as-is (will be replaced in #05)
- `BrowserRouter` removed; routes handled by App Router conventions
- Vercel project created and connected to the repo
- `react-scripts` and CRA-related config removed
- Unused MUI / emotion dependencies dropped: `@mui/material`, `@emotion/react`, `@emotion/styled` (leave `@mui/icons-material` for now — replaced in #02)
- README updated with new dev / build commands

Out of scope: any visual changes, any new pages, any motion changes, design token work (#02), font changes, MDX setup (#17).

## Acceptance criteria

- [ ] `pnpm dev` (or `npm run dev`) runs Next.js dev server locally
- [ ] `pnpm build` produces a clean production build with no warnings
- [ ] All five existing routes (`/`, `/about`, `/solutions`, `/contact`, `/pricing`) render and look visually identical to the current site
- [ ] Vercel deployment succeeds and serves a preview URL
- [ ] TypeScript compiles on TS 5.x with no errors
- [ ] `@mui/material`, `@emotion/react`, `@emotion/styled` removed from `package.json`
- [ ] `react-scripts` removed from `package.json`
- [ ] `BrowserRouter` removed; React Router DOM dependency removed if no longer used
- [ ] README documents new dev / build / deploy commands

## Blocked by

None — can start immediately.
