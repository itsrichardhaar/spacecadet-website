/**
 * Featured Insights fixture — temporary placeholder consumed by the Home
 * InsightsPreview section (#12).
 *
 * Replace this entire module with a live MDX query when issue #18 lands
 * the real Insights infrastructure. The consuming component reads from
 * `featuredInsights` directly, so the swap is a single-file change:
 *
 *   import { getInsightsPosts } from '@/lib/insights';
 *   const featuredInsights = getInsightsPosts().slice(0, 3);
 *
 * Entries are pre-sorted by date desc (most recent first). Three entries
 * is the lock count for the Home preview.
 */

export interface FeaturedInsight {
  slug: string;
  title: string;
  /** 1–2 sentence summary shown on the Home tile. */
  summary: string;
  /** ISO YYYY-MM-DD. Rendered in the tile and used for sort order. */
  date: string;
  /** Estimated reading time in minutes. */
  readingTimeMinutes: number;
}

export const featuredInsights: readonly FeaturedInsight[] = [
  {
    slug: 'build-vs-buy-ai',
    title: 'The build-vs-buy question every AI buyer should run before talking to a studio',
    summary:
      'A short framework for deciding when a custom AI build is justified — and when off-the-shelf SaaS is the right answer.',
    date: '2026-06-10',
    readingTimeMinutes: 8,
  },
  {
    slug: 'evals-before-features',
    title: 'Why we build evals before features in AI projects',
    summary:
      'Models that ship without evals fail silently in production. Here is what we measure first, and why it changes the build order.',
    date: '2026-05-26',
    readingTimeMinutes: 11,
  },
  {
    slug: 'what-custom-ai-costs',
    title: 'What custom AI products cost, and what they are worth',
    summary:
      'A candid breakdown of where the money goes on a typical AI build — and which line items return real ownership versus rented value.',
    date: '2026-05-12',
    readingTimeMinutes: 9,
  },
];
