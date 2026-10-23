import React, { useState } from 'react';
import { subscribeEmail } from '../../api/subscribe.js';
import {
  VesselIcon,
  TeawareIcon,
  ArchitectureIcon,
  KilnFireIcon,
  MonographIcon,
  SparkleIcon,
  InfoIcon,
  AlertIcon,
  CheckIcon,
} from '../icons/Icons.jsx';
import './FullNewsletterSection.css';

export default function FullNewsletterSection({ onToast }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(['vessels', 'kiln']);
  const [frequency, setFrequency] = useState('monthly');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'already' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const interestOptions = [
    { id: 'vessels', label: 'Wood-Fired Vessels', Icon: VesselIcon },
    { id: 'tea', label: 'Ceremonial Teaware', Icon: TeawareIcon },
    { id: 'architectural', label: 'Architectural Sculptures', Icon: ArchitectureIcon },
    { id: 'kiln', label: 'Private Kiln Drops', Icon: KilnFireIcon },
    { id: 'monographs', label: 'Artisan Monographs', Icon: MonographIcon },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('HERITAGE15');
    setCopiedCode(true);
    if (onToast) {
      onToast('Privilege Code Copied', 'Use HERITAGE15 at checkout for 15% off.', 'success');
    }
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await subscribeEmail(email);

      if (res.status === 201) {
        setStatus('success');
        setStatusMessage("Welcome to the Guild. Your collector registration has been sealed.");
        if (onToast) {
          onToast('Subscription Confirmed', 'A 15% welcome voucher code is ready for you.', 'success');
        }
      } else if (res.status === 200) {
        setStatus('already');
        setStatusMessage("You are already an esteemed patron on our private dispatch list.");
        if (onToast) {
          onToast('Already Subscribed', 'Your email is already part of the Heritage Grove registry.', 'info');
        }
      } else {
        setStatus('error');
        setStatusMessage(res.message || 'Unable to register at this moment. Please verify your email.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Network connectivity issue. Please try again.');
    }
  };

  const handleReset = () => {
    setEmail('');
    setFullName('');
    setStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="newsletter-section" className="full-newsletter-section">
      {/* Ambient background glows */}
      <div className="fn-glow-ambient fn-glow-left" aria-hidden="true" />
      <div className="fn-glow-ambient fn-glow-right" aria-hidden="true" />

      <div className="fn-container">
        {/* Top Header Badge */}
        <div className="fn-header">
          <div className="fn-badge">
            <SparkleIcon size={13} color="#D8B46F" />
            <span>The Heritage Grove Gazette & Private Dispatch</span>
            <SparkleIcon size={13} color="#D8B46F" />
          </div>

          <h2 className="fn-title">
            Vessels, Earth &amp; <span className="fn-title-italic">Quiet Firings</span>
          </h2>

          <p className="fn-subtitle">
            Curated exclusively for architects, ceramic connoisseurs, and private collectors.
            Receive quarterly kiln-opening releases, master potter monographs, and an introductory
            15% acquisition privilege toward your first studio piece.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="fn-card-wrapper">
          {status === 'success' ? (
            /* Success State: Collector Pass Card */
            <div className="fn-success-card">
              <div className="fn-seal-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D8B46F" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                  <path d="M8 12h8" strokeDasharray="1 2" />
                </svg>
              </div>

              <div className="fn-success-eyebrow">PATRON REGISTRATION VERIFIED</div>
              <h3 className="fn-success-title">Welcome to the Private Registry</h3>
              <p className="fn-success-desc">
                Your private allocation dossier has been dispatched to <strong>{email}</strong>.
                You now hold priority access to 1-of-1 wood-fired kiln auctions and collector monographs.
              </p>

              <div className="fn-voucher-box">
                <div className="fn-voucher-header">
                  <span>YOUR COURTESY ACQUISITION GRANT</span>
                  <span className="fn-voucher-percent">15% OFF</span>
                </div>
                <div className="fn-voucher-code-row">
                  <span className="fn-voucher-code">HERITAGE15</span>
                  <button
                    type="button"
                    className="fn-copy-btn"
                    onClick={handleCopyCode}
                  >
                    {copiedCode ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckIcon size={12} color="#0E2930" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>
                <div className="fn-voucher-hint">Valid at checkout on any pottery or tableware piece.</div>
              </div>

              <div className="fn-success-actions">
                <a href="#collection" className="fn-btn-primary">
                  Explore Curated Collection
                </a>
                <button type="button" className="fn-btn-link" onClick={handleReset}>
                  Register Another Collector
                </button>
              </div>
            </div>
          ) : (
            /* Active Form State */
            <div className="fn-form-layout">
              <div className="fn-form-col-info">
                <div className="fn-info-tag">COLLECTOR PRIVILEGES</div>
                <h3 className="fn-info-heading">Quiet Dispatches, Zero Clutter</h3>
                <p className="fn-info-lead">
                  We honor your attention with editorial monographs bound in craft tradition:
                </p>

                <ul className="fn-perks-list">
                  <li className="fn-perk-item">
                    <span className="fn-perk-bullet">01</span>
                    <div>
                      <strong>48-Hour Private Kiln Window</strong>
                      <p>View unreleased 1-of-1 wood-fired vessels before public unveiling.</p>
                    </div>
                  </li>
                  <li className="fn-perk-item">
                    <span className="fn-perk-bullet">02</span>
                    <div>
                      <strong>Master Potter Essays</strong>
                      <p>Documentaries on 1,320°C climbing kilns, wild glazes, and tea culture.</p>
                    </div>
                  </li>
                  <li className="fn-perk-item">
                    <span className="fn-perk-bullet">03</span>
                    <div>
                      <strong>Bespoke Studio Invitations</strong>
                      <p>Live kiln unsealing streams and private studio consultation appointments.</p>
                    </div>
                  </li>
                </ul>

                {/* Social Proof Quote */}
                <div className="fn-quote-box">
                  <p className="fn-quote-text">
                    “Heritage Grove’s dispatch is the rare correspondence that feels like a quiet gallery walk. Never hurried, deeply inspiring.”
                  </p>
                  <div className="fn-quote-author">
                    <span>— Elena Rostova</span>
                    <span className="fn-author-role">Principal Architect, Studio Noren (Zurich)</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="fn-form-col-input">
                <form className="fn-interactive-form" onSubmit={handleSubmit}>
                  {/* Name field (optional) */}
                  <div className="fn-input-group">
                    <label htmlFor="fn-name" className="fn-label">
                      Patron / Studio Name <span className="fn-optional">(Optional)</span>
                    </label>
                    <input
                      id="fn-name"
                      type="text"
                      className="fn-input"
                      placeholder="e.g. Arthur Pendelton"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  {/* Email field (required) */}
                  <div className="fn-input-group">
                    <label htmlFor="fn-email" className="fn-label">
                      Email Address <span className="fn-required">*</span>
                    </label>
                    <input
                      id="fn-email"
                      type="email"
                      required
                      className="fn-input"
                      placeholder="patron@gallery.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Curated Interests Chips */}
                  <div className="fn-interests-section">
                    <div className="fn-label">Tailor Your Private Curations</div>
                    <div className="fn-interests-chips">
                      {interestOptions.map((opt) => {
                        const isSelected = selectedInterests.includes(opt.id);
                        const ChipIcon = opt.Icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`fn-chip ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleInterest(opt.id)}
                            aria-pressed={isSelected}
                          >
                            <span className="fn-chip-icon">
                              <ChipIcon size={14} color={isSelected ? '#FAF8F5' : '#D8B46F'} />
                            </span>
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dispatch Frequency */}
                  <div className="fn-freq-section">
                    <div className="fn-label">Dispatch Rhythm</div>
                    <div className="fn-freq-options">
                      <label className={`fn-freq-radio ${frequency === 'monthly' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="frequency"
                          value="monthly"
                          checked={frequency === 'monthly'}
                          onChange={() => setFrequency('monthly')}
                        />
                        <span className="fn-freq-title">Monthly Gazette</span>
                        <span className="fn-freq-desc">Essays, studio notes & kiln previews</span>
                      </label>

                      <label className={`fn-freq-radio ${frequency === 'drops' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="frequency"
                          value="drops"
                          checked={frequency === 'drops'}
                          onChange={() => setFrequency('drops')}
                        />
                        <span className="fn-freq-title">Kiln Drops Only</span>
                        <span className="fn-freq-desc">Strictly rare 1-of-1 releases</span>
                      </label>
                    </div>
                  </div>

                  {/* Feedback / Status */}
                  {statusMessage && (
                    <div
                      className={`fn-status-bar ${
                        status === 'already' ? 'already' : status === 'error' ? 'error' : 'info'
                      }`}
                      role="alert"
                    >
                      {status === 'already' && <InfoIcon size={15} color="#A8D1FF" />}
                      {status === 'error' && <AlertIcon size={15} color="#FFA8A8" />}
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="fn-submit-btn"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="fn-spinner-wrap">
                        <span className="fn-spinner" />
                        <span>Sealing Registration...</span>
                      </span>
                    ) : (
                      <span className="fn-btn-content">
                        <span>Request Collector Dispatch</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    )}
                  </button>

                  {/* Assurance footnote */}
                  <div className="fn-form-footnote">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>
                      256-bit encrypted • One-click quiet departure at any time • Strictly no third-party sharing
                    </span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Global Collector Trust Bar */}
        <div className="fn-trust-strip">
          <div className="fn-trust-stat">
            <span className="fn-stat-num">4,800+</span>
            <span className="fn-stat-label">Worldwide Guild Patrons</span>
          </div>
          <div className="fn-trust-divider" />
          <div className="fn-trust-stat">
            <span className="fn-stat-num">100%</span>
            <span className="fn-stat-label">Traditional Wood-Kiln Fired</span>
          </div>
          <div className="fn-trust-divider" />
          <div className="fn-trust-stat">
            <span className="fn-stat-num">1,320°C</span>
            <span className="fn-stat-label">Master Reduction Temperature</span>
          </div>
          <div className="fn-trust-divider" />
          <div className="fn-trust-stat">
            <span className="fn-stat-num">15%</span>
            <span className="fn-stat-label">Welcome Acquisition Grant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
