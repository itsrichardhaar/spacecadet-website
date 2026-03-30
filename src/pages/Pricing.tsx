import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from '../hooks/useInView';
import './Pricing.css';

const plans = [
  {
    name: 'Launchpad',
    tagline: 'For startups & MVPs ready to get off the ground.',
    badge: null,
    features: [
      'Single discipline engagement',
      'Up to 3-month project scope',
      'Dedicated project lead',
      'Weekly progress check-ins',
      'Source code & asset handoff',
      '30-day post-launch support',
    ],
    cta: "Let's Talk",
    featured: false,
  },
  {
    name: 'Orbit',
    tagline: 'For growth-stage teams that need a full crew.',
    badge: 'Most Popular',
    features: [
      '2–3 disciplines bundled',
      '3–6 month engagement',
      'Dedicated team of 3+',
      'Bi-weekly strategy sessions',
      'Design system included',
      'Priority Slack access',
      '60-day post-launch support',
    ],
    cta: "Let's Talk",
    featured: true,
  },
  {
    name: 'Command',
    tagline: 'For companies that want Spacecadet as a long-term partner.',
    badge: null,
    features: [
      'All four disciplines',
      'Ongoing retainer or project-based',
      'Embedded team model',
      'Weekly executive briefings',
      'Full IP transfer',
      'SLA guarantee',
      'Continuous support & iterations',
    ],
    cta: "Let's Talk",
    featured: false,
  },
];

const faqs = [
  {
    q: 'Why no listed prices?',
    a: "Every engagement is scoped to your specific goals, timeline, and team. We'd rather give you an accurate number after a quick conversation than a guess on a webpage.",
  },
  {
    q: 'How quickly can you start?',
    a: 'Typically within 1–2 weeks of scoping. Reach out and we\'ll confirm availability and match you with the right team.',
  },
  {
    q: 'Can we mix disciplines?',
    a: "Absolutely. Most of our best work happens at the intersection of design, engineering, and strategy. We'll recommend the right combination for your project.",
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Yes. Launchpad is designed exactly for that — focused scope, fast delivery, and a team that moves like a founding engineer.',
  },
];

const Pricing: React.FC = () => {
  const { ref: plansRef, inView: plansInView }   = useInView<HTMLElement>();
  const { ref: noteRef, inView: noteInView }     = useInView<HTMLDivElement>();
  const { ref: faqRef, inView: faqInView }       = useInView<HTMLElement>();
  const { ref: ctaRef, inView: ctaInView }       = useInView<HTMLElement>();

  return (
    <div className="pricing">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="pricing-hero">
        <div className="pricing-hero__glow pricing-hero__glow--1" />
        <div className="pricing-hero__glow pricing-hero__glow--2" />
        <div className="pricing-hero__inner">
          <p className="section-eyebrow animate-fade-up" style={{ animationDelay: '0ms' }}>Pricing</p>
          <h1 className="pricing-hero__heading animate-fade-up" style={{ animationDelay: '80ms' }}>
            Built around your mission,<br />
            <span className="pricing-hero__gradient">not a price sheet.</span>
          </h1>
          <p className="pricing-hero__sub animate-fade-up" style={{ animationDelay: '180ms' }}>
            Every engagement is custom-scoped. Pick a package that fits your stage
            and we'll align on details together.
          </p>
        </div>
      </section>

      {/* ── Plans ────────────────────────────────── */}
      <section ref={plansRef} className={`plans ${plansInView ? 'in-view' : ''}`}>
        <div className="plans__inner">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan-card scroll-fade-up ${plan.featured ? 'plan-card--featured' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.badge && (
                <div className="plan-card__badge">{plan.badge}</div>
              )}
              <div className="plan-card__header">
                <h2 className="plan-card__name">{plan.name}</h2>
                <p className="plan-card__tagline">{plan.tagline}</p>
              </div>

              <div className="plan-card__price-row">
                <span className="plan-card__price-label">Custom pricing</span>
              </div>

              <ul className="plan-card__features">
                {plan.features.map((f) => (
                  <li key={f} className="plan-card__feature">
                    <CheckIcon className="plan-card__check" fontSize="small" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`plan-card__cta ${plan.featured ? 'plan-card__cta--featured' : ''}`}
              >
                {plan.cta}
                <ArrowForwardIcon className="btn__arrow" fontSize="small" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Note ─────────────────────────────────── */}
      <div
        ref={noteRef}
        className={`pricing-note scroll-fade-up ${noteInView ? 'in-view' : ''}`}
      >
        <span className="pricing-note__dot" />
        All packages include a free scoping call. No commitment required.
      </div>

      {/* ── FAQ ──────────────────────────────────── */}
      <section ref={faqRef} className={`faq ${faqInView ? 'in-view' : ''}`}>
        <div className="faq__inner">
          <div className="section-header scroll-fade-up">
            <p className="section-eyebrow">Got questions?</p>
            <h2 className="section-title">Common questions,<br />straight answers.</h2>
          </div>
          <div className="faq__grid">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="faq__item scroll-fade-up"
                style={{ transitionDelay: `${80 + i * 80}ms` }}
              >
                <h3 className="faq__q">{item.q}</h3>
                <p className="faq__a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────── */}
      <section ref={ctaRef} className={`cta-band ${ctaInView ? 'in-view' : ''}`}>
        <div className="cta-band__glow" />
        <div className="cta-band__inner scroll-fade-up">
          <h2 className="cta-band__title">Ready to scope your project?</h2>
          <p className="cta-band__sub">
            Tell us what you're building. We'll come back within 24 hours.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Start the Conversation
            <ArrowForwardIcon className="btn__arrow" fontSize="small" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Pricing;
