/**
 * Featured work fixture — temporary placeholder consumed by the Home
 * SelectedWork section (#10).
 *
 * Replace this entire module with a live MDX query when issue #19 lands
 * the real Work infrastructure. The consuming component reads from
 * `featuredWork` directly, so the swap is a single-file change.
 *
 * Until then: 3 entries — one per non-Strategy capability — with
 * realistic-shape content but no claimed client names.
 */
import type { CapabilityId } from './capabilities';

export interface FeaturedWorkItem {
  slug: string;
  title: string;
  /** One-line hook displayed under the title on the tile. */
  summary: string;
  capability: CapabilityId;
  year: number;
  /** CSS gradient string for the cover thumbnail (placeholder until #19). */
  coverGradient: string;
  /** CSS gradient string for the hover/detail variant of the cover. */
  detailGradient: string;
}

export const featuredWork: readonly FeaturedWorkItem[] = [
  {
    slug: 'placeholder-custom-ai-product',
    title: 'A custom AI product for a Series-A logistics startup',
    summary:
      'Replaced a $84K/year stack of vendor SaaS with an owned RAG agent over operational data.',
    capability: 'custom-ai-products',
    year: 2026,
    coverGradient:
      'linear-gradient(135deg, #14110F 0%, rgba(255, 138, 61, 0.35) 60%, #FF8A3D 100%)',
    detailGradient:
      'linear-gradient(135deg, #FF8A3D 0%, rgba(255, 158, 92, 0.4) 50%, #14110F 100%)',
  },
  {
    slug: 'placeholder-ai-integration',
    title: 'AI integration across a healthcare data platform',
    summary:
      'Embedded model-driven triage inside an existing platform — owned, compliant, deployable.',
    capability: 'ai-integrations',
    year: 2026,
    coverGradient:
      'linear-gradient(135deg, #14110F 0%, rgba(255, 158, 92, 0.3) 60%, #FF9E5C 100%)',
    detailGradient:
      'linear-gradient(135deg, #FF9E5C 0%, rgba(255, 138, 61, 0.35) 50%, #14110F 100%)',
  },
  {
    slug: 'placeholder-intelligent-agent',
    title: 'An agentic workflow for a B2B SaaS ops team',
    summary:
      'Multi-step agent that owns the end-to-end workflow, with evals and guardrails built in.',
    capability: 'agents-automation',
    year: 2026,
    coverGradient:
      'linear-gradient(135deg, #0C0A09 0%, rgba(228, 118, 49, 0.3) 60%, #E47631 100%)',
    detailGradient:
      'linear-gradient(135deg, #E47631 0%, rgba(255, 138, 61, 0.4) 50%, #0C0A09 100%)',
  },
];
