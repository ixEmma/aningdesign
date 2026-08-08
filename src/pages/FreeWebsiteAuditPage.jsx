import { useEffect, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SiteLink } from '../components/SiteLink'
import { featuredHomepageTestimonials } from '../data/homepageTestimonials'
import { selectedWork } from '../data/selectedWork'
import { getExternalLinkProps } from '../utils/links'
import { useSeo } from '../utils/seo'
import { getUrl } from '../utils/domain'
import './FreeWebsiteAuditPage.css'

const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const THANK_YOU_URL = 'https://www.aningdesign.com/thank-you'
const WHATSAPP_MESSAGE = 'Hi, I visited the AningDesign website audit page and would like to ask a question about my website.'
const WHATSAPP_URL = `https://wa.me/233557066467?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const auditProject = selectedWork.find((project) => project.id === 'lensora-events')
const auditTestimonial = featuredHomepageTestimonials[0]

const auditConcerns = ['The website looks outdated', 'The website is slow', 'It performs poorly on mobile', 'Visitors are not contacting us', 'The content or message is unclear', 'We are considering a complete redesign', 'I am not sure what the problem is']
const websiteTypes = ['Business website', 'Portfolio website', 'E-commerce website', 'Booking or service website', 'Educational website', 'Web application or platform', 'I am not sure yet']
const websiteGoals = ['Present the business professionally', 'Generate enquiries or leads', 'Sell products online', 'Accept bookings or appointments', 'Showcase work or services', 'Build a new digital product', 'I need help defining the goal']
const reviewItems = ['Message and credibility', 'Mobile experience', 'Performance and usability', 'Conversion opportunities']

const scrollToAuditForm = () => {
    document.getElementById('audit-request')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
    })
}

function CampaignHeader() {
    return (
        <header className="audit-header">
            <SiteLink href="/" className="audit-logo" aria-label="AningDesign main website">
                <img src="/images/LOGO-96.png" alt="" width="44" height="44" />
                <span>AningDesign</span>
            </SiteLink>
            <nav className="audit-header__actions" aria-label="Campaign navigation">
                <SiteLink href="/" className="audit-header__back">Back to Website</SiteLink>
                <button type="button" className="aning-button aning-button--primary" onClick={scrollToAuditForm}>Request Free Audit <ArrowRight size={17} aria-hidden="true" /></button>
            </nav>
        </header>
    )
}

function CampaignFooter() {
    return (
        <footer className="audit-footer">
            <span>AningDesign</span>
            <nav aria-label="Campaign footer navigation">
                <SiteLink href="/">Main Website</SiteLink>
                <span>Privacy</span>
                <SiteLink href="/contact">Contact</SiteLink>
            </nav>
        </footer>
    )
}

function AuditForm() {
    const [websiteStatus, setWebsiteStatus] = useState('existing')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setUtm({ source: params.get('utm_source') || '', medium: params.get('utm_medium') || '', campaign: params.get('utm_campaign') || '' })
    }, [])

    const isExistingWebsite = websiteStatus === 'existing'

    return (
        <form className="audit-form" action={FORM_SUBMIT_ENDPOINT} method="POST" onSubmit={() => setIsSubmitting(true)}>
            <input type="hidden" name="_subject" value={isExistingWebsite ? 'Free Website Audit Request' : 'New Website Consultation Request'} />
            <input type="hidden" name="_next" value={THANK_YOU_URL} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="requestType" value={isExistingWebsite ? 'Free Website Audit' : 'New Website Consultation'} />
            <input type="hidden" name="websiteStatus" value={isExistingWebsite ? 'Yes, I have a website' : 'No, I need a new website'} />
            <input type="hidden" name="utm_source" value={utm.source} />
            <input type="hidden" name="utm_medium" value={utm.medium} />
            <input type="hidden" name="utm_campaign" value={utm.campaign} />
            <input type="text" name="_honey" className="contact-honeypot" tabIndex={-1} autoComplete="off" />

            <fieldset className="audit-form__status">
                <legend className="type-small">Do you currently have a website?</legend>
                <div className="audit-status-options">
                    <label className={isExistingWebsite ? 'is-selected' : ''}><input type="radio" name="websiteStatusChoice" value="existing" checked={isExistingWebsite} onChange={() => setWebsiteStatus('existing')} /><span>Yes, I have a website</span></label>
                    <label className={!isExistingWebsite ? 'is-selected' : ''}><input type="radio" name="websiteStatusChoice" value="new" checked={!isExistingWebsite} onChange={() => setWebsiteStatus('new')} /><span>No, I need a new website</span></label>
                </div>
            </fieldset>

            <div className="audit-form__grid">
                <div className="form-group"><label className="type-small" htmlFor="audit-name">Full name</label><input id="audit-name" name="name" type="text" autoComplete="name" required /></div>
                <div className="form-group"><label className="type-small" htmlFor="audit-business">Business or project name</label><input id="audit-business" name="business" type="text" autoComplete="organization" required /></div>
                <div className="form-group"><label className="type-small" htmlFor="audit-email">Email address</label><input id="audit-email" name="email" type="email" autoComplete="email" required /></div>
                <div className="form-group"><label className="type-small" htmlFor="audit-whatsapp">WhatsApp number</label><input id="audit-whatsapp" name="whatsapp" type="tel" autoComplete="tel" required /></div>
            </div>

            {isExistingWebsite ? (
                <div className="audit-form__conditional" aria-live="polite">
                    <div className="form-group"><label className="type-small" htmlFor="audit-url">Website URL</label><input id="audit-url" name="websiteUrl" type="url" placeholder="https://" required /></div>
                    <div className="form-group"><label className="type-small" htmlFor="audit-concern">Main website concern</label><select id="audit-concern" name="mainConcern" defaultValue="" required><option value="" disabled>Select the main concern</option>{auditConcerns.map((item) => <option key={item}>{item}</option>)}</select></div>
                    <div className="form-group"><label className="type-small" htmlFor="audit-notes">Anything else I should know? <span>(optional)</span></label><textarea id="audit-notes" name="additionalNotes" rows="4" /></div>
                </div>
            ) : (
                <div className="audit-form__conditional" aria-live="polite">
                    <div className="form-group"><label className="type-small" htmlFor="audit-type">Type of website needed</label><select id="audit-type" name="websiteType" defaultValue="" required><option value="" disabled>Select a website type</option>{websiteTypes.map((item) => <option key={item}>{item}</option>)}</select></div>
                    <div className="form-group"><label className="type-small" htmlFor="audit-description">Short description of the business or idea</label><textarea id="audit-description" name="businessDescription" rows="4" required /></div>
                    <div className="form-group"><label className="type-small" htmlFor="audit-goal">Main goal for the website</label><select id="audit-goal" name="mainGoal" defaultValue="" required><option value="" disabled>Select the main goal</option>{websiteGoals.map((item) => <option key={item}>{item}</option>)}</select></div>
                    <div className="form-group"><label className="type-small" htmlFor="new-audit-notes">Anything else I should know? <span>(optional)</span></label><textarea id="new-audit-notes" name="additionalNotes" rows="4" /></div>
                </div>
            )}

            <label className="audit-consent"><input type="checkbox" name="consent" required /><span>I agree to be contacted about this request.</span></label>
            <button type="submit" className="aning-button aning-button--primary audit-submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : isExistingWebsite ? 'Request My Free Audit' : 'Book a Website Consultation'} <ArrowRight size={18} aria-hidden="true" /></button>
        </form>
    )
}

function FreeWebsiteAuditPage() {
    useSeo({ title: 'Free Website Audit | AningDesign', description: 'Request a focused website audit or discuss building a new professional website with AningDesign.', canonical: getUrl('/free-website-audit'), type: 'website' })
    const selectNewWebsite = () => { scrollToAuditForm(); window.setTimeout(() => document.querySelector('input[name="websiteStatusChoice"][value="new"]')?.click(), 250) }

    return (
        <div className="audit-page">
            <CampaignHeader />
            <main>
                <section className="audit-hero" aria-labelledby="audit-title"><div className="audit-container audit-hero__inner"><div className="audit-hero__copy"><p className="type-eyebrow">FREE WEBSITE AUDIT</p><h1 id="audit-title" className="type-h1">Find out what your website needs next.</h1><p className="type-body-large">Get a focused review of your current website, or start a conversation about building a professional website from scratch.</p><div className="audit-actions"><button type="button" className="aning-button aning-button--primary aning-button--large" onClick={scrollToAuditForm}>Request a Free Website Audit <ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="aning-button aning-button--secondary aning-button--large" onClick={selectNewWebsite}>I Don’t Have a Website Yet</button></div></div><div className="audit-hero__signal" aria-hidden="true"><span>01</span><span>Review</span><span>Direction</span></div></div></section>
                <section className="audit-section audit-review" aria-labelledby="review-title"><div className="audit-container"><div className="audit-section__heading"><p className="type-eyebrow">A focused review</p><h2 id="review-title" className="type-h2">What I’ll review</h2></div><div className="audit-review__list">{reviewItems.map((item, index) => <div key={item}><span>0{index + 1}</span><h3 className="type-h3">{item}</h3></div>)}</div><p className="audit-section__note type-body">You’ll receive a concise review of the most important issues and the practical next steps worth taking.</p></div></section>
                <section className="audit-section audit-form-section" id="audit-request" aria-labelledby="form-title"><div className="audit-container"><div className="audit-section__heading"><p className="type-eyebrow">GET STARTED</p><h2 id="form-title" className="type-h2">Tell me what you currently need</h2><p className="type-body">Choose the option that best describes your situation. The form will show only the details needed for your request.</p></div><div className="audit-form-layout"><AuditForm /><aside className="audit-whatsapp"><p className="type-small">Prefer to ask a quick question?</p><a className="aning-button aning-button--text" href={WHATSAPP_URL} {...getExternalLinkProps(WHATSAPP_URL)}><MessageCircle size={18} aria-hidden="true" />Message AningDesign on WhatsApp</a></aside></div></div></section>
                <section className="audit-section audit-next" aria-labelledby="next-title"><div className="audit-container"><div className="audit-section__heading"><p className="type-eyebrow">WHAT HAPPENS NEXT</p><h2 id="next-title" className="type-h2">A clear next step, whatever your starting point.</h2></div><div className="audit-next__steps"><div><span>01</span><h3 className="type-h3">Submit your details</h3><p className="type-body">Tell me whether you already have a website and what you need help with.</p></div><div><span>02</span><h3 className="type-h3">I review the request</h3><p className="type-body">I review the website or project information and identify the most practical direction.</p></div><div><span>03</span><h3 className="type-h3">Receive the next step</h3><p className="type-body">You receive clear feedback about the audit, consultation or recommended service.</p></div></div><p className="audit-section__note type-body">You will receive confirmation after your request has been reviewed.</p></div></section>
                <section className="audit-section audit-proof" aria-labelledby="proof-title"><div className="audit-container"><div className="audit-proof__project"><p className="type-eyebrow">Selected work</p><h2 id="proof-title" className="type-h2">{auditProject.title}</h2><p className="type-body">{auditProject.showcaseIntro}</p><a className="aning-button aning-button--secondary" href={auditProject.href} {...getExternalLinkProps(auditProject.href)}>Explore the Product <ArrowRight size={17} aria-hidden="true" /></a></div><blockquote><p className="type-body-large">“{auditTestimonial.quote}”</p><cite>{auditTestimonial.name}, {auditTestimonial.role}</cite></blockquote><p className="audit-proof__line type-body">Website strategy, design and development handled as one connected process.</p></div></section>
                <section className="audit-final"><div className="audit-container"><p className="type-eyebrow">Start with the right question</p><h2 className="type-h2">Not sure whether you need an audit or a new website?</h2><p className="type-body-large">Start with the option that best matches your situation. I’ll help clarify the most practical next step.</p><div className="audit-actions"><button type="button" className="aning-button aning-button--primary" onClick={scrollToAuditForm}>Request a Free Audit <ArrowRight size={17} aria-hidden="true" /></button><button type="button" className="aning-button aning-button--secondary" onClick={selectNewWebsite}>Discuss a New Website</button></div></div></section>
            </main>
            <CampaignFooter />
        </div>
    )
}

export default FreeWebsiteAuditPage