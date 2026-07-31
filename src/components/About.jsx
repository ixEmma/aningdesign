import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './About.css'

const authorityPoints = [
  'Founder of Aning Design Lab',
  'Builder of Lensora Events',
  'Author of the Client-Ready WordPress Blueprint',
  'WordPress, React and Firebase implementation',
  'Graphic Design background at Takoradi Technical University'
]

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-section__inner">
        <header className="about-section__heading">
          <p className="about-section__eyebrow type-eyebrow">About</p>
          <h2 className="type-h2" id="about-title">
            Design strategy backed by practical development
          </h2>
        </header>

        <figure className="about-section__portrait">
          <img
            src="/images/papi.webp"
            alt="Portrait of Emmanuel Aning, web designer and developer"
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about-section__content">
          <div className="about-section__copy">
            <p className="type-body">
              I’m Emmanuel Aning, a web designer and developer helping businesses turn
              unclear or outdated digital experiences into credible, usable and
              conversion-focused websites and products.
            </p>
            <p className="type-body">
              My work combines visual design, WordPress, frontend development and product
              thinking. This allows me to consider both how a digital experience
              communicates and how it functions after launch.
            </p>
            <p className="type-body">
              Alongside client work, I build independent products and publish practical
              WordPress and design education through Aning Design Lab.
            </p>
          </div>

          <ul className="about-section__proof" aria-label="Professional background">
            {authorityPoints.map((point) => (
              <li className="type-small" key={point}>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="about-section__actions">
            <SiteLink className="aning-button aning-button--primary" href="/contact">
              <span>Start a Project</span>
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
