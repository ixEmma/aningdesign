import { Star } from 'lucide-react'
import { featuredHomepageTestimonials } from '../data/homepageTestimonials'
import HomepageSectionHeading from './HomepageSectionHeading'
import './Testimonials.css'

function TestimonialRating({ rating }) {
  return (
    <div className="client-result__rating" aria-label={`${rating} out of 5 stars`}>
      <span className="client-result__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            className={`client-result__star${index < Math.round(rating) ? ' is-filled' : ''}`}
            key={index}
            size={16}
            strokeWidth={1.7}
          />
        ))}
      </span>
      <span className="client-result__rating-value type-small" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

function TestimonialCard({ testimonial, featured = false }) {
  return (
    <article
      className={`client-result${featured ? ' client-result--featured' : ''}`}
      aria-labelledby={`client-result-${testimonial.id}`}
    >
      <p className="client-result__context type-eyebrow">{testimonial.context}</p>
      <TestimonialRating rating={testimonial.rating} />
      <blockquote className={featured ? 'type-h3' : 'type-body'}>
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <footer className="client-result__identity">
        <cite className="client-result__name type-body" id={`client-result-${testimonial.id}`}>
          {testimonial.name}
        </cite>
        {testimonial.role && <p className="client-result__role type-small">{testimonial.role}</p>}
        {testimonial.service && (
          <p className="client-result__service type-small">{testimonial.service}</p>
        )}
      </footer>
    </article>
  )
}

function Testimonials() {
  const [featuredTestimonial, ...supportingTestimonials] = featuredHomepageTestimonials

  return (
    <section className="testimonials-section" id="testimonials" aria-labelledby="client-results-title">
      <div className="testimonials-section__inner">
        <HomepageSectionHeading
          description="Feedback from clients and collaborators across website design, development and digital projects."
          eyebrow="Client feedback"
          title="Client Results"
          titleId="client-results-title"
        />

        <div className="client-results-grid">
          <TestimonialCard testimonial={featuredTestimonial} featured />
          <div className="client-results-supporting">
            {supportingTestimonials.map((testimonial) => (
              <TestimonialCard testimonial={testimonial} key={testimonial.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
