import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        <div className="project-item">
          <img src="/projects/filestashify.png" alt="FileStashify Project" className="cursor-target" />
          <h3>FileStashify</h3>
          <p>A modern cloud storage frontend using Supabase Storage and Cloudinary for comprehensive file management. Features include user authentication, file/folder management, smart sharing with expiring links, file previews, and drag & drop functionality with a beautiful responsive UI.</p>
          <div className="project-tech">
            <span>React</span>
            <span>Supabase</span>
            <span>Cloudinary</span>
            <span>JavaScript</span>
          </div>
          <div className="project-buttons">
            <a href="https://filestashify-test.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn live-btn cursor-target">
              View Live
            </a>
            <a href="https://github.com/kartik-kumar-pandey/testing-File-Stashify" target="_blank" rel="noopener noreferrer" className="project-btn github-btn cursor-target">
              GitHub
            </a>
          </div>
        </div>
        
        <div className="project-item">
          <img src="/projects/serenitysaathi.png" alt="SerenitySaathi Project" className="cursor-target" />
          <h3>SerenitySaathi</h3>
          <p>Your Secure Mental Health Companion - an empathetic AI-powered chatbot built with React and Supabase. Features end-to-end encryption, Google Gemini 2.0 Flash AI, multi-language support, mood tracking, breathing exercises, and comprehensive mental health resources with a beautiful, calming interface.</p>
          <div className="project-tech">
            <span>React</span>
            <span>Supabase</span>
            <span>Google Gemini AI</span>
            <span>Tailwind CSS</span>
          </div>
          <div className="project-buttons">
            <a href="https://serenitysaathi.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn live-btn cursor-target">
              View Live
            </a>
            <a href="https://github.com/kartik-kumar-pandey/SerenitySaathi" target="_blank" rel="noopener noreferrer" className="project-btn github-btn cursor-target">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
