import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <h2>Experience</h2>
      <ul className="experience-list">
        <li>
          <h3>Job Title 1</h3>
          <p>Company Name - Duration</p>
          <p>Brief description of the role and responsibilities.</p>
        </li>
        <li>
          <h3>Job Title 2</h3>
          <p>Company Name - Duration</p>
          <p>Brief description of the role and responsibilities.</p>
        </li>
        {/* Add more experience items as needed */}
      </ul>
    </section>
  );
};

export default Experience;
