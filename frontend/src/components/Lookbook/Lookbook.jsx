import React, { useState } from 'react';
import './Lookbook.css';

const lookbookSpaces = [
  {
    id: 1,
    title: 'Brutalist Concrete Dining Table',
    category: 'Dining & Feast',
    room: 'Zurich Penthouse',
    featured: 'Speckled Stoneware Platter & Mezze Bowls',
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=900&q=80',
    desc: 'Contrasting the crisp geometric lines of raw architectural concrete with the soft, organic undulation of wood-fired dinnerware.',
  },
  {
    id: 2,
    title: 'Morning Sun Tea Chamber',
    category: 'Tea Sanctuary',
    room: 'Kyoto-Style Tea Room',
    featured: 'Ash-Glazed Kyusu & Iron Teacups',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    desc: 'Soft cedarwood slats, tatami mat flooring, and natural morning light illuminate the matte celadon glaze of our ritual tea set.',
  },
  {
    id: 3,
    title: 'The Ceramicist Solitary Mantel',
    category: 'Architectural Mantels',
    room: 'Oslo Studio Loft',
    featured: 'Monolithic Gourd Vase & Dried Orchard Branches',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80',
    desc: 'A single dramatic silhouette holding wild dried plum branches, casting sculptural shadows across chalk lime plaster.',
  },
  {
    id: 4,
    title: 'Open Studio Shelving System',
    category: 'Studio Storage',
    room: 'Copenhagen Atelier',
    featured: 'Nested Fluted Bowls & Mineral Pitchers',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=900&q=80',
    desc: 'Everyday functional ware arranged in calm rhythmic progression. Durable, vitreous, and welcoming to daily touch.',
  },
];

export default function Lookbook({ onExploreCollection }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filterOptions = ['All', 'Tea Sanctuary', 'Dining & Feast', 'Architectural Mantels', 'Studio Storage'];

  const filteredItems = lookbookSpaces.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <section id="lookbook" className="lookbook-section">
      <div className="lookbook-container">
        <div className="lookbook-header">
          <span className="lookbook-eyebrow">In Situ Curation</span>
          <h2 className="lookbook-title">
            Vessels in <em>Living Sanctuaries</em>
          </h2>
          <p className="lookbook-subtitle">
            Ceramics do not exist in isolation. See how master collectors, architects, and culinary artists integrate Heritage Grove into their private spaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="lookbook-filters">
          {filterOptions.map((f) => (
            <button
              key={f}
              className={`lookbook-filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="lookbook-grid">
          {filteredItems.map((space) => (
            <div
              key={space.id}
              className="lookbook-card"
              onClick={() => setActiveModalItem(space)}
            >
              <div className="lookbook-img-wrap">
                <img
                  src={space.image}
                  alt={space.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="lookbook-card-overlay">
                  <span className="lookbook-inspect-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>View Space Details</span>
                  </span>
                </div>
                <span className="lookbook-tag-pill">{space.category}</span>
              </div>

              <div className="lookbook-card-info">
                <span className="lookbook-room-label">{space.room}</span>
                <h3 className="lookbook-card-title">{space.title}</h3>
                <p className="lookbook-featured-line">
                  <strong>Featured Objects:</strong> {space.featured}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook Inspection Modal */}
        {activeModalItem && (
          <div className="lookbook-modal-backdrop" onClick={() => setActiveModalItem(null)}>
            <div className="lookbook-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="lookbook-modal-close"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <div className="lookbook-modal-visual">
                <img src={activeModalItem.image} alt={activeModalItem.title} />
              </div>

              <div className="lookbook-modal-body">
                <span className="lookbook-modal-eyebrow">
                  {activeModalItem.category} • {activeModalItem.room}
                </span>
                <h3 className="lookbook-modal-title">{activeModalItem.title}</h3>
                <p className="lookbook-modal-desc">{activeModalItem.desc}</p>

                <div className="lookbook-modal-featured-box">
                  <strong>Styled Ceramic Collection:</strong>
                  <span>{activeModalItem.featured}</span>
                </div>

                <div className="lookbook-modal-actions">
                  {onExploreCollection && (
                    <button
                      className="lookbook-btn-primary"
                      onClick={() => {
                        setActiveModalItem(null);
                        onExploreCollection();
                      }}
                    >
                      Shop Featured Collection
                    </button>
                  )}
                  <button
                    className="lookbook-btn-secondary"
                    onClick={() => setActiveModalItem(null)}
                  >
                    Close View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
