import React from 'react';
import Link from 'next/link';
import LogoMark from './LogoMark';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <LogoMark className="navbar__logo-mark" />
            <span className="footer__logo-text">Spacecadet</span>
          </Link>
          <p className="footer__tagline">
            Building exceptional digital experiences at the intersection of design, technology, and strategy.
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Pages</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/capabilities">Capabilities</Link></li>
              <li><Link href="/approach">Approach</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Capabilities</h4>
            <ul>
              <li><Link href="/capabilities#custom-ai-products">Custom AI Products</Link></li>
              <li><Link href="/capabilities#ai-integrations">AI Integrations</Link></li>
              <li><Link href="/capabilities#agents-automation">Intelligent Agents</Link></li>
              <li><Link href="/capabilities#ai-strategy">AI Strategy</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><Link href="/contact">hello@spacecadet.io</Link></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Spacecadet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
