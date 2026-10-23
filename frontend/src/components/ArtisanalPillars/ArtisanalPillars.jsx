import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ArtisanalPillars.css';

const pillars = [
  {
    number: '01',
    title: 'Wild Mineral Clay',
    title_uz: 'Yovvoyi Mineral Gil',
    subtitle: 'Zero Synthetic Binders',
    subtitle_uz: 'Sintetik moddalarsiz',
    desc: 'Harvested from protected riverbeds and aged 180 days in subterranean stone vats. Rich in natural iron and silica for deep earthy resonance.',
    desc_uz: 'Daryo tublaridan yig\'ilib, yer osti tosh xonalarida 180 kun yetiltiriladi. Temir va silikaga boy tabiiy tarkib.',
    highlight: '100% Natural Earth',
    highlight_uz: '100% Tabiiy Tuproq',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '72h Wood-Fired Kiln',
    title_uz: '72 Soatlik O\'tin Xumdoni',
    subtitle: '1,320°C High Reduction',
    subtitle_uz: '1,320°C Yuqori Harorat',
    desc: 'Tempered in traditional multi-chamber anagama kilns with fallen orchard pine. Natural flying ash fuses onto clay, creating unrepeatable botanical textures.',
    desc_uz: 'Qarag\'ay o\'tinlarida an\'anaviy xumdonda toblanadi. Uchuvchi tabiiy kul gil bilan birlashib, takrorlanmas naqsh hosil qiladi.',
    highlight: 'Natural Fly-Ash Glazes',
    highlight_uz: 'Tabiiy Kul Sir Qoplamasi',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Living Heirloom Grade',
    title_uz: 'Avlodlarga Qoluvchi Sifat',
    subtitle: 'Functional Daily Art',
    subtitle_uz: 'Kundalik Foydalanish Uchun',
    desc: 'Vitreous, chip-resistant and fully vitrified. Food-grade certified, microwave and dishwasher safe without ever compromising raw tactile luxury.',
    desc_uz: 'Darz ketmaydigan, to\'liq pishirilgan tosh keramika. Oziq-ovqat uchun xavfsiz va kundalik foydalanishga mo\'ljallangan.',
    highlight: 'Food-Safe & Vitrified',
    highlight_uz: 'Ekologik Xavfsiz & Chidamli',
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
    title_uz: 'Ishonchli Kuryerlik',
    subtitle: '100% Transit Guaranteed',
    subtitle_uz: '100% Yetkazish Kafolati',
    desc: 'Each artwork is encased in bespoke molded biodegradable fiber cradles with a numbered studio registry card. Full transit insurance on every dispatch.',
    desc_uz: 'Har bir asar maxsus xavfsiz o\'ramda raqamlangan sertifikat bilan jo\'natiladi. To\'liq sug\'urta va kafolat.',
    highlight: 'Global Delivery',
    highlight_uz: 'Xalqaro Yetkazib Berish',
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
  const { t, lang } = useLanguage();

  return (
    <section id="pillars" className="pillars-section">
      <div className="pillars-container">
        <div className="pillars-header">
          <div className="pillars-eyebrow">{t('pillars_eyebrow')}</div>
          <h2 className="pillars-title">
            {t('pillars_title_1')} <em>{t('pillars_title_italic')}</em>
          </h2>
          <p className="pillars-subtitle">
            {t('pillars_subtitle')}
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((item, index) => (
            <div key={index} className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-number">{item.number}</span>
                <div className="pillar-icon-box">{item.icon}</div>
              </div>

              <h3 className="pillar-card-title">
                {lang === 'uz' ? item.title_uz : item.title}
              </h3>
              <div className="pillar-card-subtitle">
                {lang === 'uz' ? item.subtitle_uz : item.subtitle}
              </div>
              <p className="pillar-card-desc">
                {lang === 'uz' ? item.desc_uz : item.desc}
              </p>

              <div className="pillar-highlight-pill">
                <span>{lang === 'uz' ? item.highlight_uz : item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
