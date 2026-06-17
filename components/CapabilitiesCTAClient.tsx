'use client';

import Button from '@/components/Button';
import { RevealText } from '@/hooks/motionPrimitives';

export default function CapabilitiesCTAClient() {
  return (
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
  );
}
