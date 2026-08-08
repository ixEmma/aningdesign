import BookSectionHeading from './BookSectionHeading'

export default function BookFAQ({
  eyebrow = 'FAQ',
  title = 'Questions before purchasing',
  id = 'book-faq-title',
  intro,
  faqs = []
}) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="book-section section-space--spacious" aria-labelledby={id}>
      <BookSectionHeading eyebrow={eyebrow} title={title} id={id} intro={intro} />
      <div className="book-faq-list">
        {faqs.map((faq) => {
          const qText = faq.q || faq.question
          const aText = faq.a || faq.answer
          return (
            <details key={qText}>
              <summary>{qText}</summary>
              <p className="type-body">{aText}</p>
            </details>
          )
        })}
      </div>
    </section>
  )
}
