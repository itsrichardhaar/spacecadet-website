'use client';

/**
 * Lenis smooth scroll bootstrap.
 *
 * Desktop-only — gated on `useIsDesktop()` AND `!useReducedMotion()` from
 * the motion-gates module. Touch devices and reduced-motion users keep
 * native browser scroll so iOS gestures (swipe-back, pull-to-refresh),
 * pinch-zoom, and accessibility preferences are never disturbed.
 *
 * `lenis.raf` is hooked into `gsap.ticker` so every scroll-tied animation
 * in subsequent slices (#05 reveals, #06 parallax, #07 hero cinematic)
 * shares the same RAF loop. `lagSmoothing(0)` is disabled because Lenis
 * needs continuous frames; GSAP's default lag smoothing causes stutter
 * when the tab loses focus.
 *
 * Side-effect component — renders nothing. Tear-down on gate change
 * restores native scroll cleanly.
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useIsDesktop, useReducedMotion } from '@/hooks/motionGates';

export default function LenisBootstrap() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (reduced || !isDesktop) return;

    const lenis = new Lenis();

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
    };
  }, [reduced, isDesktop]);

  return null;
}
