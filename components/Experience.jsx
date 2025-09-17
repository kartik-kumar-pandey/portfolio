import React from 'react';
// Inline icon components to avoid external icon package resolution issues
const IconBase = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const Calendar = ({ className = "w-5 h-5" }) => (
  <IconBase className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </IconBase>
);

const MapPin = ({ className = "w-5 h-5" }) => (
  <IconBase className={className}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </IconBase>
);

const Award = ({ className = "w-5 h-5" }) => (
  <IconBase className={className}>
    <circle cx="12" cy="8" r="7"></circle>
    <path d="m8.21 13.89-1.66 7.45 4.45-2.67 4.45 2.67-1.66-7.45"></path>
  </IconBase>
);

const BookOpen = ({ className = "w-5 h-5" }) => (
  <IconBase className={className}>
    <path d="M2 4v16a2 2 0 0 0 2 2h6"></path>
    <path d="M22 4v16a2 2 0 0 1-2 2h-6"></path>
    <path d="M2 4a2 2 0 0 1 2-2h6v18H4a2 2 0 0 0-2 2"></path>
    <path d="M22 4a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 1 2 2"></path>
  </IconBase>
);

const Experience = () => {
  const experiences = [
    {
      type: 'education',
      title: 'Bachelor of Technology in Computer Science and Engineering',
      organization: 'Pranveer Singh Institute of Technology',
      location: 'Kanpur, India',
      period: '2023 - Present',
      description: 'Specializing in Artificial Intelligence with strong focus on algorithms, data structures, and modern web development.',
      highlights: ['Artificial Intelligence Specialization', 'Data Structures & Algorithms', 'Database Systems', 'React & Next.js'],
      icon: BookOpen
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <h2>Experience & Education</h2>
        <p className="experience-subtitle">
          My journey through education and professional experiences in tech
        </p>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-marker">
                <div className="marker-icon">
                  <exp.icon className="marker-icon-svg" />
                </div>
              </div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <span className="experience-type">{exp.type === 'education' ? 'Education' : 'Work'}</span>
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-organization">{exp.organization}</span>
                </div>
                
                <div className="experience-meta">
                  <div className="experience-meta-item">
                    <Calendar className="meta-icon" />
                    {exp.period}
                  </div>
                  <div className="experience-meta-item">
                    <MapPin className="meta-icon" />
                    {exp.location}
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-highlights">
                  <h4>Key Highlights:</h4>
                  <ul className="highlights-list">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="highlight-item">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-section">
          <h3>Achievements & Certifications</h3>
          <div className="achievements-grid">
            {[
              { title: 'Machine Learning for All', description: 'University of London (Coursera) • Completed May 2025', year: '2025' },
              { title: 'Problem Solving (Basic)', description: 'HackerRank • Earned Nov 2024', year: '2024' },
              { title: 'Introduction to Data Science', description: 'Cisco Networking Academy • Completed Jan 2025', year: '2025' }
            ].map((achievement, index) => (
              <div key={achievement.title} className="achievement-card">
                <Award className="achievement-icon" />
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-description">{achievement.description}</p>
                <span className="achievement-year">{achievement.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;


