'use client';

/**
 * Home hero — client component that owns the parallax + mouse-position
 * effects on the glow orbs and the staggered CTA reveal. Extracted so
 * the page can be a Server Component (needed for getCaseStudies() in
 * SelectedWork below).
 */
import { useRef } from 'react';
import Button from '@/components/Button';
import {
  RevealText,
  useMousePositionParallax,
  useParallax,
  useScrollReveal,
} from '@/hooks/motionPrimitives';

export default function HomeHero() {
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  useParallax(glow1Ref, 0.5);
  useParallax(glow2Ref, 0.5);
  useMousePositionParallax(glow1Ref, { strength: 14 });
  useMousePositionParallax(glow2Ref, { strength: 10 });

  const heroCtasRef = useScrollReveal<HTMLDivElement>({
    y: 0,
    scale: 0.96,
    delay: 1.7,
    duration: 0.5,
  });

  return (
    <section className="hero">
      <div ref={glow1Ref} className="hero__glow hero__glow--1" />
      <div ref={glow2Ref} className="hero__glow hero__glow--2" />
      <div className="hero__inner">
        <RevealText
          as="h1"
          unit="char"
          stagger={25}
          trigger="load"
          className="hero__heading"
        >
          We build AI solutions
        </RevealText>
        <RevealText
          as="p"
          unit="word"
          stagger={60}
          delay={1000}
          trigger="load"
          className="hero__sub"
        >
          We help growing businesses move beyond off-the-shelf SaaS — building custom AI products and integrations designed around your data, owned by your team, and engineered to lower long-term software costs.
        </RevealText>
        <div ref={heroCtasRef} className="hero__actions">
          <Button href="/contact">Book a discovery call</Button>
          <Button href="/work" variant="ghost">See our work</Button>
        </div>
      </div>
    </section>
  );
}
