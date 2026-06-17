'use client';

/**
 * Client wrapper for the /work index. Reads a trimmed projection of
 * case studies, renders a featured tile (2-col wide) over a 3-col
 * grid, applies stagger fade-up entrance per tile, and wires the
 * cover -> detail hover swap on desktop.
 */
import Link from 'next/link';
import { capabilities } from '@/lib/capabilities';
import { useScrollReveal } from '@/hooks/motionPrimitives';

export interface WorkIndexEntry {
  slug: string;
  title: string;
  summary: string;
  capabilityId: string;
  capabilityName: string;
  year: number;
  coverImage: string;
  detailImage?: string;
}

interface WorkIndexGridProps {
  entries: WorkIndexEntry[];
}

export default function WorkIndexGrid({ entries }: WorkIndexGridProps) {
  if (entries.length === 0) return null;
  const [featured, ...rest] = entries;

  return (
    <div className="work-index__grid">
      <WorkTile entry={featured} index={0} variant="featured" />
      {rest.map((entry, i) => (
        <WorkTile key={entry.slug} entry={entry} index={i + 1} variant="standard" />
      ))}
    </div>
  );
}

function WorkTile({
  entry,
  index,
  variant,
}: {
  entry: WorkIndexEntry;
  index: number;
  variant: 'featured' | 'standard';
}) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    y: 24,
    scale: 0.98,
    delay: index * 0.06,
    duration: 0.6,
  });

  return (
    <Link
      ref={ref}
      href={`/work/${entry.slug}`}
      className={`work-tile work-tile--${variant}`}
    >
      <div className="work-tile__cover">
        <div
          className="work-tile__cover-image"
          style={{ backgroundImage: `url(${entry.coverImage})` }}
        />
        {entry.detailImage && (
          <div
            className="work-tile__cover-detail"
            style={{ backgroundImage: `url(${entry.detailImage})` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="work-tile__body">
        <div className="work-tile__meta">
          <span className="work-tile__tag">{entry.capabilityName}</span>
          <span className="work-tile__year">{entry.year}</span>
        </div>
        <h3 className="work-tile__title">{entry.title}</h3>
        <p className="work-tile__summary">{entry.summary}</p>
      </div>
    </Link>
  );
}

/** Helper: turn a CapabilityId into its display name without importing
 *  client/server data into the component itself. */
export function capabilityNameFor(id: string): string {
  return capabilities.find((c) => c.id === id)?.name ?? id;
}
