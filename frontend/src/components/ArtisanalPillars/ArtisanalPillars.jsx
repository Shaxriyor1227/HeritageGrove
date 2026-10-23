import React from 'react';
import './ArtisanalPillars.css';

const pillars = [
  {
    number: '01',
    title: 'Wild Mineral Clay',
    subtitle: 'Zero Synthetic Binders',
    desc: 'Harvested from protected riverbeds and aged 180 days in subterranean stone vats. Rich in natural iron and silica for deep earthy resonance.',
    highlight: '100% Natural Earth',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '72h Wood-Fired Kiln',
    subtitle: '1,320°C High Reduction',
    desc: 'Tempered in traditional multi-chamber anagama kilns with fallen orchard pine. Natural flying ash fuses onto clay, creating unrepeatable botanical textures.',
    highlight: 'Natural Fly-Ash Glazes',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Living Heirloom Grade',
    subtitle: 'Functional Daily Art',
    desc: 'Vitreous, chip-resistant and fully vitrified. Food-grade certified, microwave and dishwasher safe without ever compromising raw tactile luxury.',
    highlight: 'Food-Safe & Vitrified',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'White-Glove Courier',
    subtitle: '100% Transit Guaranteed',
    desc: 'Each artwork is encased in bespoke molded biodegradable fiber cradles with a numbered studio registry card. Full transit insurance on every dispatch.',
    highlight: 'Global Carbon-Neutral Delivery',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function ArtisanalPillars() {
  return (
    <section id="pillars" className="pillars-section">
      <div className="pillars-container">
        <div className="pillars-header">
          <div className="pillars-eyebrow">The Heritage Grove Standards</div>
          <h2 className="pillars-title">
            Artisanal Integrity in <em>Every Detail</em>
          </h2>
          <p className="pillars-subtitle">
            We reject the disposable velocity of modern manufacturing. Every vessel represents a deliberate synthesis of mineral science, elemental fire, and patient hands.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((item, index) => (
            <div key={index} className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-num">{item.number}</span>
                <div className="pillar-icon-wrap">{item.icon}</div>
              </div>
              <h3 className="pillar-name">{item.title}</h3>
              <div className="pillar-sub">{item.subtitle}</div>
              <p className="pillar-desc">{item.desc}</p>
              <div className="pillar-highlight-tag">
                <span className="dot-pulse" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
