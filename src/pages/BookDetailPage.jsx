import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, FileCheck2 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { bookArticleLinks, books } from '../data/books'
import { useSeo } from '../utils/seo'
import { getDomain } from '../utils/domain'
import './Books.css'

const faqs = [
  {
    question: 'Is this a physical or digital book?',
    answer: 'It is a digital PDF bundle delivered through Payhip. Nothing is shipped.'
  },
  {
    question: 'Who is the blueprint for?',
    answer: 'It is designed for beginners, freelancers, WordPress and Elementor designers, creators, and small studios building websites for real clients.'
  },
  {
    question: 'Is this a full WordPress course?',
    answer: 'No. It is a practical workflow blueprint for planning, structuring, building, reviewing, launching, and handing over websites.'
  },
  {
    question: 'What files are included?',
    answer: 'The verified buyer package includes the 330-page ebook, AI Prompt Pack, Checklist Pack, Design Ruler Pack, Client Handover + Maintenance Pack, and usage guide.'
  },
  {
    question: 'How do I receive the files?',
    answer: 'The purchase and digital delivery are completed through Payhip using the secure product link on this page.'
  },
  {
    question: 'Can I use the resources for client projects?',
    answer: 'Yes. The license permits personal learning, client workflow support, and website-building reference. The product files cannot be shared, resold, redistributed, or repackaged.'
  },
  {
    question: 'Is a print-ready edition included?',
    answer: 'A print-ready edition exists in the master package, but it is not part of the currently verified Payhip buyer upload.'
  }
]

function BookProductPage({ book }) {
  const domain = getDomain()

  useSeo({
    title: book.seoTitle,
    description: book.seoDescription,
    canonical: `${domain}${book.path}`,
    image: `${domain}${book.ogImage}`,
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
      image: `${domain}${book.cover}`,
      brand: { '@type': 'Brand', name: 'AningDesign' },
      offers: {
        '@type': 'Offer',
        url: book.payhipUrl,
        price: String(book.price),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    })

    return () => script.remove()
  }, [book, domain])

  return (
    <main className="book-detail-page">
      <section className="book-detail-hero" aria-labelledby="book-detail-title">
        <div className="books-shell book-detail-hero-grid">
          <div className="book-detail-copy">
            <p className="books-kicker">{book.eyebrow}</p>
            <h1 id="book-detail-title">A client-ready WordPress website blueprint.</h1>
            <p className="book-detail-value">{book.valueStatement}</p>
            <div className="book-purchase-meta" aria-label="Product details">
              <strong>{book.priceLabel}</strong>
              <span>{book.format}</span>
              <span>Secure delivery through Payhip</span>
            </div>
            <div className="book-hero-actions">
              <a href={book.payhipUrl} target="_blank" rel="noopener noreferrer" className="books-primary-action">
                Get the Blueprint
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href="#book-preview" className="books-secondary-action">Preview what is inside</a>
            </div>
            <p className="book-checkout-note">AningDesign explains the product. Payhip handles checkout, payment, and download access.</p>
          </div>
          <div className="book-detail-visual">
            <img
              src={book.heroImage}
              alt={`${book.title} shown in a premium dark product presentation.`}
              width="1600"
              height="1200"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <div className="books-shell book-detail-content">
        <section className="book-section book-problem-section" aria-labelledby="book-problems-title">
          <div className="book-section-heading">
            <p>The problem</p>
            <h2 id="book-problems-title">A website project becomes harder when the process is unclear.</h2>
          </div>
          <ul className="book-check-grid">
            {book.problems.map((problem) => (
              <li key={problem}><CheckCircle2 size={18} aria-hidden="true" />{problem}</li>
            ))}
          </ul>
        </section>

        <section className="book-section" aria-labelledby="book-included-title">
          <div className="book-section-heading">
            <p>What you receive</p>
            <h2 id="book-included-title">One blueprint and four focused resource packs.</h2>
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
              <img src={book.bundleImage} alt="Preview of the AI prompt, checklist, design ruler, and client handover resources." width="1600" height="1200" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section className="book-section book-two-column" aria-labelledby="book-audience-title">
          <div>
            <div className="book-section-heading">
              <p>Who it is for</p>
              <h2 id="book-audience-title">For people turning website skills into a working process.</h2>
            </div>
            <ul className="book-simple-list">
              {book.audience.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <div className="book-section-heading">
              <p>What improves</p>
              <h2>A clearer route from direction to handover.</h2>
            </div>
            <ul className="book-simple-list">
              {book.outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="book-section" id="book-preview" aria-labelledby="book-preview-title">
          <div className="book-section-heading">
            <p>Real product preview</p>
            <h2 id="book-preview-title">A practical editorial system—not a wall of theory.</h2>
          </div>
          <figure className="book-preview-figure">
            <img src={book.previewImage} alt="Real interior pages from the blueprint and website direction checklist." width="1600" height="1200" loading="lazy" decoding="async" />
            <figcaption>Selected pages from the verified teaser and checklist pack.</figcaption>
          </figure>
        </section>

        <section className="book-section book-difference" aria-labelledby="book-difference-title">
          <div className="book-section-heading">
            <p>Why it is different</p>
            <h2 id="book-difference-title">Designed around the work that happens between “start” and “launch.”</h2>
          </div>
          <p>
            This is not a full WordPress course and it is not a collection of disconnected tips. The blueprint follows a real project sequence: direction, structure, content, setup, design system, page build, launch polish, and client handover. Use it repeatedly when a new project needs a dependable starting point.
          </p>
        </section>

        <section className="book-section" aria-labelledby="book-license-title">
          <div className="book-section-heading">
            <p>Usage</p>
            <h2 id="book-license-title">Use the system in your work. Keep the files protected.</h2>
          </div>
          <p className="book-license-copy">{book.license}</p>
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
            {bookArticleLinks.map((article) => (
              <Link to={article.href} key={article.href}>{article.title}<ArrowRight size={15} aria-hidden="true" /></Link>
            ))}
          </div>
          <div className="book-service-links">
            <Link to="/services/wordpress-websites">WordPress Websites</Link>
            <Link to="/services/website-design">Website Design</Link>
            <Link to="/contact">Contact AningDesign</Link>
          </div>
        </section>

        <section className="book-final-cta" aria-labelledby="book-final-cta-title">
          <p>Client-ready workflow</p>
          <h2 id="book-final-cta-title">Build WordPress websites with a clearer process.</h2>
          <a href={book.payhipUrl} target="_blank" rel="noopener noreferrer" className="books-primary-action">
            Get the Blueprint
            <ArrowRight size={17} aria-hidden="true" />
          </a>
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
