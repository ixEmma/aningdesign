import { ArrowRight } from 'lucide-react'
import { books } from '../data/books'
import { SiteLink } from './SiteLink'
import './FeaturedBooks.css'

function FeaturedBooks() {
  const [leadBook, supportingBook] = books

  if (!leadBook || !supportingBook) return null

  return (
    <section className="featured-books" id="books" aria-labelledby="featured-books-title">
      <div className="featured-books__shell">
        <header className="featured-books__intro">
          <div>
            <p className="type-eyebrow">Books &amp; guides</p>
            <h2 className="type-h2" id="featured-books-title">
              Practical guides built from real web workflows.
            </h2>
          </div>
          <p className="type-body-large">
            Structured digital resources for planning, building, reviewing, and improving WordPress websites with more confidence.
          </p>
        </header>

        <div className="featured-books__layout">
          <article className="featured-books__lead">
            <SiteLink href={leadBook.path} className="featured-books__lead-art" aria-label={`View ${leadBook.title}`}>
              <img
                src={leadBook.listingImage}
                alt={`${leadBook.title} book cover and sample-page mockup.`}
                loading="lazy"
                decoding="async"
              />
            </SiteLink>

            <div className="featured-books__lead-copy">
              <p className="type-eyebrow">{leadBook.eyebrow}</p>
              <h3 className="type-h3">{leadBook.title}</h3>
              <p className="type-body">{leadBook.shortDescription}</p>
              <dl className="featured-books__meta type-small">
                <div><dt>Format</dt><dd>{leadBook.format}</dd></div>
                <div><dt>Price</dt><dd>{leadBook.priceLabel}</dd></div>
              </dl>
              <SiteLink href={leadBook.path} className="aning-button aning-button--primary">
                View Book
                <ArrowRight size={17} aria-hidden="true" />
              </SiteLink>
            </div>
          </article>

          <article className="featured-books__supporting">
            <SiteLink href={supportingBook.path} className="featured-books__supporting-art" aria-label={`View ${supportingBook.title}`}>
              <img
                src={supportingBook.listingImage}
                alt={`${supportingBook.title} book cover mockup.`}
                loading="lazy"
                decoding="async"
              />
            </SiteLink>

            <div className="featured-books__supporting-copy">
              <p className="type-eyebrow">{supportingBook.eyebrow}</p>
              <h3 className="type-h3">{supportingBook.title}</h3>
              <p className="type-body">{supportingBook.valueStatement}</p>
              <p className="featured-books__price type-small">{supportingBook.priceLabel}</p>
              <SiteLink href={supportingBook.path} className="aning-button aning-button--secondary">
                View Book
                <ArrowRight size={17} aria-hidden="true" />
              </SiteLink>
            </div>
          </article>
        </div>

        <SiteLink href="/books" className="featured-books__all-link aning-button aning-button--text">
          View all books
          <ArrowRight size={17} aria-hidden="true" />
        </SiteLink>
      </div>
    </section>
  )
}

export default FeaturedBooks
