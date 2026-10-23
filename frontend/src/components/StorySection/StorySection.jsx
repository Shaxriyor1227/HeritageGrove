import React from 'react';
import { storyStats } from '../../data/products.js';
import './StorySection.css';

export default function StorySection() {
  return (
    <section id="craft-story" className="story-section">
      <div className="story-container">
        <div className="story-body">
          <div className="story-eyebrow">Our Roots & Heritage</div>
          <h2 className="story-heading">Patience in Clay, Timelessness in Spirit</h2>
          
          <p className="story-text">
            Every Heritage Grove piece begins as raw riverbank stoneware clay, aged for six months in shaded stone chambers. Our master potters turn each silhouette on foot-powered wheels, honoring centuries-old Asian and Mediterranean ceramic traditions.
          </p>

          <p className="story-text">
            We fire exclusively with dried fallen orchard pine in traditional multi-chamber climbing kilns. The fly-ash fuses naturally onto the porcelain slip, producing organic variations that can never be replicated by industrial factories.
          </p>

          <div className="stats-grid">
            {storyStats.map((stat, i) => (
              <div key={i} className="stat-item" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-sub">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="story-visual-mosaic">
          <img
            className="mosaic-main-img"
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85"
            alt="Artisan hands shaping ceramic on potter wheel"
            loading="lazy"
            decoding="async"
            width="600"
            height="450"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="mosaic-badge">
            <div className="mosaic-badge-title">Master Kiln Fire</div>
            <div className="mosaic-badge-desc">1,320°C high-fire reduction for stone resonance and permanent water tightness.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
