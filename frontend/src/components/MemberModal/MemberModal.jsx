import React, { useState } from 'react';
import { CloseIcon } from '../icons/Icons.jsx';
import './MemberModal.css';

export default function MemberModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998901234567",
    number: "8600123456789012",
    customer_id: 1,
    year: 2029,
    month: 12,
    is_active: true,
    is_main: true,
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/customer-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year, 10),
          month: parseInt(formData.month, 10),
          customer_id: parseInt(formData.customer_id, 10),
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Virtual Member Card issued successfully in PostgreSQL!" });
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1200);
      } else {
        const text = await res.text();
        setStatus({ type: "error", msg: text || "Registration failed" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Server connection failed: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={16} />
          </button>
          
          <h3 className="modal-title">Join the Collector Guild</h3>
          <p className="modal-desc">
            Register your virtual Heritage Member Card. Securely authenticated and stored in your PostgreSQL backend database.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Master Anvar"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  className="form-input"
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  className="form-input"
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Month (1-12)</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  max="12"
                  required
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Expiry Year</label>
                <input
                  className="form-input"
                  type="number"
                  min="2026"
                  max="2035"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registering in PostgreSQL..." : "Issue Virtual Member Card"}
            </button>

            {status && (
              <div className={`status-msg ${status.type}`}>
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
  );
}
