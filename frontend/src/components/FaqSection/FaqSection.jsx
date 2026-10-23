import React, { useState } from 'react';
import './FaqSection.css';

const faqItems = [
  {
    question: 'Are Heritage Grove vessels food-safe, microwave, and dishwasher friendly?',
    answer: 'Yes, without exception. Every vessel is formulated with pure riverbank stoneware clay and botanical mineral glazes, completely free of lead, cadmium, or synthetic fluxes. They are vitrified in wood-fired kilns at 1,320°C into high-density non-porous stone, making them microwave, oven, and dishwasher safe for lifelong daily use.',
    category: 'Functionality & Care',
  },
  {
    question: 'How do you guarantee safe delivery for fragile ceramic artworks worldwide?',
    answer: 'We treat shipping as an art form. Each piece is suspended in custom molded shock-absorbent biodegradable fiber cradles and double-walled cartons. In the rare event of transit damage, our 100% White-Glove Guarantee provides an immediate complimentary replacement from the same kiln drop or an unconditional full refund.',
    category: 'Shipping & Assurance',
  },
  {
    question: 'Can I commission bespoke dinnerware sets or private architectural vessels?',
    answer: 'Yes. We collaborate intimately with private homeowners, interior architects, and Michelin-starred restaurants for custom suites of 20 to 500 pieces. You can consult directly with our Master Potter via our Studio Concierge to select bespoke clay mixtures, kiln chamber positions, and custom studio seals.',
    category: 'Bespoke Commissions',
  },
  {
    question: 'Why do two vessels of the same design exhibit subtle color and surface differences?',
    answer: 'Our traditional multi-chamber climbing kilns are stoked solely with dried fallen orchard pine. The flying wood ash melts organically across the slip at 1,320°C, meaning flame currents and kiln atmosphere paint each vessel individually. These variations are not defects—they are the irrefutable fingerprint of authentic fire.',
    category: 'Kiln Science',
  },
  {
    question: 'What is your gallery return and home trial policy?',
    answer: 'We provide a 30-day quiet appraisal period. Place the vessel in your living space, observe it under changing morning and twilight illumination. If it does not bring serenity to your home, contact our concierge for complimentary insured return dispatch and full refund.',
    category: 'Shipping & Assurance',
  },
  {
    question: 'How should I care for and maintain wood-fired matte ceramic surfaces over decades?',
    answer: 'Wash with gentle warm water and mild soap. The unglazed foot and tactile stoneware surfaces will naturally develop an endearing, subtle patina over decades of handling, deepening in resonance much like heirloom timber or seasoned iron.',
    category: 'Functionality & Care',
  },
];

export default function FaqSection({ onOpenConcierge }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-eyebrow">Clarity &amp; Assurance</span>
          <h2 className="faq-title">
            Frequently Asked <em>Inquiries</em>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about our kiln philosophy, functional food safety, international courier guarantees, and bespoke private commissions.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-accordion-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <span className="faq-q-badge">{item.category}</span>
                    <span className="faq-q-text">{item.question}</span>
                  </div>
                  <span className="faq-chevron-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Callout */}
        <div className="faq-support-callout">
          <div>
            <h4 className="callout-title">Have a specific architectural or bespoke question?</h4>
            <p className="callout-desc">
              Our Studio Concierge is on hand to assist with dimensions, dinnerware pairings, and international freight inquiries.
            </p>
          </div>
          <button
            className="callout-concierge-btn"
            onClick={onOpenConcierge}
          >
            <span>Consult Studio Concierge</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
