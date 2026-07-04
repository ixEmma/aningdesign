import ProjectCard from './ProjectCard'
import { startupProjects } from '../../data/startupProjects'

function ProjectGrid() {
  return (
    <section className="startup-projects" id="startup-projects" aria-labelledby="startup-projects-title">
      <div className="startup-projects-heading">
        <p className="startup-section-label">Startup projects</p>
        <h2 id="startup-projects-title">Web apps and digital products</h2>
        <p>
          A compact look at the tools I am building across education, local platforms,
          SaaS, and event technology.
        </p>
      </div>

      <div className="startup-project-grid">
        {startupProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectGrid
