import React from 'react';
import { Facebook, Twitter, Instagram, LinkedIn } from '../icons/Icons.jsx';
import './SocialLinks.css';

function renderSocialIcon(iconName) {
  switch (iconName) {
    case 'Facebook':
      return <Facebook />;
    case 'Twitter':
      return <Twitter />;
    case 'Instagram':
      return <Instagram />;
    case 'LinkedIn':
      return <LinkedIn />;
    default:
      return null;
  }
}

export default function SocialLinks({ socials = [] }) {
  return (
    <div className="socials">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          aria-label={social.name}
        >
          {renderSocialIcon(social.icon)}
        </a>
      ))}
    </div>
  );
}
