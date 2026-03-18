import {useState} from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react'
import './About.css'

function About() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="flex-Container" id="about">
      <div className="aboutUs">
        <img
          src="/images/papi.jpg"
          alt="Mr Aning"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="aboutUs">
        <h1>MEET ANING</h1>
        <p className="myself-description">
          <strong>
            Hi, I'm Emmanuel Aning, a Graphic Designer and Web Developer based in Accra, Ghana. I specialize in designing and building high-performing digital experiences, combining strong visual design with clean, scalable code.
          </strong>
        </p>

        <p>
          I work across the full spectrum of design and development, from brand identity and UI/UX design to complete website and software builds. Whether it is a full redesign or a custom solution, I create responsive, conversion-focused interfaces using modern frontend technologies, CMS platforms like WordPress and Wix, and fully custom-coded systems.
        </p>

        {showMore && (
          <>
            <p>
              My expertise includes frontend development, backend integrations, custom UI systems, and database-driven applications. I also build lead capture systems, automations, and performance-optimized websites designed to generate measurable business results.
            </p>

            <p>
              With experience across branding, marketing, and digital product teams, I approach every project with a focus on clarity, functionality, and long-term scalability.
            </p>
          </>
        )}

        <button
          type="button"
          className="about-read-more-btn"
          onClick={() => setShowMore((prev) => !prev)}
          aria-expanded={showMore}
        >
          {showMore ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          <span>{showMore ? 'Read less' : 'Read more'}</span>
        </button>
      </div>
    </div>
  )
}

export default About
