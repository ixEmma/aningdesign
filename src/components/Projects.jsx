import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './Projects.css'

function LazyProjectVideo({ src, title }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || shouldLoad) return undefined

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '700px 0px' }
    )

    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div className="video-wrapper" ref={wrapperRef}>
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          className="project-video-frame"
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="project-video-placeholder" aria-label={title} role="img">
          <span aria-hidden="true"></span>
        </div>
      )}
    </div>
  )
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="bento-container">
        {/* Header Card */}
        <div className="bento-card bento-header">
          <div className="badge-wrapper">
            <div className="project-badge">
              <span className="badge-dot"></span>
              <span className="badge-text section-label">Featured Work</span>
            </div>
          </div>
          <h2 className="section-title">WEBSITE PROJECTS</h2>
          <p className="projects-subtitle section-description">Explore my latest web design and development work</p>
        </div>

        {/* Video Card */}
        <div className="bento-card bento-video">
          <LazyProjectVideo
            src="https://www.youtube.com/embed/H4yZFVvkZog?si=TmiHCeOpRX8PCWTC&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
            title="Website Project Showcase"
          />
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
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Project 2 - Video Card */}
        <div className="bento-card bento-video bento-video-2">
          <LazyProjectVideo
            src="https://www.youtube.com/embed/9l-c_AtN1ng?si=WvU5eOWBTJeAlehl&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
            title="Dr Oliver Rabie Website Showcase"
          />
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
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
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
              <h3>Creative Design</h3>
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
              <h3>Fast Performance</h3>
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
              <h3>Fully Responsive</h3>
              <p>Works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
