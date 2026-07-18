import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import './BlogNewsletter.css'

const NEWSLETTER_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const NEWSLETTER_AJAX_ENDPOINT = 'https://formsubmit.co/ajax/aningemma1@gmail.com'
const THANK_YOU_URL = 'https://www.aningdesign.com/thank-you'

function BlogNewsletter({
  source = 'blog',
  resourceSlug = '',
  title = 'Get practical web resources in your inbox',
  description = 'New tutorials, free resources, startup tools, and useful notes on web design, WordPress, development, SEO, and digital workflows.',
  defaultInterest = 'All practical updates'
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', text: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    setIsSubmitting(true)
    setSubmitState({ type: '', text: '' })

    try {
      const formData = new FormData(form)
      formData.set('source_page', source)
      formData.set('resource_slug', resourceSlug)
      formData.set('submitted_at', new Date().toISOString())

      const response = await fetch(NEWSLETTER_AJAX_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      form.reset()
      setSubmitState({
        type: 'success',
        text: 'You’re in. I’ll send practical updates and free resources when they’re ready.'
      })
    } catch (error) {
      setSubmitState({
        type: 'error',
        text: 'I couldn’t add you right now. Please check your details and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="blog-newsletter" aria-labelledby={`blog-newsletter-title-${source}`}>
      <div className="blog-newsletter__copy">
        <span className="blog-newsletter__icon" aria-hidden="true">
          <Mail size={20} strokeWidth={2.2} />
        </span>
        <p className="blog-newsletter__eyebrow">Useful updates, occasionally</p>
        <h2 id={`blog-newsletter-title-${source}`}>{title}</h2>
        <p>{description}</p>
      </div>

      <form
        className="blog-newsletter__form"
        action={NEWSLETTER_SUBMIT_ENDPOINT}
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="New AningDesign Blog Subscriber" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={THANK_YOU_URL} />
        <input type="hidden" name="source_page" value={source} />
        <input type="hidden" name="resource_slug" value={resourceSlug} />
        <input type="hidden" name="submitted_at" value="Set when submitted" />
        <input
          type="text"
          name="_honey"
          className="blog-newsletter__honeypot"
          tabIndex={-1}
          autoComplete="off"
        />

        <label className="blog-newsletter__field">
          <span>Email address</span>
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        </label>

        <label className="blog-newsletter__field">
          <span>First name <small>Optional</small></span>
          <input type="text" name="first_name" placeholder="Your first name" autoComplete="given-name" />
        </label>

        <label className="blog-newsletter__field">
          <span>Most interested in <small>Optional</small></span>
          <select name="interest" defaultValue={defaultInterest}>
            <option>All practical updates</option>
            <option>Website Design</option>
            <option>WordPress</option>
            <option>Development</option>
            <option>SEO</option>
            <option>Free Resources</option>
            <option>Startups / Tools</option>
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding you...' : 'Get updates'}
          <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </button>

        <p className="blog-newsletter__privacy">No spam. Only practical updates and useful resources.</p>
        {submitState.text && (
          <p
            className={`blog-newsletter__status ${submitState.type}`}
            role={submitState.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {submitState.text}
          </p>
        )}
      </form>
    </section>
  )
}

export default BlogNewsletter
