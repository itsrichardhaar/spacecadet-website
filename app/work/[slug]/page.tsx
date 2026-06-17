/**
 * /work/[slug] — case study detail page.
 *
 * Server Component. Reads the MDX via getCaseStudy(), compiles it
 * with next-mdx-remote, renders the locked layout:
 *   1. Cover hero (parallax via client wrapper)
 *   2. At-a-glance bar
 *   3-5,8. MDX body (Problem, What we built, Approach, embedded Quote)
 *   6. Outcome metrics (count-up via client wrapper)
 *   7. Tech stack callout
 *   9. Up-next + CTA
 *
 * Static params are pre-rendered at build time including drafts so
 * the placeholder URLs work in dev. Real production listing of
 * drafts is governed by getCaseStudies (excludes drafts in prod).
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
import CaseStudyCover from '@/components/work/CaseStudyCover';
import MetricCountUp from '@/components/work/MetricCountUp';
import { capabilities } from '@/lib/capabilities';
import { getCaseStudies, getCaseStudy } from '@/lib/content/work';
import './case-study.css';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCaseStudies({ includeDrafts: true }).map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Not found — Spacecadet' };
  return {
    title: `${study.title} — Spacecadet Work`,
    description: `${study.client} · ${study.industry} · ${study.engagementLength}`,
  };
}

function capabilityName(id: string): string {
  return capabilities.find((c) => c.id === id)?.name ?? id;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { content } = await compileMDX({
    source: study.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'vesper', keepBackground: true }]],
      },
    },
    components: mdxComponents,
  });

  // Up-next: 2 most-recent other studies (any capability, drafts included
  // for dev). Avoid showing the current study.
  const upNext = getCaseStudies({ includeDrafts: true })
    .filter((s) => s.slug !== study.slug)
    .slice(0, 2);

  return (
    <article className="case-study">
      <CaseStudyCover coverImage={study.coverImage} alt={`${study.title} cover`} />

      <header className="case-study__header">
        <div className="case-study__header-inner">
          <p className="section-eyebrow">
            <span className="case-study__capability-tag">
              {capabilityName(study.capability)}
            </span>
            <span className="case-study__client" aria-label="Client">
              {study.client}
            </span>
          </p>
          <InsightsAnimatedTitle>{study.title}</InsightsAnimatedTitle>
        </div>
      </header>

      <section className="case-study__glance" aria-label="At a glance">
        <div className="case-study__glance-inner">
          <GlanceItem label="Industry" value={study.industry} />
          <GlanceItem label="Engagement" value={study.engagementLength} />
          <GlanceItem label="Capability" value={capabilityName(study.capability)} />
          <GlanceItem label="Team size" value={`${study.teamSize}`} />
          <GlanceItem label="Year" value={`${study.year}`} />
        </div>
      </section>

      <section className="case-study__body">
        <div className="case-study__body-inner">{content}</div>
      </section>

      <section className="case-study__outcome" aria-label="Outcome">
        <div className="case-study__outcome-inner">
          <p className="section-eyebrow">Outcome</p>
          <ul className="case-study__metrics">
            {study.metrics.map((metric) => (
              <li key={metric.label} className="case-study__metric">
                <span className="case-study__metric-value">
                  <MetricCountUp value={metric.value} />
                </span>
                <span className="case-study__metric-label">{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-study__stack" aria-label="Tech stack">
        <div className="case-study__stack-inner">
          <p className="section-eyebrow">Tech stack</p>
          <ul className="case-study__stack-list">
            {study.techStack.map((tech) => (
              <li key={tech} className="case-study__stack-item">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="case-study__footer">
        <div className="case-study__footer-inner">
          {upNext.length > 0 && (
            <div className="case-study__up-next">
              <p className="section-eyebrow">Up next</p>
              <div className="case-study__up-next-grid">
                {upNext.map((next) => (
                  <Link
                    key={next.slug}
                    href={`/work/${next.slug}`}
                    className="case-study__up-next-tile"
                    style={
                      {
                        backgroundImage: `url(${next.coverImage})`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="case-study__up-next-overlay" aria-hidden="true" />
                    <span className="case-study__up-next-tag">
                      {capabilityName(next.capability)}
                    </span>
                    <h3 className="case-study__up-next-title">{next.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="case-study__cta">
            <h2 className="case-study__cta-title">
              Want to talk about a similar build?
            </h2>
            <p className="case-study__cta-sub">
              Book a 30-minute discovery call. We&apos;ll be honest about
              whether your project is the right shape for us.
            </p>
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </div>
      </footer>
    </article>
  );
}

function GlanceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="case-study__glance-item">
      <span className="case-study__glance-label">{label}</span>
      <span className="case-study__glance-value">{value}</span>
    </div>
  );
}
