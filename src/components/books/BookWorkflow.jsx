import BookSectionHeading from './BookSectionHeading'

export default function BookWorkflow({
  eyebrow,
  title,
  id = 'book-workflow-title',
  intro,
  steps = [],
  mediaImageSrc,
  mediaImageAlt,
  children
}) {
  return (
    <section className="book-section" aria-labelledby={id}>
      <BookSectionHeading eyebrow={eyebrow} title={title} id={id} intro={intro} />
      <div className="book-funnel__workflow-layout">
        {steps.length > 0 && (
          <ol className="book-funnel__steps">
            {steps.map(([number, name, detail]) => (
              <li key={number}>
                <span aria-hidden="true">{number}</span>
                <div>
                  <h3 className="type-h3">{name}</h3>
                  <p className="type-small">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {mediaImageSrc ? (
          <figure className="book-funnel__media-card">
            <img
              src={mediaImageSrc}
              alt={mediaImageAlt || title}
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
