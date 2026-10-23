import React, { useState } from 'react';
import './Testimonials.css';

const collectorReviews = [
  {
    id: 1,
    name: 'Henrik Vanger',
    role: 'Principal Architect, Vanger & Co.',
    location: 'Stockholm, Sweden',
    category: 'Architects',
    acquired: 'Kyoto Charcoal Ash Vase',
    rating: 5,
    date: 'March 2026',
    verified: true,
    text: 'We commissioned three monolithic vessels for a minimalist waterfront villa. The depth of the wood-fired reduction glaze is hypnotic; guests consistently pause and touch the surface. In a world of synthetic mass production, Heritage Grove is pure soul.',
  },
  {
    id: 2,
    name: 'Chef Miho Tanaka',
    role: 'Three-Star Michelin Culinary Director',
    location: 'Kyoto, Japan',
    category: 'Culinary Masters',
    acquired: 'Raw Stoneware Tasting Bowls (Set of 12)',
    rating: 5,
    date: 'February 2026',
    verified: true,
    text: 'In kaiseki dining, the ceramic vessel is equal partner to the seasonal ingredient. Heritage Grove bowls elevate delicate broths with their thermal retention and unglazed tactile foot. Masterful craftsmanship.',
  },
  {
    id: 3,
    name: 'Julian Montgomery',
    role: 'Contemporary Art Collector & Patron',
    location: 'London, United Kingdom',
    category: 'Private Collectors',
    acquired: 'Celadon Arch-Guild Member Jar',
    rating: 5,
    date: 'January 2026',
    verified: true,
    text: 'The unboxing experience alone reflects consummate care. Encased in molded botanical fiber with a numbered kiln certificate. The crackle celadon glaze has subtle blue-green fissures that catch morning light like quiet water.',
  },
  {
    id: 4,
    name: 'Camilla & Jean-Paul Laurent',
    role: 'Interior Design Studio Principals',
    location: 'Geneva, Switzerland',
    category: 'Architects',
    acquired: 'Wood-Fired Anagama Pitcher',
    rating: 5,
    date: 'April 2026',
    verified: true,
    text: 'Flawless balance. The pitcher pours without a single drop lost, and the handle ergonomics fit naturally in hands of any size. It has become the centerpiece of our studio conference table.',
  },
  {
    id: 5,
    name: 'David K. Chen',
    role: 'Gongfu Tea Practitioner & Author',
    location: 'San Francisco, USA',
    category: 'Private Collectors',
    acquired: 'Iron-Speckled Gaiwan & Cups',
    rating: 5,
    date: 'March 2026',
    verified: true,
    text: 'A gaiwan must feel like an extension of one’s fingertips during a 100°C pour. The heat dissipation of their wild riverbank clay is extraordinary. No burns, perfect aromatic release.',
  },
  {
    id: 6,
    name: 'Sybilla Fontaine',
    role: 'Sommelier & Hospitality Consultant',
    location: 'Paris, France',
    category: 'Culinary Masters',
    acquired: 'Earth & Embers Decanting Carafe',
    rating: 5,
    date: 'December 2025',
    verified: true,
    text: 'Natural stoneware imparts a pleasant micro-aeration to aged natural wines. Not to mention the sheer visual poetry it brings to a candlelight dinner table.',
  },
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('All');

  const filterTabs = ['All', 'Architects', 'Culinary Masters', 'Private Collectors'];

  const filteredReviews = collectorReviews.filter(
    (r) => activeTab === 'All' || r.category === activeTab
  );

  return (
    <section id="collector-reviews" className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">Verified Appraisals</span>
          <h2 className="testimonials-title">
            Words from our <em>Patrons &amp; Stewards</em>
          </h2>
          <p className="testimonials-subtitle">
            Across 42 nations, architects, Michelin chefs, and quiet connoisseurs live with Heritage Grove ceramics every day.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="rating-summary-banner">
            <div className="rating-summary-stars">★★★★★</div>
            <div className="rating-summary-score">4.96 / 5.0</div>
            <div className="rating-summary-count">Based on 850+ Verified Kiln Deliveries Worldwide</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="testimonials-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`testimonial-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="testimonials-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="testimonial-card">
              <div className="testimonial-card-top">
                <div className="testimonial-stars">{'★'.repeat(rev.rating)}</div>
                <div className="testimonial-verified-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Verified Kiln Patron</span>
                </div>
              </div>

              <p className="testimonial-quote-text">“{rev.text}”</p>

              <div className="testimonial-acquired-box">
                <span className="acquired-label">Acquired:</span>
                <span className="acquired-name">{rev.acquired}</span>
              </div>

              <div className="testimonial-author-block">
                <div className="author-avatar-initials">
                  {rev.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="author-name">{rev.name}</h4>
                  <div className="author-role">{rev.role}</div>
                  <div className="author-location">{rev.location} • {rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
