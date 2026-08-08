import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react'
import BookSectionHeading from './BookSectionHeading'

export default function BookPricing({
  eyebrow = 'Choose an edition',
  title = 'Get the guide that fits your workflow',
  id = 'editions',
  intro,
  editions = []
}) {
  if (!editions || editions.length === 0) return null

  return (
    <section className="book-section book-funnel__purchase section-space--spacious" id={id} aria-labelledby={`${id}-title`}>
      <BookSectionHeading eyebrow={eyebrow} title={title} id={`${id}-title`} intro={intro} />
      <div className="book-edition-grid">
        {editions.map((edition) => {
          const isFeatured = edition.id === 'complete' || edition.id === 'launch' || edition.featured
          const isExternal = edition.payhipUrl?.startsWith('http')

          return (
            <article
              className={`book-edition-card${isFeatured ? ' book-edition-card--featured' : ''}`}
              key={edition.id}
            >
              <div className="book-edition-card-heading">
                <div>
                  {edition.label && <p className="book-edition-label">{edition.label}</p>}
                  <h3 className="type-h3">{edition.title}</h3>
                </div>
                <div className="speed-card-price-stack">
                  {edition.regularPrice && <span className="speed-price-was">{edition.regularPrice}</span>}
                  <strong>{edition.price}</strong>
                </div>
              </div>
              {edition.description && <p className="type-body">{edition.description}</p>}
              {edition.includes && edition.includes.length > 0 && (
                <ul>
                  {edition.includes.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={18} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {edition.note && <p className="book-edition-note">{edition.note}</p>}
              {isExternal ? (
                <a
                  href={edition.payhipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`aning-button ${isFeatured ? 'aning-button--primary' : 'aning-button--secondary'}`}
                >
                  {edition.ctaLabel || 'Get the Guide'}
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
              ) : (
                <a
                  href={edition.payhipUrl || '#'}
                  className={`aning-button ${isFeatured ? 'aning-button--primary' : 'aning-button--secondary'}`}
                >
                  {edition.ctaLabel || 'Get the Guide'}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
