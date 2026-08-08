import { ArrowRight, ExternalLink } from 'lucide-react'

export default function BookFinalCTA({
  eyebrow = 'Client-ready workflow',
  title = 'Build the workflow one decision at a time.',
  id = 'book-final-cta-title',
  description = 'Move from planning to handover with one repeatable system.',
  primaryCtaLabel = 'Get the Guide',
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl = '#book-preview'
}) {
  const isExternalPrimary = primaryCtaUrl?.startsWith('http')
  const isExternalSecondary = secondaryCtaUrl?.startsWith('http') || secondaryCtaUrl?.endsWith('.pdf')

  return (
    <section className="book-final-cta section-space--spacious" aria-labelledby={id}>
      {eyebrow && <p className="type-eyebrow">{eyebrow}</p>}
      {title && <h2 id={id} className="type-h2">{title}</h2>}
      {description && <p className="type-body-large">{description}</p>}
      <div className="book-final-actions">
        {primaryCtaUrl && isExternalPrimary ? (
          <a
            href={primaryCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="aning-button aning-button--primary"
          >
            {primaryCtaLabel}
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        ) : primaryCtaUrl ? (
          <a href={primaryCtaUrl} className="aning-button aning-button--primary">
            {primaryCtaLabel}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        ) : null}

        {secondaryCtaUrl && isExternalSecondary ? (
          <a
            href={secondaryCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="aning-button aning-button--secondary"
          >
            {secondaryCtaLabel || 'Preview the Guide'}
          </a>
        ) : secondaryCtaUrl ? (
          <a href={secondaryCtaUrl} className="aning-button aning-button--secondary">
            {secondaryCtaLabel || 'Preview the Book'}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </section>
  )
}
