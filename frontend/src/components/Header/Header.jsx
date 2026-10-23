import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Header.css';

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenMemberCard,
  onOpenProfile,
  onOpenAuth,
  onOpenAdminPortal,
}) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
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
        <span>{t('announcement')}</span>
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

        {/* Cleaned Nav: FAQ and Reviews removed as requested for spacious breathing layout */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item">
            <a href="#collection" onClick={(e) => handleNavClick(e, 'collection')}>
              {t('nav_collection')}
            </a>
          </li>
          <li className="nav-item">
            <a href="#pillars" onClick={(e) => handleNavClick(e, 'pillars')}>
              {t('nav_standards')}
            </a>
          </li>
          <li className="nav-item">
            <a href="#craft-process" onClick={(e) => handleNavClick(e, 'craft-process')}>
              {t('nav_craft')}
            </a>
          </li>
          <li className="nav-item">
            <a href="#lookbook" onClick={(e) => handleNavClick(e, 'lookbook')}>
              {t('nav_spaces')}
            </a>
          </li>
          <li className="nav-item">
            <a href="#member-portal" onClick={(e) => handleNavClick(e, 'member-portal')}>
              {t('nav_guild')}
            </a>
          </li>
        </ul>

        <div className="header-actions">
          {/* Admin Studio Dedicated Portal Link (if user is Admin) */}
          {user?.role === 'admin' && (
            <button
              className="admin-portal-header-btn"
              onClick={onOpenAdminPortal}
              title="Open Full Studio Director Portal"
            >
              <span className="admin-pulsing-dot" />
              <span>⚡ Studio Admin</span>
            </button>
          )}

          {/* Wishlist Button with Badge */}
          <button
            className="action-icon-btn"
            onClick={onOpenWishlist}
            title={t('nav_wishlist')}
            aria-label="Open Wishlist"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={wishlistCount > 0 ? '#C46D4B' : 'none'}
              stroke={wishlistCount > 0 ? '#C46D4B' : 'currentColor'}
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="action-badge-dot">{wishlistCount}</span>}
          </button>

          {/* User Account / Profile Button */}
          {user ? (
            <button
              className="user-profile-header-btn"
              onClick={onOpenProfile}
              title={`${user.name} (${user.role === 'admin' ? 'Admin' : 'Patron'})`}
              aria-label="Open Patron Profile"
            >
              <span className="user-header-avatar">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="user-header-name">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              className="action-btn auth-login-btn"
              onClick={onOpenAuth}
              title="Sign In or Register"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{lang === 'uz' ? 'Kirish' : 'Sign In'}</span>
            </button>
          )}

          {/* Member Card Button */}
          <button
            className="action-btn member-card-btn"
            onClick={onOpenMemberCard}
            title={t('nav_member_card')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span className="btn-label-text">{t('nav_member_card')}</span>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            className="action-btn cart-btn"
            onClick={onOpenCart}
            title={t('nav_cart')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="btn-label-text">{t('nav_cart')}</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle */}
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
        </div>
      </div>
    </header>
  );
}
