import { Star } from 'lucide-react'
import './Testimonials.css'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 4.9,
      quote: 'Emmanuel completely redesigned our restaurant website. Bookings increased by 45% in the first month. The site loads fast and customers love the menu integration.',
      author: 'Opong Bediako',
      role: 'Restaurant Owner',
      size: 'large'
    },
    {
      id: 2,
      rating: 5.0,
      quote: 'My e-commerce store went from barely ranking to page one for all my target keywords. SEO work was technical but the results speak for themselves.',
      author: 'Kyekyeku Mensah',
      role: 'E-commerce Founder',
      size: 'small'
    },
    {
      id: 3,
      rating: 4.9,
      quote: 'Migrated our WordPress site to a faster platform. Page speed improved dramatically and our conversion rate went up 32%. Highly recommend.',
      author: 'Dr. Olie Kareem',
      role: 'Medical Consultant',
      size: 'small'
    },
    {
      id: 4,
      rating: 4.8,
      quote: 'The Shopify redesign transformed how we present our products. Mobile experience is smooth, checkout is optimized, and sales have increased consistently.',
      author: 'Miss Thelma Addo',
      role: 'Fashion Brand Owner',
      size: 'medium'
    },
    {
      id: 5,
      rating: 5.0,
      quote: 'Professional, responsive, and delivered exactly what we needed. Our real estate website now generates quality leads automatically.',
      author: 'Nana Kwaku',
      role: 'Real Estate Agency',
      size: 'small'
    }
  ]

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="star-container">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars
          const isHalf = i === fullStars && hasHalfStar

          return (
            <Star
              key={i}
              size={16}
              className={`star-icon ${isFilled ? 'filled' : isHalf ? 'half' : ''}`}
            />
          )
        })}
        <span className="rating-text">{rating}</span>
      </div>
    )
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title section-title">Client Results</h2>
        <p className="testimonials-subtitle section-description">Hear from businesses we've helped grow and scale</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`testimonial-card testimonial-${testimonial.size}`}
          >
            {renderStars(testimonial.rating)}
            <p className="testimonial-quote">{testimonial.quote}</p>
            <div className="testimonial-author">
              <p className="author-name">{testimonial.author}</p>
              <p className="author-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
