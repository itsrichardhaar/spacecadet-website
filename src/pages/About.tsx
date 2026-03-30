import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from '../hooks/useInView';
import './About.css';

const values = [
  {
    icon: '◈',
    title: 'Craft Over Speed',
    desc: 'We never cut corners. Every decision — from architecture to pixel — is made with long-term quality in mind.',
  },
  {
    icon: '⊕',
    title: 'Radical Transparency',
    desc: 'You always know what we\'re doing, why, and how. No surprises on deliverables, timelines, or budgets.',
  },
  {
    icon: '⌬',
    title: 'Outcome-Driven',
    desc: 'We measure success by your results — not by lines of code shipped or deliverables checked off.',
  },
  {
    icon: '◯',
    title: 'Relentless Curiosity',
    desc: 'We stay on the frontier. From emerging AI frameworks to cutting-edge design systems, we keep learning.',
  },
];

const team = [
  {
    name: 'Richard Haar',
    role: 'Co-Founder & CTO',
    bio: 'Full-stack engineer with 12 years building products at startups and Fortune 500s.',
    initials: 'RH',
    color: '#4f7cff',
  },
  {
    name: 'Andrew Thomasson',
    role: 'Co-Founder & CFO',
    bio: 'Former lead at a top-tier commercial insurance consultancy.',
    initials: 'AT',
    color: '#7c5cff',
  },
  {
    name: 'Tony Shaw',
    role: 'UI Design & AI Lead',
    bio: 'Has shipped AI features used by millions of people.',
    initials: 'TS',
    color: '#5cb8ff',
  },
  {
    name: 'Neil Lewis',
    role: 'Marketing Director',
    bio: 'Growth strategist who has scaled brands from seed to Series C and beyond.',
    initials: 'NL',
    color: '#ff5c9d',
  },
];

const About: React.FC = () => {
  const { ref: storyRef,  inView: storyInView  } = useInView<HTMLElement>();
  const { ref: valuesRef, inView: valuesInView } = useInView<HTMLElement>();
  const { ref: teamRef,   inView: teamInView   } = useInView<HTMLElement>();
  const { ref: ctaRef,    inView: ctaInView    } = useInView<HTMLElement>();

  return (
    <div className="about">

      {/* ── Hero ──────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="about-hero__inner">
          <p className="section-eyebrow animate-fade-up" style={{ animationDelay: '0ms' }}>About Us</p>
          <h1 className="about-hero__heading animate-fade-up" style={{ animationDelay: '80ms' }}>
            We're a studio built<br />
            <span className="gradient-text">for ambitious work</span>
          </h1>
          <p className="about-hero__sub animate-fade-up" style={{ animationDelay: '180ms' }}>
            Spacecadet was founded with one mission: to create the kind of studio we always wished existed — one that combines deep technical capability with genuine creative vision and business acumen.
          </p>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────── */}
      <section ref={storyRef} className={`story ${storyInView ? 'in-view' : ''}`}>
        <div className="story__inner">
          <div className="story__text scroll-fade-up" style={{ transitionDelay: '0ms' }}>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title">From a team of four<br />to a full-service studio</h2>
            <p>
              We started in a small office with four people and a belief that most agencies were choosing between good design and good engineering. We refused to make that trade.
            </p>
            <p>
              Over six years, we've grown into a tight-knit team of designers, engineers, strategists, and AI specialists — all working in lockstep to deliver products that are both beautiful and bulletproof.
            </p>
            <p>
              Every engagement is a collaboration. We embed with your team, learn your business, and treat your problem like our own.
            </p>
          </div>
          <div className="story__visual">
            {[
              { year: '2020', text: 'Founded in Raleigh, NC' },
              { year: '2022', text: 'Launched AI practice' },
              { year: '2024', text: 'Expanded to 25 team members' },
              { year: 'Today', text: '120+ projects, globally' },
            ].map((card, i) => (
              <div
                key={card.year}
                className={`story__card scroll-fade-up`}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <span>{card.year}</span>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────── */}
      <section ref={valuesRef} className={`values ${valuesInView ? 'in-view' : ''}`}>
        <div className="values__inner">
          <div className="section-header scroll-fade-up" style={{ transitionDelay: '0ms' }}>
            <p className="section-eyebrow">Our Values</p>
            <h2 className="section-title">The principles that<br />guide every decision</h2>
          </div>
          <div className="values__grid">
            {values.map((v, i) => (
              <div
                className="value-card scroll-fade-up"
                key={v.title}
                style={{ transitionDelay: `${80 + i * 80}ms` }}
              >
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────── */}
      <section ref={teamRef} className={`team ${teamInView ? 'in-view' : ''}`}>
        <div className="team__inner">
          <div className="section-header scroll-fade-up" style={{ transitionDelay: '0ms' }}>
            <p className="section-eyebrow">The Team</p>
            <h2 className="section-title">Meet the people<br />behind the work</h2>
          </div>
          <div className="team__grid">
            {team.map((t, i) => (
              <div
                className="team-card scroll-fade-up"
                key={t.name}
                style={{ transitionDelay: `${80 + i * 80}ms` }}
              >
                <div className="team-card__avatar" style={{ background: `${t.color}22`, border: `2px solid ${t.color}44` }}>
                  <span style={{ color: t.color }}>{t.initials}</span>
                </div>
                <div className="team-card__info">
                  <h3>{t.name}</h3>
                  <p className="team-card__role">{t.role}</p>
                  <p className="team-card__bio">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section ref={ctaRef} className={`about-cta ${ctaInView ? 'in-view' : ''}`}>
        <div className="about-cta__inner scroll-fade-up">
          <h2>Want to work with us?</h2>
          <p>We'd love to learn about your project.</p>
          <Link to="/contact" className="btn btn--primary">
            Get in Touch
            <ArrowForwardIcon className="btn__arrow" fontSize="small" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
