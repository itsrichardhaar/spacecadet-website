/**
 * Capability data — the single source of truth for Spacecadet's four
 * service categories. Consumed by:
 *   - Home Capabilities cinematic (#08, this slice)
 *   - /capabilities page (#14, future)
 *   - Work case study tagging (#19, future)
 *
 * Order is load-bearing and matches the PRD's buyer-journey frame:
 *   Custom AI Products → AI Integrations → Intelligent Agents → AI Strategy
 *
 * Schema mirrors the issue spec; future schema changes must update the
 * test suite in capabilities.test.ts.
 */

export type CapabilityId =
  | 'custom-ai-products'
  | 'ai-integrations'
  | 'agents-automation'
  | 'ai-strategy';

export interface Capability {
  id: CapabilityId;
  name: string;
  /** One-line hook for compact tiles (cinematic, Home preview). */
  summary: string;
  /** 2–3 sentence expansion for the /capabilities page. */
  description: string;
  /** First-person buyer voice — "who lands here". */
  buyer: string;
  engagementShape: {
    duration: string;
    deliverable: string;
    ipNote: string;
  };
  /** Path to the SVG diagram. Placeholder until #14 ships real diagrams. */
  diagramHref: string;
}

export const capabilities: readonly Capability[] = [
  {
    id: 'custom-ai-products',
    name: 'Custom AI Products',
    summary: 'Net-new products where AI is the core architecture, not a feature on top.',
    description:
      'We design, build, and ship the whole thing — UX, model integration, infrastructure, deployment. For teams whose product cannot be bought off the shelf because the AI is the differentiation.',
    buyer: 'I have an AI product idea and need a team to build it.',
    engagementShape: {
      duration: '8–16 weeks',
      deliverable: 'Shipped product end-to-end',
      ipNote: 'IP transfers to client',
    },
    diagramHref: '/diagrams/custom-ai-products.svg',
  },
  {
    id: 'ai-integrations',
    name: 'AI Integrations',
    summary: 'Embed AI deeply into the software you already own — and replace recurring SaaS spend.',
    description:
      'Add AI to existing products, automate workflows, replace third-party tools. The goal is owned intelligence inside the systems your team already runs, not a chat widget bolted onto your SaaS.',
    buyer: 'I have an existing product. I want AI inside it without replacing what works.',
    engagementShape: {
      duration: '4–12 weeks',
      deliverable: 'Production AI features in your codebase',
      ipNote: 'Client owns the resulting code',
    },
    diagramHref: '/diagrams/ai-integrations.svg',
  },
  {
    id: 'agents-automation',
    name: 'Intelligent Agents & Automation',
    summary: 'Agentic systems that take action — not chatbots that summarize.',
    description:
      'Multi-step agent workflows, RAG-driven decisions, LLM orchestration with tools, evals and guardrails. The hard version of "AI that does things end-to-end," with the eval rigor to keep it honest.',
    buyer: 'I want AI that does things — handles a workflow, not a chat widget.',
    engagementShape: {
      duration: '4–12 weeks',
      deliverable: 'Production agent system with evals + guardrails',
      ipNote: 'Often paired with Integrations',
    },
    diagramHref: '/diagrams/agents-automation.svg',
  },
  {
    id: 'ai-strategy',
    name: 'AI Strategy & Discovery',
    summary: 'Build vs buy, feasibility, scoped POC — for teams not ready to commit to a full build.',
    description:
      'A focused Discovery sprint that maps the opportunity, separates buy-from-build, validates technical feasibility, and ships a roadmap plus a scoped POC. The honest first step before committing to a multi-month build.',
    buyer: "I don't know what to build yet. I need help figuring out what's worth doing.",
    engagementShape: {
      duration: '2–4 weeks',
      deliverable: 'Roadmap + recommendation + scoped POC plan',
      ipNote: 'Deliverable doc + working prototype',
    },
    diagramHref: '/diagrams/ai-strategy.svg',
  },
] as const;

export function getCapability(id: CapabilityId): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}
