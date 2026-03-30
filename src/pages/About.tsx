import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="about-hero__inner">
          <p className="section-eyebrow">About Us</p>
          <h1 className="about-hero__heading">
            We're a studio built<br />
            <span className="gradient-text">for ambitious work</span>
          </h1>
          <p className="about-hero__sub">
            Spacecadet was founded with one mission: to create the kind of studio we always wished existed — one that combines deep technical capability with genuine creative vision and business acumen.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="story">
        <div className="story__inner">
          <div className="story__text">
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
            <div className="story__card story__card--1">
              <span>2020</span>
              <p>Founded in Raleigh, NC</p>
            </div>
            <div className="story__card story__card--2">
              <span>2022</span>
              <p>Launched AI practice</p>
            </div>
            <div className="story__card story__card--3">
              <span>2024</span>
              <p>Expanded to 25 team members</p>
            </div>
            <div className="story__card story__card--4">
              <span>Today</span>
              <p>120+ projects, globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="values__inner">
          <div className="section-header">
            <p className="section-eyebrow">Our Values</p>
            <h2 className="section-title">The principles that<br />guide every decision</h2>
          </div>
          <div className="values__grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <div className="team__inner">
          <div className="section-header">
            <p className="section-eyebrow">The Team</p>
            <h2 className="section-title">Meet the people<br />behind the work</h2>
          </div>
          <div className="team__grid">
            {team.map((t) => (
              <div className="team-card" key={t.name}>
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

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta__inner">
          <h2>Want to work with us?</h2>
          <p>We'd love to learn about your project.</p>
          <Link to="/contact" className="btn btn--primary">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
