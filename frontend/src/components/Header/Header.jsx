import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header({ cartCount, onOpenCart, onOpenMemberCard }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="announcement-bar">
        <span>Complimentary global courier on bespoke orders over $150</span>
        <span>•</span>
        <span>Handcrafted Botanical Ceramic Ware</span>
      </div>

      <div className="header-main">
        <a href="#hero" className="header-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3v18M12 8a5 5 0 0 1 5-5 5 5 0 0 1-5 5M12 14a5 5 0 0 0-5-5 5 5 0 0 0 5 5" />
            </svg>
          </span>
          <span>Heritage Grove</span>
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item"><a href="#collection" onClick={(e) => handleNavClick(e, 'collection')}>Collection</a></li>
          <li className="nav-item"><a href="#pillars" onClick={(e) => handleNavClick(e, 'pillars')}>Standards</a></li>
          <li className="nav-item"><a href="#craft-process" onClick={(e) => handleNavClick(e, 'craft-process')}>The Craft</a></li>
          <li className="nav-item"><a href="#lookbook" onClick={(e) => handleNavClick(e, 'lookbook')}>Living Spaces</a></li>
          <li className="nav-item"><a href="#collector-reviews" onClick={(e) => handleNavClick(e, 'collector-reviews')}>Reviews</a></li>
          <li className="nav-item"><a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a></li>
          <li className="nav-item"><a href="#member-portal" onClick={(e) => handleNavClick(e, 'member-portal')}>Guild</a></li>
        </ul>

        <div className="header-actions">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
          <button
            className="action-btn"
            onClick={onOpenMemberCard}
            title="Open Virtual Member Card"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>Member Card</span>
          </button>

          <button
            className="action-btn"
            onClick={onOpenCart}
            title="View Cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
