import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './FaqSection.css';

const faqItems = [
  {
    question: 'Are Heritage Grove vessels food-safe, microwave, and dishwasher friendly?',
    question_uz: 'Heritage Grove idishlari oziq-ovqat uchun xavfsizmi va mikroto\'lqinli pechda ishlatsa bo\'ladimi?',
    answer: 'Yes, without exception. Every vessel is formulated with pure riverbank stoneware clay and botanical mineral glazes, completely free of lead, cadmium, or synthetic fluxes. They are vitrified in wood-fired kilns at 1,320°C into high-density non-porous stone, making them microwave, oven, and dishwasher safe for lifelong daily use.',
    answer_uz: 'Ha, shubhasiz. Har bir buyum qo\'rg\'oshin va sintetik kimyoviy moddalardan xoli tabiiy gildan tayyorlanadi. Ular 1,320°C da toblangani uchun suv shimib olmaydi, idish yuvish mashinasi va mikroto\'lqinli pech uchun to\'liq xavfsizdir.',
    category: 'Functionality & Care',
  },
  {
    question: 'How do you guarantee safe delivery for fragile ceramic artworks worldwide?',
    question_uz: 'Mo\'rt sopol asarlarini yetkazib berish xavfsizligiga qanday kafolat berasiz?',
    answer: 'We treat shipping as an art form. Each piece is suspended in custom molded shock-absorbent biodegradable fiber cradles and double-walled cartons. In the rare event of transit damage, our 100% White-Glove Guarantee provides an immediate complimentary replacement from the same kiln drop or an unconditional full refund.',
    answer_uz: 'Qadoqlashga ham san\'at kabi yondashamiz. Har bir asar maxsus zarbaga chidamli ekologik qutilarga joylanadi. Agar yo\'lda biron shikast yetgudek bo\'lsa, 100% darhol yangisiga almashtirib beriladi yoki mablag\'ingiz to\'liq qaytariladi.',
    category: 'Shipping & Assurance',
  },
  {
    question: 'Can I commission bespoke dinnerware sets or private architectural vessels?',
    question_uz: 'Shaxsiy dizayn asosida buyurtma yoki maxsus restoran to\'plami tayyorlatish mumkinmi?',
    answer: 'Yes. We collaborate intimately with private homeowners, interior architects, and Michelin-starred restaurants for custom suites of 20 to 500 pieces. You can consult directly with our Master Potter via our Studio Concierge to select bespoke clay mixtures, kiln chamber positions, and custom studio seals.',
    answer_uz: 'Albatta. Biz shaxsiy xonadonlar, me\'morlar va Michelin restoranlari uchun 20 tadan 500 donagacha bo\'lgan maxsus to\'plamlarni tayyorlaymiz. Studiya konsyerjimiz orqali bosh usta bilan to\'g\'ridan-to\'g\'ri maslahatlashishingiz mumkin.',
    category: 'Bespoke Commissions',
  },
  {
    question: 'Why do two vessels of the same design exhibit subtle color and surface differences?',
    question_uz: 'Nega bitta turdagi ikkita idishning rangi va sirtida ozgina farqlar bo\'ladi?',
    answer: 'Our traditional multi-chamber climbing kilns are stoked solely with dried fallen orchard pine. The flying wood ash melts organically across the slip at 1,320°C, meaning flame currents and kiln atmosphere paint each vessel individually. These variations are not defects—they are the irrefutable fingerprint of authentic fire.',
    answer_uz: 'An\'anaviy xumdonlarimiz faqat qarag\'ay o\'tinlari bilan yoqiladi. Olov alangasi va uchuvchi kul 1,320°C da har bir idishga turlicha ta\'sir ko\'rsatadi. Bu kamchilik emas — bu tirik olovning yagona va takrorlanmas naqshidir.',
    category: 'Kiln Science',
  },
  {
    question: 'What is your gallery return and home trial policy?',
    question_uz: 'Xarid qilingan buyumni qaytarish yoki almashtirish shartlari qanday?',
    answer: 'We provide a 30-day quiet appraisal period. Place the vessel in your living space, observe it under changing morning and twilight illumination. If it does not bring serenity to your home, contact our concierge for complimentary insured return dispatch and full refund.',
    answer_uz: 'Biz 30 kunlik sinov muddatini taqdim etamiz. Buyumni uyingizga qo\'yib ko\'ring. Agar u sizning xonadoningizga to\'la uyg\'unlashmasa, konsyerjimizga murojaat qiling va bepul qaytarib yuboring.',
    category: 'Shipping & Assurance',
  },
];

export default function FaqSection({ onOpenConcierge }) {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-eyebrow">{t('faq_eyebrow')}</span>
          <h2 className="faq-title">
            {t('faq_title_1')} <em>{t('faq_title_italic')}</em>
          </h2>
          <p className="faq-subtitle">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">
                    {lang === 'uz' ? item.question_uz : item.question}
                  </span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{lang === 'uz' ? item.answer_uz : item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-support-box">
          <div>
            <h4 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--ink)' }}>
              {lang === 'uz' ? 'Qo\'shimcha savollaringiz bormi?' : 'Have a bespoke commission or technical inquiry?'}
            </h4>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: 'var(--ink-soft)' }}>
              {lang === 'uz' ? 'Studiya konsyerji bilan bog\'laning va shaxsiy maslahat oling.' : 'Speak directly with our studio potters and private curation specialists.'}
            </p>
          </div>
          <button className="faq-concierge-btn" onClick={onOpenConcierge}>
            {lang === 'uz' ? 'Konsyerjga Yozish' : 'Open Studio Concierge'}
          </button>
        </div>
      </div>
    </section>
  );
}
