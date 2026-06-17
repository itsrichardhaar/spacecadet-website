/**
 * Home page (server component). Data flows top-down:
 *
 *  - getCaseStudies() loads the case study MDX (server-side) and the
 *    most recent 3 are passed into <SelectedWork /> as a prop.
 *  - All motion-heavy sections are client components imported here.
 */
import CapabilitiesCinematic from '@/components/CapabilitiesCinematic';
import HomeCTABand from '@/components/HomeCTABand';
import HomeHero from '@/components/HomeHero';
import HowWeEngage from '@/components/HowWeEngage';
import InsightsPreview from '@/components/InsightsPreview';
import SelectedWork from '@/components/SelectedWork';
import SocialProofBar from '@/components/SocialProofBar';
import { getCaseStudies } from '@/lib/content/work';
import './home.css';

export default function HomePage() {
  const featuredStudies = getCaseStudies().slice(0, 3);

  return (
    <div className="home">
      <HomeHero />
      <SocialProofBar />
      <CapabilitiesCinematic />
      <SelectedWork
        studies={featuredStudies.map((s) => ({
          slug: s.slug,
          title: s.title,
          summary: s.metrics[0]
            ? `${s.metrics[0].label}: ${s.metrics[0].value}`
            : '',
          capabilityId: s.capability,
          year: s.year,
          coverImage: s.coverImage,
          detailImage: s.detailImage,
        }))}
      />
      <HowWeEngage />
      <InsightsPreview />
      <HomeCTABand />
    </div>
  );
}
