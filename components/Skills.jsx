import React, { useState, useMemo } from 'react';

const skillCategories = {
  'Programming Languages': [
    { name: 'C++', proficiency: 80, icon: '/icons/cpp.webp' },
    { name: 'JavaScript', proficiency: 75, icon: '/icons/javascript.webp' },
    { name: 'Python', proficiency: 60, icon: '/icons/python.webp' },
    { name: 'Java', proficiency: 65, icon: '/icons/java.png' },
    { name: 'C', proficiency: 70, icon: '/icons/c.png' }
  ],
  'Web Technologies': [
    { name: 'React.js', proficiency: 72, icon: '/icons/react.webp' },
    { name: 'Next.js', proficiency: 65, icon: '/icons/nextjs.webp' },
    { name: 'HTML', proficiency: 80, icon: '/icons/html.webp' },
    { name: 'CSS', proficiency: 75, icon: '/icons/css.webp' },
    { name: 'Node.js', proficiency: 40, icon: '/icons/node-js.webp' }
  ],
  'Tools & Platforms': [
    { name: 'Git', proficiency: 75, icon: '/icons/git.webp' },
    { name: 'GitHub', proficiency: 80, icon: '/icons/github.png' },
    { name: 'Supabase', proficiency: 75, icon: '/icons/supabase.webp' }
  ]
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  

  const categories = ['All', ...Object.keys(skillCategories)];

  const filteredSkills = useMemo(() => {
    let skills = [];
    
    if (selectedCategory === 'All') {
      Object.values(skillCategories).forEach(categorySkills => {
        skills.push(...categorySkills);
      });
    } else {
      skills = skillCategories[selectedCategory] || [];
    }
    return skills;
  }, [selectedCategory]);

  const getProficiencyColor = (proficiency) => {
    return 'from-purple-500 to-pink-500';
  };

  // Removed textual proficiency tags per request

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <h2>SKILLS & EXPERTISE</h2>
        <p className="skills-subtitle">
          A comprehensive overview of my technical skills
        </p>

        {/* Filters */}
        <div className="skills-controls">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with Proficiency Bars */
        }
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-header">
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
