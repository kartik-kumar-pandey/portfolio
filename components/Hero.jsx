import React, { useState, useEffect } from 'react';

const roles = ['STUDENT', 'ASPIRING SOFTWARE ENGINEER'];

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
          <img src="/hero.webp" alt="Kartik Kumar Pandey" />
        </div>
      </section>

      <section id="introduce" className="introduce">
      <div className="introduce-text">
        <h2>LET ME <span className="highlight">INTRODUCE</span> MYSELF</h2>
        <p>
          I am currently pursuing a <span className="purple italic">Bachelor’s degree in Computer Science</span> with a specialization in <span className="purple italic">Artificial Intelligence</span>. Over time, I’ve developed a deep passion for programming and technology.
        </p>
        <p>
          I am proficient in <span className="purple italic">C++, Java, and Python</span>, constantly improving my problem-solving and algorithmic thinking skills.
        </p>
        <p>
          My areas of interest include creating innovative <span className="purple italic">Web Technologies</span> and <span className="purple italic">Web Applications</span>.
        </p>
        <p>
          I enjoy building impactful products using <span className="purple italic">modern JavaScript libraries and frameworks</span> like <span className="purple italic">React.js</span> and <span className="purple italic">Next.js</span>.
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
