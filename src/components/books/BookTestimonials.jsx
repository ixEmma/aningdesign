import { Instagram } from 'lucide-react'
import { strivastBookTestimonial } from '../../data/strivastTestimonial'

const testimonials = [strivastBookTestimonial]

export default function BookTestimonials() {
  return (
    <section className="book-section book-testimonials section-space--spacious" aria-labelledby="book-testimonials-title">
      <div className="book-funnel__heading">
        <p className="type-eyebrow">Reader feedback</p>
        <h2 id="book-testimonials-title" className="type-h2">What readers are saying</h2>
      </div>

      <div className="book-testimonials__grid">
        {testimonials.map((testimonial, index) => (
          <article className={`book-testimonial-card${index === 0 ? ' book-testimonial-card--featured' : ''}`} key={testimonial.instagramUrl}>
            <header className="book-testimonial-card__header">
              <img
                className="book-testimonial-card__logo"
                src={testimonial.logo}
                alt={testimonial.logoAlt}
                width="695"
                height="728"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 className="type-h3">{testimonial.name}</h3>
                <p className="type-small">{testimonial.role}</p>
              </div>
            </header>

            <blockquote className="book-testimonial-card__quote type-body-large">
              <p>{testimonial.quote}</p>
            </blockquote>

            <a
              className="book-testimonial-card__instagram type-small"
              href={testimonial.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${testimonial.name} on Instagram`}
            >
              <Instagram size={17} aria-hidden="true" />
              {testimonial.instagramHandle}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
