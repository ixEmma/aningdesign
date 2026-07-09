import { ArrowUpRight } from 'lucide-react'
import { getExternalLinkProps } from '../../utils/links'

function ProjectCard({ project }) {
  return (
    <article className="startup-project-card">
      <div className="startup-project-card-top">
        <div className="startup-project-title-group">
          <div className="startup-project-icon">
            <img src={project.icon} alt={`${project.name} icon`} width="512" height="512" loading="lazy" decoding="async" />
          </div>
          <div>
            <h3>{project.name}</h3>
            <p className="startup-project-category">{project.category}</p>
          </div>
        </div>
        <span className="startup-project-status">{project.status}</span>
      </div>

      <p className="startup-project-description">{project.description}</p>

      <div className="startup-project-stack" aria-label={`${project.name} tech stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <a href={project.url} {...getExternalLinkProps(project.url)} className="startup-project-link">
        View project
        <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </article>
  )
}

export default ProjectCard
