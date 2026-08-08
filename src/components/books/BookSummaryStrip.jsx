export default function BookSummaryStrip({ items }) {
  if (!items || items.length === 0) return null

  return (
    <section className="book-summary-strip" aria-label="Book summary metrics">
      <dl>
        {items.map(([label, val]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{val}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
