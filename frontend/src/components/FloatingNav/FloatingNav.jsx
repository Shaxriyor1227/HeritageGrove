import React, { useState, useEffect } from 'react';
import './FloatingNav.css';

export default function FloatingNav({ onOpenConcierge, cartCount, onOpenCart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <aside className="floating-nav-dock" aria-label="Quick Access Controls">
      <button
        className="floating-dock-btn concierge"
        onClick={onOpenConcierge}
        title="Consult Studio Concierge"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="dock-tooltip">Concierge</span>
      </button>

      {cartCount > 0 && (
        <button
          className="floating-dock-btn cart"
          onClick={onOpenCart}
          title="Open Cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="dock-cart-badge">{cartCount}</span>
          <span className="dock-tooltip">Cart ({cartCount})</span>
        </button>
      )}

      <button
        className="floating-dock-btn top"
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <polyline points="18 15 12 9 6 15" />
        </svg>
        <span className="dock-tooltip">Back to Top</span>
      </button>
    </aside>
  );
}
