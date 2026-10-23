import React, { useState } from 'react';
import './CraftProcess.css';

const processSteps = [
  {
    step: '01',
    phase: 'Geological Extraction',
    title: 'Mineral Earth & 180-Day Aging',
    summary: 'Raw stoneware clay dug from mineral river valleys is slaked in natural mountain runoff, filtered through fine mesh, and aged in subterranean stone chambers for six months to develop supreme plasticity and mineral depth.',
    detailPill: '180 Days Aged in Stone Vaults',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    meta: ['Subterranean chambers', 'Natural mountain runoff', 'Iron-rich stoneware'],
  },
  {
    step: '02',
    phase: 'Kinetic Formation',
    title: 'Wheel-Thrown on Kick Wheels',
    summary: 'Master artisans work on non-electric foot-powered momentum wheels. Each silhouette is guided strictly by muscle memory and breathing rhythm, trimmed with hand-carved bamboo knives while leather-hard.',
    detailPill: 'Zero Electric Automation',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    meta: ['Foot-powered kick wheels', 'Bamboo trimming tools', 'Leather-hard tuning'],
  },
  {
    step: '03',
    phase: 'Botanical Chemistry',
    title: 'Wild Botanical Ash & Mineral Sips',
    summary: 'We formulate our own glazes using washed orchard pine wood ash, pulverized granite, and feldspar. The high calcium in botanical ash melts in the heat to create soft, celadon and olive-tinted tactile skins.',
    detailPill: '100% Non-Toxic & Food-Safe',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    meta: ['Pine wood ash', 'Pulverized granite', 'Natural mineral slips'],
  },
  {
    step: '04',
    phase: 'Elemental Culmination',
    title: '72-Hour Wood Kiln Reduction at 1,320°C',
    summary: 'Stoked non-stop by teams of potters in three-hour shifts across three days and nights. Flying embers settle on the white-hot vessels, vitrifying the stone into a permanent, ringing resonance.',
    detailPill: '1,320°C Sustained Temperature',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    meta: ['72 Hours Continuous Stoking', 'Orchard Pine Fuel', 'Vitrified Stoneware'],
  },
];

export default function CraftProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="craft-process" className="process-section">
      <div className="process-container">
        <div className="process-header">
          <span className="process-eyebrow">The Alchemical Cycle</span>
          <h2 className="process-title">
            From Raw Earth to <em>Vitrified Poetry</em>
          </h2>
          <p className="process-subtitle">
            Explore the four sacred stages of our kiln tradition. Each piece requires weeks of dedicated patience before it is welcomed into your living sanctuary.
          </p>
        </div>

        {/* Tab selectors for steps */}
        <div className="process-tabs">
          {processSteps.map((item, index) => (
            <button
              key={index}
              className={`process-tab-btn ${activeStep === index ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="tab-step-num">{item.step}</span>
              <div className="tab-text-wrap">
                <span className="tab-phase-name">{item.phase}</span>
                <span className="tab-title-name">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="process-showcase-card">
          <div className="process-visual-side">
            <img
              src={processSteps[activeStep].image}
              alt={processSteps[activeStep].title}
              className="process-main-img"
              loading="lazy"
            />
            <div className="process-image-badge">
              <span className="badge-glow" />
              <span>{processSteps[activeStep].detailPill}</span>
            </div>
          </div>

          <div className="process-info-side">
            <div className="process-info-step-label">
              <span>STAGE {processSteps[activeStep].step} OF 04</span>
              <span>•</span>
              <span className="process-phase-highlight">{processSteps[activeStep].phase}</span>
            </div>

            <h3 className="process-active-title">
              {processSteps[activeStep].title}
            </h3>

            <p className="process-active-summary">
              {processSteps[activeStep].summary}
            </p>

            <div className="process-meta-list">
              {processSteps[activeStep].meta.map((m, i) => (
                <div key={i} className="process-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{m}</span>
                </div>
              ))}
            </div>

            <div className="process-nav-controls">
              <button
                className="process-nav-btn"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                ← Previous Stage
              </button>
              <button
                className="process-nav-btn primary"
                disabled={activeStep === processSteps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(processSteps.length - 1, prev + 1))}
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
