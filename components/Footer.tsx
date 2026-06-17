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
              <li><Link href="/solutions">Solutions</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/solutions">Software Development</Link></li>
              <li><Link href="/solutions">Product &amp; UX Design</Link></li>
              <li><Link href="/solutions">AI Consulting</Link></li>
              <li><Link href="/solutions">Marketing Strategy</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><Link href="/contact">hello@spacecadet.io</Link></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a></li>
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
