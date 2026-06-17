'use client';

import React, { useRef } from 'react';
import Button from '@/components/Button';
import CapabilitiesCinematic from '@/components/CapabilitiesCinematic';
import HowWeEngage from '@/components/HowWeEngage';
import InsightsPreview from '@/components/InsightsPreview';
import SelectedWork from '@/components/SelectedWork';
import SocialProofBar from '@/components/SocialProofBar';
import {
  RevealText,
  useMousePositionParallax,
  useParallax,
  useScrollReveal,
} from '@/hooks/motionPrimitives';
import './home.css';

const Home: React.FC = () => {
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

  // Final CTA band: background ember wash parallax + button scale-fade.
  const ctaGlowRef = useRef<HTMLDivElement>(null);
  useParallax(ctaGlowRef, 0.6);
  const ctaButtonRef = useScrollReveal<HTMLDivElement>({
    y: 0,
    scale: 0.96,
    delay: 0.4,
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

      {/* ── Insights preview ──────────────────────── */}
      <InsightsPreview />

      {/* ── CTA Band ──────────────────────────────── */}
      <section className="cta-band">
        <div ref={ctaGlowRef} className="cta-band__glow" aria-hidden="true" />
        <div className="cta-band__inner">
          <p className="section-eyebrow cta-band__eyebrow">Get started</p>
          <RevealText
            as="h2"
            unit="word"
            stagger={60}
            className="cta-band__title"
          >
            Have an AI problem you&apos;re trying to solve?
          </RevealText>
          <RevealText
            as="p"
            unit="line"
            stagger={80}
            className="cta-band__sub"
          >
            Tell us what you&apos;re trying to build. We respond within one business day.
          </RevealText>
          <div ref={ctaButtonRef} className="cta-band__action">
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
