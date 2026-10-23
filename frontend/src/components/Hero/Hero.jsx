import React from 'react';
import { LeafSprigIcon } from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Hero.css';

export default function Hero({ onExploreClick }) {
  const { t, lang } = useLanguage();

  return (
    <div className="hero-outer-wrapper">
      <section id="hero" className="hero-section reveal-on-scroll is-revealed">
        <div className="hero-content">
          <div className="hero-pill">
            <LeafSprigIcon size={14} color="var(--ink)" />
            <span>{t('hero_pill')}</span>
          </div>

          <h1 className="hero-title">
            {t('hero_title_1')} <em>{t('hero_title_italic')}</em> {t('hero_title_2')}
          </h1>

          <p className="hero-desc">
            {t('hero_desc')}
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={onExploreClick}
              title="Explore ceramic collection"
            >
              <span>{t('hero_btn_explore')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a href="#craft-story" className="btn-secondary">
              {t('hero_btn_story')}
            </a>
          </div>

          <div className="hero-trust-proof-strip">
            <div className="proof-pill">
              <span className="proof-star">★</span>
              <span><strong>4.96/5</strong> {t('hero_proof_rating')}</span>
            </div>
            <div className="proof-divider">•</div>
            <div className="proof-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{t('hero_proof_kiln')}</span>
            </div>
            <div className="proof-divider">•</div>
            <div className="proof-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>{t('hero_proof_courier')}</span>
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
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--ink)' }}>
                {t('hero_floating_title')}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--ink-soft)' }}>
                {t('hero_floating_sub')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
