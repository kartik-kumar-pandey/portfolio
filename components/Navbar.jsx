import React, { useState } from 'react';

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

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <div className={`navbar-brand${isMenuOpen ? ' navbar-brand--centered' : ''}`}> 
          <a href="#hero" onClick={(e) => handleClick(e, 'hero')}>KARTIK</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
        </div>
        <ul className={`nav-menu${isMenuOpen ? ' nav-menu--open' : ''}`}> 
          <li><a href="#hero" onClick={(e) => handleClick(e, 'hero')} className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
          <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#skills" onClick={(e) => handleClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#experience" onClick={(e) => handleClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
        <a href="/kartik kumar pandey.pdf" download className="resume-download">Download Resume</a>
      </div>
    </nav>
  );
};

export default Navbar;
