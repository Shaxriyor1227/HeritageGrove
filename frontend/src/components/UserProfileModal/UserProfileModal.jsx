import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CloseIcon,
  LightningIcon,
  CeramicVaseIcon,
  PackageBoxIcon,
  SettingsIcon,
  GlobeAltIcon,
  UserCircleIcon,
  BellAlertIcon,
  DeliveryTruckIcon,
  SanctuaryHomeIcon,
  TeaCupIcon,
  ShieldLockIcon,
  DiamondSparkleIcon,
} from '../icons/Icons.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './UserProfileModal.css';

export default function UserProfileModal({ isOpen, onClose, onToast, onOpenAdminPortal }) {
  const { t, lang, setLang } = useLanguage();
  const { user, setUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'about' | 'settings'

  // Profile fields state
  const [formData, setFormData] = useState({
    name: user?.name || 'Master Anvar',
    email: user?.email || 'anvar.collector@heritage.uz',
    phone: user?.phone || '+998 90 123 45 67',
    address: user?.address || 'Tashkent, Mirabad District, Afrosiyob Street, 14',
    currency: 'USD',
    notifEmail: true,
    notifSms: true,
  });

  const [orders, setOrders] = useState([]);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('hg_orders') || '[]');
        if (stored.length > 0) {
          setOrders(stored);
        } else {
          setOrders([
            {
              id: 7420,
              customer_name: user?.name || 'Master Anvar',
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
  }, [isOpen, lang, user]);

  if (!isOpen) return null;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };
      setUser(updatedUser);
      localStorage.setItem('hg_auth_user', JSON.stringify(updatedUser));
    }

    if (onToast) {
      onToast(
        lang === 'uz' ? 'Sozlamalar Saqlandi' : 'Settings Saved',
        t('settings_saved_toast'),
        'success'
      );
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('HERITAGE15');
    setCopiedCode(true);
    if (onToast) {
      onToast(
        lang === 'uz' ? 'Vaucher Nusxalandi' : 'Voucher Copied',
        'HERITAGE15 15% discount applied to clipboard.',
        'success'
      );
    }
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const modalContent = (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="profile-close" onClick={onClose} aria-label="Close profile">
          <CloseIcon size={16} />
        </button>

        {/* Profile Header */}
        <div className="profile-top-bar">
          <div className="profile-avatar-wrap">
            <span className="profile-avatar-seal">
              {(user?.name || formData.name).charAt(0).toUpperCase()}
            </span>
            <div className="profile-meta-text">
              <h3 className="profile-patron-name">{user?.name || formData.name}</h3>
              <p className="profile-email-sub">{user?.email || formData.email}</p>
              <div className="profile-patron-meta">
                <span className={`profile-tier-badge ${user?.role === 'admin' ? 'admin' : ''}`}>
                  {user?.role === 'admin' ? (
                    <>
                      <LightningIcon size={13} color="#92400E" />
                      <span>Studio Director</span>
                    </>
                  ) : (
                    <>
                      <CeramicVaseIcon size={13} color="#C46D4B" />
                      <span>Master Collector</span>
                    </>
                  )}
                </span>
                <span className="profile-points-pill">
                  <DiamondSparkleIcon size={12} color="#C46D4B" />
                  <span>{user?.guildPoints || 480} pts</span>
                </span>
              </div>
            </div>
          </div>

          {/* Admin Switch Portal Button if Admin */}
          {user?.role === 'admin' && (
            <button
              className="open-full-admin-btn"
              onClick={() => {
                onClose();
                if (onOpenAdminPortal) onOpenAdminPortal();
              }}
            >
              <LightningIcon size={14} color="#92400E" />
              <span>{lang === 'uz' ? 'To\'liq Admin Panelini Ochish' : 'Open Full Studio Portal'}</span>
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs-nav">
          <button
            className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <PackageBoxIcon size={16} />
            <span>{lang === 'uz' ? 'Sotib Olinganlar' : 'Purchased Items'}</span>
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <CeramicVaseIcon size={16} />
            <span>{lang === 'uz' ? 'Gildiya Haqida' : 'About & Guild'}</span>
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon size={16} />
            <span>{lang === 'uz' ? 'Sozlamalar' : 'Settings'}</span>
          </button>
        </div>

        {/* TAB 1: SOTIB OLINGAN NARSALAR (MY PURCHASES & TRACKING) */}
        {activeTab === 'orders' && (
          <div className="profile-tab-panel">
            {orders.length === 0 ? (
              <div className="profile-empty-orders">
                <p>{lang === 'uz' ? 'Hozircha xarid qilingan buyumlar yo\'q.' : 'You have not acquired any vessels yet.'}</p>
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
                        <div className="step-circle">
                          <DeliveryTruckIcon size={14} color="currentColor" />
                        </div>
                        <span className="step-label">{t('track_packaging')}</span>
                      </div>
                      <div className="timeline-connector" />
                      <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                        <div className="step-circle">
                          <SanctuaryHomeIcon size={14} color="currentColor" />
                        </div>
                        <span className="step-label">{t('track_delivered')}</span>
                      </div>
                    </div>

                    {/* Vessels in this order */}
                    <div className="order-items-compact">
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="order-item-compact-row">
                          <span className="item-title-qty">{it.name} ×{it.quantity}</span>
                          <span className="item-price-sum">${it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ABOUT & GUILD PRIVILEGES */}
        {activeTab === 'about' && (
          <div className="profile-tab-panel">
            <div className="guild-perks-box">
              <div className="guild-gold-card">
                <div className="guild-card-eyebrow">
                  {lang === 'uz' ? 'Kyoto Xumdon Gildiyasi' : 'Heritage Kyoto Kiln Guild'}
                </div>
                <h4 className="guild-card-title">
                  {lang === 'uz' ? 'Mijoz Shaxsiy Imtiyozlari' : 'Master Patron Privileges'}
                </h4>
                <div className="guild-voucher-wrap">
                  <div>
                    <span className="voucher-code-label">
                      {lang === 'uz' ? 'Maxsus 15% Chegirma Vaucheri' : 'Exclusive 15% Collector Voucher'}
                    </span>
                    <div className="voucher-code-pill">HERITAGE15</div>
                  </div>
                  <button className="copy-voucher-btn" onClick={handleCopyCode}>
                    {copiedCode ? '✓ Copied' : (lang === 'uz' ? 'Nusxalash' : 'Copy Code')}
                  </button>
                </div>
              </div>

              <div className="guild-perks-list">
                <div className="guild-perk-item">
                  <span className="perk-icon">
                    <CeramicVaseIcon size={20} color="var(--ink)" />
                  </span>
                  <div>
                    <strong>{lang === 'uz' ? 'Yagona Nusxadagi Xumdon Asarlari' : 'Private Kiln Drops Access'}</strong>
                    <p>{lang === 'uz' ? 'Katalogga chiqmasdan oldin xumdondan chiqqan noyob vazalarni birinchilardan bo\'lib band qilish huquqi.' : 'Reserve 1-of-1 wood-fired works before public release.'}</p>
                  </div>
                </div>

                <div className="guild-perk-item">
                  <span className="perk-icon">
                    <TeaCupIcon size={20} color="var(--ink)" />
                  </span>
                  <div>
                    <strong>{lang === 'uz' ? 'Bosh Usta Bilan Shaxsiy Maslahat' : 'Studio Potter Consultation'}</strong>
                    <p>{lang === 'uz' ? 'Xonadoningiz yoki stolingiz uchun maxsus o\'lchamdagi idishlar bo\'yicha bepul onlayn konsultatsiya.' : 'Complimentary 1-on-1 virtual design consultation for bespoke dining sets.'}</p>
                  </div>
                </div>

                <div className="guild-perk-item">
                  <span className="perk-icon">
                    <ShieldLockIcon size={20} color="var(--ink)" />
                  </span>
                  <div>
                    <strong>{lang === 'uz' ? 'Abadiy Sopol Kafolati' : 'Lifetime Heirloom Assurance'}</strong>
                    <p>{lang === 'uz' ? '1,320°C haroratda toshga aylangan ekologik toza tabiiy gil mahsulotlari.' : 'High-density vitrified stoneware crafted to endure generations of daily touch.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS (SOZLAMALAR - TIL HAM SHU YERDA) */}
        {activeTab === 'settings' && (
          <div className="profile-tab-panel">
            <form onSubmit={handleSaveSettings} className="settings-form">
              {/* LANGUAGE SWITCHER INSIDE SETTINGS AS REQUESTED */}
              <div className="settings-section-title">
                <GlobeAltIcon size={16} color="#C46D4B" />
                <span>{lang === 'uz' ? 'Tizim Tili va Valyuta' : 'Language & Display Currency'}</span>
              </div>

              <div className="settings-grid">
                <div>
                  <label className="input-label">
                    {lang === 'uz' ? 'Sayt Tili' : 'Interface Language'} *
                  </label>
                  <select
                    className="input-field select-field"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  >
                    <option value="en">English (Global)</option>
                    <option value="uz">O'zbekcha (O'zbekiston)</option>
                  </select>
                  <span className="field-hint">
                    {lang === 'uz' ? 'Barcha matnlar va narxlar tanlangan tilda ko\'rsatiladi' : 'Updates entire application interface immediately'}
                  </span>
                </div>

                <div>
                  <label className="input-label">
                    {lang === 'uz' ? 'Ko\'rsatiladigan Valyuta' : 'Currency'}
                  </label>
                  <select
                    className="input-field select-field"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  >
                    <option value="USD">USD ($) — US Dollar</option>
                    <option value="UZS">UZS (so'm) — O'zbekiston so'mi</option>
                  </select>
                </div>
              </div>

              <div className="settings-section-title" style={{ marginTop: '0.75rem' }}>
                <UserCircleIcon size={16} color="#C46D4B" />
                <span>{lang === 'uz' ? 'Shaxsiy Ma\'lumotlar' : 'Personal Information'}</span>
              </div>

              <div className="settings-grid">
                <div>
                  <label className="input-label">{t('settings_name')} *</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_phone')} *</label>
                  <input
                    className="input-field"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">{t('settings_address')}</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="settings-section-title" style={{ marginTop: '0.75rem' }}>
                <BellAlertIcon size={16} color="#C46D4B" />
                <span>{lang === 'uz' ? 'Xabarnomalar' : 'Notifications'}</span>
              </div>

              <div className="settings-toggle-row">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={formData.notifEmail}
                    onChange={(e) => setFormData({ ...formData, notifEmail: e.target.checked })}
                  />
                  <span className="toggle-slider" />
                </label>
                <span className="toggle-text">{t('settings_notif_email')}</span>
              </div>

              <div className="settings-toggle-row">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={formData.notifSms}
                    onChange={(e) => setFormData({ ...formData, notifSms: e.target.checked })}
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

        {/* Profile Footer: Logout Button */}
        <div className="profile-footer-bar">
          <button
            className="profile-logout-btn"
            onClick={() => {
              logout();
              onClose();
              if (onToast) {
                onToast('Logged Out', 'You have been signed out.', 'info');
              }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{lang === 'uz' ? 'Hisobdan Chiqish' : 'Sign Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
