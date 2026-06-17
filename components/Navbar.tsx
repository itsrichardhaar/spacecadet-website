'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoMark from './LogoMark';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const desktopLinks = [
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/approach', label: 'Approach' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About' },
  ];

  const mobileLinks = [
    { path: '/', label: 'Home' },
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/approach', label: 'Approach' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const mobileMenu =
    mounted && menuOpen
      ? createPortal(
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
                  href={path}
                  className={`navbar__link ${pathname === path ? 'navbar__link--active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="navbar__cta">
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
          <Link href="/" className="navbar__logo">
            <LogoMark className="navbar__logo-mark" />
            <span className="navbar__logo-text">Spacecadet</span>
          </Link>

          <ul className="navbar__links">
            {desktopLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`navbar__link ${pathname === path ? 'navbar__link--active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="navbar__cta">
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
