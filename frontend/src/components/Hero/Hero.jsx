import React from 'react';
import { LeafSprigIcon } from '../icons/Icons.jsx';
import './Hero.css';

export default function Hero({ onExploreClick }) {
  return (
    <div className="hero-outer-wrapper">
      <section id="hero" className="hero-section reveal-on-scroll is-revealed">
        <div className="hero-content">
          <div className="hero-pill">
            <LeafSprigIcon size={14} color="var(--ink)" />
            <span>Artisanal Chapter 2026</span>
          </div>

          <h1 className="hero-title">
            Vessels of <em>Quiet Elegance</em> & Mountain Whispers
          </h1>

          <p className="hero-desc">
            Formed by natural mineral clay, shaped by patient hands, and tempered in traditional wood-fired kilns. Heritage Grove breathes ancient botanical tranquility into contemporary spaces.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={onExploreClick}
              title="Explore ceramic collection"
            >
              <span>Explore Collection</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a href="#craft-story" className="btn-secondary">
              Our Kiln Philosophy
            </a>
          </div>

          <div className="hero-trust-proof-strip">
            <div className="proof-pill">
              <span className="proof-star">★</span>
              <span><strong>4.96/5</strong> from 850+ Patrons</span>
            </div>
            <div className="proof-divider">•</div>
            <div className="proof-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Wood-Fired at 1,320°C</span>
            </div>
            <div className="proof-divider">•</div>
            <div className="proof-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Insured White-Glove Transit</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85"
              alt="Artisan ceramic teapot and cup set on natural stone"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="600"
              height="450"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=85";
              }}
            />
          </div>

          <div className="hero-floating-tag">
            <div className="tag-icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--ink)' }}>Bespoke Masterpiece</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--ink-soft)' }}>Limited kiln release • 48 units</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
