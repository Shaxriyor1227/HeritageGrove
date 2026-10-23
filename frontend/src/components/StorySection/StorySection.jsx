import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './StorySection.css';

const storyStatsData = [
  { value: '1,320°C', label: 'Kiln Firing Temperature', label_uz: 'Xumdon Olov Harorati', sub: 'Wood-fired reduction', sub_uz: 'O\'tinda toblangan' },
  { value: '180+', label: 'Days Clay Aging', label_uz: 'Kun Gil Yetiltirilishi', sub: 'In stone vaults', sub_uz: 'Tosh xonalarida' },
  { value: '100%', label: 'Food Safe & Vitrified', label_uz: 'Xavfsiz va Pishiq', sub: 'Zero toxic additives', sub_uz: 'Zararsiz tabiiy sir' },
  { value: '42', label: 'Nations Reached', label_uz: 'Davlatga Yetkazilgan', sub: 'White-glove courier', sub_uz: 'Ishonchli kuryer' },
];

export default function StorySection() {
  const { lang } = useLanguage();

  return (
    <section id="craft-story" className="story-section">
      <div className="story-container">
        <div className="story-body">
          <div className="story-eyebrow">
            {lang === 'uz' ? 'Ildizlarimiz va Merosimiz' : 'Our Roots & Heritage'}
          </div>
          <h2 className="story-heading">
            {lang === 'uz' ? 'Gildagi Sabr, Ruhdagi Abadiylik' : 'Patience in Clay, Timelessness in Spirit'}
          </h2>
          
          <p className="story-text">
            {lang === 'uz'
              ? 'Heritage Grove ning har bir asari daryo bo\'yidagi xom toshsimon gildan boshlanadi va olti oy davomida salqin tosh xonalarda yetiltiriladi. Bosh ustalarimiz har bir shaklni oyoq charxida qo\'lda yaratib, ko\'p asrlik an\'analarni sharaflaydilar.'
              : 'Every Heritage Grove piece begins as raw riverbank stoneware clay, aged for six months in shaded stone chambers. Our master potters turn each silhouette on foot-powered wheels, honoring centuries-old Asian and Mediterranean ceramic traditions.'}
          </p>

          <p className="story-text">
            {lang === 'uz'
              ? 'Biz xumdonlarimizni faqat quruq qarag\'ay o\'tinlari bilan qiziymiz. Olov uchqunlari va kul sirtda tabiiy erib, hech qanday zavod takrorlay olmaydigan tirik naqshlarni hosil qiladi.'
              : 'We fire exclusively with dried fallen orchard pine in traditional multi-chamber climbing kilns. The fly-ash fuses naturally onto the porcelain slip, producing organic variations that can never be replicated by industrial factories.'}
          </p>

          <div className="stats-grid">
            {storyStatsData.map((stat, i) => (
              <div key={i} className="stat-item" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">
                  {lang === 'uz' ? stat.label_uz : stat.label}
                </span>
                <span className="stat-sub">
                  {lang === 'uz' ? stat.sub_uz : stat.sub}
                </span>
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
            <div className="mosaic-badge-title">
              {lang === 'uz' ? 'Usta Xumdon Olovi' : 'Master Kiln Fire'}
            </div>
            <div className="mosaic-badge-desc">
              {lang === 'uz'
                ? 'Toshdek mustahkamlik va suv o\'tkazmaslik uchun 1,320°C li yuqori haroratli toblash.'
                : '1,320°C high-fire reduction for stone resonance and permanent water tightness.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
