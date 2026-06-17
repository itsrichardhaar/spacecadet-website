/**
 * /capabilities — server component.
 *
 * Loads case studies (via getCaseStudies) and filters by capability
 * for the "Recent work in this capability" tiles. Motion-bearing
 * subcomponents are imported as client components.
 */
import CapabilitiesCTAClient from '@/components/CapabilitiesCTAClient';
import CapabilitiesHero from '@/components/CapabilitiesHero';
import CapabilitySectionClient, {
  type RelatedCaseStudy,
} from '@/components/CapabilitySectionClient';
import { capabilities, type CapabilityId } from '@/lib/capabilities';
import { getCaseStudiesByCapability } from '@/lib/content/work';
import './capabilities.css';

function relatedFor(id: CapabilityId): RelatedCaseStudy[] {
  return getCaseStudiesByCapability(id)
    .slice(0, 2)
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      summary: s.metrics[0]
        ? `${s.metrics[0].label}: ${s.metrics[0].value}`
        : '',
      coverImage: s.coverImage,
    }));
}

export default function CapabilitiesPage() {
  return (
    <div className="capabilities-page">
      <CapabilitiesHero />

      {capabilities.map((cap, index) => (
        <CapabilitySectionClient
          key={cap.id}
          cap={cap}
          index={index}
          related={relatedFor(cap.id)}
        />
      ))}

      <CapabilitiesCTAClient />
    </div>
  );
}
