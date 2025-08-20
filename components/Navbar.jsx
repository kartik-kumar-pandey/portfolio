import React, { useState, useEffect } from 'react';

const Navbar = ({ onSectionChange, activeSection, scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e, section) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(section);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <div className={`navbar-brand${isMenuOpen ? ' navbar-brand--centered' : ''}`}> 
          <a href="#hero" onClick={(e) => handleClick(e, 'hero')} className="cursor-target">KARTIK</a>
        </div>
        <div
          className="hamburger cursor-target"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
        >
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
        </div>
        <ul id="primary-navigation" className={`nav-menu${isMenuOpen ? ' nav-menu--open' : ''}`}> 
          <li><a href="#hero" onClick={(e) => handleClick(e, 'hero')} className={`cursor-target ${activeSection === 'hero' ? 'active' : ''}`}>Home</a></li>
          <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')} className={`cursor-target ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
          <li><a href="#skills" onClick={(e) => handleClick(e, 'skills')} className={`cursor-target ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
          <li><a href="#timeline" onClick={(e) => handleClick(e, 'timeline')} className={`cursor-target ${activeSection === 'timeline' ? 'active' : ''}`}>Timeline</a></li>
          <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')} className={`cursor-target ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          <li className="nav-admin"><a href="/admin" className="cursor-target">Admin</a></li>
        </ul>
        <a href="/kartik kumar pandey.pdf" download className="resume-download cursor-target">Download Resume</a>
        <a href="/admin" className="admin-cta cursor-target" style={{ marginLeft: '12px' }}>Admin</a>
      </div>
    </nav>
  );
};

export default Navbar;
