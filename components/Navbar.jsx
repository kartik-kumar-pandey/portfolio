import React from 'react';

const Navbar = ({ onSectionChange, activeSection }) => {
  const handleClick = (e, section) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a
            href="#hero"
            onClick={(e) => handleClick(e, 'hero')}
            className={activeSection === 'hero' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => handleClick(e, 'projects')}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#skills"
            onClick={(e) => handleClick(e, 'skills')}
            className={activeSection === 'skills' ? 'active' : ''}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#experience"
            onClick={(e) => handleClick(e, 'experience')}
            className={activeSection === 'experience' ? 'active' : ''}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
