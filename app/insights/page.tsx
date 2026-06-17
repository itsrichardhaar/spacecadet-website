/**
 * /insights — Insights index page.
 *
 * Server Component: reads posts via getInsightsPosts() and hands a
 * trimmed projection down to the client list for stagger reveals.
 * No featured tile, no subscribe popup, no sidebar — clean list per
 * the locked Insights direction.
 */
import type { Metadata } from 'next';
import InsightsIndexList from '@/components/InsightsIndexList';
import { getInsightsPosts } from '@/lib/content/insights';
import './insights.css';

export const metadata: Metadata = {
  title: 'Insights — Spacecadet',
  description:
    'Long-form writing on AI products — build vs buy, evals, ownership, and the engineering discipline that makes AI ship.',
};

export default function InsightsIndexPage() {
  const posts = getInsightsPosts();

  return (
    <div className="insights-index">
      <section className="insights-index__hero">
        <div className="insights-index__hero-inner">
          <p className="section-eyebrow">Insights</p>
          <h1 className="insights-index__heading">Writing on AI products</h1>
          <p className="insights-index__sub">
            Long-form notes from inside the studio — what we have learned
            building AI products that ship, own their data, and stay measurable
            after launch.
          </p>
        </div>
      </section>

      <section className="insights-index__body">
        <div className="insights-index__body-inner">
          {posts.length === 0 ? (
            <p className="insights-index__empty">
              No posts yet — the first seed posts arrive in #31. In the meantime,{' '}
              <a href="/insights/feed.xml" className="insights-index__rss">
                subscribe via RSS
              </a>
              .
            </p>
          ) : (
            <>
              <InsightsIndexList
                posts={posts.map((p) => ({
                  slug: p.slug,
                  title: p.title,
                  summary: p.summary,
                  date: p.date,
                  readingTimeMinutes: p.readingTimeMinutes,
                }))}
              />
              <p className="insights-index__rss-row">
                Prefer to follow along?{' '}
                <a href="/insights/feed.xml" className="insights-index__rss">
                  Subscribe via RSS
                </a>
                .
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
