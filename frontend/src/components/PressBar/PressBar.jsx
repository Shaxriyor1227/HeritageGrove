import React from 'react';
import './PressBar.css';

const pressQuotes = [
  {
    outlet: 'Architectural Digest',
    tag: 'Design Excellence',
    quote: 'The benchmark of serene, wood-fired craftsmanship for contemporary architectural spaces.',
  },
  {
    outlet: 'Vogue Living',
    tag: 'Craft Revival',
    quote: 'Tactile ceramics that transform every domestic moment into a tranquil meditative ritual.',
  },
  {
    outlet: 'Elle Décor',
    tag: 'Gallery Edition',
    quote: 'Rare mineral clay alchemy. Each silhouette carries quiet strength and organic elegance.',
  },
  {
    outlet: 'Kinfolk',
    tag: 'Living Heritage',
    quote: 'A testament to the beauty of slow hands, wild glazes, and wood-fired kiln patience.',
  },
  {
    outlet: 'Dezeen',
    tag: 'Modern Craft',
    quote: 'Sculptural purity celebrated by premier interior architects worldwide.',
  },
];

export default function PressBar() {
  return (
    <section className="press-strip-section" aria-label="Press and Editorial Acclaim">
      <div className="press-strip-container">
        <div className="press-strip-header">
          <span className="press-strip-eyebrow">As Featured In Global Design Compendiums</span>
          <div className="press-rating-badge">
            <span className="stars-row">★★★★★</span>
            <span className="rating-text">4.96/5 Collector Appraisal across 42 Countries</span>
          </div>
        </div>

        <div className="press-logos-grid">
          {pressQuotes.map((item, index) => (
            <div key={index} className="press-card">
              <div className="press-outlet-title">{item.outlet}</div>
              <p className="press-card-quote">“{item.quote}”</p>
              <span className="press-card-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
