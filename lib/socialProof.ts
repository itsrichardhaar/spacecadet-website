/**
 * Social proof entries for the Home page section below the hero.
 *
 * Currently text-only wordmarks (Inter-rendered "logos"). When real
 * client / partner logos are sourced, swap each entry to use an SVG
 * or image path via the optional `logoHref` field — the component
 * will prefer the image when present.
 *
 * If this array is empty, the SocialProofBar section hides entirely
 * (no eyebrow, no marquee — clean removal from layout).
 *
 * The names below are PLACEHOLDERS for design verification. They
 * should be replaced with real teams Spacecadet works with before
 * the site goes to production.
 */
export interface SocialProofEntry {
  /** Wordmark text to render until a real logo is supplied. */
  label: string;
  /** Future: path to an SVG / PNG. Component prefers this when set. */
  logoHref?: string;
}

export const socialProofEntries: SocialProofEntry[] = [
  { label: 'Atlas Health' },
  { label: 'Ridgeline' },
  { label: 'Foundry AI' },
  { label: 'Northwind' },
  { label: 'Cascade' },
];
