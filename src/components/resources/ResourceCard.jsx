import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../../utils/blogUtils'
import { getExternalLinkProps, isExternalLink } from '../../utils/links'
import './ResourceCard.css'

function ResourceCard({ resource }) {
  const href = resource.canonicalPath || resource.href || `/blog/${resource.slug}`
  const title = resource.title || resource.name
  const description = resource.description || resource.summary
  const image = resource.thumbnail || resource.icon
  const label = resource.resourceLabel || 'Free Resource'
  const category = resource.resourceCategory || resource.category
  const linkLabel = resource.resourceType === 'prompt' ? 'View prompt' : resource.linkLabel || 'Open resource'
  const LinkElement = isExternalLink(href) ? 'a' : Link
  const linkProps = isExternalLink(href)
    ? { href, ...getExternalLinkProps(href) }
    : { to: href }

  return (
    <article className="resource-card">
      {image && (
        <LinkElement {...linkProps} className="resource-card__image-link" aria-label={`${linkLabel}: ${title}`}>
          <img src={image} alt={resource.thumbnailAlt || (resource.icon ? `${title} logo` : '')} width="1280" height="720" loading="lazy" decoding="async" />
        </LinkElement>
      )}
      <div className="resource-card__body">
        <div className="resource-card__labels">
          <span>{label}</span>
          {category && <small>{category}</small>}
        </div>
        <h3><LinkElement {...linkProps}>{title}</LinkElement></h3>
        <p>{description}</p>
        {resource.date && <time dateTime={resource.date}>{formatPostDate(resource.date)}</time>}
        <LinkElement {...linkProps} className="resource-card__link">
          {linkLabel}
          <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </LinkElement>
      </div>
    </article>
  )
}

export default ResourceCard
