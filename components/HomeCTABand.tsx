'use client';

/**
 * Home CTA band — final conversion section. Client because of the
 * parallax on the background glow and the scale-fade on the button.
 */
import { useRef } from 'react';
import Button from '@/components/Button';
import { RevealText, useParallax, useScrollReveal } from '@/hooks/motionPrimitives';

export default function HomeCTABand() {
  const glowRef = useRef<HTMLDivElement>(null);
  useParallax(glowRef, 0.6);

  const buttonRef = useScrollReveal<HTMLDivElement>({
    y: 0,
    scale: 0.96,
    delay: 0.4,
    duration: 0.5,
  });

  return (
    <section className="cta-band">
      <div ref={glowRef} className="cta-band__glow" aria-hidden="true" />
      <div className="cta-band__inner">
        <p className="section-eyebrow cta-band__eyebrow">Get started</p>
        <RevealText as="h2" unit="word" stagger={60} className="cta-band__title">
          Have an AI problem you&apos;re trying to solve?
        </RevealText>
        <RevealText as="p" unit="line" stagger={80} className="cta-band__sub">
          Tell us what you&apos;re trying to build. We respond within one business day.
        </RevealText>
        <div ref={buttonRef} className="cta-band__action">
          <Button href="/contact">Book a discovery call</Button>
        </div>
      </div>
    </section>
  );
}
