import React from 'react';
import { BrandMark, Envelope, Phone, MapPin } from '../icons/Icons.jsx';
import './BrandBlock.css';

function renderContactIcon(iconName) {
  switch (iconName) {
    case 'Envelope':
      return <Envelope />;
    case 'Phone':
      return <Phone />;
    case 'MapPin':
      return <MapPin />;
    default:
      return null;
  }
}

export default function BrandBlock({ brand }) {
  const { name, blurb, contacts = [] } = brand;

  return (
    <div className="brand">
      <div className="brand-lockup">
        <BrandMark />
        <p className="brand-name">{name}</p>
      </div>
      <p className="brand-blurb">{blurb}</p>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            {renderContactIcon(contact.icon)}
            {contact.href ? (
              <a href={contact.href}>{contact.label}</a>
            ) : (
              <span>{contact.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
