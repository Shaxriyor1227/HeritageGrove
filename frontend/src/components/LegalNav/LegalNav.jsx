import React from 'react';
import './LegalNav.css';

export default function LegalNav({ links = [] }) {
  return (
    <nav className="legal" aria-label="Legal">
      {links.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
