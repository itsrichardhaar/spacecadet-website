import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as LogoMark } from '../assets/space_cadet_logo.svg';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <LogoMark className="navbar__logo-mark" />
          <span className="navbar__logo-text">Spacecadet</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__link ${location.pathname === path ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="navbar__cta">
              Get Started
            </Link>
          </li>
        </ul>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
