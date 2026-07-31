import { ArrowRight } from 'lucide-react'
import { selectedWork } from '../data/selectedWork'
import { SiteLink } from './SiteLink'
import LensoraShowcase from './LensoraShowcase'
import SupportingCaseStudy from './SupportingCaseStudy'
import './Projects.css'

function Projects() {
  const [featuredProject, ...supportingProjects] = selectedWork

  return (
    <section className="projects-section" id="projects" aria-labelledby="selected-work-title">
      <div className="selected-work-shell">
        <header className="selected-work-header">
          <p className="selected-work-eyebrow type-eyebrow">Case studies</p>
          <h2 className="type-h2" id="selected-work-title">
            Selected digital work
          </h2>
          <p className="selected-work-intro type-body-large">
            Websites and digital products designed around real business needs, clear user
            journeys and reliable implementation.
          </p>
        </header>

        <div className="selected-work-grid">
          <LensoraShowcase project={featuredProject} />

          <div className="selected-work-supporting">
            {supportingProjects.map((project) => (
              <SupportingCaseStudy key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="selected-work-completion">
          <div className="selected-work-completion-copy">
            <p className="type-eyebrow">Have a project in mind?</p>
            <p className="type-body-large">
              Build your next website or digital product around a clear business goal.
            </p>
          </div>
          <SiteLink href="/contact" className="aning-button aning-button--primary">
            Start a Project
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </SiteLink>
        </div>
      </div>
    </section>
  )
}

export default Projects
