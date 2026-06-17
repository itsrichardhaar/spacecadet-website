'use client';

/**
 * Client wrapper for a single section on /capabilities. Holds the
 * useScrollReveal that fades the diagram in; the parent page can stay
 * a Server Component (needed for the case-study MDX query).
 */
import Link from 'next/link';
import { CapabilityDiagram } from '@/components/diagrams/CapabilityDiagrams';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import type { Capability } from '@/lib/capabilities';

export interface RelatedCaseStudy {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
}

interface CapabilitySectionClientProps {
  cap: Capability;
  index: number;
  related: RelatedCaseStudy[];
}

export default function CapabilitySectionClient({
  cap,
  index,
  related,
}: CapabilitySectionClientProps) {
  const diagramRef = useScrollReveal<HTMLDivElement>({
    y: 16,
    scale: 0.98,
    delay: 0.15,
    duration: 0.7,
  });

  return (
    <section id={cap.id} className="capability-section">
      <div className="capability-section__inner">
        <div className="capability-section__head">
          <span className="capability-section__index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="capability-section__name"
          >
            {cap.name}
          </RevealText>
        </div>

        <div className="capability-section__body">
          <div className="capability-section__copy">
            <p className="capability-section__summary">{cap.summary}</p>
            <p className="capability-section__description">{cap.description}</p>

            <dl className="capability-section__shape">
              <div className="capability-section__shape-row">
                <dt>Duration</dt>
                <dd>{cap.engagementShape.duration}</dd>
              </div>
              <div className="capability-section__shape-row">
                <dt>Deliverable</dt>
                <dd>{cap.engagementShape.deliverable}</dd>
              </div>
              <div className="capability-section__shape-row">
                <dt>Ownership</dt>
                <dd>{cap.engagementShape.ipNote}</dd>
              </div>
            </dl>

            <p className="capability-section__buyer">
              <span className="capability-section__buyer-label">Who lands here</span>
              <span>{cap.buyer}</span>
            </p>
          </div>

          <div ref={diagramRef} className="capability-section__diagram-wrap">
            <CapabilityDiagram
              id={cap.id}
              className="capability-section__diagram"
            />
          </div>
        </div>

        {related.length > 0 && (
          <div className="capability-section__work">
            <p className="capability-section__work-label">
              Recent work in this capability
            </p>
            <div className="capability-section__work-grid">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="capability-section__work-tile"
                >
                  <div
                    className="capability-section__work-cover"
                    style={{
                      backgroundImage: `url(${item.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="capability-section__work-body">
                    <h3 className="capability-section__work-title">{item.title}</h3>
                    <p className="capability-section__work-summary">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
