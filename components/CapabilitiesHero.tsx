'use client';

import { RevealText } from '@/hooks/motionPrimitives';

export default function CapabilitiesHero() {
  return (
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
  );
}
