import './Projects.css'

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="bento-container">
        {/* Header Card */}
        <div className="bento-card bento-header">
          <div className="badge-wrapper">
            <div className="project-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Featured Work</span>
            </div>
          </div>
          <h1>WEBSITE PROJECTS</h1>
          <p className="projects-subtitle">Explore my latest web design and development work</p>
        </div>

        {/* Video Card */}
        <div className="bento-card bento-video">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/H4yZFVvkZog?si=TmiHCeOpRX8PCWTC"
              title="Website Project Showcase"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Description Card */}
        <div className="bento-card bento-description">
          <h3>Aburi Sweetmother Guesthouse</h3>
          <p>
            <strong>Discover how I built this websites using Wordpress</strong>. This showcase
            highlights my approach to modern web design, combining aesthetics with user
            experience to create memorable digital experiences.
          </p>
          <div className="project-cta-wrapper">
            <a
              href="https://aburisweetmother.com"
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
            >
              Visit Project
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Project 2 - Video Card */}
        <div className="bento-card bento-video bento-video-2">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/9l-c_AtN1ng?si=WvU5eOWBTJeAlehl"
              title="Dr Oliver Rabie Website Showcase"
              frameBorder="0"
        
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Project 2 - Description Card */}
        <div className="bento-card bento-description bento-description-2">
          <h3>Dr Oliver Rabie</h3>
          <p>
            A <strong>private healthcare clinic website</strong> for Dr Oliver Rabie, a General Practitioner
            with over 10 years of clinical experience. The site features service bookings for health checks,
            GP appointments, health coaching, and weight loss consultations with a clean, professional design.
          </p>
          <div className="project-cta-wrapper">
            <a
              href="https://www.droliverrabie.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
            >
              Visit Project
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Combined Stats Card */}
        <div className="bento-card bento-stats-combined">
          <div className="stat-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stat-icon"
            >
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
              <path d="m14 7 3 3" />
              <path d="M5 6v4" />
              <path d="M19 14v4" />
              <path d="M10 2v2" />
              <path d="M7 8H3" />
              <path d="M21 16h-4" />
              <path d="M11 3H9" />
            </svg>
            <div className="stat-content">
              <h4>Creative Design</h4>
              <p>Unique visual experiences</p>
            </div>
          </div>

          <div className="stat-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stat-icon"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <div className="stat-content">
              <h4>Fast Performance</h4>
              <p>Optimized for speed</p>
            </div>
          </div>

          <div className="stat-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stat-icon"
            >
              <rect width="7" height="13" x="6" y="4" rx="1" />
              <path d="M10.5 1.5v2" />
              <path d="M10.5 20.5v2" />
              <path d="M6 8h1" />
              <path d="M6 12h1" />
              <path d="M6 16h1" />
            </svg>
            <div className="stat-content">
              <h4>Fully Responsive</h4>
              <p>Works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

