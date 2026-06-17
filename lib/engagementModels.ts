/**
 * Engagement model data — single source of truth for the three ways
 * Spacecadet sells work.
 *
 * Consumed by:
 *   - Home "How we engage" snippet (#11, this slice)
 *   - /approach page (#15, future — uses the full schema including
 *     priceRange, deliverable, buyer)
 *
 * Order is load-bearing and maps to the buyer journey: pre-build
 * Discovery → committed Build → ongoing Retainer.
 *
 * IMPORTANT: priceRange must NEVER be rendered on the Home snippet.
 * Prices live on /approach where they have full context.
 */

export type EngagementModelId =
  | 'discovery-sprint'
  | 'build-engagement'
  | 'embedded-retainer';

export interface EngagementModel {
  id: EngagementModelId;
  name: string;
  /** Short scope string used in the Home snippet card. */
  shortScope: string;
  /** Duration phrase ("2 weeks", "8–16 weeks", "Ongoing"). */
  duration: string;
  /** Price range — rendered ONLY on /approach, never on Home. */
  priceRange: string;
  /** What gets delivered. */
  deliverable: string;
  /** Who this engagement is for. */
  buyer: string;
}

export const engagementModels: readonly EngagementModel[] = [
  {
    id: 'discovery-sprint',
    name: 'Discovery Sprint',
    shortScope: '2 weeks · scoped POC + roadmap',
    duration: '2 weeks',
    priceRange: '$25–40k',
    deliverable: 'Build-vs-buy decision, technical roadmap, scoped POC plan',
    buyer: 'Teams that need clarity before committing to a multi-month build.',
  },
  {
    id: 'build-engagement',
    name: 'Build Engagement',
    shortScope: '8–16 weeks · shipped product or integration',
    duration: '8–16 weeks',
    priceRange: '$80–250k+',
    deliverable: 'Shipped product, integration, or agent system',
    buyer: 'Teams ready to invest in custom AI infrastructure they own.',
  },
  {
    id: 'embedded-retainer',
    name: 'Embedded Retainer',
    shortScope: 'Ongoing · continuous AI capability for your team',
    duration: 'Ongoing',
    priceRange: '$20–35k / month',
    deliverable: 'Continuous AI capability embedded with your product team',
    buyer: 'Teams with sustained AI build needs and no in-house specialist.',
  },
];

export function getEngagementModel(id: EngagementModelId): EngagementModel | undefined {
  return engagementModels.find((m) => m.id === id);
}
