import React, { useEffect, useRef, useState } from 'react';
import './FooterBackground.css';

export default function FooterBackground({ videoUrl, posterUrl }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 24;
      const y = ((e.clientY / innerHeight) - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Robust video playback: autoplay, visibility observer, and gesture triggers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct property assignment for reliable browser autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video) {
        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    // Attempt instant play
    playVideo();

    // Trigger on canplay
    video.addEventListener('canplay', playVideo);

    // Play when footer enters viewport
    let observer;
    if ('IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    // Play on first user interaction anywhere (scroll, touch, click, mousemove)
    const onUserGesture = () => {
      playVideo();
      window.removeEventListener('scroll', onUserGesture);
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('mousemove', onUserGesture);
    };

    window.addEventListener('scroll', onUserGesture, { passive: true });
    window.addEventListener('click', onUserGesture, { passive: true });
    window.addEventListener('touchstart', onUserGesture, { passive: true });
    window.addEventListener('mousemove', onUserGesture, { passive: true });

    return () => {
      video.removeEventListener('canplay', playVideo);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onUserGesture);
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('mousemove', onUserGesture);
    };
  }, [videoUrl]);

  return (
    <div ref={containerRef} className="footer-media" aria-hidden="true">
      <div
        className="footer-bg-wrapper"
        style={{
          transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0) scale(1.04)`,
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="footer-bg"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="footer-media-overlay" />
    </div>
  );
}

