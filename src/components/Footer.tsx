import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoMark } from '../assets/space_cadet_logo.svg';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/solutions">Software Development</Link></li>
              <li><Link to="/solutions">Product &amp; UX Design</Link></li>
              <li><Link to="/solutions">AI Consulting</Link></li>
              <li><Link to="/solutions">Marketing Strategy</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/contact">hello@spacecadet.io</Link></li>
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
