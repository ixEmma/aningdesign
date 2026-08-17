import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Instagram, Star } from 'lucide-react'
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
      className={`client-result${featured ? ' client-result--featured' : ''}${testimonial.verified ? ' client-result--verified' : ''}`}
      aria-labelledby={`client-result-${testimonial.id}`}
    >
      <p className="client-result__context type-eyebrow">{testimonial.context}</p>
      {testimonial.rating && <TestimonialRating rating={testimonial.rating} />}
      <blockquote className={featured ? 'type-body-large' : 'type-body'}>
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <footer className={`client-result__identity${testimonial.logo ? ' client-result__identity--with-logo' : ''}`}>
        {testimonial.logo ? (
          <>
            <img
              className="client-result__logo"
              src={testimonial.logo}
              alt={testimonial.logoAlt}
              width="695"
              height="728"
              loading="lazy"
              decoding="async"
            />
            <div className="client-result__identity-copy">
              <cite className="client-result__name type-body" id={`client-result-${testimonial.id}`}>{testimonial.name}</cite>
              {testimonial.role && <p className="client-result__role type-small">{testimonial.role}</p>}
              <a
                className="client-result__instagram type-small"
                href={testimonial.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${testimonial.name} on Instagram`}
              >
                <Instagram size={17} aria-hidden="true" />
                {testimonial.instagramHandle}
              </a>
            </div>
          </>
        ) : (
          <>
            <cite className="client-result__name type-body" id={`client-result-${testimonial.id}`}>
              {testimonial.name}
            </cite>
            {testimonial.role && <p className="client-result__role type-small">{testimonial.role}</p>}
            {testimonial.service && (
              <p className="client-result__service type-small">{testimonial.service}</p>
            )}
          </>
        )}
      </footer>
    </article>
  )
}

function Testimonials() {
  const carouselRef = useRef(null)
  const [carouselBounds, setCarouselBounds] = useState({ atStart: true, atEnd: false })
  const carouselTestimonials = [...featuredHomepageTestimonials].sort(
    (first, second) => Number(Boolean(second.verified)) - Number(Boolean(first.verified))
  )

  const updateCarouselBounds = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth
    setCarouselBounds({
      atStart: carousel.scrollLeft <= 1,
      atEnd: carousel.scrollLeft >= maxScrollLeft - 1
    })
  }

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    carousel.scrollBy({
      left: direction * Math.max(carousel.clientWidth * 0.72, 280),
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  useEffect(() => {
    updateCarouselBounds()
    window.addEventListener('resize', updateCarouselBounds)

    return () => window.removeEventListener('resize', updateCarouselBounds)
  }, [])

  return (
    <section className="testimonials-section" id="testimonials" aria-labelledby="client-results-title">
      <div className="testimonials-section__inner">
        <HomepageSectionHeading
          action={(
            <nav className="client-results-controls" aria-label="Testimonial navigation">
              <button
                className="client-results-control"
                type="button"
                onClick={() => scrollCarousel(-1)}
                disabled={carouselBounds.atStart}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={19} aria-hidden="true" />
              </button>
              <button
                className="client-results-control"
                type="button"
                onClick={() => scrollCarousel(1)}
                disabled={carouselBounds.atEnd}
                aria-label="Next testimonials"
              >
                <ChevronRight size={19} aria-hidden="true" />
              </button>
            </nav>
          )}
          description="Feedback from clients and collaborators across website design, development and digital projects."
          eyebrow="Client feedback"
          title="Client Results"
          titleId="client-results-title"
        />

        <div
          className="client-results-carousel"
          ref={carouselRef}
          tabIndex="0"
          aria-label="Testimonials. Scroll horizontally to view all feedback."
          onScroll={updateCarouselBounds}
        >
          {carouselTestimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} featured={testimonial.verified} key={testimonial.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
