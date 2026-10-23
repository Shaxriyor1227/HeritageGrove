import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Lookbook.css';

const lookbookSpaces = [
  {
    id: 1,
    title: 'Brutalist Concrete Dining Table',
    title_uz: 'Brutalist Beton Ovqatlanish Stoli',
    category: 'Dining & Feast',
    category_uz: 'Dasturxon & Ziyofat',
    room: 'Zurich Penthouse',
    featured: 'Speckled Stoneware Platter & Mezze Bowls',
    featured_uz: 'Nuqtali tosh likopchalar va sharqona kosalar',
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=900&q=80',
    desc: 'Contrasting the crisp geometric lines of raw architectural concrete with the soft, organic undulation of wood-fired dinnerware.',
    desc_uz: "Arxitektura betonining geometrik qat'iyligini o'tin xumdonida pishgan nozik sopol idishlarning yumshoq to'lqinlari bilan uyg'unlashtirish.",
  },
  {
    id: 2,
    title: 'Morning Sun Tea Chamber',
    title_uz: 'Tonggi Quyosh Choy Xonasi',
    category: 'Tea Sanctuary',
    category_uz: 'Choy Makoni',
    room: 'Kyoto-Style Tea Room',
    featured: 'Ash-Glazed Kyusu & Iron Teacups',
    featured_uz: 'Kul sirli Kyusu choynagi va piyolalar',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    desc: 'Soft cedarwood slats, tatami mat flooring, and natural morning light illuminate the matte celadon glaze of our ritual tea set.',
    desc_uz: 'Kedr yog\'ochi devorlari va tabiiy quyosh nurlari an\'anaviy marosim choy to\'plamimizning nafis seladon sirini jilvalantiradi.',
  },
  {
    id: 3,
    title: 'The Ceramicist Solitary Mantel',
    title_uz: 'Ustaxonaning Sokin Kamini',
    category: 'Architectural Mantels',
    category_uz: 'Arxitektura Kamini',
    room: 'Oslo Studio Loft',
    featured: 'Monolithic Gourd Vase & Dried Orchard Branches',
    featured_uz: 'Monolit qovoqsimon vaza va quruq mevali shoxlar',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80',
    desc: 'A single dramatic silhouette holding wild dried plum branches, casting sculptural shadows across chalk lime plaster.',
    desc_uz: 'Ohak devor uzra haykaltaroshona soya tashlovchi yovvoyi olxo\'ri shoxlari solingan yagona mahobatli siluet.',
  },
  {
    id: 4,
    title: 'Open Studio Shelving System',
    title_uz: 'Ochiq Ustaxona Tokchalari',
    category: 'Studio Storage',
    category_uz: 'Ustaxona Tokchalari',
    room: 'Copenhagen Atelier',
    featured: 'Nested Fluted Bowls & Mineral Pitchers',
    featured_uz: 'To\'lqinsimon kosalar va mineral ko\'zalar',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=900&q=80',
    desc: 'Everyday functional ware arranged in calm rhythmic progression. Durable, vitreous, and welcoming to daily touch.',
    desc_uz: 'Har kuni qo\'lga olish maroqli bo\'lgan, ritmik osoyishtalikda terilgan pishiq va nafis idishlar.',
  },
];

export default function Lookbook({ onExploreCollection }) {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filterOptions = [
    { key: 'All', label: lang === 'uz' ? 'Barchasi' : 'All' },
    { key: 'Tea Sanctuary', label: lang === 'uz' ? 'Choy Makoni' : 'Tea Sanctuary' },
    { key: 'Dining & Feast', label: lang === 'uz' ? 'Dasturxon & Ziyofat' : 'Dining & Feast' },
    { key: 'Architectural Mantels', label: lang === 'uz' ? 'Kamin & Tokcha' : 'Architectural Mantels' },
    { key: 'Studio Storage', label: lang === 'uz' ? 'Ustaxona' : 'Studio Storage' },
  ];

  const filteredItems = lookbookSpaces.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <section id="lookbook" className="lookbook-section">
      <div className="lookbook-container">
        <div className="lookbook-header">
          <span className="lookbook-eyebrow">{t('lookbook_eyebrow')}</span>
          <h2 className="lookbook-title">
            {t('lookbook_title_1')} <em>{t('lookbook_title_italic')}</em>
          </h2>
          <p className="lookbook-subtitle">
            {t('lookbook_subtitle')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="lookbook-filters">
          {filterOptions.map((f) => (
            <button
              key={f.key}
              className={`lookbook-filter-pill ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="lookbook-grid">
          {filteredItems.map((space) => (
            <div
              key={space.id}
              className="lookbook-card"
              onClick={() => setActiveModalItem(space)}
            >
              <div className="lookbook-img-wrap">
                <img
                  src={space.image}
                  alt={space.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="lookbook-card-overlay">
                  <span className="lookbook-inspect-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>{lang === 'uz' ? 'Muhitni Ko\'rish' : 'View Space Details'}</span>
                  </span>
                </div>
                <span className="lookbook-tag-pill">
                  {lang === 'uz' ? space.category_uz : space.category}
                </span>
              </div>

              <div className="lookbook-card-info">
                <span className="lookbook-room-label">{space.room}</span>
                <h3 className="lookbook-card-title">
                  {lang === 'uz' ? space.title_uz : space.title}
                </h3>
                <p className="lookbook-featured-line">
                  <strong>{lang === 'uz' ? 'Qo\'llangan Buyumlar:' : 'Featured Objects:'}</strong>{' '}
                  {lang === 'uz' ? space.featured_uz : space.featured}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook Inspection Modal with createPortal */}
        {activeModalItem && typeof document !== 'undefined' && createPortal(
          <div className="lookbook-modal-backdrop" onClick={() => setActiveModalItem(null)}>
            <div className="lookbook-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="lookbook-modal-close"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <div className="lookbook-modal-visual">
                <img src={activeModalItem.image} alt={activeModalItem.title} />
              </div>

              <div className="lookbook-modal-body">
                <span className="lookbook-modal-eyebrow">
                  {(lang === 'uz' ? activeModalItem.category_uz : activeModalItem.category)} • {activeModalItem.room}
                </span>
                <h3 className="lookbook-modal-title">
                  {lang === 'uz' ? activeModalItem.title_uz : activeModalItem.title}
                </h3>
                <p className="lookbook-modal-desc">
                  {lang === 'uz' ? activeModalItem.desc_uz : activeModalItem.desc}
                </p>

                <div className="lookbook-modal-featured-box">
                  <strong>{lang === 'uz' ? 'Kolleksiya Asarlari:' : 'Styled Ceramic Collection:'}</strong>
                  <span>{lang === 'uz' ? activeModalItem.featured_uz : activeModalItem.featured}</span>
                </div>

                <div className="lookbook-modal-actions">
                  {onExploreCollection && (
                    <button
                      className="lookbook-btn-primary"
                      onClick={() => {
                        setActiveModalItem(null);
                        onExploreCollection();
                      }}
                    >
                      {lang === 'uz' ? 'Kolleksiyani Xarid Qilish' : 'Shop Featured Collection'}
                    </button>
                  )}
                  <button
                    className="lookbook-btn-secondary"
                    onClick={() => setActiveModalItem(null)}
                  >
                    {lang === 'uz' ? 'Yopish' : 'Close View'}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
