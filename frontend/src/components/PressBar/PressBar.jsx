import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './PressBar.css';

const pressQuotes = [
  {
    outlet: 'Architectural Digest',
    tag: 'Design Excellence',
    tag_uz: 'Dizayn Mukofoti',
    quote: 'The benchmark of serene, wood-fired craftsmanship for contemporary architectural spaces.',
    quote_uz: 'Zamonaviy arxitektura va uylar uchun xumdon hunarmandchiligining eng yuksak namunasi.',
  },
  {
    outlet: 'Vogue Living',
    tag: 'Craft Revival',
    tag_uz: 'San\'at Uyg\'onishi',
    quote: 'Tactile ceramics that transform every domestic moment into a tranquil meditative ritual.',
    quote_uz: 'Har bir sokin lahzani meditativ xotirjamlikka aylantiruvchi nozik sopol idishlar.',
  },
  {
    outlet: 'Elle Décor',
    tag: 'Gallery Edition',
    tag_uz: 'Galereya Nashri',
    quote: 'Rare mineral clay alchemy. Each silhouette carries quiet strength and organic elegance.',
    quote_uz: 'Nodir minerallar kimyosi. Har bir shakl o\'zida ichki kuch va organik nafosatni jamlagan.',
  },
  {
    outlet: 'Kinfolk',
    tag: 'Living Heritage',
    tag_uz: 'Tirik Meros',
    quote: 'A testament to the beauty of slow hands, wild glazes, and wood-fired kiln patience.',
    quote_uz: 'Sabrli qo\'llar, tabiiy sirlar va o\'tin xumdoni sehrining yuksak isboti.',
  },
  {
    outlet: 'Dezeen',
    tag: 'Modern Craft',
    tag_uz: 'Zamonaviy San\'at',
    quote: 'Sculptural purity celebrated by premier interior architects worldwide.',
    quote_uz: 'Dunyoning yetakchi interyer dizaynerlari tomonidan e\'tirof etilgan mukammallik.',
  },
];

export default function PressBar() {
  const { t, lang } = useLanguage();

  return (
    <section className="press-strip-section" aria-label="Press and Editorial Acclaim">
      <div className="press-strip-container">
        <div className="press-strip-header">
          <span className="press-strip-eyebrow">{t('press_eyebrow')}</span>
          <div className="press-rating-badge">
            <span className="stars-row">★★★★★</span>
            <span className="rating-text">4.96/5 {t('press_appraisal')}</span>
          </div>
        </div>

        <div className="press-logos-grid">
          {pressQuotes.map((item, index) => (
            <div key={index} className="press-card">
              <div className="press-outlet-title">{item.outlet}</div>
              <p className="press-card-quote">
                “{lang === 'uz' ? item.quote_uz : item.quote}”
              </p>
              <span className="press-card-tag">
                {lang === 'uz' ? item.tag_uz : item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
