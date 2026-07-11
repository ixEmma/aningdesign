import Contact from '../components/Contact'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'
import './ContactPage.css'

function ContactPage() {
  useSeo({
    title: 'Contact AningDesign | Start a Website or Design Project',
    description:
      'Contact AningDesign to start a website, branding, graphic design, UI/UX, or startup web project with Emmanuel Aning.',
    canonical: `${getDomain()}/contact`,
    keywords: 'contact AningDesign, start a website project, hire web designer Ghana, design project inquiry',
    type: 'website'
  })

  return (
    <main className="contact-route-page">
      <section className="contact-route-hero" aria-labelledby="contact-route-title">
        <p>Contact</p>
        <h1 id="contact-route-title">Start a project or send a message</h1>
        <p>
          Tell me what you are building, what you need help with, and where you are in the process.
          I will review it and respond with the best next step.
        </p>
      </section>
      <Contact showIntroCta={false} pageMode />
    </main>
  )
}

export default ContactPage
