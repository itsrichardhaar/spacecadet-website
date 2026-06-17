'use client';

/**
 * /capabilities page (#14).
 *
 * Expands the four capabilities introduced by the Home cinematic (#08).
 * Each capability gets its own anchor-linked section with an
 * architectural SVG diagram, a longer description, the engagement
 * shape, and a "Recent work" tile when a placeholder case study
 * exists for that capability.
 *
 * Capability data sourced from lib/capabilities — no duplicated
 * literals. Case-study tiles read from lib/featuredWork until #19
 * lands the real Work MDX query.
 */
import Link from 'next/link';
import Button from '@/components/Button';
import { CapabilityDiagram } from '@/components/diagrams/CapabilityDiagrams';
import { capabilities, type Capability } from '@/lib/capabilities';
import { featuredWork } from '@/lib/featuredWork';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './capabilities.css';

export default function CapabilitiesPage() {
  return (
    <div className="capabilities-page">
      <section className="capabilities-hero">
        <div className="capabilities-hero__inner">
          <p className="section-eyebrow">Capabilities</p>
          <RevealText
            as="h1"
            unit="char"
            stagger={22}
            trigger="load"
            className="capabilities-hero__heading"
          >
            Everything we build, in detail
          </RevealText>
          <RevealText
            as="p"
            unit="word"
            stagger={60}
            delay={800}
            trigger="load"
            className="capabilities-hero__sub"
          >
            Four kinds of AI work, each with its own engagement shape. Pick the closest match — or book a discovery call and we&apos;ll help you figure it out.
          </RevealText>
        </div>
      </section>

      {capabilities.map((cap, index) => (
        <CapabilitySection key={cap.id} cap={cap} index={index} />
      ))}

      <section className="capabilities-cta">
        <div className="capabilities-cta__inner">
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="capabilities-cta__title"
          >
            Have a project that crosses categories?
          </RevealText>
          <p className="capabilities-cta__sub">
            Most real builds don&apos;t fit a single bucket. Let&apos;s talk it through.
          </p>
          <Button href="/contact">Book a discovery call</Button>
        </div>
      </section>
    </div>
  );
}

function CapabilitySection({ cap, index }: { cap: Capability; index: number }) {
  const relatedWork = featuredWork.filter((w) => w.capability === cap.id).slice(0, 2);
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

        {relatedWork.length > 0 && (
          <div className="capability-section__work">
            <p className="capability-section__work-label">Recent work in this capability</p>
            <div className="capability-section__work-grid">
              {relatedWork.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="capability-section__work-tile"
                  style={
                    {
                      '--cover-grad': item.coverGradient,
                    } as React.CSSProperties
                  }
                >
                  <div className="capability-section__work-cover" />
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
