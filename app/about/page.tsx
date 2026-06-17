'use client';

/**
 * /about page (#16).
 *
 * Four sections in a locked order — Origin / Beliefs / Team /
 * What we say no to — plus a bottom CTA. Type-dominant, no
 * decorative imagery per the PRD's art direction (F).
 *
 * The "What we say no to" section is non-negotiable: it's the
 * most distinctive credibility move on the page.
 */
import Button from '@/components/Button';
import { RevealText, useScrollReveal } from '@/hooks/motionPrimitives';
import './about.css';

// ── Beliefs ─────────────────────────────────────────────────────────

interface Belief {
  id: string;
  title: string;
  body: string;
}

const beliefs: Belief[] = [
  {
    id: 'model-is-easy',
    title: 'Most AI integrations fail because the model is the easy part.',
    body:
      'The hard parts are the data pipeline, the evals, the deployment story, and the UX that lets a non-engineer trust the output. We treat all four as first-class engineering, not as scope creep.',
  },
  {
    id: 'own-your-data',
    title: 'Owning your data beats renting an API.',
    body:
      'Vendor SaaS rents you intelligence on someone else\'s terms — your latency, your privacy boundary, your roadmap. We design AI products that put your data inside your own walls, and that work when the vendor pivots.',
  },
  {
    id: 'working-poc',
    title: 'A working POC beats a polished plan.',
    body:
      'You learn more about an AI product from one week of real data than from a month of architecture review. We get a functional proof of concept in front of your team by week 4, and we use it to decide what to build next.',
  },
  {
    id: 'evals-are-the-product',
    title: 'Evals are the product, not a checkpoint.',
    body:
      'No AI feature ships without measurable evaluations. The eval suite is the contract for what "done" means — and the regression net every future change has to pass.',
  },
];

// ── Team ────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  /** LinkedIn URL — TODO: replace `#` with real URLs before launch. */
  linkedinHref: string;
}

const team: TeamMember[] = [
  {
    name: 'Richard Haar',
    role: 'Co-Founder & CTO',
    initials: 'RH',
    bio: 'Full-stack engineer with 12 years building products at startups and Fortune 500s. Leads architecture and the engineering practice — eval design, data pipelines, deployment.',
    linkedinHref: '#',
  },
  {
    name: 'Andrew Thomasson',
    role: 'Co-Founder & CFO',
    initials: 'AT',
    bio: 'Former lead at a top-tier commercial insurance consultancy. Runs commercial strategy, scoping, and the part of every engagement where price meets reality.',
    linkedinHref: '#',
  },
  {
    name: 'Tony Shaw',
    role: 'UI Design & AI Lead',
    initials: 'TS',
    bio: 'Has shipped AI features used by millions of people. Owns the product surface: how the AI shows up in the UI and how users learn to trust it.',
    linkedinHref: '#',
  },
  {
    name: 'Neil Lewis',
    role: 'Marketing Director',
    initials: 'NL',
    bio: 'Growth strategist who has scaled brands from seed to Series C and beyond. Leads positioning, messaging, and the rest of how Spacecadet shows up in the world.',
    linkedinHref: '#',
  },
];

// ── What we say no to ──────────────────────────────────────────────

interface Refusal {
  id: string;
  title: string;
  body: string;
}

const refusals: Refusal[] = [
  {
    id: 'no-decorative-ai',
    title: 'We don\'t take projects where the AI is decorative.',
    body:
      'If your AI feature could be a heuristic in a sprint, we\'ll tell you. We build AI where the model is genuinely load-bearing — not a marketing checkbox.',
  },
  {
    id: 'no-fixed-scope',
    title: 'We don\'t do fixed-scope on AI builds.',
    body:
      'AI is research. We engage in time-boxed cycles with explicit go / no-go gates. If you need a fixed-price line-item RFP, we are the wrong studio.',
  },
  {
    id: 'no-synthetic-data',
    title: 'We don\'t engage without real production data access.',
    body:
      'In week 1, with the actual data the model will operate on. Without it we cannot honestly scope, estimate, or evaluate the build — and we will not pretend otherwise.',
  },
  {
    id: 'no-ghosting',
    title: 'We don\'t ghost.',
    body:
      'Every engagement ends with a wrap-up doc: what shipped, how it works, what to monitor, and what we would build next if we were you.',
  },
];

// ── Page ────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner">
          <p className="section-eyebrow">About</p>
          <RevealText
            as="h1"
            unit="char"
            stagger={22}
            trigger="load"
            className="about-hero__heading"
          >
            We build the AI nobody else will scope honestly.
          </RevealText>
          <RevealText
            as="p"
            unit="word"
            stagger={50}
            delay={800}
            trigger="load"
            className="about-hero__sub"
          >
            Spacecadet is a small AI-native product studio in Raleigh, NC. We take the hard, owned, proprietary-data builds — and we hand them off as code your team can keep.
          </RevealText>
        </div>
      </section>

      <section id="origin" className="about-section about-origin">
        <div className="about-section__inner">
          <header className="about-section__head">
            <p className="section-eyebrow">Origin</p>
            <RevealText
              as="h2"
              unit="word"
              stagger={60}
              className="about-section__title"
            >
              Why a studio, and why AI-native
            </RevealText>
          </header>
          <div className="about-origin__body">
            <p>
              Spacecadet was founded after we watched the same pattern play out at company after company: the AI products most businesses actually needed couldn&apos;t be bought, and most studios couldn&apos;t actually build them. Vendors sold &quot;AI-powered&quot; SaaS that didn&apos;t understand the customer&apos;s data. Agencies bolted chatbots onto products that needed deeper rethinking. The good work — the proprietary-data, compliance-bound, architecture-defining builds — kept getting deferred because nobody would scope it honestly.
            </p>
            <p>
              We built Spacecadet to take that work. We chose a studio shape (not a product company) because every serious AI build is its own problem and benefits from a team that ships, learns, and hands off ownership. We chose AI-native (not general dev) because the discipline is different — evals before features, real data in week 1, owned models over rented APIs.
            </p>
          </div>
        </div>
      </section>

      <section id="beliefs" className="about-section about-beliefs">
        <div className="about-section__inner">
          <header className="about-section__head">
            <p className="section-eyebrow">Beliefs</p>
            <RevealText
              as="h2"
              unit="word"
              stagger={60}
              className="about-section__title"
            >
              What we believe about building AI
            </RevealText>
          </header>
          <ul className="about-beliefs__list">
            {beliefs.map((belief, i) => (
              <BeliefRow key={belief.id} belief={belief} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section id="team" className="about-section about-team">
        <div className="about-section__inner">
          <header className="about-section__head">
            <p className="section-eyebrow">Team</p>
            <RevealText
              as="h2"
              unit="word"
              stagger={60}
              className="about-section__title"
            >
              The people behind the work
            </RevealText>
          </header>
          <ul className="about-team__list">
            {team.map((member, i) => (
              <TeamRow key={member.name} member={member} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section id="say-no" className="about-section about-refusals">
        <div className="about-section__inner">
          <header className="about-section__head">
            <p className="section-eyebrow">What we say no to</p>
            <RevealText
              as="h2"
              unit="word"
              stagger={60}
              className="about-section__title"
            >
              The standards we keep
            </RevealText>
            <p className="about-refusals__intro">
              The work we refuse is as load-bearing as the work we take. Here is what we won&apos;t do, framed honestly.
            </p>
          </header>
          <ul className="about-refusals__list">
            {refusals.map((refusal, i) => (
              <RefusalRow key={refusal.id} refusal={refusal} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta__inner">
          <RevealText as="h2" unit="word" stagger={60} className="about-cta__title">
            If this sounds like the right fit, let&apos;s talk.
          </RevealText>
          <p className="about-cta__sub">
            Book a 30-minute discovery call. We&apos;ll be honest about whether your project is the right shape for us.
          </p>
          <Button href="/contact">Book a discovery call</Button>
        </div>
      </section>
    </div>
  );
}

function BeliefRow({ belief, index }: { belief: Belief; index: number }) {
  const ref = useScrollReveal<HTMLLIElement>({
    y: 24,
    scale: 0.99,
    delay: index * 0.08,
    duration: 0.6,
  });
  return (
    <li ref={ref} className="about-beliefs__row">
      <h3 className="about-beliefs__title">{belief.title}</h3>
      <p className="about-beliefs__body">{belief.body}</p>
    </li>
  );
}

function TeamRow({ member, index }: { member: TeamMember; index: number }) {
  const ref = useScrollReveal<HTMLLIElement>({
    y: 20,
    scale: 0.99,
    delay: index * 0.08,
    duration: 0.55,
  });
  return (
    <li ref={ref} className="about-team__row">
      <div className="about-team__identity">
        <div className="about-team__avatar" aria-hidden="true">
          {member.initials}
        </div>
        <div>
          <h3 className="about-team__name">{member.name}</h3>
          <p className="about-team__role">{member.role}</p>
        </div>
      </div>
      <div className="about-team__body">
        <p className="about-team__bio">{member.bio}</p>
        <a
          href={member.linkedinHref}
          target="_blank"
          rel="noreferrer noopener"
          className="about-team__linkedin"
        >
          LinkedIn →
        </a>
      </div>
    </li>
  );
}

function RefusalRow({ refusal, index }: { refusal: Refusal; index: number }) {
  const ref = useScrollReveal<HTMLLIElement>({
    y: 20,
    scale: 0.99,
    delay: index * 0.08,
    duration: 0.55,
  });
  return (
    <li ref={ref} className="about-refusals__row">
      <span className="about-refusals__mark" aria-hidden="true">✕</span>
      <div>
        <h3 className="about-refusals__title">{refusal.title}</h3>
        <p className="about-refusals__body">{refusal.body}</p>
      </div>
    </li>
  );
}
