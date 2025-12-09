import './Contact.css'
import CTA from './CTA'

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic can be added here
    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log('Form data:', data)
    // You can add actual form submission logic here
  }

  return (
    <section className="contact-section" id="contact">
      {/* CTA Banner - Call to Action above contact form */}
      <CTA />
      
      <div className="contact-bento-container">
        {/* Contact Form Card */}
        <div className="bento-card contact-form-card">
          <h2>CONTACT ME</h2>
          <p className="contact-description">
            Whether you have a project in mind or just want to say hello, I would love to
            hear from you. Fill out the form below and I'll get back to you soon.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              Send Message
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>

        {/* WhatsApp Quick Contact Card */}
        <div className="bento-card whatsapp-contact-card">
          <div className="whatsapp-icon-large">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>

          <h3>Quick Contact</h3>
          <p className="whatsapp-description">
            Send me a message on WhatsApp and I'll get back to you right away!
          </p>

          <div className="whatsapp-cta-wrapper">
            <a
              href="https://wa.me/233557066467?text=Hi Emmanuel, I'm interested in working with you on a project."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta-btn"
            >
              <i className="fab fa-whatsapp"></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

