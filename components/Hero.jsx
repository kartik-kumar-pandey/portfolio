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
          <h2>I'M <span className="kartik-name-text">KARTIK KUMAR PANDEY</span></h2>
          <h3>{displayedText}<span className="cursor">|</span></h3>
        </div>

        <div className="hero-image">
          <img src="/hero-image.png" alt="Kartik's Hero Image" />
        </div>
      </section>

      <section id="introduce" className="introduce">
        <div className="introduce-text">
          <h2>LET ME <span className="highlight">INTRODUCE</span> MYSELF</h2>
          <p>
            I fell in love with programming and I have at least learnt something, I think... <span role="img" aria-label="shrug">🤷‍♂️</span>
          </p>
          <p>
            I am fluent in <span className="purple italic">C++, Javascript and Python.</span>
          </p>
          <p>
            My field of Interest's are building new <span className="purple italic">Web Technologies, Web Application </span>
          </p>
          <p>
            Whenever possible, I also apply my passion for developing products with<span className="purple italic">Modern Javascript Library and Frameworks</span> like <span className="purple italic">React.js and Next.js</span>
          </p>

          <h2>FIND ME ON</h2>
          <p>Feel free to <span className="purple">connect</span> with me</p>
          <div className="social-icons">
            <a href="https://github.com/kartik-kumar-pandey/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/icons/github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/kartik-kumar-pandey-bhka2004/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/icons/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
