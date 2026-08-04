import { useState } from 'react'
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import HomepageSectionHeading from './HomepageSectionHeading'
import './Contact.css'
import { getExternalLinkProps } from '../utils/links'
import {
  XLogoIcon,
  LinkedInLogoIcon,
  BehanceLogoIcon,
  YoutubeLogoIcon,
  GithubLogoIcon,
  TelegramLogoIcon
} from './SocialIcons'

const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const THANK_YOU_URL = 'https://www.aningdesign.com/thank-you'
const CONTACT_EMAIL = 'aningemma1@gmail.com'
const WHATSAPP_URL = 'https://wa.me/233557066467?text=Hi Emmanuel, I am interested in working with you on a project.'

const projectFitItems = [
  'A new business or professional website',
  'A redesign for an outdated or underperforming website',
  'A WordPress website your team can manage',
  'A dashboard, portal or early-stage web product',
  'Design and development handled as one connected process'
]

const contactSocialLinks = [
  { label: 'X', href: 'https://x.com/Aningdesigns', icon: XLogoIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310', icon: LinkedInLogoIcon },
  { label: 'Behance', href: 'https://www.behance.net/emmaaning', icon: BehanceLogoIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg', icon: YoutubeLogoIcon },
  { label: 'GitHub', href: 'https://github.com/ixEmma', icon: GithubLogoIcon },
  { label: 'Telegram', href: 'https://t.me/AningDzn', icon: TelegramLogoIcon }
]

function HomepageContactSupport() {
  return (
    <aside className="bento-card contact-details-card home-contact__support" aria-labelledby="project-fit-title">
      <div>
        <p className="contact-card-kicker type-eyebrow">Project fit</p>
        <h3 className="type-h3" id="project-fit-title">A good fit when you need</h3>
      </div>

      <ul className="home-contact__fit-list">
        {projectFitItems.map((item) => (
          <li className="type-body" key={item}>
            <CheckCircle2 size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="home-contact__alternative">
        <p className="type-body">Prefer a direct conversation?</p>
        <a
          href={WHATSAPP_URL}
          {...getExternalLinkProps(WHATSAPP_URL)}
          className="aning-button aning-button--text"
          aria-label="Send a direct WhatsApp message to AningDesign"
        >
          <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Send a Direct Message</span>
        </a>
      </div>

      <p className="home-contact__expectation type-small">
        You will receive a clear response about project fit, scope and the recommended next step.
      </p>
    </aside>
  )
}

function ContactPageSupport() {
  return (
    <aside className="bento-card contact-details-card" aria-labelledby="contact-options-title">
      <div>
        <p className="contact-card-kicker type-eyebrow">Direct options</p>
        <h3 className="type-h3" id="contact-options-title">Choose the contact option that works best.</h3>
        <p className="contact-details-copy type-body">
          Send the form for project details, use WhatsApp for quick questions, or connect through social links to view more work before reaching out.
        </p>
      </div>

      <a
        href={WHATSAPP_URL}
        {...getExternalLinkProps(WHATSAPP_URL)}
        className="aning-button aning-button--primary whatsapp-cta-btn"
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

      <div className="contact-social-block">
        <p>Connect</p>
        <div className="contact-social-links">
          {contactSocialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...getExternalLinkProps(href)}
              aria-label={`Open ${label}`}
            >
              <Icon />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Contact({ showIntroCta = true, pageMode = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', text: '' })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setSubmitState({ type: 'success', text: 'Sending your enquiry securely...' })
  }

  return (
    <section
      className={`contact-section ${pageMode ? 'contact-section--page' : 'contact-section--home'}`}
      id="contact"
      aria-labelledby={showIntroCta ? 'home-contact-title' : undefined}
    >
      {showIntroCta && (
        <HomepageSectionHeading
          className="home-contact__heading"
          description="Share what you are building, what is currently not working and the result you need. I’ll review the details and recommend the most practical next step."
          eyebrow="Start a project"
          title="Have a website or digital product that needs a clearer direction?"
          titleId="home-contact-title"
        />
      )}

      <div className="contact-bento-container">
        <div className="bento-card contact-form-card">
          <p className="contact-card-kicker type-eyebrow">{pageMode ? 'Contact' : 'Project enquiry'}</p>
          {pageMode ? (
            <h2 className="type-h2">Send message</h2>
          ) : (
            <h3 className="type-h3">Tell me about the project</h3>
          )}
          <p className="contact-description type-body">
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
              <label className="type-small" htmlFor="name">Full name</label>
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
              <label className="type-small" htmlFor="email">Email</label>
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
              <label className="type-small" htmlFor="company">
                {pageMode ? 'Company or brand name' : 'Business or project name'}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder={pageMode ? 'Your company, brand, or project' : 'Your business, brand, or project'}
                autoComplete="organization"
              />
            </div>

            <div className="form-group">
              <label className="type-small" htmlFor="projectType">Project type</label>
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
              <label className="type-small" htmlFor="message">{pageMode ? 'Message' : 'Project summary'}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder={pageMode ? 'Tell me about your project...' : 'What are you building, what is not working, and what result do you need?'}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="aning-button aning-button--primary form-submit-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : pageMode ? 'Send message' : 'Send Project Enquiry'}</span>
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            {submitState.text && (
              <p className={`contact-form-status ${submitState.type} type-small`} aria-live="polite">
                {submitState.text}
              </p>
            )}
          </form>
        </div>

        {pageMode ? <ContactPageSupport /> : <HomepageContactSupport />}
      </div>
    </section>
  )
}

export default Contact
