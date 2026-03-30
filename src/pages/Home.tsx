import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from '../hooks/useInView';
import './Home.css';

const stats = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '6 yrs', label: 'Industry Experience' },
  { value: '40+',  label: 'Happy Clients' },
  { value: '4',    label: 'Core Disciplines' },
];

const services = [
  {
    icon: '⌨️',
    title: 'Software Development',
    desc: 'From MVPs to enterprise platforms, we craft robust, scalable software using modern tech stacks — React, Node, Python, and more.',
  },
  {
    icon: '✦',
    title: 'Product & UX Design',
    desc: 'We design intuitive products that users love. Deep research, wireframes, design systems, and pixel-perfect interfaces.',
  },
  {
    icon: '◈',
    title: 'AI Consulting',
    desc: 'We help you integrate AI strategically — from LLM-powered features to intelligent automation and data-driven products.',
  },
  {
    icon: '◎',
    title: 'Marketing Strategy',
    desc: 'Launch, grow, and scale. We build brand narratives, digital campaigns, and growth strategies that convert.',
  },
];

const Home: React.FC = () => {
  const { ref: statsRef, inView: statsInView }       = useInView<HTMLElement>();
  const { ref: servicesRef, inView: servicesInView } = useInView<HTMLElement>();
  const { ref: ctaRef, inView: ctaInView }           = useInView<HTMLElement>();

  return (
    <div className="home">

      {/* ── Hero ──────────────────────────────────── */}
      <section className="hero">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__inner">
          <div className="hero__badge animate-fade-up" style={{ animationDelay: '0ms' }}>
            <span className="hero__badge-dot" />
            Available for new projects
          </div>
          <h1 className="hero__heading animate-fade-up" style={{ animationDelay: '80ms' }}>
            Ready. Set.
            <span className="hero__heading-gradient"> Launch.</span>
          </h1>
          <p className="hero__sub animate-fade-up" style={{ animationDelay: '180ms' }}>
            Spacecadet is a multidisciplinary studio delivering software development, product design,
            AI integration, and marketing strategy for ambitious companies.
          </p>
          <div className="hero__actions animate-fade-up" style={{ animationDelay: '280ms' }}>
            <Link to="/solutions" className="btn btn--primary">
              Explore Solutions
              <ArrowForwardIcon className="btn__arrow" fontSize="small" />
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Start a Project
              <ArrowForwardIcon className="btn__arrow" fontSize="small" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <section
        ref={statsRef}
        className={`stats ${statsInView ? 'in-view' : ''}`}
      >
        <div className="stats__inner">
          {stats.map((s, i) => (
            <div
              className="stats__item scroll-fade-up"
              key={s.label}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────── */}
      <section
        ref={servicesRef}
        className={`services ${servicesInView ? 'in-view' : ''}`}
      >
        <div className="services__inner">
          <div className="section-header scroll-fade-up" style={{ transitionDelay: '0ms' }}>
            <p className="section-eyebrow">What we do</p>
            <h2 className="section-title">Four disciplines,<br />one cohesive team</h2>
          </div>
          <div className="services__grid">
            {services.map((s, i) => (
              <div
                className="service-card scroll-fade-up"
                key={s.title}
                style={{ transitionDelay: `${80 + i * 100}ms` }}
              >
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <Link to="/solutions" className="service-card__link">
                  Learn more
                  <ArrowForwardIcon className="service-card__arrow" fontSize="small" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ──────────────────────────────── */}
      <section
        ref={ctaRef}
        className={`cta-band ${ctaInView ? 'in-view' : ''}`}
      >
        <div className="cta-band__glow" />
        <div className="cta-band__inner scroll-fade-up">
          <h2 className="cta-band__title">Ready to launch something great?</h2>
          <p className="cta-band__sub">
            Tell us about your project. We'll come back within 24 hours.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Get in Touch
            <ArrowForwardIcon className="btn__arrow" fontSize="small" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
