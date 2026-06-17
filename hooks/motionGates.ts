/**
 * Motion gates — the single source of truth for "should this motion run."
 *
 * Every motion primitive, the Lenis smooth-scroll bootstrap, and any future
 * scroll/parallax/cinematic scene consumes these hooks. Accessibility and
 * mobile fallbacks are enforced centrally here — never duplicated per
 * consumer.
 *
 * SSR-safe: each hook returns a deterministic default during server render
 * (false for reduced-motion, false for touch, true for desktop) and resyncs
 * on client mount so there are no hydration warnings.
 *
 * Mirrors the --breakpoint-desktop token in app/tokens.css.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   const isTouch = useIsTouchDevice();
 *   const isDesktop = useIsDesktop();
 *   if (motionEligible({ reduced, isDesktop })) gsap.to(...);
 */
import { useEffect, useState } from 'react';

export const DESKTOP_BREAKPOINT_PX = 1024;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER_QUERY = '(pointer: coarse)';
const DESKTOP_VIEWPORT_QUERY = `(min-width: ${DESKTOP_BREAKPOINT_PX}px)`;

/**
 * Subscribe to a `window.matchMedia` query and re-render when it changes.
 * Returns `false` during SSR, then resyncs to the real value after mount.
 * Changes are coalesced through `requestAnimationFrame` to avoid burst
 * re-renders from rapid viewport resizes.
 */
function useMediaQuery(query: string, ssrDefault: boolean): boolean {
  const [matches, setMatches] = useState(ssrDefault);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    let frame = 0;
    const handle = (event: MediaQueryListEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setMatches(event.matches));
    };

    mql.addEventListener('change', handle);
    return () => {
      cancelAnimationFrame(frame);
      mql.removeEventListener('change', handle);
    };
  }, [query]);

  return matches;
}

/**
 * `true` when the OS-level "Reduce motion" preference is enabled.
 * All animations should collapse to instant fades (or skip entirely) when
 * this is true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION_QUERY, false);
}

/**
 * `true` for touch-primary devices (phones, tablets). Detection combines
 * `(pointer: coarse)` with `'ontouchstart' in window` so it survives both
 * hybrid laptops with touchscreens and pure pointer devices. Memoized at
 * mount — touch capability does not change at runtime in any realistic
 * device.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia(COARSE_POINTER_QUERY).matches;
    const hasTouch = 'ontouchstart' in window;
    setIsTouch(coarsePointer || hasTouch);
  }, []);

  return isTouch;
}

/**
 * `true` when the device is desktop-class: not touch AND viewport is at or
 * above the desktop breakpoint. Reacts to viewport resize (throttled to
 * `requestAnimationFrame`).
 */
export function useIsDesktop(): boolean {
  const viewportIsDesktop = useMediaQuery(DESKTOP_VIEWPORT_QUERY, true);
  const isTouch = useIsTouchDevice();
  return viewportIsDesktop && !isTouch;
}

interface MotionEligibleInput {
  reduced: boolean;
  isDesktop: boolean;
}

/**
 * Combines the gates for the most common case: "desktop, not reduced
 * motion." Returns `true` only when full motion vocabulary should run.
 */
export function motionEligible({ reduced, isDesktop }: MotionEligibleInput): boolean {
  return isDesktop && !reduced;
}
