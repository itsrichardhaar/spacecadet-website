import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Solutions.css';

type Category = 'all' | 'dev' | 'design' | 'ai' | 'marketing';

const solutions = [
  {
    category: 'dev' as Category,
    tag: 'Software Development',
    title: 'Web & Mobile Applications',
    desc: 'End-to-end development of web and mobile products using React, Next.js, React Native, Node.js, and Python. We architect for scale from day one.',
    features: ['React / Next.js', 'React Native', 'Node.js / Python', 'API Design & Integration'],
  },
  {
    category: 'dev' as Category,
    tag: 'Software Development',
    title: 'MVP & Rapid Prototyping',
    desc: 'Get to market fast. We specialize in lean MVP development — helping startups validate ideas with real users before full investment.',
    features: ['2–6 week timelines', 'Investor-ready builds', 'User testing ready', 'Scalable foundation'],
  },
  {
    category: 'dev' as Category,
    tag: 'Software Development',
    title: 'Platform & API Engineering',
    desc: 'We build the infrastructure that powers your product — robust APIs, microservices, cloud deployments, and developer tooling.',
    features: ['REST & GraphQL APIs', 'Microservices', 'AWS / GCP / Azure', 'DevOps & CI/CD'],
  },
  {
    category: 'design' as Category,
    tag: 'Product & UX Design',
    title: 'Product Design & Strategy',
    desc: 'From concept to launch, we define product direction, user flows, and interaction design. We help you build the right thing — not just build it right.',
    features: ['Product strategy', 'User research', 'Wireframing', 'Roadmapping'],
  },
  {
    category: 'design' as Category,
    tag: 'Product & UX Design',
    title: 'UI Design & Design Systems',
    desc: 'Pixel-perfect visual design and comprehensive design systems that ensure consistency, speed up development, and scale with your team.',
    features: ['Figma design', 'Component libraries', 'Brand-aligned UI', 'Developer handoff'],
  },
  {
    category: 'ai' as Category,
    tag: 'AI Consulting',
    title: 'AI Product Integration',
    desc: 'We integrate large language models, vision models, and intelligent automation into your product to create differentiated user experiences.',
    features: ['LLM integration', 'RAG pipelines', 'AI-powered features', 'Claude / GPT / Gemini'],
  },
  {
    category: 'ai' as Category,
    tag: 'AI Consulting',
    title: 'AI Strategy & Roadmapping',
    desc: 'Not sure where AI fits in your business? We assess your operations, identify high-ROI opportunities, and build a pragmatic AI roadmap.',
    features: ['Opportunity mapping', 'ROI analysis', 'Build vs. buy', 'Risk assessment'],
  },
  {
    category: 'ai' as Category,
    tag: 'AI Consulting',
    title: 'Custom ML & Data Solutions',
    desc: 'For organizations with unique data needs — we build custom models, data pipelines, and analytics systems tailored to your domain.',
    features: ['Custom model training', 'Data pipelines', 'MLOps', 'Analytics dashboards'],
  },
  {
    category: 'marketing' as Category,
    tag: 'Marketing Strategy',
    title: 'Brand Identity & Positioning',
    desc: 'We craft brand stories, visual identities, and messaging frameworks that cut through the noise and resonate with your audience.',
    features: ['Brand strategy', 'Visual identity', 'Messaging & voice', 'Competitive positioning'],
  },
  {
    category: 'marketing' as Category,
    tag: 'Marketing Strategy',
    title: 'Growth & Digital Marketing',
    desc: 'Data-driven growth strategies spanning SEO, paid media, content marketing, and conversion optimization to fuel sustainable growth.',
    features: ['SEO / SEM', 'Paid media', 'Content strategy', 'CRO'],
  },
];

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'dev', label: 'Development' },
  { key: 'design', label: 'Design' },
  { key: 'ai', label: 'AI' },
  { key: 'marketing', label: 'Marketing' },
];

const tagColors: Record<string, string> = {
  'Software Development': '#4f7cff',
  'Product & UX Design': '#7c5cff',
  'AI Consulting': '#5cb8ff',
  'Marketing Strategy': '#ff5c9d',
};

const Solutions: React.FC = () => {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? solutions : solutions.filter((s) => s.category === active);

  return (
    <div className="solutions">
      {/* Hero */}
      <section className="solutions-hero">
        <div className="solutions-hero__glow" />
        <div className="solutions-hero__inner">
          <p className="section-eyebrow">Solutions</p>
          <h1 className="solutions-hero__heading">
            Everything you need<br />
            <span className="gradient-text">to build & grow</span>
          </h1>
          <p className="solutions-hero__sub">
            We offer a complete suite of services across software development, design, AI, and marketing — all under one roof.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="solutions-grid-section">
        <div className="solutions-grid-inner">
          <div className="solutions-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`solutions-filter ${active === f.key ? 'solutions-filter--active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="solutions-grid">
            {filtered.map((s) => (
              <div className="solution-card" key={s.title}>
                <div
                  className="solution-card__tag"
                  style={{ color: tagColors[s.tag], background: `${tagColors[s.tag]}18`, borderColor: `${tagColors[s.tag]}30` }}
                >
                  {s.tag}
                </div>
                <h3 className="solution-card__title">{s.title}</h3>
                <p className="solution-card__desc">{s.desc}</p>
                <ul className="solution-card__features">
                  {s.features.map((f) => (
                    <li key={f}>
                      <span className="solution-card__check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process">
        <div className="process__inner">
          <div className="section-header">
            <p className="section-eyebrow">How We Work</p>
            <h2 className="section-title">A process built for<br />clarity and momentum</h2>
          </div>
          <div className="process__steps">
            {[
              { n: '01', title: 'Discovery', desc: 'We start by deeply understanding your goals, users, and constraints. No assumptions.' },
              { n: '02', title: 'Strategy', desc: 'We propose a focused plan — what to build, how to build it, and what success looks like.' },
              { n: '03', title: 'Execution', desc: 'We deliver in short cycles with regular checkpoints so you\'re always in the loop.' },
              { n: '04', title: 'Launch & Scale', desc: 'We help you go live, measure what matters, and iterate toward sustained growth.' },
            ].map((step) => (
              <div className="process__step" key={step.n}>
                <span className="process__step-num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="solutions-cta">
        <div className="solutions-cta__inner">
          <h2>Not sure what you need?</h2>
          <p>Book a free 30-min call and we'll help you figure it out.</p>
          <Link to="/contact" className="btn btn--primary">Schedule a Call</Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
