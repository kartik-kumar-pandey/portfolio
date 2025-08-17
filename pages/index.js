import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import TargetCursor from '../components/TargetCursor';

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <Hero onSectionChange={setActiveSection} />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'timeline':
        return <Timeline />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onSectionChange={setActiveSection} />;
    }
  };

  return (
    <>
      <TargetCursor 
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <Navbar onSectionChange={setActiveSection} activeSection={activeSection} scrolled={scrolled} />
      <div className="main-content">
        <main>
          {renderSection()}
        </main>
      </div>
      <footer className="footer">
        <p>© 2025 Kartik Kumar Pandey. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
