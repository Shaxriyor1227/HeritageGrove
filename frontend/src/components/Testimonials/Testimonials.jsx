import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Testimonials.css';

const collectorReviews = [
  {
    id: 1,
    name: 'Henrik Vanger',
    role: 'Principal Architect, Vanger & Co.',
    location: 'Stockholm, Sweden',
    category: 'Architects',
    acquired: 'Kyoto Charcoal Ash Vase',
    rating: 5,
    date: 'March 2026',
    verified: true,
    text: 'We commissioned three monolithic vessels for a minimalist waterfront villa. The depth of the wood-fired reduction glaze is hypnotic; guests consistently pause and touch the surface. In a world of synthetic mass production, Heritage Grove is pure soul.',
    text_uz: 'Sohil bo\'yidagi minimalist villa uchun uchta maxsus vaza buyurtma qildik. Xumdon sirlarining chuqurligi sehrli darajada; mehmonlar doim to\'xtab, yuzasini ushlab ko\'rishadi. Ommaviy ishlab chiqarish davrida Heritage Grove chinakam san\'atdir.',
  },
  {
    id: 2,
    name: 'Chef Miho Tanaka',
    role: 'Three-Star Michelin Culinary Director',
    location: 'Kyoto, Japan',
    category: 'Culinary Masters',
    acquired: 'Raw Stoneware Tasting Bowls (Set of 12)',
    rating: 5,
    date: 'February 2026',
    verified: true,
    text: 'In kaiseki dining, the ceramic vessel is equal partner to the seasonal ingredient. Heritage Grove bowls elevate delicate broths with their thermal retention and unglazed tactile foot. Masterful craftsmanship.',
    text_uz: 'Kayseki taomlarida sopol idish fasliy masalliqlar kabi muhim o\'rin tutadi. Heritage Grove idishlari issiqlikni ajoyib saqlab, nozik ta\'mlarni yuksaltiradi. Yuksak mahorat.',
  },
  {
    id: 3,
    name: 'Julian Montgomery',
    role: 'Contemporary Art Collector & Patron',
    location: 'London, United Kingdom',
    category: 'Private Collectors',
    acquired: 'Celadon Arch-Guild Member Jar',
    rating: 5,
    date: 'January 2026',
    verified: true,
    text: 'The unboxing experience alone reflects consummate care. Encased in molded botanical fiber with a numbered kiln certificate. The crackle celadon glaze has subtle blue-green fissures that catch morning light like quiet water.',
    text_uz: 'Qadoqni ochish jarayonining o\'ziyoq yuksak ehtiromdan darak beradi. Raqamlangan sertifikat va xavfsiz quti. Ko\'kimtir seladon siri tonggi nurlarda tinch oqayotgan suvdek tovlanadi.',
  },
  {
    id: 4,
    name: 'Camilla & Jean-Paul Laurent',
    role: 'Interior Design Studio Principals',
    location: 'Geneva, Switzerland',
    category: 'Architects',
    acquired: 'Wood-Fired Anagama Pitcher',
    rating: 5,
    date: 'April 2026',
    verified: true,
    text: 'Flawless balance. The pitcher pours without a single drop lost, and the handle ergonomics fit naturally in hands of any size. It has become the centerpiece of our studio conference table.',
    text_uz: 'Mukammal muvozanat. Ko\'zadan bir tomchi ham to\'kilmasdan quyiladi, tutqichi esa har qanday qo\'lga nihoyatda qulay o\'tiradi. U studiyamiz stolining eng ko\'rkam bezagiga aylandi.',
  },
  {
    id: 5,
    name: 'David K. Chen',
    role: 'Gongfu Tea Practitioner & Author',
    location: 'San Francisco, USA',
    category: 'Private Collectors',
    acquired: 'Iron-Speckled Gaiwan & Cups',
    rating: 5,
    date: 'May 2026',
    verified: true,
    text: 'The porous stoneware breathes with each infusion. The lid fit is buttery smooth, and the clay retains the roasted floral fragrance of high-mountain wulong teas exquisitely.',
    text_uz: 'G\'ovakli sopol har bir damlamada choy bilan nafas oladi. Qopqog\'i juda silliq yopiladi va tog\' ulun choylarining xushbo\'y hidini uzoq saqlab turadi.',
  },
];

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');
  const [isPaused, setIsPaused] = useState(false);

  const tabs = ['All', 'Architects', 'Culinary Masters', 'Private Collectors'];

  const filteredReviews = collectorReviews.filter(
    (rev) => activeTab === 'All' || rev.category === activeTab
  );

  const marqueeItems = [...filteredReviews, ...filteredReviews, ...filteredReviews];

  return (
    <section id="collector-reviews" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div>
            <span className="testimonials-eyebrow">{t('reviews_eyebrow')}</span>
            <h2 className="testimonials-title">
              {t('reviews_title_1')} <em>{t('reviews_title_italic')}</em>
            </h2>
          </div>

          <div className="score-summary-card">
            <div className="score-number-row">
              <span className="big-rating">4.96</span>
              <span className="stars-glow">★★★★★</span>
            </div>
            <p className="score-subtitle">{t('reviews_score_banner')}</p>
          </div>
        </div>

        <p className="testimonials-lead-desc">
          {t('reviews_subtitle')}
        </p>

        {/* Categories Bar & Controls */}
        <div className="testimonials-control-bar">
          <div className="testimonials-filter-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? (lang === 'uz' ? 'Barchasi' : 'All') : tab}
              </button>
            ))}
          </div>

          <button
            className={`marquee-pause-toggle ${isPaused ? 'paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Play auto-scroll' : 'Pause auto-scroll'}
          >
            {isPaused ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{lang === 'uz' ? 'Harakatlantirish' : 'Play Scroll'}</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>{lang === 'uz' ? 'To\'xtatish' : 'Hover or Click to Pause'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Infinite Right-to-Left Auto-Scrolling Marquee Track */}
      <div className="testimonials-marquee-wrapper">
        <div
          className={`testimonials-marquee-track ${isPaused ? 'is-paused' : ''}`}
          style={{ animationDuration: `${Math.max(28, filteredReviews.length * 8)}s` }}
        >
          {marqueeItems.map((rev, index) => (
            <div key={`${rev.id}-${index}`} className="testimonial-card">
              <div className="testimonial-card-top">
                <div className="testimonial-stars">{'★'.repeat(rev.rating)}</div>
                <div className="testimonial-verified-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{lang === 'uz' ? 'Tasdiqlangan Xaridor' : 'Verified Kiln Patron'}</span>
                </div>
              </div>

              <p className="testimonial-quote-text">
                “{lang === 'uz' ? (rev.text_uz || rev.text) : rev.text}”
              </p>

              <div className="testimonial-acquired-box">
                <span className="acquired-label">{lang === 'uz' ? 'Xarid Qilingan:' : 'Acquired:'}</span>
                <span className="acquired-name">{rev.acquired}</span>
              </div>

              <div className="testimonial-author-block">
                <div className="author-avatar-initials">
                  {rev.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="author-name">{rev.name}</h4>
                  <div className="author-role">{rev.role}</div>
                  <div className="author-location">{rev.location} • {rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
