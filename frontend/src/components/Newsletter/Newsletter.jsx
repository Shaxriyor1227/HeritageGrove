import React, { useState } from 'react';
import { ArrowRight } from '../icons/Icons.jsx';
import { subscribeEmail } from '../../api/subscribe.js';
import './Newsletter.css';

export default function Newsletter({ newsletter }) {
  const {
    title = 'The Letter',
    blurb = 'Sign up for early notice on new arrivals, stories & members-only offers.',
    inputPlaceholder = 'Leave your email',
    buttonAriaLabel = 'Subscribe',
    labelText = 'Email address',
  } = newsletter || {};

  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatusMessage('');

    const res = await subscribeEmail(email);

    setStatusMessage(res.message);
    if (res.status === 201) {
      setEmail('');
    }
    setLoading(false);
  };

  return (
    <div className="newsletter">
      <h2 className="col-title">{title}</h2>
      <p>{blurb}</p>
      <form className="subscribe" onSubmit={handleSubmit} noValidate={false}>
        <label htmlFor="nl-email" className="sr-only">
          {labelText}
        </label>
        <input
          id="nl-email"
          type="email"
          name="email"
          placeholder={inputPlaceholder}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" aria-label={buttonAriaLabel} disabled={loading}>
          <ArrowRight />
        </button>
      </form>
      {statusMessage ? (
        <p className="newsletter-status" role="status" aria-live="polite">
          {statusMessage}
        </p>
      ) : (
        <p className="newsletter-status" role="status" aria-live="polite" />
      )}
    </div>
  );
}
