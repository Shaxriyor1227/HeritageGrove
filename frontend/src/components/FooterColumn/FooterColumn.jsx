import React from 'react';
import './FooterColumn.css';

export default function FooterColumn({ title, ariaLabel, links = [] }) {
  return (
    <nav className="col" aria-label={ariaLabel || title}>
      <h2 className="col-title">{title}</h2>
      <ul className="link-list">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
