import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/Icons.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, onToast }) {
  const { login, signup } = useAuth();
  const { lang } = useLanguage();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          if (onToast) {
            onToast(
              lang === 'uz' ? 'Xush kelibsiz!' : 'Welcome Back',
              lang === 'uz' ? `${res.user.name} sifatida tizimga kirdingiz.` : `Logged in as ${res.user.name}.`,
              'success'
            );
          }
          onClose();
        } else {
          setErrorMsg(res.error || 'Login failed');
        }
      } else {
        const res = await signup(name, email, password, role);
        if (res.success) {
          if (onToast) {
            onToast(
              lang === 'uz' ? 'Hisob yaratildi!' : 'Account Created',
              lang === 'uz' ? `Heritage Grove oilasiga xush kelibsiz, ${res.user.name}!` : `Welcome to Heritage Grove, ${res.user.name}!`,
              'success'
            );
          }
          onClose();
        } else {
          setErrorMsg(res.error || 'Sign up failed');
        }
      }
    } catch (err) {
      setErrorMsg('Authentication error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdmin = () => {
    setEmail('admin@heritage.uz');
    setPassword('admin123');
    setMode('login');
  };

  const handleQuickUser = () => {
    setEmail('anvar.collector@heritage.uz');
    setPassword('collector123');
    setMode('login');
  };

  const modalContent = (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Close auth dialog">
          <CloseIcon size={16} />
        </button>

        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-seal">HG</div>
          <h3 className="auth-title">
            {mode === 'login'
              ? (lang === 'uz' ? 'Tizimga Kirish' : 'Patron & Admin Login')
              : (lang === 'uz' ? 'Ro\'yxatdan O\'tish' : 'Join Heritage Grove')}
          </h3>
          <p className="auth-sub">
            {mode === 'login'
              ? (lang === 'uz' ? 'Shaxsiy kabinetingiz yoki studiya paneliga kiring' : 'Enter your bespoke patron profile or studio dashboard')
              : (lang === 'uz' ? 'Nodir xumdon asarlari va maxsus imtiyozlarga ega bo\'ling' : 'Unlock private kiln drops and custom collector privileges')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-mode-tabs">
          <button
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMsg(''); }}
          >
            {lang === 'uz' ? 'Kirish' : 'Sign In'}
          </button>
          <button
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
          >
            {lang === 'uz' ? 'Ro\'yxatdan O\'tish' : 'Register'}
          </button>
        </div>

        {/* Quick Demo Credentials */}
        <div className="auth-quick-creds">
          <span className="quick-label">{lang === 'uz' ? 'Tezkor sinov hisoblari:' : 'Quick Demo Logins:'}</span>
          <div className="quick-buttons">
            <button type="button" className="quick-btn admin-demo" onClick={handleQuickAdmin}>
              ⚡ {lang === 'uz' ? 'Admin sifatida kirish' : 'Admin Demo'}
            </button>
            <button type="button" className="quick-btn user-demo" onClick={handleQuickUser}>
              🏺 {lang === 'uz' ? 'Mijoz (Patron) kirish' : 'Patron Demo'}
            </button>
          </div>
        </div>

        {errorMsg && <div className="auth-error-box">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div>
              <label className="auth-label">{lang === 'uz' ? 'To\'liq Ismingiz' : 'Full Name'} *</label>
              <input
                className="auth-input"
                type="text"
                required
                placeholder="e.g. Master Anvar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="auth-label">{lang === 'uz' ? 'Elektron Pochta' : 'Email Address'} *</label>
            <input
              className="auth-input"
              type="email"
              required
              placeholder="name@heritage.uz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="auth-label">{lang === 'uz' ? 'Maxfiy Parol' : 'Password'} *</label>
            <input
              className="auth-input"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="auth-label">{lang === 'uz' ? 'Hisob Turi' : 'Account Role'}</label>
              <div className="role-selector-row">
                <label className={`role-pill ${role === 'user' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="auth_role"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                  />
                  <span>🏺 {lang === 'uz' ? 'Mijoz / Patron' : 'Patron Collector'}</span>
                </label>
                <label className={`role-pill ${role === 'admin' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="auth_role"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                  <span>⚡ {lang === 'uz' ? 'Studiya Admin' : 'Studio Admin'}</span>
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              lang === 'uz' ? 'Tekshirilmoqda...' : 'Authenticating...'
            ) : mode === 'login' ? (
              lang === 'uz' ? 'Tizimga Kirish' : 'Sign In to Profile'
            ) : (
              lang === 'uz' ? 'A\'zo Bo\'lish' : 'Create Bespoke Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
