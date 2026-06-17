/**
 * Architectural SVG diagrams for the Capabilities page.
 *
 * Line-only, ember-accent, transform-only animation if any. Each diagram
 * inherits stroke colour from CSS `color` so it renders in the ember
 * accent when nested inside `.capability-section__diagram` (or any
 * ancestor that sets `color: var(--accent)`).
 *
 * Per the PRD art direction (F): custom SVG diagrams are the visual
 * investment for this site — they signal "we understand AI architecturally"
 * more than any stock illustration could. Drawn flat / line-only / no
 * gradients.
 *
 * Diagram IDs scoped per-instance via `idPrefix` to avoid `<defs>`
 * collisions when several diagrams render on the same page.
 */
import type { CapabilityId } from '@/lib/capabilities';

interface DiagramProps {
  className?: string;
}

// Shared structural constants so the diagrams are visually consistent.
const STROKE = 1.5;
const NODE_FILL = 'rgba(255, 138, 61, 0.08)';
const NODE_FILL_ALT = 'rgba(245, 241, 235, 0.04)';
const LABEL_FONT_SIZE = 11;
const LABEL_FONT = 'var(--font-inter), -apple-system, sans-serif';

function ArrowheadDef({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L7,3 L0,6 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

// ── 1. Custom AI Products ──────────────────────────────────────────
// Client → Custom UI → AI Model, with proprietary data feeding the model.

export function CustomAIProductsDiagram({ className }: DiagramProps) {
  const arrowId = 'cap-custom-arrow';
  const arrow = `url(#${arrowId})`;
  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      role="img"
      aria-label="Custom AI Products: Client connects to Custom UI, which talks to an AI Model trained on your proprietary data."
      preserveAspectRatio="xMidYMid meet"
    >
      <ArrowheadDef id={arrowId} />

      <g fontFamily={LABEL_FONT} fontSize={LABEL_FONT_SIZE}>
        <rect x="10" y="20" width="80" height="48" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="50" y="48" textAnchor="middle" fill="currentColor">Client</text>

        <rect x="140" y="20" width="80" height="48" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="180" y="48" textAnchor="middle" fill="currentColor">Custom UI</text>

        <rect x="270" y="20" width="80" height="48" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="310" y="48" textAnchor="middle" fill="currentColor">AI Model</text>

        <line x1="90" y1="44" x2="140" y2="44" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
        <line x1="220" y1="44" x2="270" y2="44" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />

        <rect x="270" y="130" width="80" height="48" rx="6" fill={NODE_FILL_ALT} stroke="currentColor" strokeWidth={STROKE} strokeDasharray="4 4" />
        <text x="310" y="158" textAnchor="middle" fill="currentColor">Your data</text>

        <line x1="310" y1="130" x2="310" y2="70" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
      </g>
    </svg>
  );
}

// ── 2. AI Integrations ─────────────────────────────────────────────
// Before / After: existing software → existing software + AI layer.

export function AIIntegrationsDiagram({ className }: DiagramProps) {
  const arrowId = 'cap-integrations-arrow';
  const arrow = `url(#${arrowId})`;
  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      role="img"
      aria-label="AI Integrations: existing software stack on the left, same stack on the right with an AI layer added inside."
      preserveAspectRatio="xMidYMid meet"
    >
      <ArrowheadDef id={arrowId} />

      <g fontFamily={LABEL_FONT} fontSize={LABEL_FONT_SIZE}>
        {/* Before stack */}
        <text x="60" y="18" textAnchor="middle" fill="currentColor" opacity="0.65">Before</text>
        <rect x="20" y="34" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="60" y="54" textAnchor="middle" fill="currentColor">UI</text>
        <rect x="20" y="74" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="60" y="94" textAnchor="middle" fill="currentColor">App logic</text>
        <rect x="20" y="114" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="60" y="134" textAnchor="middle" fill="currentColor">Data</text>

        {/* Arrow */}
        <line x1="120" y1="90" x2="240" y2="90" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />

        {/* After stack with AI layer */}
        <text x="300" y="18" textAnchor="middle" fill="currentColor" opacity="0.65">After</text>
        <rect x="260" y="34" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="300" y="54" textAnchor="middle" fill="currentColor">UI</text>
        <rect x="260" y="74" width="80" height="32" fill="rgba(255,138,61,0.15)" stroke="currentColor" strokeWidth={STROKE} />
        <text x="300" y="94" textAnchor="middle" fill="currentColor" fontWeight="600">AI layer</text>
        <rect x="260" y="114" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="300" y="134" textAnchor="middle" fill="currentColor">App logic</text>
        <rect x="260" y="154" width="80" height="32" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="300" y="174" textAnchor="middle" fill="currentColor">Data</text>
      </g>
    </svg>
  );
}

// ── 3. Intelligent Agents & Automation ─────────────────────────────
// Input → Decide (diamond) → Act, with a loop back from Act to the decision.

export function AgentsAutomationDiagram({ className }: DiagramProps) {
  const arrowId = 'cap-agents-arrow';
  const arrow = `url(#${arrowId})`;
  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      role="img"
      aria-label="Intelligent Agents: input flows into a decision, which selects an action, which loops back to inform the next decision."
      preserveAspectRatio="xMidYMid meet"
    >
      <ArrowheadDef id={arrowId} />

      <g fontFamily={LABEL_FONT} fontSize={LABEL_FONT_SIZE}>
        {/* Input */}
        <rect x="10" y="80" width="76" height="44" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="48" y="106" textAnchor="middle" fill="currentColor">Input</text>

        {/* Decide (diamond) */}
        <polygon points="180,60 240,102 180,144 120,102" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="180" y="106" textAnchor="middle" fill="currentColor">Decide</text>

        {/* Act */}
        <rect x="274" y="80" width="76" height="44" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="312" y="106" textAnchor="middle" fill="currentColor">Act</text>

        {/* Input → Decide */}
        <line x1="86" y1="102" x2="120" y2="102" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
        {/* Decide → Act */}
        <line x1="240" y1="102" x2="274" y2="102" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
        {/* Loop: Act → bottom → Decide */}
        <path
          d="M 312 124 L 312 175 L 180 175 L 180 144"
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeDasharray="4 4"
          markerEnd={arrow}
        />
      </g>
    </svg>
  );
}

// ── 4. AI Strategy & Discovery ─────────────────────────────────────
// Discovery → Roadmap → Recommendation (linear sequence).

export function AIStrategyDiagram({ className }: DiagramProps) {
  const arrowId = 'cap-strategy-arrow';
  const arrow = `url(#${arrowId})`;
  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      role="img"
      aria-label="AI Strategy: Discovery flows into a Roadmap, which produces a Recommendation."
      preserveAspectRatio="xMidYMid meet"
    >
      <ArrowheadDef id={arrowId} />

      <g fontFamily={LABEL_FONT} fontSize={LABEL_FONT_SIZE}>
        <rect x="10" y="78" width="92" height="48" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="56" y="102" textAnchor="middle" fill="currentColor">Discovery</text>
        <text x="56" y="118" textAnchor="middle" fill="currentColor" opacity="0.6" fontSize="9">week 1</text>

        <rect x="134" y="78" width="92" height="48" rx="6" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
        <text x="180" y="102" textAnchor="middle" fill="currentColor">Roadmap</text>
        <text x="180" y="118" textAnchor="middle" fill="currentColor" opacity="0.6" fontSize="9">week 2</text>

        <rect x="258" y="78" width="92" height="48" rx="6" fill="rgba(255,138,61,0.15)" stroke="currentColor" strokeWidth={STROKE} />
        <text x="304" y="102" textAnchor="middle" fill="currentColor" fontWeight="600">Recommendation</text>
        <text x="304" y="118" textAnchor="middle" fill="currentColor" opacity="0.6" fontSize="9">+ POC plan</text>

        <line x1="102" y1="102" x2="134" y2="102" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
        <line x1="226" y1="102" x2="258" y2="102" stroke="currentColor" strokeWidth={STROKE} markerEnd={arrow} />
      </g>
    </svg>
  );
}

// ── Diagram resolver ───────────────────────────────────────────────

const DIAGRAM_BY_ID: Record<CapabilityId, (p: DiagramProps) => React.ReactElement> = {
  'custom-ai-products': CustomAIProductsDiagram,
  'ai-integrations': AIIntegrationsDiagram,
  'agents-automation': AgentsAutomationDiagram,
  'ai-strategy': AIStrategyDiagram,
};

export function CapabilityDiagram({ id, className }: { id: CapabilityId; className?: string }) {
  const Diagram = DIAGRAM_BY_ID[id];
  return <Diagram className={className} />;
}
