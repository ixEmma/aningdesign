import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, FileCheck2 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { bookArticleLinks, books } from '../data/books'
import { useSeo } from '../utils/seo'
import './Books.css'

const faqs = [
  {
    question: 'Is this book suitable for beginners?',
    answer: 'Yes. It explains the workflow in clear stages and is designed for learners who want a structured way to approach WordPress website projects.'
  },
  {
    question: 'What format will I receive?',
    answer: 'Both editions are digital PDF products delivered through Payhip after purchase.'
  },
  {
    question: 'How many pages are included?',
    answer: 'Both editions include the complete 216-page main ebook, including front matter and Parts 1–8.'
  },
  {
    question: 'What is the difference between the Ebook Edition and Complete Package?',
    answer: 'The Ebook Edition contains the complete core book. The Complete Package includes that same main book plus the AI Prompt Pack, Checklist Pack, Design Ruler Pack, and Client Handover and Maintenance Pack.'
  },
  {
    question: 'Are the bonus packs included in the Ebook Edition?',
    answer: 'No. The Ebook Edition is the complete main book on its own; the additional implementation resources are included with the Complete Package.'
  },
  {
    question: 'Can I read the PDF on mobile, tablet, and desktop?',
    answer: 'Yes. PDF files can be read with a compatible PDF reader on mobile, tablet, and desktop devices.'
  },
  {
    question: 'How will I receive the files after purchase?',
    answer: 'Payhip handles checkout and provides download access after purchase.'
  },
  {
    question: 'Is this a printed book?',
    answer: 'No. This is a digital PDF product; nothing is shipped.'
  }
]

function BookProductPage({ book }) {
  const canonicalDomain = 'https://www.aningdesign.com'

  useSeo({
    title: book.seoTitle,
    description: book.seoDescription,
    canonical: `${canonicalDomain}${book.path}`,
    image: `${canonicalDomain}${book.ogImage}`,
    keywords: [book.primaryKeyword, ...book.keywords].join(', '),
    type: 'product'
  })

  useEffect(() => {
    const id = 'book-product-schema'
    let script = document.getElementById(id)

    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: book.title,
      description: book.seoDescription,
      image: `${canonicalDomain}${book.cover}`,
      brand: { '@type': 'Brand', name: 'AningDesign' },
      offers: book.editions.map((edition) => ({
        '@type': 'Offer',
        name: edition.title,
        url: edition.payhipUrl,
        price: edition.price.replace('$', ''),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }))
    })

    return () => script.remove()
  }, [book, canonicalDomain])

  return (
    <main className="book-detail-page book-detail-page--rhythm">
      <section className="book-detail-hero" aria-labelledby="book-detail-title">
        <div className="books-shell book-detail-hero-grid">
          <div className="book-detail-copy">
            <p className="books-kicker">{book.eyebrow}</p>
            <h1 id="book-detail-title">Build WordPress websites with a clearer professional process.</h1>
            <p className="book-detail-value">
              The Client-Ready WordPress Website Blueprint gives beginners, designers, freelancers, and creators a structured workflow for planning, designing, reviewing, and delivering professional WordPress websites.
            </p>
            <div className="book-purchase-meta" aria-label="Product details">
              <strong>216-page PDF ebook</strong>
              <span>Parts 1–8</span>
              <span>Choose your edition</span>
            </div>
            <div className="book-hero-actions">
              <a href="#editions" className="aning-button aning-button--primary">
                Choose Your Edition
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="book-detail-visual">
            <img
              src={book.heroImage}
              alt="Client-Ready WordPress Website Blueprint book cover in a dark product presentation."
              width="1600"
              height="1200"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <div className="books-shell book-detail-content">
        <section className="book-section book-summary-strip section-space--compact" aria-label="Blueprint summary">
          <dl>
            <div><dt>216 pages</dt><dd>Complete core ebook</dd></div>
            <div><dt>Parts 1–8</dt><dd>From direction to delivery</dd></div>
            <div><dt>PDF download</dt><dd>Read across your devices</dd></div>
            <div><dt>Beginner-friendly</dt><dd>Built for real client workflows</dd></div>
          </dl>
        </section>

        <section className="book-section" aria-labelledby="book-audience-title">
          <div className="book-two-column">
            <div>
              <div className="book-section-heading">
                <p>Who the book is for</p>
                <h2 id="book-audience-title">For people turning website skills into a working process.</h2>
              </div>
              <ul className="book-simple-list">
                {book.audience.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <div className="book-section-heading">
                <p>What readers will learn</p>
                <h2>Move from direction to a more considered handover.</h2>
              </div>
              <ul className="book-simple-list">
                {book.outcomes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="book-section" id="book-preview" aria-labelledby="book-preview-title">
          <div className="book-section-heading">
            <p>Product preview</p>
            <h2 id="book-preview-title">A practical editorial system for the work between start and launch.</h2>
          </div>
          <figure className="book-preview-figure">
            <img src={book.previewImage} alt="Selected interior pages from the Client-Ready WordPress Website Blueprint." width="1600" height="1200" loading="lazy" decoding="async" />
            <figcaption>Selected pages from the main book, showing the planning and review approach.</figcaption>
          </figure>
        </section>

        <section className="book-section book-editions-section section-space--spacious" id="editions" aria-labelledby="book-editions-title">
          <div className="book-section-heading">
            <p>Two editions, one blueprint</p>
            <h2 id="book-editions-title">Choose the edition that fits your workflow</h2>
            <p className="book-section-intro">Get the complete 216-page blueprint on its own, or choose the Complete Package for additional prompts, checklists, design references, and client handover resources.</p>
          </div>
          <div className="book-edition-grid">
            {book.editions.map((edition) => (
              <article className={`book-edition-card${edition.id === 'complete' ? ' book-edition-card--featured' : ''}`} key={edition.id}>
                <div className="book-edition-card-heading">
                  <div>
                    {edition.label && <p className="book-edition-label">{edition.label}</p>}
                    <h3>{edition.title}</h3>
                  </div>
                  <strong>{edition.price}</strong>
                </div>
                <p>{edition.description}</p>
                <ul>
                  {edition.includes.map((item) => <li key={item}><CheckCircle2 size={18} aria-hidden="true" />{item}</li>)}
                </ul>
                {edition.note && <p className="book-edition-note">{edition.note}</p>}
                <a href={edition.payhipUrl} target="_blank" rel="noopener noreferrer" className="aning-button aning-button--primary">
                  {edition.ctaLabel}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="book-section" aria-labelledby="book-included-title">
          <div className="book-section-heading">
            <p>Inside the blueprint</p>
            <h2 id="book-included-title">Useful structure before you open the page builder.</h2>
          </div>
          <div className="book-included-layout">
            <div className="book-included-grid">
              {book.included.map((item) => (
                <article key={item.title}>
                  <FileCheck2 size={20} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <figure className="book-wide-visual">
              <img src={book.bundleImage} alt="Preview of the AI prompt, checklist, design ruler, and client handover resource packs included with the Complete Package." width="1600" height="1200" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section className="book-section book-author-section" aria-labelledby="book-author-title">
          <div className="book-section-heading">
            <p>Author</p>
            <h2 id="book-author-title">Written by Emmanuel Aning.</h2>
          </div>
          <p>Emmanuel Aning created this guide for people who want a clearer, more repeatable way to approach WordPress website work—from early direction through review and client handover.</p>
        </section>

        <section className="book-section" aria-labelledby="book-faq-title">
          <div className="book-section-heading">
            <p>FAQ</p>
            <h2 id="book-faq-title">Questions before purchasing.</h2>
          </div>
          <div className="book-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="book-section" aria-labelledby="book-related-title">
          <div className="book-section-heading">
            <p>Related guides</p>
            <h2 id="book-related-title">Build the workflow one decision at a time.</h2>
          </div>
          <div className="book-related-grid">
            {bookArticleLinks.slice(0, 3).map((article) => (
              <Link to={article.href} key={article.href}>{article.title}<ArrowRight size={15} aria-hidden="true" /></Link>
            ))}
          </div>
          <div className="book-service-links">
            <Link to="/services/wordpress-websites">WordPress Websites</Link>
            <Link to="/services/website-design">Website Design</Link>
            <Link to="/contact">Contact AningDesign</Link>
          </div>
        </section>

        <section className="book-final-cta section-space--spacious" aria-labelledby="book-final-cta-title">
          <p>Client-ready workflow</p>
          <h2 id="book-final-cta-title">Choose your edition and start building with a clearer process.</h2>
          <div className="book-final-actions">
            {book.editions.map((edition) => (
              <a href={edition.payhipUrl} target="_blank" rel="noopener noreferrer" className={edition.id === 'complete' ? 'aning-button aning-button--primary' : 'aning-button aning-button--secondary'} key={edition.id}>
                {edition.ctaLabel}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function BookDetailPage() {
  const { slug } = useParams()
  const book = books.find((item) => item.slug === slug)

  if (!book) return <Navigate to="/books" replace />

  return <BookProductPage book={book} />
}

export default BookDetailPage
