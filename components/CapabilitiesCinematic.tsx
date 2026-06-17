'use client';

/**
 * Home page Capabilities section.
 *
 * The original #08 build was a ScrollTrigger-pinned timeline that
 * progressively brought each tile into focus across two viewport
 * heights. In production that scrolled noticeably less smoothly than
 * the rest of the page, so the pin + scrub + sequential focus
 * rotation was retired. The section now uses the same lightweight
 * stagger fade-up the other Home sections do.
 *
 * Tiles are sourced from lib/capabilities — no duplicated literals.
 * Each links through to /capabilities#<id>.
 */
import Link from 'next/link';
import { capabilities } from '@/lib/capabilities';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './CapabilitiesCinematic.css';

export default function CapabilitiesCinematic() {
  return (
    <section className="capabilities-cinematic">
      <div className="capabilities-cinematic__inner">
        <header className="capabilities-cinematic__header">
          <p className="section-eyebrow">What we build</p>
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="section-title"
          >
            Four kinds of AI work
          </RevealText>
        </header>
        <div className="capabilities-cinematic__grid">
          {capabilities.map((cap, i) => (
            <CapabilityTile key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityTile({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 24,
    scale: 0.98,
    delay: index * 0.08,
    duration: 0.55,
  });
  return (
    <Link
      ref={ref}
      href={`/capabilities#${cap.id}`}
      className="capability-tile capability-tile__link"
    >
      <span className="capability-tile__index">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="capability-tile__name">{cap.name}</h3>
      <p className="capability-tile__summary">{cap.summary}</p>
      <span className="capability-tile__cta">See more →</span>
    </Link>
  );
}
