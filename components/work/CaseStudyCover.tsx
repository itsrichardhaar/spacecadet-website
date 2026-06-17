'use client';

/**
 * Case-study cover hero — full-bleed image with scroll-tied 0.85x
 * parallax via useParallax. Image is treated as a decorative layer
 * (per the parallax rule); the headline + at-a-glance bar live in
 * the parent and don't parallax.
 *
 * Gated through useParallax — no-op on touch / reduced-motion, in
 * which case the cover renders static.
 */
import { useRef } from 'react';
import { useParallax } from '@/hooks/motionPrimitives';

interface CaseStudyCoverProps {
  coverImage: string;
  alt: string;
}

export default function CaseStudyCover({ coverImage, alt }: CaseStudyCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, 0.85);

  return (
    <div className="case-study__cover">
      <div
        ref={ref}
        className="case-study__cover-image"
        role="img"
        aria-label={alt}
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="case-study__cover-overlay" aria-hidden="true" />
    </div>
  );
}
