import '../styles/style.css';
import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import DarkVeil from '../components/DarkVeil';
import Head from 'next/head';

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

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/asq5ulw.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <DarkVeil 
        hueShift={0}
        noiseIntensity={0.002}
        scanlineIntensity={0.01}
        speed={0.12}
        scanlineFrequency={0.15}
        warpAmount={0.25}
        resolutionScale={1}
      />
      <ParticleBackground mousePosition={mousePosition} mouseInWindow={mouseInWindow} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
