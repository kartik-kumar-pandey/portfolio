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
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-init" style={{ transitionDelay: '0.1s' }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            My journey through education and professional experiences in tech
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 reveal-init ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white z-10"></div>

                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div
                    className="glass-effect rounded-2xl p-6 relative exp-card"
                  >
                    <div className="absolute -top-3 left-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exp.type === 'education' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {exp.type === 'education' ? 'Education' : 'Work'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between mb-4 mt-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                          <exp.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-blue-300 font-medium">{exp.organization}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-200 mb-4">{exp.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Key Highlights:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 reveal-init" style={{ transitionDelay: '0.4s' }}>
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Achievements & Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Machine Learning for All', description: 'University of London (Coursera) • Completed May 2025', year: '2025' },
              { title: 'Problem Solving (Basic)', description: 'HackerRank • Earned Nov 2024', year: '2024' },
              { title: 'Introduction to Data Science', description: 'Cisco Networking Academy • Completed Jan 2025', year: '2025' }
            ].map((achievement, index) => (
              <div
                key={achievement.title}
                className="glass-effect rounded-xl p-6 text-center reveal-init"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                <span className="text-blue-400 text-sm">{achievement.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;


