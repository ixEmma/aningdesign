import { useEffect } from 'react'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { books, bookArticleLinks } from '../data/books'
import { useSeo } from '../utils/seo'
import { getDomain } from '../utils/domain'
import './Books.css'

function BooksPage() {
  const domain = getDomain()

  useSeo({
    title: 'Books and Website-Building Resources | AningDesign',
    description: 'Explore practical AningDesign books and digital resources for planning, building, launching, and handing over professional websites.',
    canonical: `${domain}/books`,
    image: `${domain}${books[0].ogImage}`,
    keywords: 'website design books, WordPress website resources, WordPress website checklist, website planning guide',
    type: 'website'
  })

  useEffect(() => {
    const id = 'books-list-schema'
    let script = document.getElementById(id)

    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AningDesign books',
      itemListElement: books.map((book, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${domain}${book.path}`,
        name: book.title
      }))
    })

    return () => script.remove()
  }, [domain])

  return (
    <main className="books-page">
      <section className="books-hero" aria-labelledby="books-title">
        <div className="books-shell books-hero-grid">
          <div>
            <p className="books-kicker">Books and resources</p>
            <h1 id="books-title">Practical systems for clearer website work.</h1>
            <p className="books-hero-copy">
              Direct, reusable guides for designers and builders who want a stronger process from planning through launch.
            </p>
          </div>
          <div className="books-hero-note" aria-label="Resource approach">
            <BookOpen aria-hidden="true" />
            <p>Built from real website workflows. Designed to be used, not only read.</p>
          </div>
        </div>
      </section>

      <section className="books-catalog books-shell" aria-labelledby="books-catalog-title">
        <div className="books-section-heading">
          <p>Available now</p>
          <h2 id="books-catalog-title">Start with the WordPress blueprint.</h2>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <article className="book-card" key={book.slug}>
              <Link to={book.path} className="book-card-visual" aria-label={`View ${book.title}`}>
                <img
                  src={book.listingImage}
                  alt={`${book.title} cover with an interior planning page.`}
                  width="900"
                  height="1125"
                  loading="eager"
                  decoding="async"
                />
              </Link>
              <div className="book-card-content">
                <p className="book-card-eyebrow">{book.eyebrow}</p>
                <h3>{book.title}</h3>
                <p>{book.shortDescription}</p>
                <dl className="book-card-meta">
                  <div><dt>Format</dt><dd>{book.format}</dd></div>
                  <div><dt>Price</dt><dd>{book.priceLabel}</dd></div>
                  <div><dt>For</dt><dd>{book.audienceSummary}</dd></div>
                </dl>
                <Link to={book.path} className="books-primary-action">
                  View the Blueprint
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="books-resources books-shell" aria-labelledby="book-resources-title">
        <div className="books-section-heading">
          <p>Read before you buy</p>
          <h2 id="book-resources-title">Useful website-planning guides.</h2>
        </div>
        <div className="books-resource-grid">
          {bookArticleLinks.slice(0, 3).map((article) => (
            <Link to={article.href} key={article.href}>
              <FileText size={18} aria-hidden="true" />
              <span>{article.title}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="books-support books-shell" aria-labelledby="books-support-title">
        <div>
          <p className="books-kicker">Need implementation support?</p>
          <h2 id="books-support-title">Use the process yourself—or bring AningDesign into the project.</h2>
        </div>
        <div className="books-support-actions">
          <Link to="/services/wordpress-websites">View WordPress Websites</Link>
          <Link to="/contact">Contact AningDesign</Link>
        </div>
      </section>
    </main>
  )
}

export default BooksPage

