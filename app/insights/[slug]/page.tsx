/**
 * /insights/[slug] — Insights post detail page.
 *
 * Server Component: reads the MDX file via getInsightsPost(), compiles
 * it through next-mdx-remote/rsc with rehype-pretty-code for syntax
 * highlighting, and renders inside a long-form typographic frame.
 *
 * The H1 char-by-char reveal is delegated to InsightsAnimatedTitle
 * (client). Body content stays static so reading feels calm — the
 * PRD reserves heavier choreography for cinematic moments.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import Button from '@/components/Button';
import InsightsAnimatedTitle from '@/components/InsightsAnimatedTitle';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import { getInsightsPost, getInsightsPosts } from '@/lib/content/insights';
import '../insights.css';
import './post.css';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getInsightsPosts({ includeDrafts: true }).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightsPost(slug);
  if (!post) return { title: 'Not found — Spacecadet' };
  return {
    title: `${post.title} — Spacecadet Insights`,
    description: post.summary,
  };
}

export default async function InsightsPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getInsightsPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'vesper',
              keepBackground: true,
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  // Related posts: 2 nearest neighbors in date order (newer first,
  // falling back to older if the current post is the newest).
  const allPosts = getInsightsPosts({ includeDrafts: true });
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const newer = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const older =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;
  const related = [newer, older].filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <article className="insights-post">
      <header className="insights-post__header">
        <div className="insights-post__header-inner">
          <p className="section-eyebrow">Insights</p>
          <InsightsAnimatedTitle>{post.title}</InsightsAnimatedTitle>
          <div className="insights-post__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="insights-post__meta-dot" aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
            {post.draft && (
              <>
                <span className="insights-post__meta-dot" aria-hidden="true">·</span>
                <span className="insights-post__draft">Draft</span>
              </>
            )}
          </div>
          {post.tags.length > 0 && (
            <ul className="insights-post__tags">
              {post.tags.map((tag) => (
                <li key={tag} className="insights-post__tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="insights-post__body">
        <div className="insights-post__body-inner">{content}</div>
      </div>

      <footer className="insights-post__footer">
        <div className="insights-post__footer-inner">
          {related.length > 0 && (
            <div className="insights-post__related">
              <p className="section-eyebrow">Continue reading</p>
              <ul className="insights-post__related-list">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/insights/${p.slug}`}
                      className="insights-post__related-link"
                    >
                      <span className="insights-post__related-date">
                        {formatDate(p.date)}
                      </span>
                      <span className="insights-post__related-title">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="insights-post__cta">
            <h2 className="insights-post__cta-title">
              Working on something like this?
            </h2>
            <p className="insights-post__cta-sub">
              Book a 30-minute discovery call. We&apos;ll be honest about whether
              your project is the right shape for us.
            </p>
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </div>
      </footer>
    </article>
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
