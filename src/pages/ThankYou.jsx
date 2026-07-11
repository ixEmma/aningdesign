import { useSeo } from '../utils/seo'
import { getDomain } from '../utils/domain'
import './ThankYou.css'

function ThankYou() {
  useSeo({
    title: 'Thank You | AningDesign',
    description: 'Thank you for contacting AningDesign. Your website inquiry has been received.',
    canonical: `${getDomain()}/thank-you`,
    robots: 'noindex, follow',
    type: 'website'
  })

  return (
    <main className="thank-you-page">
      <section className="thank-you-section" aria-labelledby="thank-you-title">
        <p className="thank-you-label">Message received</p>
        <h1 id="thank-you-title">Thank you for reaching out.</h1>
        <p className="thank-you-copy">
          Your inquiry has been sent to AningDesign. I will review your message and reply as
          soon as possible.
        </p>
        <div className="thank-you-actions" aria-label="Next steps">
          <a href="/#home" className="thank-you-primary">
            Back to Home
          </a>
          <a href="/blog" className="thank-you-secondary">
            Read Tutorials
          </a>
        </div>
      </section>
    </main>
  )
}

export default ThankYou
