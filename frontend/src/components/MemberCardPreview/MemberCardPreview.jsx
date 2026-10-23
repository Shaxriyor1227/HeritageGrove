import React, { useState, useEffect } from 'react';
import { CheckIcon } from '../icons/Icons.jsx';
import './MemberCardPreview.css';

export default function MemberCardPreview() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardData, setCardData] = useState({
    name: "Arthur Pendelton",
    number: "•••• •••• •••• 8821",
    year: 2028,
    month: 11,
    tier: "Heritage Celadon Guild",
  });

  // Backenddan birinchi kartani olishga urinish
  useEffect(() => {
    fetch('/api/customer-cards')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          const first = data[0];
          setCardData({
            name: first.name || "Master Collector",
            number: first.number ? `•••• •••• •••• ${first.number.slice(-4)}` : "•••• •••• •••• 8821",
            year: first.year || 2028,
            month: first.month || 11,
            tier: first.is_main ? "Celadon Arch-Guild" : "Heritage Artisan",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="member-portal" className="member-section">
        <div className="member-box">
          <div className="member-content">
            <h2>The Heritage Member Guild</h2>
            <p>
              Unlock access to unreleased private wood-kiln firings, personal studio consultations with master potters, and complimentary white-glove worldwide delivery.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">
                  <CheckIcon size={12} color="#D8B46F" />
                </span>
                <span>Private access to 1-of-1 wood-fired kiln auctions</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">
                  <CheckIcon size={12} color="#D8B46F" />
                </span>
                <span>Complimentary seasonal ceramic restoration & cleaning</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">
                  <CheckIcon size={12} color="#D8B46F" />
                </span>
                <span>Integrated digital membership & collector registry</span>
              </div>
            </div>
          </div>

          <div className="card-3d-wrap">
            <div
              className={`card-3d ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
              title="Click to flip card"
            >
              {/* Front Face */}
              <div className="card-face card-front">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E6CA92' }}>
                    {cardData.tier}
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E6CA92" strokeWidth="1.6">
                    <path d="M12 3v18M12 8a5 5 0 0 1 5-5 5 5 0 0 1-5 5M12 14a5 5 0 0 0-5-5 5 5 0 0 0 5 5" />
                  </svg>
                </div>

                <div className="card-chip" />

                <div className="card-number">{cardData.number}</div>

                <div className="card-footer-info">
                  <div>
                    <div className="card-label">Cardholder</div>
                    <div className="card-val">{cardData.name}</div>
                  </div>
                  <div>
                    <div className="card-label">Expires</div>
                    <div className="card-val">{String(cardData.month).padStart(2, '0')}/{String(cardData.year).slice(-2)}</div>
                  </div>
                </div>
              </div>

              {/* Back Face */}
              <div className="card-face card-back">
                <div style={{ background: '#000', height: '36px', margin: '-1.5rem -1.75rem 1rem -1.75rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', color: '#000', padding: '0.4rem 0.75rem', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#666' }}>CVV</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>•••</span>
                </div>
                <div style={{ fontSize: '0.68rem', opacity: '0.8', lineHeight: '1.4' }}>
                  This card is property of Heritage Grove Guild. Valid for gallery viewings and private collector appointments.
                </div>
              </div>
            </div>

            <div className="card-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
              </svg>
              <span>Click card to inspect reverse authentication chip</span>
            </div>
          </div>
        </div>
      </section>
  );
}
