import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './UserProfileModal.css';

export default function UserProfileModal({ isOpen, onClose, onToast }) {
  const { t, lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'guild' | 'settings'

  // Settings State persisted in localStorage
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('hg_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Master Anvar',
      email: 'anvar.collector@heritage.uz',
      phone: '+998 90 123 45 67',
      address: 'Tashkent, Mirabad District, Afrosiyob Street, 14',
      currency: 'USD',
      notifEmail: true,
      notifSms: true,
      guildTier: 'Master Collector',
      guildPoints: 480,
    };
  });

  // Orders State (retrieved from localStorage or mock)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('hg_orders') || '[]');
        if (stored.length > 0) {
          setOrders(stored);
        } else {
          // Default historical bespoke order for demonstration
          setOrders([
            {
              id: 7420,
              customer_name: profile.name,
              date: lang === 'uz' ? '21-Oktabr, 2026' : 'Oct 21, 2026',
              total_amount: 320,
              payment_method: 'payme',
              status: 'Shipped',
              items: [
                {
                  name: 'Celadon Mist Vase',
                  price: 185,
                  quantity: 1,
                  image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
                },
                {
                  name: 'Ember Glaze Teapot',
                  price: 135,
                  quantity: 1,
                  image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80',
                },
              ],
            },
          ]);
        }
      } catch (e) {
        setOrders([]);
      }
    }
  }, [isOpen, lang, profile.name]);

  if (!isOpen) return null;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('hg_user_profile', JSON.stringify(profile));
    } catch (e) {}

    if (onToast) {
      onToast(
        lang === 'uz' ? 'Sozlamalar Saqlandi' : 'Settings Saved',
        t('settings_saved_toast'),
        'success'
      );
    }
  };

  const modalContent = (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="profile-close" onClick={onClose} aria-label="Close profile">
          <CloseIcon size={16} />
        </button>

        {/* Profile Header Card */}
        <div className="profile-top-bar">
          <div className="profile-avatar-wrap">
            <span className="profile-avatar-seal">
              {profile.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h3 className="profile-patron-name">{profile.name}</h3>
              <div className="profile-patron-meta">
                <span className="profile-tier-badge">{profile.guildTier}</span>
                <span className="profile-points-pill">✨ {profile.guildPoints} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs-nav">
          <button
            className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 <span>{t('tab_orders')}</span>
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'guild' ? 'active' : ''}`}
            onClick={() => setActiveTab('guild')}
          >
            🛡️ <span>{t('tab_guild')}</span>
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ <span>{t('tab_settings')}</span>
          </button>
        </div>

        {/* Tab Content 1: Orders & Visual Tracking */}
        {activeTab === 'orders' && (
          <div className="profile-tab-panel">
            {orders.length === 0 ? (
              <div className="profile-empty-orders">
                <p>{lang === 'uz' ? 'Hali buyurtmalar mavjud emas.' : 'No orders recorded yet.'}</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-card-header">
                      <div>
                        <div className="order-id-label">ORDER #HG-{order.id}</div>
                        <span className="order-date-text">{order.date}</span>
                      </div>
                      <div className="order-total-badge">
                        ${order.total_amount?.toLocaleString()}
                      </div>
                    </div>

                    {/* 4-Stage Visual Lifecycle Tracking */}
                    <div className="tracking-timeline-box">
                      <div className="timeline-step completed">
                        <div className="step-circle">✓</div>
                        <span className="step-label">{t('track_placed')}</span>
                      </div>
                      <div className="timeline-connector completed" />
                      <div className="timeline-step completed">
                        <div className="step-circle">✓</div>
                        <span className="step-label">{t('track_kiln')}</span>
                      </div>
                      <div className="timeline-connector in-progress" />
                      <div className={`timeline-step ${order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : 'active'}`}>
                        <div className="step-circle">🚚</div>
                        <span className="step-label">{t('track_packaging')}</span>
                      </div>
                      <div className="timeline-connector" />
                      <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                        <div className="step-circle">🏡</div>
                        <span className="step-label">{t('track_delivered')}</span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="order-items-compact">
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="order-item-compact-row">
                          <span>{it.name} ×{it.quantity}</span>
                          <span style={{ fontWeight: '600' }}>${it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Guild Privileges */}
        {activeTab === 'guild' && (
          <div className="profile-tab-panel">
            <div className="guild-perks-box">
              <div className="guild-gold-card">
                <div className="guild-card-eyebrow">Heritage Kyoto Guild</div>
                <h4 className="guild-card-title">Master Patron Privileges</h4>
                <div className="guild-voucher-wrap">
                  <span className="voucher-code-label">Exclusive 15% Privilege Voucher</span>
                  <div className="voucher-code-pill">HERITAGE15</div>
                </div>
              </div>

              <div className="guild-perks-list">
                <div className="guild-perk-item">
                  <span className="perk-icon">🏺</span>
                  <div>
                    <strong>Private Kiln firings</strong>
                    <p>Access to reserve 1-of-1 wood-fired vessels before public catalogue release.</p>
                  </div>
                </div>
                <div className="guild-perk-item">
                  <span className="perk-icon">🍵</span>
                  <div>
                    <strong>Studio Potter Consultation</strong>
                    <p>Complimentary 1-on-1 virtual design consultation for bespoke dining sets.</p>
                  </div>
                </div>
                <div className="guild-perk-item">
                  <span className="perk-icon">✈️</span>
                  <div>
                    <strong>Insured White-Glove Transit</strong>
                    <p>Zero courier fees on all bespoke orders worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Settings - EXACT USER REQUIREMENT */}
        {activeTab === 'settings' && (
          <div className="profile-tab-panel">
            <form onSubmit={handleSaveSettings} className="settings-form">
              <div className="settings-section-title">
                {t('settings_personal')}
              </div>

              <div className="settings-grid">
                <div>
                  <label className="input-label">{t('settings_name')}</label>
                  <input
                    className="input-field"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_phone')}</label>
                  <input
                    className="input-field"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="settings-grid">
                <div>
                  <label className="input-label">{t('settings_email')}</label>
                  <input
                    className="input-field"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_address')}</label>
                  <input
                    className="input-field"
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="settings-section-title" style={{ marginTop: '0.85rem' }}>
                {t('settings_preferences')}
              </div>

              <div className="settings-grid">
                <div>
                  <label className="input-label">{t('settings_language')}</label>
                  <select
                    className="input-field"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  >
                    <option value="en">English (Global)</option>
                    <option value="uz">O'zbekcha (Uzbekistan)</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">{t('settings_currency')}</label>
                  <select
                    className="input-field"
                    value={profile.currency}
                    onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                  >
                    <option value="USD">USD ($) — US Dollar</option>
                    <option value="UZS">UZS (so'm) — O'zbekiston so'mi</option>
                  </select>
                </div>
              </div>

              <div className="settings-section-title" style={{ marginTop: '0.85rem' }}>
                {t('settings_notifications')}
              </div>

              <div className="settings-toggle-row">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={profile.notifEmail}
                    onChange={(e) => setProfile({ ...profile, notifEmail: e.target.checked })}
                  />
                  <span className="toggle-slider" />
                </label>
                <span className="toggle-text">{t('settings_notif_email')}</span>
              </div>

              <div className="settings-toggle-row">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={profile.notifSms}
                    onChange={(e) => setProfile({ ...profile, notifSms: e.target.checked })}
                  />
                  <span className="toggle-slider" />
                </label>
                <span className="toggle-text">{t('settings_notif_sms')}</span>
              </div>

              <button type="submit" className="save-settings-btn">
                <span>{t('btn_save_settings')}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
