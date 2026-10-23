import React from 'react';
import { footerContent } from '../../data/footerContent.js';
import FooterBackground from '../FooterBackground/FooterBackground.jsx';
import BrandBlock from '../BrandBlock/BrandBlock.jsx';
import FooterColumn from '../FooterColumn/FooterColumn.jsx';
import Newsletter from '../Newsletter/Newsletter.jsx';
import SocialLinks from '../SocialLinks/SocialLinks.jsx';
import LegalNav from '../LegalNav/LegalNav.jsx';
import './Footer.css';

export default function Footer() {
  const { brand, columns = [], newsletter, socials = [], legal = [], media } = footerContent;

  return (
    <footer className="site-footer">
      <FooterBackground videoUrl={media.video} posterUrl={media.poster} />
      <div className="footer-inner">
        <div className="footer-grid">
          <BrandBlock brand={brand} />
          {columns.map((col) => (
            <FooterColumn
              key={col.id}
              title={col.title}
              ariaLabel={col.ariaLabel}
              links={col.links}
            />
          ))}
          <Newsletter newsletter={newsletter} />
        </div>
        <div className="footer-bottom">
          <SocialLinks socials={socials} />
          <LegalNav links={legal} />
        </div>
      </div>
    </footer>
  );
}
