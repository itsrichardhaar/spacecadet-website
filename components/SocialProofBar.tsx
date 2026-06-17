/**
 * Home page social-proof bar (section 2, directly below the hero).
 *
 * Static row of up to 5 wordmark entries. The original #09 build was
 * an infinite-marquee animation, but on a long page with the hero
 * parallax + the rest of the motion vocabulary, the continuous
 * transform animation contributed to scroll feeling sluggish. Now
 * the section is purely typographic and renders identically on all
 * devices.
 *
 * Empty `socialProofEntries` → the section renders nothing (cleanly
 * removed from layout).
 */
import { socialProofEntries } from '@/lib/socialProof';
import './SocialProofBar.css';

const MAX_ENTRIES = 5;

export default function SocialProofBar() {
  const entries = socialProofEntries.slice(0, MAX_ENTRIES);
  if (entries.length === 0) return null;

  return (
    <section className="social-proof" aria-label="Trusted by ambitious teams">
      <div className="social-proof__inner">
        <p className="social-proof__eyebrow">Trusted by ambitious teams</p>
        <ul className="social-proof__row">
          {entries.map((entry, i) => (
            <li key={i} className="social-proof__item">
              {entry.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
