import { ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react'

export default function BookHero({
  eyebrow,
  title,
  description,
  price,
  regularPrice,
  editionLabel,
  primaryCtaLabel = 'Get the Book',
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  imageSrc,
  imageAlt,
  metaNote = 'Fixed-layout PDF • Immediate digital download'
}) {
  const isExternalPrimary = primaryCtaUrl?.startsWith('http')
  const isExternalSecondary = secondaryCtaUrl?.startsWith('http') || secondaryCtaUrl?.endsWith('.pdf')

  return (
    <section className="book-funnel__hero" aria-labelledby="book-hero-title">
      <div className="books-shell book-funnel__hero-grid">
        <div className="book-funnel__hero-copy">
          {eyebrow && <p className="type-eyebrow">{eyebrow}</p>}
          <h1 id="book-hero-title" className="type-h1">{title}</h1>
          {description && <p className="type-body-large book-funnel__hero-intro">{description}</p>}

          {(price || regularPrice || editionLabel) && (
            <div className="speed-hero-pricing">
              {regularPrice && <span className="speed-price-was" aria-label={`Regular price ${regularPrice}`}>{regularPrice}</span>}
              {price && <strong className="speed-price-now">{price}</strong>}
              {editionLabel && <span className="book-edition-label">{editionLabel}</span>}
            </div>
          )}

          <div className="book-funnel__hero-actions">
            {primaryCtaUrl && isExternalPrimary ? (
              <a
                href={primaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aning-button aning-button--primary aning-button--large"
              >
                {primaryCtaLabel}
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            ) : primaryCtaUrl ? (
              <a href={primaryCtaUrl} className="aning-button aning-button--primary aning-button--large">
                {primaryCtaLabel}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ) : null}

            {secondaryCtaUrl && isExternalSecondary ? (
              <a
                href={secondaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aning-button aning-button--secondary aning-button--large"
              >
                {secondaryCtaLabel || 'Preview the Guide'}
                <Download size={17} aria-hidden="true" />
              </a>
            ) : secondaryCtaUrl ? (
              <a href={secondaryCtaUrl} className="aning-button aning-button--secondary aning-button--large">
                {secondaryCtaLabel || 'Preview'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ) : null}
          </div>

          {metaNote && (
            <p className="type-small speed-hero-meta-note">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>{metaNote}</span>
            </p>
          )}
        </div>

        {imageSrc && (
          <figure className="book-funnel__hero-visual">
            <img
              src={imageSrc}
              alt={imageAlt || `${title} cover mockup.`}
              width="900"
              height="1125"
              loading="eager"
              decoding="async"
            />
          </figure>
        )}
      </div>
    </section>
  )
}
