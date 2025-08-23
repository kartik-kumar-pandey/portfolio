import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';

const roles = ['STUDENT', 'ASPIRING SOFTWARE ENGINEER'];

const Hero = ({ onSectionChange }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [showProfileCard, setShowProfileCard] = useState(false);

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

  const handleContactClick = () => {
    // Close the profile card modal
    setShowProfileCard(false);
    // Navigate to contact section using the app's navigation system
    if (onSectionChange) {
      onSectionChange('contact');
    }
  };

  const handleHeroImageClick = () => {
    setShowProfileCard(true);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowProfileCard(false);
    }
  };

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>Hi There! <span role="img" aria-label="waving hand" className="waving-hand">👋🏻</span></h1>
          <h2>I'M <span className="kartik-name-text">KARTIK KUMAR PANDEY</span></h2>
          <h3>{displayedText}<span className="cursor">|</span></h3>
        </div>

        <div className="hero-image" onClick={handleHeroImageClick} style={{ cursor: 'pointer' }}>
          <img src="/kartik_png-Photoroom.png" alt="Kartik Kumar Pandey" />
        </div>
      </section>

      {/* ProfileCard Modal - Only shown after clicking hero image */}
      {showProfileCard && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={handleModalBackdropClick}
        >
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '80vw',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            animation: 'slideIn 0.4s ease-out',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            
            <div style={{ textAlign: 'center' }}>
              
            <ProfileCard
                onContactClick={handleContactClick}
            />
            </div>
          </div>
        </div>
      )}

      <section id="introduce" className="introduce">
      <div className="introduce-text">
        <h2>LET ME <span className="highlight">INTRODUCE</span> MYSELF</h2>
        <p>
          I am currently pursuing a <span className="purple italic">Bachelor's degree in Computer Science</span> with a specialization in <span className="purple italic">Artificial Intelligence</span>. Over time, I've developed a deep passion for programming and technology.
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
            <a href="https://leetcode.com/u/Kartik_pandey1101/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <img src="/icons/leetcode.png" alt="LeetCode" />
             
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .hero-image {
          position: relative;
          transition: transform 0.3s ease;
          width: clamp(160px, 16vw, 260px);
          height: clamp(160px, 16vw, 260px);
          border-radius: 50%;
          overflow: hidden;
          display: block;
          flex-shrink: 0;
        }
        
        .hero-image:hover {
          transform: scale(1.02);
        }
        
        .hero-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 10%;
          border-radius: inherit;
          transition: filter 0.3s ease;
          box-shadow: 0 0 0 6px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.35);
        }
        
        .hero-image:hover img {
          filter: brightness(1.1);
        }
      `}</style>
    </>
  );
};

export default Hero;
