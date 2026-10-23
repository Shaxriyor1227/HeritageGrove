import React, { useState } from 'react';
import './StudioConcierge.css';

export default function StudioConcierge({ isOpen, onClose, onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Bespoke Dinnerware (20+ Pieces)',
    estimatedBudget: '$2,500 – $5,000',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      if (onToast) {
        onToast(
          'Consultation Requested',
          `Thank you ${formData.name}. Our Master Kiln Steward will reach out to ${formData.email} within 24 hours.`,
          'success'
        );
      }
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Bespoke Dinnerware (20+ Pieces)',
        estimatedBudget: '$2,500 – $5,000',
        notes: '',
      });
    }, 900);
  };

  return (
    <div className="concierge-modal-backdrop" onClick={onClose}>
      <div className="concierge-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="concierge-close-btn" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>

        <div className="concierge-modal-header">
          <div className="concierge-eyebrow">Studio Appointments &amp; Commissions</div>
          <h2 className="concierge-modal-title">Private Concierge Consultation</h2>
          <p className="concierge-modal-subtitle">
            Engage directly with our master ceramicists for private architectural commissions, custom tasting sets, or scheduled studio visits.
          </p>
        </div>

        <form className="concierge-form" onSubmit={handleSubmit}>
          <div className="concierge-form-row">
            <div className="concierge-field">
              <label htmlFor="c-name">Full Name or Architectural Studio *</label>
              <input
                id="c-name"
                type="text"
                required
                placeholder="e.g. Julian Montgomery"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="concierge-field">
              <label htmlFor="c-email">Official Correspondence Email *</label>
              <input
                id="c-email"
                type="email"
                required
                placeholder="julian@montgomery.art"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="concierge-form-row">
            <div className="concierge-field">
              <label htmlFor="c-type">Nature of Inquiry</label>
              <select
                id="c-type"
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              >
                <option value="Bespoke Dinnerware (20+ Pieces)">Bespoke Dinnerware Suite (20+ Pieces)</option>
                <option value="Architectural Large-Scale Sculpture">Architectural Large-Scale Sculpture</option>
                <option value="Michelin Hospitality Commission">Michelin Hospitality Commission</option>
                <option value="Private Studio & Kiln Tour Appointment">Private Studio & Kiln Tour Appointment</option>
                <option value="Wedding / Guild Registry">Wedding / Guild Registry</option>
              </select>
            </div>

            <div className="concierge-field">
              <label htmlFor="c-budget">Project Scope / Budget Allocation</label>
              <select
                id="c-budget"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
              >
                <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                <option value="$15,000+">$15,000+ (Estate / Hospitality)</option>
              </select>
            </div>
          </div>

          <div className="concierge-field">
            <label htmlFor="c-notes">Project Notes or Specific Dimensions</label>
            <textarea
              id="c-notes"
              rows="3"
              placeholder="Describe your space, timeline, glazes of interest (ash celadon, matte iron, etc.)..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="concierge-footnote">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Confidential correspondence. We respond within one studio business day.</span>
          </div>

          <div className="concierge-actions">
            <button type="button" className="concierge-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="concierge-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Transmitting Request...' : 'Submit Consultation Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
