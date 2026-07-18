import { useState } from 'react'
import { Mail, MessageCircle, Send } from 'lucide-react'
import './Contact.css'
import CTA from './CTA'
import { getExternalLinkProps } from '../utils/links'

const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const THANK_YOU_URL = 'https://www.aningdesign.com/thank-you'
const CONTACT_EMAIL = 'aningemma1@gmail.com'
const WHATSAPP_URL = 'https://wa.me/233557066467?text=Hi Emmanuel, I am interested in working with you on a project.'

const contactSocialLinks = [
  { label: 'X', href: 'https://x.com/Aningdesigns' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310' },
  { label: 'Behance', href: 'https://www.behance.net/emmaaning' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg' },
  { label: 'GitHub', href: 'https://github.com/ixEmma' },
  { label: 'Telegram', href: 'https://t.me/AningDzn' }
]

function Contact({ showIntroCta = true, pageMode = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', text: '' })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setSubmitState({ type: 'success', text: 'Sending your inquiry securely...' })
  }

  return (
    <section className={`contact-section${pageMode ? ' contact-section--page' : ''}`} id="contact">
      {showIntroCta && <CTA />}
      
      <div className="contact-bento-container">
        <div className="bento-card contact-form-card">
          <p className="contact-card-kicker">Contact</p>
          <h2>Send message</h2>
          <p className="contact-description">
            Share the project, the goal, and where you need help. I will review it and reply with the best next step.
          </p>

          <form
            className="contact-form"
            action={FORM_SUBMIT_ENDPOINT}
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="New AningDesign Website Inquiry" />
            <input type="hidden" name="_next" value={THANK_YOU_URL} />
            <input type="hidden" name="_template" value="table" />
            <input
              type="text"
              name="_honey"
              className="contact-honeypot"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company or brand name</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your company, brand, or project"
                autoComplete="organization"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" defaultValue="" required>
                <option value="" disabled>Select a project type</option>
                <option value="Website design">Website design</option>
                <option value="Website redesign">Website redesign</option>
                <option value="Branding or graphic design">Branding or graphic design</option>
                <option value="UI/UX design">UI/UX design</option>
                <option value="Startup MVP or web app">Startup MVP or web app</option>
                <option value="Other">Other</option>
              </select>
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

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
              <Send size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
            {submitState.text && (
              <p className={`contact-form-status ${submitState.type}`} aria-live="polite">
                {submitState.text}
              </p>
            )}
          </form>
        </div>

        <aside className="bento-card contact-details-card" aria-labelledby="contact-options-title">
          <div>
            <p className="contact-card-kicker">Direct options</p>
            <h3 id="contact-options-title">Choose the contact option that works best.</h3>
            <p className="contact-details-copy">
              Send the form for project details, use WhatsApp for quick questions, or connect through social links to view more work before reaching out.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            {...getExternalLinkProps(WHATSAPP_URL)}
            className="whatsapp-cta-btn"
            aria-label="Chat on WhatsApp with AningDesign"
          >
            <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
            Chat on WhatsApp
          </a>

          <div className="contact-method-card">
            <span>Email</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="contact-method-card">
            <span>Response time</span>
            <p>Send your project details and I will respond with the next steps. <br />For quick questions, WhatsApp is the fastest option.</p>
          </div>

          <div className="contact-social-block">
            <p>Connect</p>
            <div className="contact-social-links">
              {contactSocialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...getExternalLinkProps(link.href)}
                  aria-label={`Open ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Contact
