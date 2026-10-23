import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { products as fallbackProducts } from '../../data/products.js';
import { VesselIcon, CloseIcon } from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './FeaturedProducts.css';

export default function FeaturedProducts({ onAddToCart, wishlistItems = [], onToggleWishlist }) {
  const { t, lang } = useLanguage();
  const [productList, setProductList] = useState(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickQty, setQuickQty] = useState(1);

  // Fetch live from backend PostgreSQL API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        }
      })
      .catch(() => {
        // Fallback to static catalogue
      });
  }, []);

  const categories = [
    { key: "All", label: t('filter_all') },
    { key: "Vases", label: t('filter_vases') },
    { key: "Tableware", label: t('filter_tableware') },
    { key: "Decor", label: t('filter_decor') },
  ];

  // Filter & Sort calculation
  const displayedProducts = useMemo(() => {
    return productList
      .filter((p) => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [productList, activeCategory, searchQuery, sortBy]);

  const handleOpenQuickView = (product) => {
    setQuickViewItem(product);
    setQuickQty(1);
  };

  const handleQuickAdd = () => {
    if (quickViewItem) {
      for (let i = 0; i < quickQty; i++) {
        onAddToCart(quickViewItem);
      }
      setQuickViewItem(null);
    }
  };

  const isWishlisted = (id) => wishlistItems.some((w) => w.id === id);

  return (
    <section id="collection" className="products-section">
      <div className="products-header">
        <div>
          <div className="section-eyebrow">{t('collection_eyebrow')}</div>
          <h2 className="section-title">{t('collection_title')}</h2>
        </div>
      </div>

      {/* Toolbar: Category filters, search and sorting */}
      <div className="toolbar-container">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="toolbar-actions">
          <div className="search-box-wrap">
            <svg className="search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">{t('sort_featured')}</option>
            <option value="price-low">{t('sort_price_low')}</option>
            <option value="price-high">{t('sort_price_high')}</option>
            <option value="name">{t('sort_name')}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ink-soft)' }}>
          <p style={{ fontSize: '1.2rem', fontFamily: 'serif' }}>
            {lang === 'uz' ? 'Qidiruv bo\'yicha hech qanday keramika asari topilmadi.' : 'No ceramic works match your search inquiry.'}
          </p>
          <button
            className="filter-pill"
            style={{ marginTop: '0.75rem' }}
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
          >
            {lang === 'uz' ? 'Filtrlarni Tozalash' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {displayedProducts.map((product, index) => {
            const wished = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="product-card"
                style={{ animationDelay: `${(index % 8) * 0.08}s` }}
              >
                <div
                  className="product-image-box"
                  onClick={() => handleOpenQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <span className="product-tag">{product.tag || 'Handmade'}</span>

                  {/* WISHLIST TOGGLE BUTTON - ITEM 4 */}
                  <button
                    className={`product-wishlist-toggle-btn ${wished ? 'wished' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(product);
                    }}
                    title={wished ? t('remove_wishlist') : t('add_wishlist')}
                    aria-label="Toggle Wishlist"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={wished ? '#C46D4B' : 'none'}
                      stroke={wished ? '#C46D4B' : 'currentColor'}
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <div className="quick-view-overlay-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{t('quick_view')}</span>
                  </div>
                </div>

                <div className="product-info">
                  <span className="product-cat">{product.category}</span>
                  <h3 className="product-name" onClick={() => handleOpenQuickView(product)}>
                    {product.name}
                  </h3>
                  <p className="product-desc">{product.description}</p>

                  <div className="product-footer">
                    <div className="product-price">${product.price}</div>
                    <button
                      className="add-cart-btn"
                      onClick={() => onAddToCart(product)}
                      title={`Add ${product.name} to cart`}
                    >
                      <span>{t('btn_acquire')}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick View Modal rendered at document.body for true viewport centering */}
      {quickViewItem && typeof document !== 'undefined' && createPortal(
        <div className="quick-modal-overlay" onClick={() => setQuickViewItem(null)}>
          <div className="quick-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="quick-modal-close" onClick={() => setQuickViewItem(null)} aria-label="Close modal">
              <CloseIcon size={16} />
            </button>
            
            <img
              src={quickViewItem.image}
              alt={quickViewItem.name}
              className="quick-modal-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
              }}
            />

            <div className="quick-modal-content">
              <div>
                <span className="product-cat">{quickViewItem.category} • {quickViewItem.tag || 'Studio Masterpiece'}</span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', margin: '0.4rem 0 0.85rem', color: 'var(--ink)' }}>
                  {quickViewItem.name}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {quickViewItem.description}
                </p>
                <div style={{ background: '#FFF', padding: '0.75rem 0.95rem', borderRadius: '12px', border: '1px solid rgba(23, 90, 103, 0.1)', fontSize: '0.8rem', marginBottom: '1.25rem', color: 'var(--ink)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <VesselIcon size={16} color="var(--ink)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    <strong>{lang === 'uz' ? 'Usta Ta\'rifi:' : 'Artisan Notes:'}</strong>{' '}
                    {lang === 'uz'
                      ? 'Har bir buyum alohida charxda temirli tosh gildan yasaladi va o\'tin xumdonida 1,280°C da chiniqtiriladi.'
                      : 'Individually wheel-thrown using iron-speckled stoneware clay and fired in wood kilns at 1,280°C.'}
                  </span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.85rem', fontWeight: '600', color: 'var(--ink)' }}>
                    ${quickViewItem.price}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      onClick={() => setQuickQty(Math.max(1, quickQty - 1))}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #ccc', background: '#FFF', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '600', minWidth: '18px', textAlign: 'center' }}>{quickQty}</span>
                    <button
                      onClick={() => setQuickQty(quickQty + 1)}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #ccc', background: '#FFF', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="add-cart-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  onClick={handleQuickAdd}
                >
                  <span>{t('btn_acquire')} ({quickQty})</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
