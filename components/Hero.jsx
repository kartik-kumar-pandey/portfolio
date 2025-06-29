import React, { useState, useEffect } from 'react';

const roles = ['STUDENT', 'COMPUTER SCIENCE ENGINEER'];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (typing) {
      if (charIndex < roles[roleIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + roles[roleIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, 150);
      } else {
        timeout = setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, 100);
      } else {
        setTyping(true);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, typing, roleIndex]);

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>Hi There! <span role="img" aria-label="waving hand" className="waving-hand">👋🏻</span></h1>
          <h2>I'M KARTIK KUMAR PANDEY</h2>
          <h3>{displayedText}<span className="cursor">|</span></h3>
        </div>

        <div className="hero-image">
          <img src="/hero-image.png" alt="Kartik's Hero Image" />
        </div>
      </section>

      <section id="introduce" className="introduce">
        <h2>LET ME <span className="highlight">INTRODUCE</span> MYSELF</h2>
        <p>
          I'm a passionate and curious developer currently pursuing my B.Tech in Computer Science. 
          I enjoy building intuitive web applications, solving real-world problems, and constantly learning new technologies. 
          With experience in full-stack development, I'm focused on creating impactful digital solutions and always open to exciting opportunities.
        </p>
        <footer className="footer">
          <p>© 2024 Kartik Kumar Pandey. All rights reserved.</p>
        </footer>
      </section>
    </>
  );
};

export default Hero;
