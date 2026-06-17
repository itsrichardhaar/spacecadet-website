'use client';

/**
 * Client wrapper for the Insights index list. Each row gets a
 * staggered scroll-in reveal via useScrollReveal; the parent page
 * stays a Server Component so getInsightsPosts() can run in Node.
 */
import Link from 'next/link';
import type { InsightsPost } from '@/lib/content/schemas';
import { useScrollReveal } from '@/hooks/motionPrimitives';

interface InsightsIndexListProps {
  posts: Array<Pick<InsightsPost, 'slug' | 'title' | 'summary' | 'date' | 'readingTimeMinutes'>>;
}

export default function InsightsIndexList({ posts }: InsightsIndexListProps) {
  return (
    <ul className="insights-index__list">
      {posts.map((post, i) => (
        <IndexRow key={post.slug} post={post} index={i} />
      ))}
    </ul>
  );
}

function IndexRow({
  post,
  index,
}: {
  post: InsightsIndexListProps['posts'][number];
  index: number;
}) {
  const ref = useScrollReveal<HTMLLIElement>({
    y: 18,
    scale: 0.99,
    delay: index * 0.06,
    duration: 0.55,
  });

  return (
    <li ref={ref} className="insights-index__row">
      <Link href={`/insights/${post.slug}`} className="insights-index__link">
        <div className="insights-index__meta">
          <time className="insights-index__date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="insights-index__dot" aria-hidden="true">·</span>
          <span className="insights-index__reading">
            {post.readingTimeMinutes} min read
          </span>
        </div>
        <h2 className="insights-index__title">{post.title}</h2>
        <p className="insights-index__summary">{post.summary}</p>
        <span className="insights-index__cta" aria-hidden="true">Read →</span>
      </Link>
    </li>
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
