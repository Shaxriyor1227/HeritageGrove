import React from 'react';
import { CloseIcon, CourierIcon, CheckIcon } from '../icons/Icons.jsx';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemoveItem, onOpenCheckout }) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Your Curation ({items.length})</h3>
            <button className="close-btn" onClick={onClose} aria-label="Close cart">
              <CloseIcon size={16} />
            </button>
          </div>

          <div className="cart-items">
            {items.length === 0 ? (
              <div className="cart-empty">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p>Your curation is currently empty.</p>
                <span style={{ fontSize: '0.8rem' }}>Explore our hand-thrown stoneware pieces.</span>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price">${item.price} each</div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                      <span style={{ fontSize: '0.86rem', fontWeight: '600' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#999', fontSize: '0.75rem', marginLeft: 'auto', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

              {items.length > 0 && (
            <div className="cart-footer">
              <div style={{ marginBottom: '1rem', background: '#F8F5F2', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--ink)' }}>
                {total >= 150 ? (
                  <div style={{ color: '#137333', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <CheckIcon size={14} color="#137333" />
                    <CourierIcon size={15} color="#137333" />
                    <span>Complimentary Global White-Glove Courier Unlocked</span>
                  </div>
                ) : (
                  <div>
                    Add <strong>${150 - total}</strong> more for <strong>Complimentary Global Courier</strong>
                  </div>
                )}
              </div>

              <div className="cart-total-row">
                <span>Subtotal</span>
                <span className="cart-total-price">${total.toLocaleString()}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={onOpenCheckout}
              >
                Proceed to Bespoke Checkout
              </button>
            </div>
          )}
        </div>
      </div>
  );
}
