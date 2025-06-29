import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {/* Add project items here */}
        <div className="project-item">
          <img src="/projects/first.png" alt="first Project" />
          <h3>first</h3>
          <p>Description of the first project.</p>
        </div>
        <div className="project-item">
          <img src="/projects/second.png" alt="second Project" />
          <h3>second</h3>
          <p>Description of the second project.</p>
        </div>
        <div className="project-item">
          <img src="/projects/third.png" alt="third Project" />
          <h3>third</h3>
          <p>Description of the third project.</p>
        </div>
        <div className="project-item">
          <img src="/projects/fourth.png" alt="fourth Project" />
          <h3>fourth</h3>
          <p>Description of the fourth project.</p>
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
