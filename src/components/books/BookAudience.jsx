import BookSectionHeading from './BookSectionHeading'

export default function BookAudience({
  eyebrow = 'Who it is for',
  title = 'Built for builders ready to work with structure',
  id = 'book-audience-title',
  intro,
  items = []
}) {
  if (!items || items.length === 0) return null

  return (
    <section className="book-section" aria-labelledby={id}>
      <BookSectionHeading eyebrow={eyebrow} title={title} id={id} intro={intro} />
      <ul className="book-funnel__audience-list">
        {items.map((item) => (
          <li className="type-body" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
