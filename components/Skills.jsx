import React, { useState, useMemo } from 'react';

const skillCategories = {
  'Programming Languages': [
    { name: 'C++', proficiency: 90, icon: '/icons/cpp.webp' },
    { name: 'JavaScript', proficiency: 85, icon: '/icons/javascript.webp' },
    { name: 'Python', proficiency: 80, icon: '/icons/python.webp' },
    { name: 'Java', proficiency: 75, icon: '/icons/java.png' },
    { name: 'C', proficiency: 70, icon: '/icons/c.png' }
  ],
  'Web Technologies': [
    { name: 'React.js', proficiency: 88, icon: '/icons/react.webp' },
    { name: 'Next.js', proficiency: 85, icon: '/icons/nextjs.webp' },
    { name: 'HTML', proficiency: 90, icon: '/icons/html.webp' },
    { name: 'CSS', proficiency: 85, icon: '/icons/css.webp' },
    { name: 'Node.js', proficiency: 80, icon: '/icons/node-js.webp' }
  ],
  'Tools & Platforms': [
    { name: 'Git', proficiency: 85, icon: '/icons/git.webp' },
    { name: 'GitHub', proficiency: 90, icon: '/icons/github.png' },
    { name: 'Supabase', proficiency: 75, icon: '/icons/supabase.webp' }
  ]
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('proficiency'); // 'proficiency' or 'name'

  const categories = ['All', ...Object.keys(skillCategories)];

  const filteredAndSortedSkills = useMemo(() => {
    let skills = [];
    
    if (selectedCategory === 'All') {
      Object.values(skillCategories).forEach(categorySkills => {
        skills.push(...categorySkills);
      });
    } else {
      skills = skillCategories[selectedCategory] || [];
    }

    // Sort skills
    if (sortBy === 'proficiency') {
      skills.sort((a, b) => b.proficiency - a.proficiency);
    } else {
      skills.sort((a, b) => a.name.localeCompare(b.name));
    }

    return skills;
  }, [selectedCategory, sortBy]);

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 90) return 'from-green-400 to-emerald-500';
    if (proficiency >= 80) return 'from-blue-400 to-cyan-500';
    if (proficiency >= 70) return 'from-purple-400 to-pink-500';
    if (proficiency >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getProficiencyLabel = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    if (proficiency >= 60) return 'Beginner';
    return 'Novice';
  };

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <h2>SKILLS & EXPERTISE</h2>
        <p className="skills-subtitle">
          A comprehensive overview of my technical skills and proficiency levels
        </p>

        {/* Filters and Controls */}
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
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="proficiency">Proficiency (High to Low)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Skills Grid with Proficiency Bars */}
        <div className="skills-grid">
          {filteredAndSortedSkills.map((skill, index) => (
            <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-header">
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-level">{getProficiencyLabel(skill.proficiency)}</span>
                </div>
                <span className="skill-percentage">{skill.proficiency}%</span>
              </div>
              
              <div className="proficiency-bar-container">
                <div className="proficiency-bar">
                  <div 
                    className={`proficiency-fill bg-gradient-to-r ${getProficiencyColor(skill.proficiency)}`}
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="skills-summary">
          <div className="summary-stat">
            <span className="stat-number">{filteredAndSortedSkills.length}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">
              {Math.round(filteredAndSortedSkills.reduce((acc, skill) => acc + skill.proficiency, 0) / filteredAndSortedSkills.length)}
            </span>
            <span className="stat-label">Avg. Proficiency</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">
              {filteredAndSortedSkills.filter(skill => skill.proficiency >= 80).length}
            </span>
            <span className="stat-label">Advanced+ Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
