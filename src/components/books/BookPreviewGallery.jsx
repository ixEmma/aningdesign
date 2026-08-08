import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import BookSectionHeading from './BookSectionHeading'

export default function BookPreviewGallery({
  eyebrow = 'Inside the book',
  title = 'See inside the book',
  id = 'book-preview-title',
  intro,
  items = [],
  className = ''
}) {
  const [activePreview, setActivePreview] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePreview(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!items || items.length === 0) return null

  return (
    <section className={`book-section section-space--spacious ${className}`.trim()} id="book-preview" aria-labelledby={id}>
      <BookSectionHeading eyebrow={eyebrow} title={title} id={id} intro={intro} />

      <div className="book-funnel__preview-grid speed-preview-cards-grid">
        {items.map((item, idx) => {
          const isButton = item.onClick || item.src
          if (item.src && isButton) {
            return (
              <button
                type="button"
                key={item.id || idx}
                className="book-funnel__media-card speed-preview-thumb-btn"
                onClick={() => setActivePreview(item)}
                aria-label={`Enlarge preview: ${item.title}`}
              >
                <img src={item.src} alt={item.alt || item.title} width="600" height="400" loading="lazy" decoding="async" />
                {item.title && <span className="speed-preview-thumb-caption">{item.title}</span>}
              </button>
            )
          }

          return (
            <figure className="book-funnel__media-card" key={idx}>
              <img src={item.imageSrc} alt={item.alt || title} width="1800" height="1050" loading="lazy" decoding="async" />
            </figure>
          )
        })}
      </div>

      {activePreview && (
        <div
          className="speed-lightbox-overlay"
          onClick={() => setActivePreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePreview.title}
        >
          <div className="speed-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="speed-lightbox-close"
              onClick={() => setActivePreview(null)}
              aria-label="Close preview modal"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img src={activePreview.src} alt={activePreview.alt || activePreview.title} />
            {activePreview.title && <p className="speed-lightbox-title">{activePreview.title}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
