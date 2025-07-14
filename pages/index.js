import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import VantaNetBackground from '../components/VantaNetBackground';
import VantaCloudsBackground from '../components/VantaCloudsBackground';

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [background, setBackground] = useState('none'); // 'none', 'net', 'clouds'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBackground = () => {
    if (background === 'none') {
      setBackground('net');
    } else if (background === 'net') {
      setBackground('clouds');
    } else {
      setBackground('none');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <Hero />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <>
      {background === 'net' && <VantaNetBackground />}
      {background === 'clouds' && <VantaCloudsBackground />}
      <Navbar onSectionChange={setActiveSection} activeSection={activeSection} scrolled={scrolled} />
      <div className="main-content">
        <main>
          {renderSection()}
        </main>
      </div>
      <footer className="footer">
        <button
          onClick={toggleBackground}
          className="toggle-background-button"
          aria-label="Toggle Background"
        >
          Toggle Background
        </button>
        <p>© 2025 Kartik Kumar Pandey. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
