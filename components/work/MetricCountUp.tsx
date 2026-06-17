'use client';

/**
 * Count-up metric for the case-study Outcome section.
 *
 * Extracts the first numeric token from the input string and tweens
 * it from 0 to the target when the element enters the viewport.
 * Prefix and suffix (e.g. "$", "K / year") are preserved unchanged.
 *
 * If the input has no numeric token (e.g. "TBD"), renders the string
 * statically.
 *
 * Gated through useReducedMotion — collapses to the final string when
 * the OS prefers reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/motionGates';

interface MetricCountUpProps {
  value: string;
  /** Duration in milliseconds. Default 1100. */
  durationMs?: number;
  className?: string;
}

const NUMBER_REGEX = /-?\d+(?:[.,]\d+)?/;

export default function MetricCountUp({
  value,
  durationMs = 1100,
  className = '',
}: MetricCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const match = value.match(NUMBER_REGEX);
  const initialDisplay = reduced || !match ? value : value.replace(match[0], '0');
  const [display, setDisplay] = useState(initialDisplay);

  useEffect(() => {
    if (reduced || !match || !ref.current) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[0].replace(',', '.'));
    const isInteger = !match[0].includes('.') && !match[0].includes(',');
    const el = ref.current;
    let frame = 0;
    let start = 0;
    let observed = false;

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = isInteger
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(value.replace(match[0], formatted));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (observed) return;
        const entry = entries[0];
        if (entry?.isIntersecting) {
          observed = true;
          frame = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reduced, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
