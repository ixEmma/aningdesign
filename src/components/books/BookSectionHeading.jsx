export default function BookSectionHeading({ eyebrow, title, id, intro, className = '' }) {
  return (
    <div className={`book-funnel__heading ${className}`.trim()}>
      {eyebrow && <p className="type-eyebrow">{eyebrow}</p>}
      {title && <h2 id={id} className="type-h2">{title}</h2>}
      {intro && <p className="type-body book-funnel__intro">{intro}</p>}
    </div>
  )
}
