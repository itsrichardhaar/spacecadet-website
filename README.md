# Spacecadet

Spacecadet's website, built with [Next.js 15](https://nextjs.org) (App Router) on the Vercel deployment platform.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Project structure

```
app/          - Next.js App Router routes (layout, page, route segments)
components/   - Shared React components (Navbar, Footer, ScrollToTop, LogoMark)
hooks/        - Shared hooks (useInView)
public/       - Static assets served at the root URL
docs/         - PRD and issue documents for the 2026 redesign
```

## Redesign in flight

This codebase is currently being redesigned per `docs/prd/redesign-2026.md` and the issues in `docs/issues/`. Sequence and scope are documented there.
