import { useEffect } from 'react';

/**
 * Custom hook to observe elements with `.reveal-on-scroll` class.
 * Replays animations whenever a user scrolls back into a section
 * or clicks navigation links to jump between sections.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // When section leaves the viewport, reset so it re-reveals when revisited
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20px 0px -40px 0px',
        threshold: [0, 0.12],
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Listen to hash/anchor navigation clicks to ensure target section re-animates
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const targetSection = document.querySelector(hash);
      if (!targetSection) return;

      const revealEl =
        targetSection.closest('.reveal-on-scroll') ||
        targetSection.querySelector('.reveal-on-scroll') ||
        (targetSection.classList.contains('reveal-on-scroll') ? targetSection : null);

      if (revealEl) {
        // Reset and trigger fresh entrance animation as user arrives at section
        revealEl.classList.remove('is-revealed');
        setTimeout(() => {
          revealEl.classList.add('is-revealed');
        }, 120);
      }
    };

    // Also handle browser hashchange (e.g. forward/back button)
    const handleHashChange = () => {
      if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
          const revealEl =
            targetSection.closest('.reveal-on-scroll') ||
            targetSection.querySelector('.reveal-on-scroll') ||
            (targetSection.classList.contains('reveal-on-scroll') ? targetSection : null);

          if (revealEl) {
            revealEl.classList.remove('is-revealed');
            setTimeout(() => {
              revealEl.classList.add('is-revealed');
            }, 120);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
