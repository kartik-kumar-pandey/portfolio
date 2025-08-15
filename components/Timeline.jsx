import React, { useState } from 'react';

const timelineData = {
  education: [
    {
      id: 1,
      year: '2023 - Present',
      title: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Pranveer Singh Institute of Technology',
      description: 'Specializing in Artificial Intelligence',
      achievements: ['First Year CGPA: 9.0/10'],
      icon: '🎓',
      category: 'education'
    }
  ],
  certifications: [
    {
      id: 5,
      year: '2025',
      title: 'Machine Learning for All',
      institution: 'University of London (Coursera)',
      description: 'Completed in May 2025 on Coursera',
      achievements: ['Intro to ML concepts', 'Ethics and applications', 'Hands-on assignments'],
      icon: '📘',
      category: 'certification'
    },
    {
      id: 6,
      year: '2024',
      title: 'Problem Solving (Basic)',
      institution: 'HackerRank',
      description: 'Earned in November 2024',
      achievements: ['Algorithms fundamentals', 'Data structures basics'],
      icon: '🧩',
      category: 'certification'
    },
    {
      id: 7,
      year: '2025',
      title: 'Introduction to Data Science',
      institution: 'Cisco Networking Academy',
      description: 'Completed in January 2025',
      achievements: ['Data science lifecycle', 'Python for data', 'Visualization basics'],
      icon: '📊',
      category: 'certification'
    }
  ]
};

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

  const categories = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'education', label: 'Education', icon: '🎓' },
    { key: 'certification', label: 'Certifications', icon: '📜' }
  ];

  // Map filter keys to data keys in timelineData
  const dataKeyByFilter = {
    education: 'education',
    certification: 'certifications',
  };

  const getFilteredTimeline = () => {
    let items = [];
    
    if (selectedCategory === 'all') {
      Object.values(timelineData).forEach(categoryItems => {
        items.push(...categoryItems);
      });
    } else {
      const dataKey = dataKeyByFilter[selectedCategory] || selectedCategory;
      items = timelineData[dataKey] || [];
    }

    // Sort by year
    items.sort((a, b) => {
      try {
        // Handle different year formats: "2024", "2023 - Present", "2022 - 2026"
        const yearA = a.year.includes(' - ') ? parseInt(a.year.split(' - ')[0]) : parseInt(a.year);
        const yearB = b.year.includes(' - ') ? parseInt(b.year.split(' - ')[0]) : parseInt(b.year);
        
        if (isNaN(yearA) || isNaN(yearB)) {
          return 0; // Keep original order if parsing fails
        }
        
        return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
      } catch (error) {
        console.error('Error sorting timeline items:', error);
        return 0;
      }
    });

    return items;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'education': return 'from-blue-500 to-cyan-500';
      case 'achievement': return 'from-green-500 to-emerald-500';
      case 'certification': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <section id="timeline" className="timeline">
      <div className="timeline-container">
        <h2>EDUCATION & CERTIFICATIONS</h2>
        <p className="timeline-subtitle">
          My educational path and professional certifications
        </p>

        {/* Category Filters */}
        <div className="timeline-filters">
          {categories.map(category => (
            <button
              key={category.key}
              className={`timeline-filter ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.key)}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Control */}
        <div className="timeline-sort">
          <label htmlFor="timeline-sort">Sort by year:</label>
          <select
            id="timeline-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="timeline-sort-select"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Filter Status */}
        <div className="filter-status">
          <p>
            Showing {getFilteredTimeline().length} items
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-items" key={`${selectedCategory}-${sortOrder}`}>
          {getFilteredTimeline().map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-item ${item.category}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-marker">
                <div className={`marker-icon bg-gradient-to-r ${getCategoryColor(item.category)}`}>
                  {item.icon}
                </div>
                <div className="timeline-line"></div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <span className="timeline-institution">{item.institution}</span>
                </div>
                
                <p className="timeline-description">{item.description}</p>
                
                {/* Removed achievements list per request */}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="timeline-summary">
          <div className="summary-card">
            <span className="summary-icon">🎓</span>
            <span className="summary-number">{timelineData.education.length}</span>
            <span className="summary-label">Education</span>
          </div>
          <div className="summary-card">
            <span className="summary-icon">📜</span>
            <span className="summary-number">{timelineData.certifications.length}</span>
            <span className="summary-label">Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
