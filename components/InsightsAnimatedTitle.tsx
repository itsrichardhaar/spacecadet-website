'use client';

/**
 * Client-only wrapper around the post-detail H1 so the char-by-char
 * reveal from the motion vocabulary can fire on initial load while
 * the rest of the page stays a Server Component.
 */
import { RevealText } from '@/hooks/motionPrimitives';

export default function InsightsAnimatedTitle({ children }: { children: React.ReactNode }) {
  return (
    <RevealText as="h1" unit="char" stagger={22} trigger="load" className="insights-post__title">
      {children}
    </RevealText>
  );
}
