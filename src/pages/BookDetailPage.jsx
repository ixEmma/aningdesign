import { useEffect } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { books } from '../data/books'
import { useSeo } from '../utils/seo'
import './Books.css'

const assetBase = '/images/books/client-ready-wordpress-blueprint'

const stages = [
  ['01', 'Direction', 'Set the goals, audience, and project brief.'],
  ['02', 'Structure', 'Map pages, hierarchy, and useful navigation.'],
  ['03', 'Content', 'Prepare the message before layout begins.'],
  ['04', 'WordPress Setup', 'Create a reliable foundation for the build.'],
  ['05', 'Design System', 'Define the reusable visual rules.'],
  ['06', 'Page Build', 'Turn the plan into clear responsive pages.'],
  ['07', 'Client-Ready Polish', 'Review the details before launch.'],
  ['08', 'Handover', 'Deliver a site the client can use and maintain.']
]

const bundleItems = [
  ['Main Book', '222 pages'],
  ['AI Prompt Pack', '32 pages'],
  ['Checklist Pack', '30 pages'],
  ['Design Ruler Pack', '27 pages'],
  ['Client Handover & Maintenance Pack', '29 pages']
]

const audiences = [
  'Beginner WordPress builders',
  'Freelancers',
  'Graphic designers moving into web design',
  'Elementor users',
  'Creators using AI-assisted workflows',
  'People who can build pages but need a professional project system'
]

const faqs = [
  {
    question: 'Is this book suitable for beginners?',
    answer: 'Yes. The 222-page main book explains the workflow in clear stages for people who want a more structured way to approach WordPress website projects.'
  },
  {
    question: 'What format will I receive?',
    answer: 'Both editions are digital PDF products delivered through Payhip after purchase.'
  },
  {
    question: 'How many pages are included?',
    answer: 'The Ebook Edition includes the 222-page main book. The Complete Package contains 340 verified PDF pages across the main book and four bonus packs.'
  },
  {
    question: 'What is the difference between the Ebook Edition and Complete Package?',
    answer: 'The Ebook Edition contains the complete main book. The Complete Package adds the AI Prompt Pack, Checklist Pack, Design Ruler Pack, and Client Handover & Maintenance Pack.'
  },
  {
    question: 'Can I read the PDF on mobile, tablet, and desktop?',
    answer: 'Yes. The PDF files can be read with a compatible PDF reader on mobile, tablet, and desktop devices.'
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

function ExternalButton({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  )
}

function SectionHeading({ eyebrow, title, id, intro }) {
  return (
    <div className="book-funnel__heading">
      <p className="type-eyebrow">{eyebrow}</p>
      <h2 id={id} className="type-h2">{title}</h2>
      {intro && <p className="type-body book-funnel__intro">{intro}</p>}
    </div>
  )
}

function BookProductPage({ book }) {
  const canonicalDomain = 'https://www.aningdesign.com'
  const completeEdition = book.editions.find((edition) => edition.id === 'complete')

  useSeo({
    title: book.seoTitle,
    description: book.seoDescription,
    canonical: `${canonicalDomain}${book.path}`,
    image: `${canonicalDomain}${book.cover}`,
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
    <main className="book-detail-page book-funnel book-detail-page--rhythm">
      <section className="book-funnel__hero" aria-labelledby="book-detail-title">
        <div className="books-shell book-funnel__hero-grid">
          <div className="book-funnel__hero-copy">
            <p className="type-eyebrow">Client-Ready WordPress Blueprint</p>
            <h1 id="book-detail-title" className="type-h1">Build client-ready WordPress sites with a repeatable system.</h1>
            <p className="type-body-large">
              Plan the direction, structure the pages, prepare the content, build consistently, verify the work, and hand it over professionally.
            </p>
            <div className="book-funnel__hero-actions">
              <ExternalButton href={completeEdition.payhipUrl} className="aning-button aning-button--primary aning-button--large">
                Get the Complete Blueprint
              </ExternalButton>
              <a href="#book-preview" className="aning-button aning-button--secondary aning-button--large">Preview the Book <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="book-funnel__hero-visual">
            <img
              src={`${assetBase}/pages/001-book-cover.webp`}
              alt="Cover of Client-Ready WordPress Blueprint by Emmanuel Aning."
              width="1080"
              height="1620"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <div className="books-shell book-detail-content">
        <section className="book-funnel__proof book-section section-space--compact" aria-label="Blueprint facts">
          <dl>
            <div><dt>222-page</dt><dd>main book</dd></div>
            <div><dt>58 practical</dt><dd>chapters</dd></div>
            <div><dt>8-part</dt><dd>workflow</dd></div>
            <div><dt>4 bonus</dt><dd>workbooks</dd></div>
          </dl>
        </section>

        <section className="book-section book-funnel__outcome" aria-labelledby="book-outcome-title">
          <div className="book-funnel__outcome-copy">
            <SectionHeading eyebrow="The outcome" title="Stop building client websites one page at a time without a system." id="book-outcome-title" />
          </div>
          <div className="book-funnel__outcome-detail">
            <p className="type-body-large">Knowing Elementor or WordPress is not the same as knowing how to run a complete website project.</p>
            <p className="type-body">The blueprint connects direction, structure, content, setup, design system, build, polish, and handover so each decision has a place.</p>
          </div>
        </section>

        <section className="book-section" aria-labelledby="book-workflow-title">
          <SectionHeading eyebrow="The blueprint" title="One workflow from direction to delivery." id="book-workflow-title" intro="A practical sequence for moving from the first brief to a professional handover." />
          <div className="book-funnel__workflow-layout">
            <ol className="book-funnel__steps">
              {stages.map(([number, name, detail]) => (
                <li key={number}>
                  <span aria-hidden="true">{number}</span>
                  <div><h3 className="type-h3">{name}</h3><p className="type-small">{detail}</p></div>
                </li>
              ))}
            </ol>
            <figure className="book-funnel__media-card">
              <img src={`${assetBase}/composites/workflow-system-preview.webp`} alt="Selected Client-Ready WordPress Blueprint pages illustrating the project workflow." width="1800" height="1050" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section className="book-section section-space--spacious" id="book-preview" aria-labelledby="book-preview-title">
          <SectionHeading eyebrow="Inside the book" title="See the system inside the book." id="book-preview-title" intro="Practical prompts, blueprint rules, templates, checklists, page-build patterns, and handover workflows are laid out for use during a project." />
          <div className="book-funnel__preview-grid">
            <figure className="book-funnel__media-card"><img src={`${assetBase}/composites/interior-three-page-preview.webp`} alt="Three interior pages from Client-Ready WordPress Blueprint." width="1800" height="1050" loading="lazy" decoding="async" /></figure>
            <figure className="book-funnel__media-card"><img src={`${assetBase}/composites/practical-pages-preview.webp`} alt="Practical worksheet and page-build examples from Client-Ready WordPress Blueprint." width="1800" height="1050" loading="lazy" decoding="async" /></figure>
          </div>
        </section>

        <section className="book-section book-funnel__bundle" aria-labelledby="book-bundle-title">
          <div className="book-funnel__bundle-copy">
            <SectionHeading eyebrow="Complete bundle" title="The complete package goes beyond the main book." id="book-bundle-title" intro="340 verified PDF pages total, built to support the work around the build as well as the pages themselves." />
            <dl className="book-funnel__bundle-list">
              {bundleItems.map(([title, pages]) => <div key={title}><dt>{title}</dt><dd>{pages}</dd></div>)}
            </dl>
          </div>
          <figure className="book-funnel__media-card">
            <img src={`${assetBase}/composites/complete-bonus-pack-covers.webp`} alt="Client-Ready WordPress Blueprint complete package with the main book and four bonus workbooks." width="1800" height="1050" loading="lazy" decoding="async" />
          </figure>
        </section>

        <section className="book-section book-funnel__purchase section-space--spacious" id="editions" aria-labelledby="book-editions-title">
          <SectionHeading eyebrow="Choose an edition" title="Get the blueprint that fits your workflow." id="book-editions-title" />
          <div className="book-edition-grid">
            {book.editions.map((edition) => (
              <article className={`book-edition-card${edition.id === 'complete' ? ' book-edition-card--featured' : ''}`} key={edition.id}>
                <div className="book-edition-card-heading">
                  <div>
                    {edition.label && <p className="book-edition-label">{edition.label}</p>}
                    <h3 className="type-h3">{edition.title}</h3>
                  </div>
                  <strong>{edition.price}</strong>
                </div>
                <p className="type-body">{edition.description}</p>
                <ul>
                  {edition.includes.map((item) => <li key={item}><CheckCircle2 size={18} aria-hidden="true" />{item}</li>)}
                </ul>
                {edition.note && <p className="book-edition-note">{edition.note}</p>}
                <ExternalButton href={edition.payhipUrl} className="aning-button aning-button--primary">{edition.ctaLabel}</ExternalButton>
              </article>
            ))}
          </div>
        </section>

        <section className="book-section book-funnel__free-preview" aria-labelledby="book-free-preview-title">
          <figure className="book-funnel__media-card"><img src={`${assetBase}/composites/practical-pages-preview.webp`} alt="Preview of practical Client-Ready WordPress Blueprint pages." width="1800" height="1050" loading="lazy" decoding="async" /></figure>
          <div>
            <SectionHeading eyebrow="Free preview" title="Preview the book before you buy." id="book-free-preview-title" />
            <p className="type-body">Inspect the layout, teaching approach, and selected pages before choosing an edition.</p>
            <ExternalButton href="https://payhip.com/b/BKgxC" className="aning-button aning-button--secondary">Download the Free Preview</ExternalButton>
          </div>
        </section>

        <section className="book-section" aria-labelledby="book-audience-title">
          <SectionHeading eyebrow="Who it is for" title="For builders ready to work with more structure." id="book-audience-title" />
          <ul className="book-funnel__audience-list">
            {audiences.map((audience) => <li className="type-body" key={audience}>{audience}</li>)}
          </ul>
        </section>

        <section className="book-section book-funnel__author" aria-labelledby="book-author-title">
          <SectionHeading eyebrow="Author" title="Emmanuel Aning" id="book-author-title" />
          <p className="type-body">Emmanuel Aning created this guide for people who want a clearer, repeatable way to plan, build, review, and hand over WordPress websites.</p>
        </section>

        <section className="book-section section-space--spacious" aria-labelledby="book-faq-title">
          <SectionHeading eyebrow="FAQ" title="Questions before purchasing." id="book-faq-title" />
          <div className="book-faq-list">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p className="type-body">{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="book-final-cta section-space--spacious" aria-labelledby="book-final-cta-title">
          <p className="type-eyebrow">Client-ready workflow</p>
          <h2 id="book-final-cta-title" className="type-h2">Build the workflow one decision at a time.</h2>
          <p className="type-body-large">Move from planning to handover with one repeatable WordPress website system.</p>
          <div className="book-final-actions">
            <ExternalButton href={completeEdition.payhipUrl} className="aning-button aning-button--primary">Get the Complete Blueprint</ExternalButton>
            <a href="#book-preview" className="aning-button aning-button--secondary">Preview the Book <ArrowRight size={17} aria-hidden="true" /></a>
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
