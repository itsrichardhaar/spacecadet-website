/**
 * RSS 2.0 feed for /insights.
 *
 * Returns the same list getInsightsPosts() does (drafts excluded in
 * production). Re-generated at build time as part of the static
 * route; updates whenever a new MDX file is added to app/insights/.
 */
import { getInsightsPosts } from '@/lib/content/insights';

const SITE_URL = 'https://spacecadet.io';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getInsightsPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/insights/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Spacecadet Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Writing on AI products — build vs buy, evals, ownership, and the engineering discipline that makes AI ship.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
