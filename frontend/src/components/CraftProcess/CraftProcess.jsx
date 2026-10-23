import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CraftProcess.css';

const processSteps = [
  {
    step: '01',
    phase: 'Geological Extraction',
    phase_uz: 'Geologik Qazilma',
    title: 'Mineral Earth & 180-Day Aging',
    title_uz: 'Mineral Tuproq va 180 Kunlik Toblash',
    summary: 'Raw stoneware clay dug from mineral river valleys is slaked in natural mountain runoff, filtered through fine mesh, and aged in subterranean stone chambers for six months to develop supreme plasticity and mineral depth.',
    summary_uz: 'Daryo vodiylaridan olingan xom sopol tuprog\'i tog\' suvida yuviladi va yer osti tosh xonalarida olti oy davomida toblanadi.',
    detailPill: '180 Days Aged in Stone Vaults',
    detailPill_uz: '180 Kun Tosh Xonalarda Yetiltirilgan',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    meta: ['Subterranean chambers', 'Natural mountain runoff', 'Iron-rich stoneware'],
    meta_uz: ['Yer osti xonalari', 'Tog\' suvida yuvilgan', 'Temirga boy gil'],
  },
  {
    step: '02',
    phase: 'Kinetic Formation',
    phase_uz: 'Kinetik Shakllantirish',
    title: 'Wheel-Thrown on Kick Wheels',
    title_uz: 'Oyoq Charxida Qo\'lda Yasalish',
    summary: 'Master artisans work on non-electric foot-powered momentum wheels. Each silhouette is guided strictly by muscle memory and breathing rhythm, trimmed with hand-carved bamboo knives while leather-hard.',
    summary_uz: 'Ustalarimiz elektrsiz, faqat oyoq kuchi bilan aylanuvchi charxlarda ishlaydi. Har bir shakl nafas olish ritmi va tajriba bilan yaratiladi.',
    detailPill: 'Zero Electric Automation',
    detailPill_uz: 'Nol Elektr Avtomatizatsiyasi',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    meta: ['Foot-powered kick wheels', 'Bamboo trimming tools', 'Leather-hard tuning'],
    meta_uz: ['Oyoq charxi', 'Bambuk pichoqlar', 'Qo\'l mehnati'],
  },
  {
    step: '03',
    phase: 'Botanical Chemistry',
    phase_uz: 'Botanik Kimyo',
    title: 'Wild Botanical Ash & Mineral Sips',
    title_uz: 'Tabiiy Botanik Kul va Sirlar',
    summary: 'We formulate our own glazes using washed orchard pine wood ash, pulverized granite, and feldspar. The high calcium in botanical ash melts in the heat to create soft, celadon and olive-tinted tactile skins.',
    summary_uz: 'Sirlarimizni o\'zimiz qarag\'ay o\'tini kuli, maydalangan granit va dala shpatidan tayyorlaymiz. Bu buyumlarga mayin zaytun va seladon rangini beradi.',
    detailPill: '100% Non-Toxic & Food-Safe',
    detailPill_uz: '100% Zaxarsiz va Oziq-Ovqatga Xavfsiz',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    meta: ['Pine wood ash', 'Pulverized granite', 'Natural mineral slips'],
    meta_uz: ['Qarag\'ay o\'tin kuli', 'Maydalangan granit', 'Tabiiy minerallar'],
  },
  {
    step: '04',
    phase: 'Elemental Culmination',
    phase_uz: 'Olov Cho\'qqisi',
    title: '72-Hour Wood Kiln Reduction at 1,320°C',
    title_uz: '1,320°C da 72 Soatlik Xumdon Toblashi',
    summary: 'Stoked non-stop by teams of potters in three-hour shifts across three days and nights. Flying embers settle on the white-hot vessels, vitrifying the stone into a permanent, ringing resonance.',
    summary_uz: 'Uch kun va uch kecha davomida ustalar tinimsiz o\'tin qalashadi. Olov uchqunlari sopol yuzasiga qonib, uni abadiy tosh sifatiga keltiradi.',
    detailPill: '1,320°C Sustained Temperature',
    detailPill_uz: '1,320°C Doimiy Harorat',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    meta: ['72 Hours Continuous Stoking', 'Orchard Pine Fuel', 'Vitrified Stoneware'],
    meta_uz: ['72 soat tinimsiz olov', 'Qarag\'ay o\'tini', 'Tosh chidamliligi'],
  },
];

export default function CraftProcess() {
  const { t, lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const current = processSteps[activeStep];

  return (
    <section id="craft-process" className="process-section">
      <div className="process-container">
        <div className="process-header">
          <span className="process-eyebrow">{t('process_eyebrow')}</span>
          <h2 className="process-title">
            {t('process_title_1')} <em>{t('process_title_italic')}</em>
          </h2>
          <p className="process-subtitle">
            {t('process_subtitle')}
          </p>
        </div>

        {/* Tab selectors for steps */}
        <div className="process-tabs">
          {processSteps.map((step, idx) => (
            <button
              key={idx}
              className={`process-tab-btn ${activeStep === idx ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <span className="tab-step-num">{step.step}</span>
              <span className="tab-step-phase">
                {lang === 'uz' ? step.phase_uz : step.phase}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Step Display */}
        <div className="process-stage-card">
          <div className="process-card-image-box">
            <img
              src={current.image}
              alt={current.title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="process-pill-badge">
              {lang === 'uz' ? current.detailPill_uz : current.detailPill}
            </div>
          </div>

          <div className="process-card-info">
            <div className="process-phase-badge">
              Phase {current.step} • {lang === 'uz' ? current.phase_uz : current.phase}
            </div>
            <h3 className="process-card-title">
              {lang === 'uz' ? current.title_uz : current.title}
            </h3>
            <p className="process-card-summary">
              {lang === 'uz' ? current.summary_uz : current.summary}
            </p>

            <div className="process-meta-list">
              {(lang === 'uz' ? current.meta_uz : current.meta).map((item, mIdx) => (
                <span key={mIdx} className="process-meta-item">
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="process-nav-buttons">
              <button
                className="process-nav-prev"
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))}
              >
                ← {lang === 'uz' ? 'Oldingi' : 'Previous'}
              </button>
              <button
                className="process-nav-next"
                onClick={() => setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))}
              >
                {lang === 'uz' ? 'Keyingi Bosqich' : 'Next Stage'} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
