'use client';

import React, { useRef } from 'react';
import Button from '@/components/Button';
import CapabilitiesCinematic from '@/components/CapabilitiesCinematic';
import HowWeEngage from '@/components/HowWeEngage';
import SelectedWork from '@/components/SelectedWork';
import SocialProofBar from '@/components/SocialProofBar';
import { useInView } from '@/hooks/useInView';
import {
  RevealText,
  useMousePositionParallax,
  useParallax,
  useScrollReveal,
} from '@/hooks/motionPrimitives';
import './home.css';

const Home: React.FC = () => {
  const { ref: ctaRef, inView: ctaInView }           = useInView<HTMLElement>();

  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  useParallax(glow1Ref, 0.5);
  useParallax(glow2Ref, 0.5);
  useMousePositionParallax(glow1Ref, { strength: 14 });
  useMousePositionParallax(glow2Ref, { strength: 10 });

  // Hero CTAs: scale-from-0.96 + fade, fires after the subhead word reveal.
  const heroCtasRef = useScrollReveal<HTMLDivElement>({
    y: 0,
    scale: 0.96,
    delay: 1.7,
    duration: 0.5,
  });

  return (
    <div className="home">

      {/* ── Hero ──────────────────────────────────── */}
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

      {/* ── Social proof bar (Home section 2) ─────── */}
      <SocialProofBar />

      {/* ── Capabilities (cinematic moment #2) ────── */}
      <CapabilitiesCinematic />

      {/* ── Selected work preview ─────────────────── */}
      <SelectedWork />

      {/* ── How we engage snippet ─────────────────── */}
      <HowWeEngage />

      {/* ── CTA Band ──────────────────────────────── */}
      <section
        ref={ctaRef}
        className={`cta-band ${ctaInView ? 'in-view' : ''}`}
      >
        <div className="cta-band__glow" />
        <div className="cta-band__inner scroll-fade-up">
          <h2 className="cta-band__title">Ready to launch something great?</h2>
          <p className="cta-band__sub">
            Tell us about your project. We&apos;ll come back within 24 hours.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </section>

    </div>
  );
};

export default Home;
