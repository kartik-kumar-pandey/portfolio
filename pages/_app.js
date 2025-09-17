import '../styles/style.css';
import '../components/ProfileCard.css';
import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import DarkVeil from '../components/DarkVeil';
import TargetCursor from '../components/TargetCursor';

function MyApp({ Component, pageProps }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseInWindow, setMouseInWindow] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseInWindow(true);
    };
    
    const handleMouseEnter = () => {
      setMouseInWindow(true);
    };
    
    const handleMouseLeave = () => {
      setMouseInWindow(false);
    };

    // Use document events instead of window events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Touch support so ParticleBackground follows finger (matches TargetCursor)
    const handleTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      setMousePosition({ x: t.clientX, y: t.clientY });
      setMouseInWindow(true);
    };

    let touchMoveRaf = null;
    const handleTouchMove = (e) => {
      if (touchMoveRaf) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      touchMoveRaf = requestAnimationFrame(() => {
        setMousePosition({ x: t.clientX, y: t.clientY });
        setMouseInWindow(true);
        touchMoveRaf = null;
      });
    };

    const handleTouchEnd = () => {
      setMouseInWindow(false);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const selectors = [
      '.reveal-init',
      'section',
      '.hero-text',
      '.hero-image',
      '.skill-card',
      '.exp-card',
      '.project-card',
      '.timeline-item',
      '.contact',
    ];

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selectors.join(',')).forEach(el => el.classList.add('reveal-show'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-show');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const observeTargets = () => {
      const nodes = document.querySelectorAll(selectors.join(','));
      nodes.forEach((el) => {
        if (!el.classList.contains('reveal-init')) el.classList.add('reveal-init');
        if (!el.classList.contains('reveal-show')) observer.observe(el);
      });
    };

    // Initial attach
    observeTargets();

    // Reveal anything already in view on first paint
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal-init').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        if (inView) el.classList.add('reveal-show');
      });
    });

    // Watch for DOM changes (navigations/section switches)
    const mo = new MutationObserver(() => observeTargets());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <DarkVeil 
        hueShift={0}
        noiseIntensity={0.002}
        scanlineIntensity={0.01}
        speed={0.12}
        scanlineFrequency={0.15}
        warpAmount={0.25}
        resolutionScale={1}
      />
      <TargetCursor 
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <ParticleBackground mousePosition={mousePosition} mouseInWindow={mouseInWindow} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
