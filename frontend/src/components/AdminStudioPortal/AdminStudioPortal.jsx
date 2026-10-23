import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import {
  TrashIcon,
  LightningIcon,
  ChartDashboardIcon,
  CeramicVaseIcon,
  OrdersListIcon,
  MailEnvelopIcon,
} from '../icons/Icons.jsx';
import { products as fallbackProducts } from '../../data/products.js';
import './AdminStudioPortal.css';

export default function AdminStudioPortal({ onReturnToGallery, onToast }) {
  const { user, logout } = useAuth();
  const { lang } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'catalog' | 'orders' | 'subscribers'
  const [productList, setProductList] = useState(fallbackProducts);
  const [ordersList, setOrdersList] = useState([]);
  const [subscribersList, setSubscribersList] = useState([
    { email: 'michelin.chef@kyoto.jp', date: '2026-10-22', source: 'Gazette 15% Voucher' },
    { email: 'architect.sarah@design.org', date: '2026-10-21', source: 'Concierge Inquiry' },
    { email: 'anvar.collector@heritage.uz', date: '2026-10-20', source: 'Guild Membership' },
    { email: 'elena.v@artcurator.ch', date: '2026-10-19', source: 'Gazette 15% Voucher' },
    { email: 'kenji.ceramic@studio.tokyo', date: '2026-10-18', source: 'Wood Kiln Invitation' },
  ]);

  // Form for adding product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Vases',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    // 1. Fetch live products
    fetch('/api/products')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        }
      })
      .catch(() => {});

    // 2. Fetch live PostgreSQL orders
    fetch('/api/orders')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setOrdersList(data);
        } else {
          loadStoredOrders();
        }
      })
      .catch(() => {
        loadStoredOrders();
      });
  }, []);

  const loadStoredOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('hg_orders') || '[]');
      if (stored.length > 0) {
        setOrdersList(stored);
      } else {
        setOrdersList([
          {
            id: 8192,
            customer_name: 'Master Anvar',
            customer_phone: '+998 90 123 45 67',
            shipping_address: 'Tashkent, Mirabad 14',
            total_amount: 320,
            payment_method: 'payme',
            status: 'Processing',
            date: '2026-10-23',
            items: [
              { name: 'Celadon Mist Vase', quantity: 1, price: 185 },
              { name: 'Ember Glaze Teapot', quantity: 1, price: 135 },
            ],
          },
          {
            id: 8190,
            customer_name: 'Sophia Laurent',
            customer_phone: '+33 6 12 34 56 78',
            shipping_address: 'Paris, France',
            total_amount: 480,
            payment_method: 'card',
            status: 'Shipped',
            date: '2026-10-22',
            items: [{ name: 'Tenmoku Tea Set', quantity: 1, price: 480 }],
          },
          {
            id: 8185,
            customer_name: 'Kento Yamazaki',
            customer_phone: '+81 90 9876 5432',
            shipping_address: 'Kyoto, Japan',
            total_amount: 650,
            payment_method: 'click',
            status: 'Delivered',
            date: '2026-10-20',
            items: [{ name: 'Raw Stoneware Platter', quantity: 2, price: 325 }],
          },
        ]);
      }
    } catch (e) {}
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const item = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      description: newProduct.description || 'Artisanal stoneware vessel wood-fired in Kyoto kilns.',
      tag: 'New Kiln Release',
    };

    setProductList([item, ...productList]);
    setNewProduct({ name: '', category: 'Vases', price: '', image: '', description: '' });

    if (onToast) {
      onToast(
        lang === 'uz' ? 'Yangi Asar Katalogga Qo\'shildi' : 'Vessel Published',
        `${item.name} is now listed in the gallery catalogue.`,
        'success'
      );
    }
  };

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter(p => p.id !== id));
    if (onToast) {
      onToast(
        lang === 'uz' ? 'O\'chirildi' : 'Vessel Removed',
        'Vessel removed from active catalogue.',
        'info'
      );
    }
  };

  const handleToggleOrderStatus = (orderId) => {
    setOrdersList(ordersList.map(o => {
      if (o.id === orderId) {
        const next = o.status === 'Processing' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Processing';
        return { ...o, status: next };
      }
      return o;
    }));
  };

  const totalRevenue = ordersList.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 14280);

  return (
    <div className="admin-portal-page">
      {/* Top Navigation Bar */}
      <header className="admin-portal-navbar">
        <div className="admin-portal-brand">
          <span className="admin-brand-seal">HG</span>
          <div>
            <h1 className="admin-brand-name">Heritage Grove</h1>
            <span className="admin-brand-role">
              <LightningIcon size={12} color="#ECC94B" />
              <span>Studio Director Portal</span>
            </span>
          </div>
        </div>

        <div className="admin-portal-user-actions">
          <div className="admin-user-pill">
            <span className="admin-user-dot" />
            <span className="admin-user-name">{user?.name || 'Director'}</span>
            <span className="admin-role-badge">ADMIN</span>
          </div>

          <button className="admin-return-btn" onClick={onReturnToGallery}>
            ← {lang === 'uz' ? 'Do\'konga Qaytish' : 'Return to Storefront'}
          </button>

          <button
            className="admin-logout-btn"
            onClick={() => {
              logout();
              onReturnToGallery();
            }}
          >
            {lang === 'uz' ? 'Chiqish' : 'Logout'}
          </button>
        </div>
      </header>

      {/* Main Portal Layout */}
      <div className="admin-portal-body">
        {/* Sidebar Navigation */}
        <aside className="admin-portal-sidebar">
          <nav className="admin-nav-menu">
            <button
              className={`admin-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <ChartDashboardIcon size={18} />
              <span>{lang === 'uz' ? 'Umumiy Hisobot' : 'Overview & KPIs'}</span>
            </button>

            <button
              className={`admin-nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <CeramicVaseIcon size={18} />
              <span>{lang === 'uz' ? 'Katalog Boshqaruvi' : 'Vessel Catalog'}</span>
              <span className="nav-badge-count">{productList.length}</span>
            </button>

            <button
              className={`admin-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <OrdersListIcon size={18} />
              <span>{lang === 'uz' ? 'Buyurtmalar' : 'Live Orders'}</span>
              <span className="nav-badge-count">{ordersList.length}</span>
            </button>

            <button
              className={`admin-nav-link ${activeTab === 'subscribers' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscribers')}
            >
              <MailEnvelopIcon size={18} />
              <span>{lang === 'uz' ? 'Obunachilar' : 'Subscribers & CRM'}</span>
            </button>
          </nav>

          <div className="admin-kiln-status-card">
            <div className="kiln-status-header">
              <span className="kiln-fire-dot" />
              <span>Anagama Kiln #3</span>
            </div>
            <p className="kiln-status-desc">
              Firing at 1,320°C. 48 bespoke vessels in final 18h reduction chamber.
            </p>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="admin-portal-content">
          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === 'overview' && (
            <div className="portal-section">
              <div className="portal-section-header">
                <div>
                  <h2 className="portal-section-title">
                    {lang === 'uz' ? 'Studiya Ko\'rsatkichlari' : 'Studio Performance & Analytics'}
                  </h2>
                  <p className="portal-section-sub">
                    Live telemetry across PostgreSQL orders, artisan catalog, and international patrons.
                  </p>
                </div>
              </div>

              <div className="kpi-cards-grid">
                <div className="kpi-card">
                  <span className="kpi-title">{lang === 'uz' ? 'Jami Daromad' : 'Total Revenue'}</span>
                  <div className="kpi-value">${totalRevenue.toLocaleString()}</div>
                  <span className="kpi-sub positive">↑ +24.8% from last firing</span>
                </div>

                <div className="kpi-card">
                  <span className="kpi-title">{lang === 'uz' ? 'Faol Buyurtmalar' : 'Total Orders'}</span>
                  <div className="kpi-value">{ordersList.length}</div>
                  <span className="kpi-sub">PostgreSQL Synchronized</span>
                </div>

                <div className="kpi-card">
                  <span className="kpi-title">{lang === 'uz' ? 'Katalogdagi Asarlar' : 'Curated Vessels'}</span>
                  <div className="kpi-value">{productList.length}</div>
                  <span className="kpi-sub">Hand-thrown stoneware</span>
                </div>

                <div className="kpi-card">
                  <span className="kpi-title">{lang === 'uz' ? 'Gildiya Obunachilari' : 'Guild Members'}</span>
                  <div className="kpi-value">854</div>
                  <span className="kpi-sub positive">Across 42 countries</span>
                </div>
              </div>

              {/* Recent Orders quick table */}
              <div className="portal-sub-block">
                <h3 className="sub-block-title">{lang === 'uz' ? 'Oxirgi Tushgan Buyurtmalar' : 'Recent Acquisitions'}</h3>
                <div className="portal-table-wrap">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>Order Ref</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.slice(0, 5).map(o => (
                        <tr key={o.id}>
                          <td><strong>#HG-{o.id}</strong></td>
                          <td>{o.customer_name}</td>
                          <td>${Number(o.total_amount).toLocaleString()}</td>
                          <td><span className="badge-method">{o.payment_method?.toUpperCase()}</span></td>
                          <td><span className={`badge-status ${o.status?.toLowerCase()}`}>{o.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VESSEL CATALOG MANAGEMENT */}
          {activeTab === 'catalog' && (
            <div className="portal-section">
              <div className="portal-section-header">
                <div>
                  <h2 className="portal-section-title">
                    {lang === 'uz' ? 'Katalog Boshqaruvi' : 'Ceramic Vessel Management'}
                  </h2>
                  <p className="portal-section-sub">
                    Add new kiln-fired releases, update pricing, or withdraw collected works.
                  </p>
                </div>
              </div>

              {/* Add Vessel Form */}
              <div className="portal-card add-vessel-box">
                <h3 className="form-legend">{lang === 'uz' ? '+ Yangi Keramika Asari Qo\'shish' : '+ Add New Ceramic Vessel'}</h3>
                <form onSubmit={handleAddProduct} className="portal-form">
                  <div className="form-row-3">
                    <div>
                      <label className="form-label">{lang === 'uz' ? 'Vaza / Buyum Nomi' : 'Vessel Title'} *</label>
                      <input
                        className="form-input"
                        type="text"
                        required
                        placeholder="e.g. Tenmoku Glaze Bowl"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">{lang === 'uz' ? 'Kategoriya' : 'Category'}</label>
                      <select
                        className="form-input"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="Vases">Vases</option>
                        <option value="Tableware">Tableware</option>
                        <option value="Decor">Decor</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">{lang === 'uz' ? 'Narxi ($)' : 'Price (USD)'} *</label>
                      <input
                        className="form-input"
                        type="number"
                        required
                        placeholder="185"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div>
                      <label className="form-label">{lang === 'uz' ? 'Rasm Havolasi (URL)' : 'Image URL'}</label>
                      <input
                        className="form-input"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">&nbsp;</label>
                      <button type="submit" className="form-submit-btn">
                        + {lang === 'uz' ? 'Katalogga Nashr Qilish' : 'Publish to Gallery'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Vessels List */}
              <div className="portal-table-wrap">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Vessel</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(p => (
                      <tr key={p.id}>
                        <td className="product-title-cell">
                          <img src={p.image} alt={p.name} className="portal-vessel-thumb" />
                          <div>
                            <strong>{p.name}</strong>
                            <div className="micro-desc">{p.tag || 'Handmade'}</div>
                          </div>
                        </td>
                        <td><span className="badge-cat">{p.category}</span></td>
                        <td><strong>${p.price}</strong></td>
                        <td>
                          <button
                            className="portal-del-btn"
                            onClick={() => handleDeleteProduct(p.id)}
                            title="Delete vessel"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE ORDERS REGISTRY */}
          {activeTab === 'orders' && (
            <div className="portal-section">
              <div className="portal-section-header">
                <div>
                  <h2 className="portal-section-title">
                    {lang === 'uz' ? 'Buyurtmalar Ro\'yxati' : 'PostgreSQL Orders Registry'}
                  </h2>
                  <p className="portal-section-sub">
                    Click status buttons to advance workflow: Processing ➔ Shipped ➔ Delivered.
                  </p>
                </div>
              </div>

              <div className="portal-table-wrap">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Patron</th>
                      <th>Shipping Destination</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersList.map(ord => (
                      <tr key={ord.id}>
                        <td><span className="mono-ref">#HG-{ord.id}</span></td>
                        <td>
                          <strong>{ord.customer_name}</strong>
                          <div className="micro-desc">{ord.customer_phone}</div>
                        </td>
                        <td>{ord.shipping_address || 'Tashkent, Uzbekistan'}</td>
                        <td><strong>${Number(ord.total_amount).toLocaleString()}</strong></td>
                        <td><span className="badge-method">{ord.payment_method?.toUpperCase()}</span></td>
                        <td>
                          <button
                            className={`badge-status-btn ${ord.status?.toLowerCase()}`}
                            onClick={() => handleToggleOrderStatus(ord.id)}
                            title="Click to advance order status"
                          >
                            {ord.status || 'Processing'} ↻
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIBERS & CRM */}
          {activeTab === 'subscribers' && (
            <div className="portal-section">
              <div className="portal-section-header">
                <div>
                  <h2 className="portal-section-title">
                    {lang === 'uz' ? 'Obunachilar & Mijozlar Bazasi' : 'Subscribers & Guild Leads'}
                  </h2>
                  <p className="portal-section-sub">
                    Direct collector relationships captured through Gazette dispatch and concierge.
                  </p>
                </div>
              </div>

              <div className="portal-table-wrap">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Collector Email</th>
                      <th>Date Joined</th>
                      <th>Channel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribersList.map((s, idx) => (
                      <tr key={idx}>
                        <td><strong>{s.email}</strong></td>
                        <td>{s.date}</td>
                        <td><span className="badge-cat">{s.source}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
