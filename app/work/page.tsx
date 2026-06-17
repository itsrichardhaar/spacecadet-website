/**
 * /work — index page.
 *
 * Server Component. Reads case studies via getCaseStudies() and
 * hands a trimmed projection to the client grid. Featured tile +
 * 3-col grid layout.
 */
import type { Metadata } from 'next';
import WorkIndexGrid from '@/components/work/WorkIndexGrid';
import { capabilities } from '@/lib/capabilities';
import { getCaseStudies } from '@/lib/content/work';
import './work.css';

export const metadata: Metadata = {
  title: 'Work — Spacecadet',
  description:
    'Selected case studies from Spacecadet — custom AI products, AI integrations, and agentic systems for businesses that need to own their intelligence.',
};

function capabilityName(id: string): string {
  return capabilities.find((c) => c.id === id)?.name ?? id;
}

export default function WorkIndexPage() {
  const studies = getCaseStudies();

  return (
    <div className="work-index">
      <section className="work-index__hero">
        <div className="work-index__hero-inner">
          <p className="section-eyebrow">Selected work</p>
          <h1 className="work-index__heading">Recent builds</h1>
          <p className="work-index__sub">
            Custom AI products, integrations, and agentic systems we have
            shipped — all owned outright by the teams that hired us.
          </p>
        </div>
      </section>

      <section className="work-index__body">
        <div className="work-index__body-inner">
          {studies.length === 0 ? (
            <p className="work-index__empty">
              Real client case studies arrive with #30 — until then this
              page is intentionally quiet.
            </p>
          ) : (
            <WorkIndexGrid
              entries={studies.map((s) => ({
                slug: s.slug,
                title: s.title,
                summary: s.metrics[0]
                  ? `${s.metrics[0].label}: ${s.metrics[0].value}`
                  : '',
                capabilityId: s.capability,
                capabilityName: capabilityName(s.capability),
                year: s.year,
                coverImage: s.coverImage,
                detailImage: s.detailImage,
              }))}
            />
          )}
        </div>
      </section>
    </div>
  );
}
