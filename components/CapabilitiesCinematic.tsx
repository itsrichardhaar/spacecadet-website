'use client';

/**
 * Home page Capabilities section — cinematic moment #2.
 *
 * Desktop with motion: ScrollTrigger-pins the section for ~2 viewport
 * heights. As the user scrolls, focus moves sequentially through the four
 * capability tiles. The focused tile is at full opacity + scale; the rest
 * dim and shrink slightly.
 *
 * Mobile / touch / reduced-motion: vertical static stack of tiles at
 * full opacity. No pin, no choreography. Tiles still link through to
 * their /capabilities anchor.
 *
 * Each tile is sourced from the capability data module (lib/capabilities) —
 * no duplicated literals.
 */
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilities } from '@/lib/capabilities';
import { useIsDesktop, useReducedMotion } from '@/hooks/motionGates';
import './CapabilitiesCinematic.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CapabilitiesCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const section = sectionRef.current;
    const tiles = tilesRef.current.filter((t): t is HTMLDivElement => t !== null);
    if (!section || tiles.length === 0) return;

    // Initial state: first tile in focus, others dimmed.
    tiles.forEach((tile, i) => {
      gsap.set(tile, {
        opacity: i === 0 ? 1 : 0.35,
        scale: i === 0 ? 1 : 0.97,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // Progress through 4 states by handing focus from tile i-1 to tile i.
    for (let i = 1; i < tiles.length; i++) {
      tl.to(tiles[i - 1], { opacity: 0.35, scale: 0.97, duration: 1 }, '>');
      tl.to(tiles[i], { opacity: 1, scale: 1, duration: 1 }, '<');
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      tiles.forEach((tile) => gsap.set(tile, { clearProps: 'opacity,scale' }));
    };
  }, [reduced, isDesktop]);

  return (
    <section ref={sectionRef} className="capabilities-cinematic">
      <div className="capabilities-cinematic__inner">
        <header className="capabilities-cinematic__header">
          <p className="section-eyebrow">What we build</p>
          <h2 className="section-title">Four kinds of AI work</h2>
        </header>
        <div className="capabilities-cinematic__grid">
          {capabilities.map((cap, i) => (
            <div
              key={cap.id}
              ref={(el) => {
                tilesRef.current[i] = el;
              }}
              className="capability-tile"
            >
              <Link href={`/capabilities#${cap.id}`} className="capability-tile__link">
                <span className="capability-tile__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="capability-tile__name">{cap.name}</h3>
                <p className="capability-tile__summary">{cap.summary}</p>
                <span className="capability-tile__cta">See more →</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
