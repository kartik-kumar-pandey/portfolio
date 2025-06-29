import '../styles/style.css';
import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParticleBackground mousePosition={mousePosition} mouseInWindow={mouseInWindow} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
