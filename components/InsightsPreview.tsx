'use client';

/**
 * Home page "Insights" preview (section 6).
 *
 * Three most-recent posts in a row, each linking to /insights/[slug].
 * Reads from a placeholder fixture until #18 lands the MDX
 * infrastructure; swap is a single-file change.
 *
 * Tile contents: date (small, muted) + title + 1–2 sentence summary +
 * reading time. Title underline draws in on hover (desktop only); tile
 * lifts 3px on hover. No subscribe interrupters, no popups.
 */
import Link from 'next/link';
import { featuredInsights, type FeaturedInsight } from '@/lib/featuredInsights';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './InsightsPreview.css';

export default function InsightsPreview() {
  if (featuredInsights.length === 0) return null;

  return (
    <section className="insights-preview">
      <div className="insights-preview__inner">
        <header className="insights-preview__header">
          <p className="section-eyebrow">Insights</p>
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="section-title"
          >
            Recent writing
          </RevealText>
        </header>

        <div className="insights-preview__grid">
          {featuredInsights.map((post, i) => (
            <PostTile key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="insights-preview__cta">
          <Link href="/insights" className="insights-preview__cta-link">
            See all writing
            <span aria-hidden="true" className="insights-preview__cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostTile({ post, index }: { post: FeaturedInsight; index: number }) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 28,
    scale: 0.97,
    delay: index * 0.08,
    duration: 0.6,
  });

  const dateDisplay = formatDate(post.date);

  return (
    <Link
      ref={ref}
      href={`/insights/${post.slug}`}
      className="insights-preview__tile"
    >
      <div className="insights-preview__meta">
        <time className="insights-preview__date" dateTime={post.date}>
          {dateDisplay}
        </time>
        <span className="insights-preview__dot" aria-hidden="true">·</span>
        <span className="insights-preview__reading">
          {post.readingTimeMinutes} min read
        </span>
      </div>
      <h3 className="insights-preview__title">{post.title}</h3>
      <p className="insights-preview__summary">{post.summary}</p>
      <span className="insights-preview__read-more" aria-hidden="true">
        Read →
      </span>
    </Link>
  );
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
