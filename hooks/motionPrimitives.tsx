'use client';

/**
 * Motion primitives — the entrance vocabulary that subsequent slices use
 * to apply consistent text and element reveals.
 *
 * Built on GSAP + ScrollTrigger + SplitText (all free post-GSAP-3.13).
 * Every primitive consumes the gates from `motionGates.ts` so accessibility
 * and mobile fallbacks are enforced centrally.
 *
 * Public surface:
 * - useScrollReveal(opts) — entrance fade-up for any element, fires once
 *   on scroll-into-view via ScrollTrigger
 * - useSplitTextReveal(opts) — character/word/line reveal for text; on
 *   touch devices collapses to the same simple fade-up as useScrollReveal
 * - <RevealText unit stagger as ...> — convenience wrapper around
 *   useSplitTextReveal for the common case
 *
 * Performance contract (per PRD):
 * - Only `transform` + `opacity` are animated; no layout properties
 * - SplitText DOM operations happen once at mount, not per-frame
 * - ScrollTrigger uses `once: true` to allow GC after firing
 * - All animations share the GSAP ticker that Lenis is hooked into (#04)
 *
 * Gate behavior (per motionGates.ts):
 * - Reduced motion → element stays at its final state, no animation
 * - Touch / mobile → simple fade-up only, no split-text choreography
 * - Desktop → full character / word / line stagger
 */
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useIsTouchDevice, useReducedMotion } from './motionGates';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const SCROLL_TRIGGER_START = 'top 85%';

// ─────────────────────────────────────────────────────────────────────
// useScrollReveal — generic entrance reveal for any element
// ─────────────────────────────────────────────────────────────────────

export interface ScrollRevealOptions {
  /** Tween duration in seconds. Default 0.6. */
  duration?: number;
  /** Delay before the tween starts, in seconds. Default 0. */
  delay?: number;
  /** GSAP easing function string. Default 'power3.out'. */
  ease?: string;
  /** Starting y offset in px. Default 28. */
  y?: number;
  /** Starting scale. Default 1 (no scale animation). */
  scale?: number;
}

export function useScrollReveal<T extends HTMLElement>(opts: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const { duration = 0.6, delay = 0, ease = 'power3.out', y = 28, scale = 1 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.set(el, { y, opacity: 0, scale });
    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start: SCROLL_TRIGGER_START,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'transform,opacity' });
    };
  }, [reduced, duration, delay, ease, y, scale]);

  return ref;
}

// ─────────────────────────────────────────────────────────────────────
// useSplitTextReveal — character / word / line reveal
// ─────────────────────────────────────────────────────────────────────

export type SplitUnit = 'char' | 'word' | 'line';

export interface SplitTextRevealOptions {
  unit: SplitUnit;
  /** Stagger between units in milliseconds. Defaults per unit (25/60/80). */
  stagger?: number;
  /** Delay before the reveal starts, in milliseconds. Default 0. */
  delay?: number;
  /** Tween duration per unit, in milliseconds. Default 600. */
  duration?: number;
  /**
   * Trigger mode. 'load' fires on mount (use for hero H1, above the fold).
   * 'scroll' fires when the element enters the viewport (default).
   */
  trigger?: 'load' | 'scroll';
}

const DEFAULT_STAGGER: Record<SplitUnit, number> = {
  char: 25,
  word: 60,
  line: 80,
};

const SPLIT_TYPE_BY_UNIT: Record<SplitUnit, string> = {
  char: 'chars,words',
  word: 'words',
  line: 'lines',
};

const TARGETS_BY_UNIT: Record<SplitUnit, (s: SplitText) => Element[]> = {
  char: (s) => s.chars,
  word: (s) => s.words,
  line: (s) => s.lines,
};

export function useSplitTextReveal<T extends HTMLElement>(opts: SplitTextRevealOptions) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const {
    unit,
    stagger = DEFAULT_STAGGER[unit],
    delay = 0,
    duration = 600,
    trigger = 'scroll',
  } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Touch fallback: single fade-up, no split-text choreography.
    if (isTouch) {
      gsap.set(el, { y: 28, opacity: 0 });
      const fadeTween = gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: delay / 1000,
        ease: 'power2.out',
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start: SCROLL_TRIGGER_START, once: true }
            : undefined,
      });
      return () => {
        fadeTween.scrollTrigger?.kill();
        fadeTween.kill();
        gsap.set(el, { clearProps: 'transform,opacity' });
      };
    }

    // Desktop: full split-text choreography.
    const split = SplitText.create(el, {
      type: SPLIT_TYPE_BY_UNIT[unit],
      mask: unit === 'char' ? 'chars' : unit === 'word' ? 'words' : 'lines',
    });

    const targets = TARGETS_BY_UNIT[unit](split);
    gsap.set(targets, { yPercent: 100, opacity: 0 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: duration / 1000,
      delay: delay / 1000,
      stagger: stagger / 1000,
      ease: 'power3.out',
      scrollTrigger:
        trigger === 'scroll'
          ? { trigger: el, start: SCROLL_TRIGGER_START, once: true }
          : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reduced, isTouch, unit, stagger, delay, duration, trigger]);

  return ref;
}

// ─────────────────────────────────────────────────────────────────────
// <RevealText> — convenience wrapper around useSplitTextReveal
// ─────────────────────────────────────────────────────────────────────

type RevealTextProps<As extends ElementType> = {
  unit: SplitUnit;
  stagger?: number;
  delay?: number;
  duration?: number;
  trigger?: 'load' | 'scroll';
  as?: As;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<As>, 'as' | 'children' | 'className' | 'ref'>;

export function RevealText<As extends ElementType = 'div'>({
  unit,
  stagger,
  delay,
  duration,
  trigger,
  as,
  className,
  children,
  ...rest
}: RevealTextProps<As>) {
  const ref = useSplitTextReveal<HTMLElement>({ unit, stagger, delay, duration, trigger });
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
}
