import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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

  const desktopLinks = [
    { path: '/about', label: 'About' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/pricing', label: 'Pricing' },
  ];

  const mobileLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const mobileMenu = menuOpen
    ? ReactDOM.createPortal(
        <ul className="navbar__mobile-menu">
          <button
            className="navbar__mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
          {mobileLinks.map(({ path, label }) => (
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
        </ul>,
        document.body
      )
    : null;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <LogoMark className="navbar__logo-mark" />
            <span className="navbar__logo-text">Spacecadet</span>
          </Link>

          <ul className="navbar__links">
            {desktopLinks.map(({ path, label }) => (
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
      {mobileMenu}
    </>
  );
};

export default Navbar;
