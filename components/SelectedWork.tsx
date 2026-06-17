'use client';

/**
 * Home page "Selected work" section.
 *
 * Reads case studies as a prop (fetched server-side via getCaseStudies
 * in the parent server page) and renders them as 2–3 featured tiles.
 *
 * The fixture from #10 (lib/featuredWork) is retired; data now flows
 * from MDX via lib/content/work.
 *
 * Each tile:
 * - cover image that swaps to a detail image on hover (desktop only)
 * - capability tag pill sourced from lib/capabilities
 * - title with underline draw-in on hover
 * - 4px tile lift on hover
 *
 * Entrance: stagger fade-up + slight scale via useScrollReveal.
 * Mobile / reduced-motion: simple fade-up via the motion gates inside
 * useScrollReveal.
 */
import Link from 'next/link';
import { capabilities } from '@/lib/capabilities';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './SelectedWork.css';

export interface SelectedWorkEntry {
  slug: string;
  title: string;
  summary: string;
  capabilityId: string;
  year: number;
  coverImage: string;
  detailImage?: string;
}

interface SelectedWorkProps {
  studies: SelectedWorkEntry[];
}

export default function SelectedWork({ studies }: SelectedWorkProps) {
  if (studies.length === 0) return null;

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
          {studies.map((entry, i) => (
            <Tile key={entry.slug} entry={entry} index={i} />
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

function Tile({ entry, index }: { entry: SelectedWorkEntry; index: number }) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 28,
    scale: 0.97,
    delay: index * 0.08,
    duration: 0.6,
  });
  const capabilityName =
    capabilities.find((c) => c.id === entry.capabilityId)?.name ?? entry.capabilityId;

  return (
    <Link
      ref={ref}
      href={`/work/${entry.slug}`}
      className="selected-work__tile"
    >
      <div className="selected-work__cover">
        <div
          className="selected-work__cover-image"
          style={{ backgroundImage: `url(${entry.coverImage})` }}
        />
        {entry.detailImage && (
          <div
            className="selected-work__cover-detail"
            style={{ backgroundImage: `url(${entry.detailImage})` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="selected-work__body">
        <span className="selected-work__tag">{capabilityName}</span>
        <h3 className="selected-work__title">{entry.title}</h3>
        <p className="selected-work__summary">{entry.summary}</p>
        <span className="selected-work__year" aria-hidden="true">
          {entry.year}
        </span>
      </div>
    </Link>
  );
}
