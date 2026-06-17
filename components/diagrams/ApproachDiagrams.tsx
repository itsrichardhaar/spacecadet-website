/**
 * Artifact / phase SVG diagrams for the /approach page (#15).
 *
 * Smaller and quieter than the capability diagrams — each represents
 * an artifact we actually ship at a phase of the engagement. Line-only,
 * ember accent via currentColor, no gradients.
 */

interface DiagramProps {
  className?: string;
}

const STROKE = 1.5;
const NODE_FILL = 'rgba(255, 138, 61, 0.08)';
const FONT = 'var(--font-inter), -apple-system, sans-serif';

// ── 1. Discovery brief — page outline with sections ─────────────────

export function DiscoveryBriefDiagram({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-label="Discovery brief artifact — a document with five sections and a roadmap block."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Page */}
      <rect x="10" y="8" width="100" height="124" rx="4" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
      {/* Title bar */}
      <rect x="20" y="20" width="55" height="6" fill="currentColor" />
      {/* Section lines */}
      <line x1="20" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="48" x2="92" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="56" x2="80" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.6" />

      <line x1="20" y1="72" x2="100" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="80" x2="86" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.6" />

      {/* Highlighted roadmap block */}
      <rect x="20" y="96" width="80" height="22" fill="rgba(255,138,61,0.18)" stroke="currentColor" strokeWidth="1" />
      <text x="60" y="110" textAnchor="middle" fontSize="8" fontFamily={FONT} fill="currentColor" fontWeight="600">
        Roadmap
      </text>
    </svg>
  );
}

// ── 2. Architecture diagram — connected boxes ──────────────────────

export function ArchitectureSketchDiagram({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      role="img"
      aria-label="Architecture sketch artifact — three components connected by a central node with arrows."
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="14" y="22" width="36" height="22" rx="3" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
      <rect x="90" y="22" width="36" height="22" rx="3" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />

      {/* Hub */}
      <circle cx="70" cy="70" r="14" fill="rgba(255,138,61,0.18)" stroke="currentColor" strokeWidth={STROKE} />

      <rect x="14" y="96" width="36" height="22" rx="3" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
      <rect x="90" y="96" width="36" height="22" rx="3" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />

      {/* Connecting lines from each box to the hub */}
      <line x1="50" y1="33" x2="60" y2="62" stroke="currentColor" strokeWidth={STROKE} opacity="0.7" />
      <line x1="90" y1="33" x2="80" y2="62" stroke="currentColor" strokeWidth={STROKE} opacity="0.7" />
      <line x1="50" y1="107" x2="60" y2="78" stroke="currentColor" strokeWidth={STROKE} opacity="0.7" />
      <line x1="90" y1="107" x2="80" y2="78" stroke="currentColor" strokeWidth={STROKE} opacity="0.7" />
    </svg>
  );
}

// ── 3. Eval suite — checkbox grid ──────────────────────────────────

export function EvalSuiteDiagram({ className }: DiagramProps) {
  // 3x3 grid of cells; some pass (filled), some fail (empty), one ember-filled.
  const cells: Array<'pass' | 'fail' | 'accent'> = [
    'pass', 'pass', 'fail',
    'pass', 'accent', 'pass',
    'pass', 'fail', 'pass',
  ];
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-label="Eval suite artifact — a grid of test cases with pass and fail states."
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="10" y="8" width="100" height="124" rx="4" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />

      {/* Header */}
      <line x1="20" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text x="20" y="22" fontSize="8" fontFamily={FONT} fill="currentColor" fontWeight="600">Evals</text>

      {/* Grid */}
      {cells.map((state, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = 22 + col * 28;
        const y = 38 + row * 28;
        if (state === 'fail') {
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="22"
              height="22"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          );
        }
        const fill = state === 'accent' ? 'rgba(255,138,61,0.5)' : 'rgba(255,138,61,0.15)';
        return (
          <g key={i}>
            <rect x={x} y={y} width="22" height="22" rx="2" fill={fill} stroke="currentColor" strokeWidth="1" />
            <path
              d={`M ${x + 5} ${y + 11} L ${x + 9} ${y + 16} L ${x + 17} ${y + 7}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
    </svg>
  );
}

// ── 4. Weekly demo deck — slide with annotation lines ──────────────

export function WeeklyDemoDiagram({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      role="img"
      aria-label="Weekly demo artifact — a slide with a chart placeholder and notes."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Slide */}
      <rect x="12" y="20" width="116" height="78" rx="3" fill={NODE_FILL} stroke="currentColor" strokeWidth={STROKE} />
      {/* Slide title bar */}
      <rect x="22" y="30" width="48" height="5" fill="currentColor" />
      {/* Chart placeholder — small ascending bar chart */}
      <line x1="22" y1="88" x2="118" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="28" y="68" width="10" height="20" fill="rgba(255,138,61,0.18)" stroke="currentColor" strokeWidth="1" />
      <rect x="44" y="58" width="10" height="30" fill="rgba(255,138,61,0.22)" stroke="currentColor" strokeWidth="1" />
      <rect x="60" y="48" width="10" height="40" fill="rgba(255,138,61,0.28)" stroke="currentColor" strokeWidth="1" />
      <rect x="76" y="42" width="10" height="46" fill="rgba(255,138,61,0.36)" stroke="currentColor" strokeWidth="1" />
      <rect x="92" y="38" width="10" height="50" fill="rgba(255,138,61,0.5)" stroke="currentColor" strokeWidth="1" />

      {/* Notes lines below the slide */}
      <line x1="12" y1="112" x2="100" y2="112" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="120" x2="88" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="128" x2="68" y2="128" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
