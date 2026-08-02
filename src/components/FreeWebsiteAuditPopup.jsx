import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import './FreeWebsiteAuditPopup.css'

const DISMISSAL_KEY = 'aningdesign-free-website-audit-popup'
const DISMISSAL_DAYS = 7
const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const FORM_AJAX_ENDPOINT = 'https://formsubmit.co/ajax/aningemma1@gmail.com'
const concerns = ['Outdated design', 'Slow website', 'Poor mobile experience', 'Not getting enquiries', 'Unclear content', 'Considering a redesign', 'Not sure']

const getTriggerConfig = (pathname) => {
  if (pathname === '/') return { delay: 50000, scrollDepth: 0.45 }
  if (pathname.startsWith('/services')) return { scrollDepth: 0.42 }
  if (pathname.startsWith('/blog/')) return { scrollDepth: 0.6 }

  return null
}

const isSuppressed = () => {
  try {
    const storedValue = window.localStorage.getItem(DISMISSAL_KEY)
    const { submitted, until } = storedValue ? JSON.parse(storedValue) : {}

    return submitted === true || (Number.isFinite(until) && until > Date.now())
  } catch {
    return false
  }
}

const suppressPopup = (days, submitted = false) => {
  try {
    window.localStorage.setItem(DISMISSAL_KEY, JSON.stringify({ submitted, until: submitted ? null : Date.now() + days * 24 * 60 * 60 * 1000 }))
  } catch {
    // The campaign remains functional when browser storage is unavailable.
  }
}

const normalizeWebsiteUrl = (value) => {
  const trimmedValue = value.trim()
  if (!trimmedValue) return ''

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`

  try {
    const url = new URL(candidate)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

function FreeWebsiteAuditPopup({ pathname }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('intro')
  const [formData, setFormData] = useState({ websiteUrl: '', mainConcern: '', notes: '', name: '', email: '', whatsapp: '', business: '', consent: false })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' })
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const stepHeadingRef = useRef(null)
  const previousFocusRef = useRef(null)
  const triggerConfig = useMemo(() => getTriggerConfig(pathname), [pathname])

  const dismissPopup = useCallback(() => {
    if (step !== 'success') suppressPopup(DISMISSAL_DAYS)
    setIsOpen(false)
  }, [step])

  const closeAfterSuccess = useCallback(() => {
    setIsOpen(false)
  }, [])

  const updateField = (field, value) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }))
    setSubmitError('')
  }

  const validateWebsiteDetails = () => {
    const normalizedUrl = normalizeWebsiteUrl(formData.websiteUrl)

    if (!normalizedUrl) {
      setErrors({ websiteUrl: 'Enter a valid website address.' })
      return false
    }

    setFormData((currentData) => ({ ...currentData, websiteUrl: normalizedUrl }))
    setErrors({})
    return true
  }

  const validateContactDetails = () => {
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (!formData.consent) nextErrors.consent = 'Consent is required to send your request.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const continueToContact = (event) => {
    event.preventDefault()
    if (validateWebsiteDetails()) setStep('contact')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateContactDetails()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const submittedData = new FormData(event.currentTarget)
      submittedData.set('websiteUrl', normalizeWebsiteUrl(formData.websiteUrl))
      submittedData.set('name', formData.name.trim())
      submittedData.set('email', formData.email.trim())
      submittedData.set('source', 'website-audit-popup')
      submittedData.set('source_page', 'website-audit-popup')
      submittedData.set('submitted_at', new Date().toISOString())

      const response = await fetch(FORM_AJAX_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: submittedData
      })

      if (!response.ok) throw new Error('Submission failed')

      suppressPopup(0, true)
      setStep('success')
    } catch {
      setSubmitError('Something went wrong while sending your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtm({ source: params.get('utm_source') || '', medium: params.get('utm_medium') || '', campaign: params.get('utm_campaign') || '' })
  }, [])

  useEffect(() => {
    if (!triggerConfig || isSuppressed()) return undefined

    let hasTriggered = false
    let delayId

    const showPopup = () => {
      if (hasTriggered || isSuppressed()) return
      hasTriggered = true
      setIsOpen(true)
    }

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableHeight > 0 && window.scrollY / scrollableHeight >= triggerConfig.scrollDepth) showPopup()
    }

    if (triggerConfig.delay) delayId = window.setTimeout(showPopup, triggerConfig.delay)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.clearTimeout(delayId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname, triggerConfig])

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.classList.add('free-website-audit-popup-open')

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.classList.remove('free-website-audit-popup-open')
      previousFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || step === 'intro') return undefined

    const focusTimer = window.setTimeout(() => {
      stepHeadingRef.current?.focus({ preventScroll: true })
    }, 0)

    return () => window.clearTimeout(focusTimer)
  }, [isOpen, step])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismissPopup()
        return
      }

      if (event.key !== 'Tab') return
      const focusableElements = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dismissPopup, isOpen])

  if (!triggerConfig || !isOpen || typeof document === 'undefined') return null

  const isIntro = step === 'intro'
  const isWebsiteStep = step === 'website'
  const isSuccess = step === 'success'
  const title = isIntro ? 'Not sure what your website needs next?' : isWebsiteStep ? 'Tell me about your website.' : isSuccess ? 'Your website audit request is in.' : 'Where should I send the audit?'
  const descriptionId = isIntro ? 'free-audit-popup-description' : isSuccess ? 'free-audit-popup-success-description' : undefined

  return createPortal(
    <div className="free-audit-popup" onMouseDown={dismissPopup}>
      <section ref={dialogRef} className="free-audit-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="free-audit-popup-title" aria-describedby={descriptionId} onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} type="button" className="free-audit-popup__close" aria-label="Close free website audit popup" onClick={dismissPopup}>
          <X size={20} strokeWidth={2.2} aria-hidden="true" />
        </button>

        <div className="free-audit-popup__content">
          <div className={`free-audit-popup__copy${isIntro ? '' : ' free-audit-popup__copy--form'}`}>
            {isIntro ? (
              <>
                <p className="free-audit-popup__eyebrow type-eyebrow">Free Website Audit</p>
                <h2 id="free-audit-popup-title" className="free-audit-popup__title type-h2">{title}</h2>
                <p id="free-audit-popup-description" className="free-audit-popup__description type-body">Get a focused review of your website&apos;s clarity, mobile experience, usability and conversion opportunities.</p>
                <ul className="free-audit-popup__proof" aria-label="Audit review areas">
                  {['Website clarity', 'Mobile experience', 'Conversion opportunities'].map((item) => <li key={item} className="type-small"><Check size={16} strokeWidth={2.5} aria-hidden="true" />{item}</li>)}
                </ul>
                <div className="free-audit-popup__actions">
                  <button type="button" className="aning-button aning-button--primary" onClick={() => setStep('website')}>Request My Free Audit <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" /></button>
                  <button type="button" className="free-audit-popup__later type-small" onClick={dismissPopup}>Maybe later</button>
                </div>
              </>
            ) : isSuccess ? (
              <div className="free-audit-popup__success">
                <p className="free-audit-popup__eyebrow type-eyebrow">Request Received</p>
                <h2 ref={stepHeadingRef} id="free-audit-popup-title" tabIndex="-1" className="free-audit-popup__title type-h2">{title}</h2>
                <p id="free-audit-popup-success-description" className="free-audit-popup__description type-body">I&apos;ll review the information you submitted and contact you using the details provided.</p>
                <button type="button" className="aning-button aning-button--primary" onClick={closeAfterSuccess}>Done</button>
              </div>
            ) : (
              <form className="free-audit-popup__form" action={FORM_SUBMIT_ENDPOINT} method="POST" onSubmit={isWebsiteStep ? continueToContact : handleSubmit} noValidate>
                <input type="hidden" name="_subject" value="Free Website Audit Request" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="requestType" value="Free Website Audit" />
                <input type="hidden" name="utm_source" value={utm.source} />
                <input type="hidden" name="utm_medium" value={utm.medium} />
                <input type="hidden" name="utm_campaign" value={utm.campaign} />
                <input type="text" name="_honey" className="contact-honeypot" tabIndex={-1} autoComplete="off" />
                <p className="free-audit-popup__progress type-eyebrow">Step {isWebsiteStep ? '1' : '2'} of 2</p>
                <h2 ref={stepHeadingRef} id="free-audit-popup-title" tabIndex="-1" className="free-audit-popup__title type-h2">{title}</h2>

                {isWebsiteStep ? (
                  <>
                    <div className="free-audit-popup__field">
                      <label className="type-small" htmlFor="popup-audit-url">Website URL</label>
                      <input id="popup-audit-url" name="websiteUrl" type="text" inputMode="url" autoComplete="url" placeholder="yourwebsite.com" value={formData.websiteUrl} onChange={(event) => updateField('websiteUrl', event.target.value)} onBlur={() => { const normalizedUrl = normalizeWebsiteUrl(formData.websiteUrl); if (normalizedUrl) updateField('websiteUrl', normalizedUrl) }} aria-invalid={Boolean(errors.websiteUrl)} aria-describedby={errors.websiteUrl ? 'popup-audit-url-error' : undefined} />
                      {errors.websiteUrl && <p id="popup-audit-url-error" className="free-audit-popup__error type-small" role="alert">{errors.websiteUrl}</p>}
                    </div>
                    <fieldset className="free-audit-popup__concerns">
                      <legend className="type-small">What would you most like help with?</legend>
                      <div>
                        {concerns.map((concern) => <label key={concern} className={formData.mainConcern === concern ? 'is-selected' : ''}><input type="radio" name="mainConcern" value={concern} checked={formData.mainConcern === concern} onChange={() => updateField('mainConcern', concern)} /><span>{concern}</span></label>)}
                      </div>
                    </fieldset>
                    <div className="free-audit-popup__field">
                      <label className="type-small" htmlFor="popup-audit-notes">Anything else I should know? <span>(optional)</span></label>
                      <textarea id="popup-audit-notes" name="additionalNotes" rows="3" value={formData.notes} onChange={(event) => updateField('notes', event.target.value)} />
                    </div>
                    <div className="free-audit-popup__form-actions"><button type="submit" className="aning-button aning-button--primary">Continue <ArrowRight size={17} aria-hidden="true" /></button><button type="button" className="free-audit-popup__later type-small" onClick={() => setStep('intro')}>Back</button></div>
                  </>
                ) : (
                  <>
                    <div className="free-audit-popup__field"><label className="type-small" htmlFor="popup-audit-name">Full name</label><input id="popup-audit-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'popup-audit-name-error' : undefined} />{errors.name && <p id="popup-audit-name-error" className="free-audit-popup__error type-small" role="alert">{errors.name}</p>}</div>
                    <div className="free-audit-popup__field"><label className="type-small" htmlFor="popup-audit-email">Email</label><input id="popup-audit-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'popup-audit-email-error' : undefined} />{errors.email && <p id="popup-audit-email-error" className="free-audit-popup__error type-small" role="alert">{errors.email}</p>}</div>
                    <div className="free-audit-popup__field"><label className="type-small" htmlFor="popup-audit-whatsapp">WhatsApp number <span>(optional)</span></label><input id="popup-audit-whatsapp" name="whatsapp" type="tel" autoComplete="tel" value={formData.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} /></div>
                    <div className="free-audit-popup__field"><label className="type-small" htmlFor="popup-audit-business">Business or project name <span>(optional)</span></label><input id="popup-audit-business" name="business" type="text" autoComplete="organization" value={formData.business} onChange={(event) => updateField('business', event.target.value)} /></div>
                    <label className="free-audit-popup__consent"><input name="consent" type="checkbox" checked={formData.consent} onChange={(event) => updateField('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'popup-audit-consent-error' : undefined} /><span>I agree to be contacted about this request.</span></label>
                    {errors.consent && <p id="popup-audit-consent-error" className="free-audit-popup__error type-small" role="alert">{errors.consent}</p>}
                    {submitError && <p className="free-audit-popup__error type-small" role="alert">{submitError}</p>}
                    <div className="free-audit-popup__form-actions"><button type="submit" className="aning-button aning-button--primary" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Request My Free Audit'} <ArrowRight size={17} aria-hidden="true" /></button><button type="button" className="free-audit-popup__later type-small" onClick={() => setStep('website')} disabled={isSubmitting}>Back</button></div>
                  </>
                )}
              </form>
            )}
          </div>

          <aside className="free-audit-popup__preview" aria-label="Website audit preview">
            <p className="free-audit-popup__preview-label type-eyebrow">Focused review</p>
            <div className="free-audit-popup__preview-card"><div className="free-audit-popup__preview-bar"><span></span><span></span><span></span></div><div className="free-audit-popup__preview-line free-audit-popup__preview-line--wide"></div><div className="free-audit-popup__preview-line"></div><div className="free-audit-popup__preview-grid"><span>Clarity</span><span>Mobile</span><span>Conversion</span></div></div>
            <blockquote className="free-audit-popup__quote type-body-large">&quot;Clear, practical feedback before investing in a redesign.&quot;</blockquote>
          </aside>
        </div>
      </section>
    </div>,
    document.body
  )
}

export default FreeWebsiteAuditPopup
