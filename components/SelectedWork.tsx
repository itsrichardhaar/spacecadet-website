'use client';

/**
 * Home page "Selected work" section.
 *
 * 2–3 featured case-study tiles linking through to /work/[slug]. Each tile:
 * - Cover gradient that swaps to a detail gradient on hover (desktop only)
 * - Capability tag pill sourced from lib/capabilities (no duplicated literals)
 * - Title with an underline that draws in on hover
 * - Tile lifts ~4px on hover
 *
 * Entrance: stagger fade-up + slight scale on scroll-into-view via
 * useScrollReveal. Mobile / reduced-motion: collapses to simple fade-up via
 * the motion gates inside useScrollReveal.
 *
 * Until #19 ships the real Work MDX infrastructure, this reads from the
 * lib/featuredWork placeholder fixture. Swap is a single-file change.
 */
import Link from 'next/link';
import { capabilities } from '@/lib/capabilities';
import { featuredWork, type FeaturedWorkItem } from '@/lib/featuredWork';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './SelectedWork.css';

export default function SelectedWork() {
  if (featuredWork.length === 0) return null;

  return (
    <section className="selected-work">
      <div className="selected-work__inner">
        <header className="selected-work__header">
          <p className="section-eyebrow">Selected work</p>
          <RevealText as="h2" unit="word" stagger={60} className="section-title">
            Recent builds
          </RevealText>
        </header>

        <div className="selected-work__grid">
          {featuredWork.map((item, i) => (
            <Tile key={item.slug} item={item} index={i} />
          ))}
        </div>

        <div className="selected-work__cta">
          <Link href="/work" className="selected-work__cta-link">
            See all work
            <span aria-hidden="true" className="selected-work__cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({ item, index }: { item: FeaturedWorkItem; index: number }) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 28,
    scale: 0.97,
    delay: index * 0.08,
    duration: 0.6,
  });
  const capabilityName = capabilities.find((c) => c.id === item.capability)?.name;

  return (
    <Link
      ref={ref}
      href={`/work/${item.slug}`}
      className="selected-work__tile"
      style={
        {
          '--cover-grad': item.coverGradient,
          '--detail-grad': item.detailGradient,
        } as React.CSSProperties
      }
    >
      <div className="selected-work__cover">
        <span className="selected-work__cover-detail" aria-hidden="true" />
      </div>
      <div className="selected-work__body">
        {capabilityName && (
          <span className="selected-work__tag">{capabilityName}</span>
        )}
        <h3 className="selected-work__title">{item.title}</h3>
        <p className="selected-work__summary">{item.summary}</p>
        <span className="selected-work__year" aria-hidden="true">
          {item.year}
        </span>
      </div>
    </Link>
  );
}
