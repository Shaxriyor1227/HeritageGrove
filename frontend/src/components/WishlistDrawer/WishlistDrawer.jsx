import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, TrashIcon } from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './WishlistDrawer.css';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToCart,
  onExploreCollection,
}) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  const content = (
    <div className="wishlist-overlay" onClick={onClose}>
      <aside className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-header">
          <div>
            <div className="wishlist-eyebrow">
              {lang === 'uz' ? 'Shaxsiy Tanlov' : 'Private Selection'}
            </div>
            <h3 className="wishlist-title">{t('wishlist_title')}</h3>
          </div>
          <button className="wishlist-close" onClick={onClose} aria-label="Close wishlist">
            <CloseIcon size={16} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty-state">
            <div className="wishlist-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p className="wishlist-empty-title">{t('wishlist_empty')}</p>
            <p className="wishlist-empty-desc">{t('wishlist_empty_sub')}</p>
            <button
              className="wishlist-explore-btn"
              onClick={() => {
                onClose();
                if (onExploreCollection) onExploreCollection();
              }}
            >
              {t('hero_btn_explore')}
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-items-scroll">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="wishlist-item-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="wishlist-item-details">
                    <span className="wishlist-item-cat">{item.category}</span>
                    <h4 className="wishlist-item-name">{item.name}</h4>
                    <span className="wishlist-item-price">${item.price}</span>

                    <div className="wishlist-item-actions">
                      <button
                        className="wishlist-move-btn"
                        onClick={() => onMoveToCart(item)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                        <span>{t('btn_move_to_cart')}</span>
                      </button>
                      <button
                        className="wishlist-del-btn"
                        onClick={() => onRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wishlist-footer">
              <span className="wishlist-count-badge">
                {wishlistItems.length} {lang === 'uz' ? 'ta saqlangan asar' : 'curated pieces'}
              </span>
            </div>
          </>
        )}
      </aside>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}
