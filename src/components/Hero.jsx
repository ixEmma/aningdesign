import { ArrowRight } from 'lucide-react'
import './Hero.css'
import CapabilityReel from './CapabilityReel'
import ProofBar from './ProofBar'
import { SiteLink } from './SiteLink'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-content">
            <SiteLink href="/#about" className="hero-context-link">
              <span>Founder of Aning Design Lab · Builder of Lensora Events</span>
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </SiteLink>

            <h1 className="hero-title">
              Websites and digital products built for growth.
            </h1>

            <p className="hero-description">
              I combine strategy, interface design and development to build credible WordPress websites, web applications and digital products for businesses and founders.
            </p>

            <div className="hero-actions">
              <SiteLink href="/contact" className="aning-button aning-button--primary">
                Start a Project
                <ArrowRight size={19} strokeWidth={2.2} aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/#projects" className="aning-button aning-button--secondary">
                View Selected Work
                <ArrowRight size={19} strokeWidth={2.2} aria-hidden="true" />
              </SiteLink>
            </div>
          </div>

          <CapabilityReel />
        </div>

        <ProofBar />
      </div>
    </section>
  )
}

export default Hero
