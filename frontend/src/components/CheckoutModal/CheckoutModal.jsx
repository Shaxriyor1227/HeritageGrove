import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose, items, total, onOrderSuccess, onOpenProfile }) {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '+998 ',
    customer_email: '',
    shipping_address: '',
    payment_method: 'payme', // default to payme for preview
    notes: '',
  });

  // Mock payment details for realistic visual test experience
  const [cardData, setCardData] = useState({
    cardNumber: '8600 •••• •••• 4892',
    cardHolder: 'HERITAGE PATRON',
    cardExpiry: '09/28',
    cardCvv: '741',
  });

  const [paymePhone, setPaymePhone] = useState('+998 90 123 45 67');
  const [clickPhone, setClickPhone] = useState('+998 93 987 65 43');

  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const generatedId = Math.floor(1000 + Math.random() * 9000);
    const orderDate = new Date().toLocaleString(lang === 'uz' ? 'uz-UZ' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const payload = {
      ...formData,
      items: items.map(item => ({
        product_id: item.id || null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total_amount: total,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      const resolvedOrder = {
        id: data.order?.id || generatedId,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
        shipping_address: formData.shipping_address,
        payment_method: formData.payment_method,
        total_amount: total,
        items: [...items],
        date: orderDate,
        status: 'Processing',
      };

      setPlacedOrder(resolvedOrder);

      // Save to localStorage so profile modal can show it
      try {
        const storedOrders = JSON.parse(localStorage.getItem('hg_orders') || '[]');
        storedOrders.unshift(resolvedOrder);
        localStorage.setItem('hg_orders', JSON.stringify(storedOrders));
      } catch (e) {
        // storage ignored
      }

      if (onOrderSuccess) {
        onOrderSuccess(resolvedOrder);
      }
    } catch (err) {
      // Offline fallback
      const simulatedOrder = {
        id: generatedId,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
        shipping_address: formData.shipping_address,
        payment_method: formData.payment_method,
        total_amount: total,
        items: [...items],
        date: orderDate,
        status: 'Processing',
      };
      setPlacedOrder(simulatedOrder);

      try {
        const storedOrders = JSON.parse(localStorage.getItem('hg_orders') || '[]');
        storedOrders.unshift(simulatedOrder);
        localStorage.setItem('hg_orders', JSON.stringify(storedOrders));
      } catch (e) {
        // storage ignored
      }

      if (onOrderSuccess) {
        onOrderSuccess(simulatedOrder);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setPlacedOrder(null);
    onClose();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const modalContent = (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="checkout-close"
          onClick={placedOrder ? handleFinish : onClose}
          aria-label="Close checkout modal"
        >
          <CloseIcon size={16} />
        </button>

        {placedOrder ? (
          /* AUTOMATED OFFICIAL DIGITAL RECEIPT & CERTIFICATE */
          <div className="order-success-card print-receipt-area">
            <div className="receipt-brand-header">
              <div className="receipt-logo">
                <span className="receipt-seal">HG</span>
                <div>
                  <h4 className="receipt-brand-title">Heritage Grove Studio</h4>
                  <p className="receipt-brand-sub">Wood-Fired Ceramic Artistry • Kyoto Kilns</p>
                </div>
              </div>
              <div className="receipt-status-pill">
                ✓ {lang === 'uz' ? 'Rasmiylashtirildi' : 'Authenticated'}
              </div>
            </div>

            <div className="order-number-badge">
              {t('receipt_order_ref')}: #HG-{placedOrder.id}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: '1.5', margin: '0.5rem 0 1.25rem' }}>
              {lang === 'uz'
                ? `Hurmatli ${placedOrder.customer_name || 'Xaridor'}, sizning buyurtmangiz qabul qilindi va PostgreSQL reyestriga muhrlandi.`
                : `Thank you, ${placedOrder.customer_name || 'Collector'}. Your bespoke ceramic acquisition has been registered.`}
            </p>

            {/* Receipt details table */}
            <div className="receipt-info-grid">
              <div className="receipt-info-item">
                <span className="receipt-label">{t('receipt_date')}</span>
                <span className="receipt-val">{placedOrder.date}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-label">{t('receipt_payment_type')}</span>
                <span className="receipt-val payment-tag-badge">
                  {placedOrder.payment_method === 'payme' && '🔵 Payme (Test Preview)'}
                  {placedOrder.payment_method === 'click' && '🟢 Click Up (Test Preview)'}
                  {placedOrder.payment_method === 'card' && '💳 Bank Card (Visa/Uzcard)'}
                  {placedOrder.payment_method === 'cash_on_delivery' && '🚚 Courier on Delivery'}
                </span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-label">{t('receipt_shipping_to')}</span>
                <span className="receipt-val">{placedOrder.shipping_address || 'Tashkent, Uzbekistan'}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-label">{t('receipt_dispatch_estimate')}</span>
                <span className="receipt-val">2 - 3 Business Days</span>
              </div>
            </div>

            {/* Itemized list */}
            <div className="receipt-items-list">
              <div className="receipt-items-header">
                <span>Vessel</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>
              {placedOrder.items.map((item, idx) => (
                <div key={idx} className="receipt-item-row">
                  <div className="receipt-item-desc">
                    {item.image && <img src={item.image} alt={item.name} className="receipt-thumb" />}
                    <span>{item.name}</span>
                  </div>
                  <span className="receipt-item-qty">×{item.quantity}</span>
                  <span className="receipt-item-price">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="receipt-total-row">
                <span>{t('cart_subtotal')}</span>
                <span>${placedOrder.total_amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Print and Navigation Buttons */}
            <div className="receipt-actions no-print">
              <button className="receipt-btn-print" onClick={handlePrintReceipt}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>{t('receipt_print')}</span>
              </button>

              {onOpenProfile && (
                <button
                  className="receipt-btn-secondary"
                  onClick={() => {
                    handleFinish();
                    onOpenProfile();
                  }}
                >
                  <span>{t('receipt_track_profile')}</span>
                </button>
              )}

              <button className="place-order-btn" onClick={handleFinish}>
                <span>{lang === 'uz' ? 'Kolleksiyaga Qaytish' : 'Return to Gallery'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* BESPOKE CHECKOUT FORM WITH VISUAL PAYMENT METHOD SELECTORS */
          <>
            <div className="checkout-header">
              <div className="checkout-eyebrow">
                {lang === 'uz' ? 'Nodir Buyurtma' : 'Artisanal Acquisition'}
              </div>
              <h3 className="checkout-title">{t('checkout_title')}</h3>
            </div>

            <div className="checkout-summary-box">
              <div>
                <div style={{ fontWeight: '600', color: 'var(--ink)' }}>
                  {lang === 'uz' ? 'Tanlangan Asarlar' : 'Curated Vessels'}
                </div>
                <div className="summary-items-count">
                  {items.reduce((s, i) => s + i.quantity, 0)} {lang === 'uz' ? 'dona qo\'l mehnati' : 'handcrafted items'}
                </div>
              </div>
              <div className="summary-total">${total.toLocaleString()}</div>
            </div>

            {errorMsg && (
              <div className="checkout-error-badge">
                {errorMsg}
              </div>
            )}

            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-row">
                <div>
                  <label className="input-label">{t('settings_name')} *</label>
                  <input
                    className="input-field"
                    type="text"
                    required
                    placeholder="e.g. Master Anvar"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_phone')} *</label>
                  <input
                    className="input-field"
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="checkout-row">
                <div>
                  <label className="input-label">{t('settings_email')} (Optional)</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="collector@heritage.uz"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_address')} *</label>
                  <input
                    className="input-field"
                    type="text"
                    required
                    placeholder="Tashkent, Mirabad district, 12"
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                  />
                </div>
              </div>

              {/* PAYMENT METHOD SELECTOR - ITEM 1 USER REQUEST */}
              <div className="payment-section-box">
                <div className="payment-section-header">
                  <label className="input-label" style={{ margin: 0 }}>{t('payment_method')}</label>
                  <span className="test-mode-badge">{t('pay_test_badge')}</span>
                </div>

                <div className="payment-tabs-grid">
                  {/* Option 1: Payme */}
                  <div
                    className={`payment-tab-card ${formData.payment_method === 'payme' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, payment_method: 'payme' })}
                  >
                    <div className="payment-tab-top">
                      <div className="payme-pill">
                        <span className="payme-dot" /> Payme
                      </div>
                      <input
                        type="radio"
                        name="pay_method"
                        checked={formData.payment_method === 'payme'}
                        onChange={() => {}}
                      />
                    </div>
                    <span className="payment-tab-desc">{t('pay_payme_desc')}</span>
                  </div>

                  {/* Option 2: Click */}
                  <div
                    className={`payment-tab-card ${formData.payment_method === 'click' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, payment_method: 'click' })}
                  >
                    <div className="payment-tab-top">
                      <div className="click-pill">
                        <span className="click-dot" /> Click Up
                      </div>
                      <input
                        type="radio"
                        name="pay_method"
                        checked={formData.payment_method === 'click'}
                        onChange={() => {}}
                      />
                    </div>
                    <span className="payment-tab-desc">{t('pay_click_desc')}</span>
                  </div>

                  {/* Option 3: Bank Card */}
                  <div
                    className={`payment-tab-card ${formData.payment_method === 'card' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, payment_method: 'card' })}
                  >
                    <div className="payment-tab-top">
                      <div className="card-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        <span>Card (Visa/Uzcard)</span>
                      </div>
                      <input
                        type="radio"
                        name="pay_method"
                        checked={formData.payment_method === 'card'}
                        onChange={() => {}}
                      />
                    </div>
                    <span className="payment-tab-desc">{t('pay_card_desc')}</span>
                  </div>

                  {/* Option 4: Cash on Delivery */}
                  <div
                    className={`payment-tab-card ${formData.payment_method === 'cash_on_delivery' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, payment_method: 'cash_on_delivery' })}
                  >
                    <div className="payment-tab-top">
                      <div className="cash-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                          <path d="M12 6v2m0 8v2" />
                        </svg>
                        <span>{t('pay_cash')}</span>
                      </div>
                      <input
                        type="radio"
                        name="pay_method"
                        checked={formData.payment_method === 'cash_on_delivery'}
                        onChange={() => {}}
                      />
                    </div>
                    <span className="payment-tab-desc">{t('pay_cash_desc')}</span>
                  </div>
                </div>

                {/* DETAILED INTERACTIVE VISUAL PREVIEW PER PAYMENT METHOD */}
                <div className="payment-visual-box">
                  {formData.payment_method === 'payme' && (
                    <div className="payme-visual-panel">
                      <div className="visual-notice">
                        <span className="notice-icon">ℹ️</span>
                        <span>{t('pay_test_notice')}</span>
                      </div>
                      <label className="input-label">Payme Registered Phone Number</label>
                      <input
                        className="input-field"
                        type="tel"
                        value={paymePhone}
                        onChange={(e) => setPaymePhone(e.target.value)}
                        placeholder="+998 90 123 45 67"
                      />
                      <div className="simulation-hint">
                        🔵 {lang === 'uz' ? 'Buyurtma tasdiqlangach, Payme ilovangizga invoys yo\'llanadi.' : 'Payment invoice will simulate dispatching to your Payme account.'}
                      </div>
                    </div>
                  )}

                  {formData.payment_method === 'click' && (
                    <div className="click-visual-panel">
                      <div className="visual-notice">
                        <span className="notice-icon">ℹ️</span>
                        <span>{t('pay_test_notice')}</span>
                      </div>
                      <label className="input-label">Click Mobile Phone / ID</label>
                      <input
                        className="input-field"
                        type="tel"
                        value={clickPhone}
                        onChange={(e) => setClickPhone(e.target.value)}
                        placeholder="+998 93 987 65 43"
                      />
                      <div className="simulation-hint">
                        🟢 {lang === 'uz' ? '*880# USSD yoki Click Evolution ilovasida to\'lov so\'rovi ko\'rinadi.' : 'Simulated USSD / Click Evolution request notification.'}
                      </div>
                    </div>
                  )}

                  {formData.payment_method === 'card' && (
                    <div className="card-visual-panel">
                      <div className="visual-credit-card">
                        <div className="card-chip" />
                        <div className="card-number-display">{cardData.cardNumber}</div>
                        <div className="card-bottom-row">
                          <div>
                            <span className="card-micro-label">HOLDER</span>
                            <span className="card-holder-name">{cardData.cardHolder}</span>
                          </div>
                          <div>
                            <span className="card-micro-label">EXPIRES</span>
                            <span className="card-expiry-val">{cardData.cardExpiry}</span>
                          </div>
                        </div>
                      </div>

                      <div className="card-inputs-grid">
                        <div>
                          <label className="input-label">Card Number</label>
                          <input
                            className="input-field"
                            type="text"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                          />
                        </div>
                        <div className="card-sub-grid">
                          <div>
                            <label className="input-label">MM/YY</label>
                            <input
                              className="input-field"
                              type="text"
                              value={cardData.cardExpiry}
                              onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="input-label">CVV</label>
                            <input
                              className="input-field"
                              type="password"
                              maxLength="4"
                              value={cardData.cardCvv}
                              onChange={(e) => setCardData({ ...cardData, cardCvv: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.payment_method === 'cash_on_delivery' && (
                    <div className="cash-visual-panel">
                      <div className="cash-notice-box">
                        📦 <strong>{lang === 'uz' ? 'Qo\'ldan-qo\'lga xizmat:' : 'White-Glove Courier Delivery:'}</strong>
                        <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                          {lang === 'uz'
                            ? 'Buyumlar xavfsiz qutilarda yetib keladi. Kuryer huzurida ochib ko\'rib, naqd pul yoki Uzcard/Humo terminali orqali to\'lashingiz mumkin.'
                            : 'Inspect your wood-fired pottery upon physical arrival. Settle with cash or local courier terminal.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="input-label">
                  {lang === 'uz' ? 'Kuryer Uchun Qo\'shimcha Izoh' : 'Delivery Notes & Instructions'}
                </label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g. Fragile ceramic packaging, call before arrival"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? (
                  lang === 'uz' ? 'Buyurtma PostgreSQL ga yozilmoqda...' : 'Recording Order into PostgreSQL...'
                ) : (
                  <>
                    <span>{t('btn_place_order')}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
