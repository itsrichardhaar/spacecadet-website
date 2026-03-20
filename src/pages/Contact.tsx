import React, { useState } from 'react';
import './Contact.css';

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const services = [
  'Software Development',
  'Product & UX Design',
  'AI Consulting',
  'Marketing Strategy',
  'Multiple Services',
  'Not sure yet',
];

const budgets = [
  'Under $10k',
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k+',
  'Let\'s discuss',
];

const contactInfo = [
  {
    icon: '✉',
    label: 'Email',
    value: 'hello@spacecadet.io',
    href: 'mailto:hello@spacecadet.io',
  },
  {
    icon: '◎',
    label: 'Location',
    value: 'Raleigh, North Carolina (Remote-first)',
    href: null,
  },
  {
    icon: '↗',
    label: 'Response time',
    value: 'Within 24 hours',
    href: null,
  },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="contact">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__glow" />
        <div className="contact-hero__inner">
          <p className="section-eyebrow">Contact</p>
          <h1 className="contact-hero__heading">
            Let's build something<br />
            <span className="gradient-text">remarkable together</span>
          </h1>
          <p className="contact-hero__sub">
            Tell us about your project. We'll review it and get back to you within one business day.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="contact-main">
        <div className="contact-main__inner">
          {/* Left: Info */}
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p className="contact-info__desc">
              Whether you have a fully scoped project or just an idea, we'd love to hear from you. No obligation, no sales pitch — just a real conversation.
            </p>

            <div className="contact-info__items">
              {contactInfo.map((item) => (
                <div className="contact-info__item" key={item.label}>
                  <div className="contact-info__item-icon">{item.icon}</div>
                  <div>
                    <p className="contact-info__item-label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="contact-info__item-value contact-info__item-value--link">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact-info__item-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-info__socials">
              <p className="contact-info__socials-label">Follow us</p>
              <div className="contact-info__socials-links">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble</a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>Message received!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service">Service Needed</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                      <option value="">Select a range…</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us about your project *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your goals, timeline, and anything else we should know…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? (
                    <span className="form-submit__spinner" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
