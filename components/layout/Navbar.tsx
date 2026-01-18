'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Navbar() {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <Link href="/" className="logo">
              <span className="logo-text">SOLARIS</span>
            </Link>

            <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
              <li>
                <Link href="/#shop" onClick={closeMobileMenu}>
                  Shop
                </Link>
              </li>
              <li className="dropdown">
                <a href="/#apparel">
                  Apparel <i className="fas fa-chevron-down" style={{ fontSize: '0.7em', marginLeft: '4px' }}></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#lightning">Lightning Jiujitsu</a>
                  </li>
                  <li>
                    <a href="#show-all">Show All</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/#accessories" onClick={closeMobileMenu}>
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/#about" onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
            </ul>

              <div className="nav-icons">
                <ThemeToggle />
                <a href="/#search" className="nav-icon">
                  <i className="fas fa-search"></i>
                </a>
                <a href="/#account" className="nav-icon">
                  <i className="fas fa-user"></i>
                </a>
                <button
                  className="nav-icon cart-trigger"
                  aria-label="Open cart"
                  data-cart-trigger
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-count" data-cart-count>
                    0
                  </span>
                </button>
                <button
                  className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
