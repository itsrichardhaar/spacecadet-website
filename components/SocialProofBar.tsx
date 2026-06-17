/**
 * Home page social-proof bar (section 2, directly below the hero).
 *
 * Desktop: infinite horizontal marquee of wordmark / logo entries,
 * pure-CSS transform animation (no JS, no RAF). Paused on hover.
 *
 * Mobile / touch / reduced-motion: marquee animation removed via CSS
 * media queries so iOS swipe gestures, pinch-zoom, and accessibility
 * preferences are never disturbed. On touch the strip becomes a
 * horizontal scroll if the entries overflow.
 *
 * Empty `socialProofEntries` → the section renders nothing (cleanly
 * removed from layout). Useful when no real logos are ready yet.
 */
import { socialProofEntries } from '@/lib/socialProof';
import './SocialProofBar.css';

export default function SocialProofBar() {
  if (socialProofEntries.length === 0) return null;

  return (
    <section className="social-proof" aria-label="Trusted by ambitious teams">
      <div className="social-proof__inner">
        <p className="social-proof__eyebrow">Trusted by ambitious teams</p>
        <div className="social-proof__marquee">
          <div className="social-proof__track">
            {socialProofEntries.map((entry, i) => (
              <span key={`a-${i}`} className="social-proof__item">
                {entry.label}
              </span>
            ))}
            {/* Duplicate track for seamless loop. aria-hidden so screen
                readers don't announce each entry twice. */}
            {socialProofEntries.map((entry, i) => (
              <span
                key={`b-${i}`}
                className="social-proof__item"
                aria-hidden="true"
              >
                {entry.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
