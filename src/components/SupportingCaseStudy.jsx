import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './SupportingCaseStudy.css'

function SupportingCaseStudy({ project, variant = 'supporting' }) {
  const facts = [
    ['Challenge', project.challenge],
    ['Role', project.role],
    ['Outcome', project.outcome],
  ]

  return (
    <article
      className={`supporting-case-study supporting-case-study--${variant} supporting-case-study--${project.id}`}
      aria-labelledby={`${project.id}-title`}
    >
      <figure className="supporting-case-study__media">
        <img
          className="supporting-case-study__image"
          src={project.image}
          alt={project.imageAlt}
          width={project.width}
          height={project.height}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="supporting-case-study__content">
        <div className="supporting-case-study__meta">
          <p className="supporting-case-study__category type-eyebrow">{project.category}</p>
          <p className="supporting-case-study__status type-small">
            <span aria-hidden="true" />
            {project.status}
          </p>
        </div>

        <h3 className="type-h3" id={`${project.id}-title`}>
          {project.title}
        </h3>
        <p className="supporting-case-study__summary type-body">{project.summary}</p>

        <dl className="supporting-case-study__facts">
          {facts.map(([label, value]) => (
            <div className="supporting-case-study__fact" key={label}>
              <dt className="type-eyebrow">{label}</dt>
              <dd className="type-body">{value}</dd>
            </div>
          ))}
        </dl>

        <ul
          className="supporting-case-study__technologies"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.map((technology) => (
            <li className="type-small" key={technology}>
              {technology}
            </li>
          ))}
        </ul>

        <SiteLink
          href={project.href}
          className="aning-button aning-button--text supporting-case-study__action"
          aria-label={`${project.actionLabel}: ${project.title}`}
        >
          {project.actionLabel}
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </SiteLink>
      </div>
    </article>
  )
}

export default SupportingCaseStudy
