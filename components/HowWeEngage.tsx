'use client';

/**
 * Home page "How we engage" snippet (section 5).
 *
 * Compact preview of the three engagement models — names + short scope
 * only, NO price ranges (those live on /approach where they have
 * context). Each card deep-links to its anchor on /approach so buyers
 * can self-qualify into the right scope before booking a call.
 *
 * Data is sourced from lib/engagementModels, which is also the single
 * source of truth for the upcoming /approach page (#15).
 */
import Link from 'next/link';
import { engagementModels } from '@/lib/engagementModels';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './HowWeEngage.css';

export default function HowWeEngage() {
  return (
    <section className="how-we-engage">
      <div className="how-we-engage__inner">
        <header className="how-we-engage__header">
          <p className="section-eyebrow">How we engage</p>
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="section-title"
          >
            Three ways to work with us
          </RevealText>
        </header>

        <div className="how-we-engage__grid">
          {engagementModels.map((model, i) => (
            <ModelCard
              key={model.id}
              id={model.id}
              name={model.name}
              shortScope={model.shortScope}
              index={i}
            />
          ))}
        </div>

        <div className="how-we-engage__cta">
          <Link href="/approach" className="how-we-engage__cta-link">
            See our full approach
            <span aria-hidden="true" className="how-we-engage__cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ModelCardProps {
  id: string;
  name: string;
  shortScope: string;
  index: number;
}

function ModelCard({ id, name, shortScope, index }: ModelCardProps) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 28,
    scale: 0.97,
    delay: index * 0.08,
    duration: 0.6,
  });

  return (
    <Link
      ref={ref}
      href={`/approach#${id}`}
      className="how-we-engage__card"
    >
      <span className="how-we-engage__chevron" aria-hidden="true">›</span>
      <h3 className="how-we-engage__card-name">{name}</h3>
      <p className="how-we-engage__card-scope">{shortScope}</p>
    </Link>
  );
}
