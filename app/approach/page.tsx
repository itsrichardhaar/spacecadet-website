'use client';

/**
 * /approach page (#15).
 *
 * Opinionated, specific, and price-transparent. Replaces the generic
 * Discovery → Strategy → Build → Launch template every studio runs
 * with the operating principles Spacecadet actually engages on.
 *
 * Sections:
 *   1. Hero — eyebrow + H1 + POV paragraph
 *   2. Engagement models — full schema from lib/engagementModels
 *      (this is the ONLY page that may render priceRange)
 *   3. Weekly rhythm — what a week looks like inside a Build engagement
 *   4. POVs — 5 stated opinions Spacecadet operates on
 *   5. Artifacts — small SVG illustrations of what gets shipped
 *   6. Bottom CTA
 */
import {
  ArchitectureSketchDiagram,
  DiscoveryBriefDiagram,
  EvalSuiteDiagram,
  WeeklyDemoDiagram,
} from '@/components/diagrams/ApproachDiagrams';
import Button from '@/components/Button';
import { engagementModels, type EngagementModel } from '@/lib/engagementModels';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './approach.css';

interface POV {
  id: string;
  title: string;
  body: string;
}

const povs: POV[] = [
  {
    id: 'evals-before-features',
    title: 'We build evals before features.',
    body:
      'Models that ship without measurable evaluations fail silently in production. We define the metrics that matter before we write the prompt, and we keep them as the contract for what done looks like.',
  },
  {
    id: 'real-data-week-one',
    title: 'We require real production data access in week 1 — or we do not take the engagement.',
    body:
      'Synthetic data tells you nothing useful about an AI system. If we cannot read the actual data the model will operate on, we cannot honestly scope, estimate, or evaluate the build.',
  },
  {
    id: 'poc-by-week-four',
    title: 'We ship a working POC by week 4 — or we restructure the engagement.',
    body:
      'If we cannot get a functional proof of concept in front of you by week 4, the scope is wrong and we are pretending. We stop, restructure, and refund the difference rather than spend the next 12 weeks finishing a thing that should not exist.',
  },
  {
    id: 'no-fixed-scope-on-ai',
    title: 'We do not do fixed-scope on AI work.',
    body:
      'AI projects are research projects, and research with a fixed scope produces fixed-scope output — not the right answer. We engage in time-boxed cycles with clear go / no-go gates instead.',
  },
  {
    id: 'owned-code-owned-models',
    title: 'You own the code, the models, and the data integration.',
    body:
      'No vendor lock-in, no proprietary runtime, no "open core" surprise. We hand off complete codebases with deployment runbooks and the eval suite that proves it works.',
  },
];

interface Artifact {
  id: string;
  name: string;
  description: string;
  Diagram: (props: { className?: string }) => React.ReactElement;
}

const artifacts: Artifact[] = [
  {
    id: 'discovery-brief',
    name: 'Discovery brief',
    description:
      'A scoped roadmap with build-vs-buy reasoning and a recommended POC plan, delivered end of Discovery.',
    Diagram: DiscoveryBriefDiagram,
  },
  {
    id: 'architecture-sketch',
    name: 'Architecture sketch',
    description:
      'Component diagram + data-flow notes for the system we are proposing to build. Shipped before any production code.',
    Diagram: ArchitectureSketchDiagram,
  },
  {
    id: 'eval-suite',
    name: 'Eval suite',
    description:
      'The set of test cases we measure the model against — and the score thresholds that gate every release.',
    Diagram: EvalSuiteDiagram,
  },
  {
    id: 'weekly-demo',
    name: 'Weekly demo + decisions log',
    description:
      'Every Friday: a 20-minute working demo, a one-page summary of what shipped, and the decisions we need from you next week.',
    Diagram: WeeklyDemoDiagram,
  },
];

const weeklyRhythm = [
  {
    day: 'Mon',
    title: '30-minute planning sync',
    detail: 'We confirm the week\'s goal and surface any blocker we need from your team.',
  },
  {
    day: 'Tue–Thu',
    title: 'Heads-down build + async updates',
    detail: 'Continuous Slack updates with code links and short Looms — no status meetings.',
  },
  {
    day: 'Fri',
    title: 'Working demo + decisions log',
    detail: 'A real demo against real data, plus a one-pager of what shipped and what we need next.',
  },
  {
    day: 'Every 2 weeks',
    title: 'Eval review + roadmap recheck',
    detail: 'We re-run the eval suite, decide what stays in scope, and confirm or adjust the remaining timeline.',
  },
];

export default function ApproachPage() {
  return (
    <div className="approach-page">
      <section className="approach-hero">
        <div className="approach-hero__inner">
          <p className="section-eyebrow">Approach</p>
          <RevealText
            as="h1"
            unit="char"
            stagger={22}
            trigger="load"
            className="approach-hero__heading"
          >
            How we engage on AI builds
          </RevealText>
          <RevealText
            as="p"
            unit="word"
            stagger={50}
            delay={800}
            trigger="load"
            className="approach-hero__pov"
          >
            We don&apos;t do fixed-scope on AI work. AI projects are research projects — research with a fixed scope produces fixed-scope output, not the right answer. Here is how we engage instead.
          </RevealText>
        </div>
      </section>

      <section className="approach-models">
        <div className="approach-section__inner">
          <header className="approach-section__head">
            <p className="section-eyebrow">Engagement models</p>
            <RevealText as="h2" unit="word" stagger={60} className="approach-section__title">
              Three ways to work with us
            </RevealText>
          </header>
          <div className="approach-models__grid">
            {engagementModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      <section className="approach-rhythm">
        <div className="approach-section__inner">
          <header className="approach-section__head">
            <p className="section-eyebrow">Weekly rhythm</p>
            <RevealText as="h2" unit="word" stagger={60} className="approach-section__title">
              What a week looks like inside a Build engagement
            </RevealText>
          </header>
          <ol className="approach-rhythm__list">
            {weeklyRhythm.map((row) => (
              <li key={row.day} className="approach-rhythm__row">
                <span className="approach-rhythm__day">{row.day}</span>
                <div className="approach-rhythm__body">
                  <h3>{row.title}</h3>
                  <p>{row.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="approach-povs">
        <div className="approach-section__inner">
          <header className="approach-section__head">
            <p className="section-eyebrow">What we believe</p>
            <RevealText as="h2" unit="word" stagger={60} className="approach-section__title">
              Five non-negotiables
            </RevealText>
          </header>
          <ul className="approach-povs__list">
            {povs.map((pov) => (
              <li key={pov.id} className="approach-povs__row">
                <h3>{pov.title}</h3>
                <p>{pov.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="approach-artifacts">
        <div className="approach-section__inner">
          <header className="approach-section__head">
            <p className="section-eyebrow">Artifacts</p>
            <RevealText as="h2" unit="word" stagger={60} className="approach-section__title">
              What you actually receive
            </RevealText>
          </header>
          <div className="approach-artifacts__grid">
            {artifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        </div>
      </section>

      <section className="approach-cta">
        <div className="approach-cta__inner">
          <RevealText as="h2" unit="word" stagger={60} className="approach-cta__title">
            Want to start with a Discovery sprint?
          </RevealText>
          <p className="approach-cta__sub">
            Two weeks, scoped POC + roadmap, full pricing transparency. Book a discovery call and we&apos;ll figure out if it&apos;s the right shape together.
          </p>
          <Button href="/contact">Book a discovery call</Button>
        </div>
      </section>
    </div>
  );
}

function ModelCard({ model }: { model: EngagementModel }) {
  return (
    <article id={model.id} className="approach-model">
      <header className="approach-model__head">
        <h3 className="approach-model__name">{model.name}</h3>
        <span className="approach-model__price">{model.priceRange}</span>
      </header>
      <p className="approach-model__duration">{model.duration}</p>
      <p className="approach-model__deliverable">{model.deliverable}</p>
      <p className="approach-model__buyer">
        <span className="approach-model__buyer-label">For</span>
        <span>{model.buyer}</span>
      </p>
    </article>
  );
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const ref = useScrollReveal<HTMLDivElement>({
    y: 20,
    scale: 0.98,
    delay: 0.1,
    duration: 0.6,
  });
  const { Diagram } = artifact;
  return (
    <div ref={ref} className="approach-artifact">
      <div className="approach-artifact__diagram-wrap">
        <Diagram className="approach-artifact__diagram" />
      </div>
      <h3 className="approach-artifact__name">{artifact.name}</h3>
      <p className="approach-artifact__description">{artifact.description}</p>
    </div>
  );
}
