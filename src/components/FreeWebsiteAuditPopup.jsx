import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './FreeWebsiteAuditPopup.css'

const DISMISSAL_KEY = 'aningdesign-free-website-audit-popup'
const DISMISSAL_DAYS = 7
const CTA_SUPPRESSION_DAYS = 30

const getTriggerConfig = (pathname) => {
  if (pathname === '/') return { delay: 50000, scrollDepth: 0.45 }
  if (pathname.startsWith('/services')) return { scrollDepth: 0.42 }
  if (pathname.startsWith('/blog/')) return { scrollDepth: 0.6 }

  return null
}

const isSuppressed = () => {
  try {
    const storedValue = window.localStorage.getItem(DISMISSAL_KEY)
    const { until } = storedValue ? JSON.parse(storedValue) : {}

    return Number.isFinite(until) && until > Date.now()
  } catch {
    return false
  }
}

const suppressPopup = (days) => {
  try {
    window.localStorage.setItem(DISMISSAL_KEY, JSON.stringify({ until: Date.now() + days * 24 * 60 * 60 * 1000 }))
  } catch {
    // The campaign remains functional when browser storage is unavailable.
  }
}

function FreeWebsiteAuditPopup({ pathname }) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const triggerConfig = getTriggerConfig(pathname)

  const dismissPopup = useCallback(() => {
    suppressPopup(DISMISSAL_DAYS)
    setIsOpen(false)
  }, [])

  const handleAuditClick = useCallback(() => {
    suppressPopup(CTA_SUPPRESSION_DAYS)
    setIsOpen(false)
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
      if (scrollableHeight <= 0) return

      if (window.scrollY / scrollableHeight >= triggerConfig.scrollDepth) {
        showPopup()
      }
    }

    if (triggerConfig.delay) {
      delayId = window.setTimeout(showPopup, triggerConfig.delay)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.clearTimeout(delayId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

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
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismissPopup()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )

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

  return createPortal(
    <div className="free-audit-popup" onMouseDown={dismissPopup}>
      <section
        ref={dialogRef}
        className="free-audit-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="free-audit-popup-title"
        aria-describedby="free-audit-popup-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="free-audit-popup__close"
          aria-label="Close free website audit popup"
          onClick={dismissPopup}
        >
          <X size={20} strokeWidth={2.2} aria-hidden="true" />
        </button>

        <div className="free-audit-popup__content">
          <div className="free-audit-popup__copy">
            <p className="free-audit-popup__eyebrow type-eyebrow">Free Website Audit</p>
            <h2 id="free-audit-popup-title" className="free-audit-popup__title type-h2">Not sure what your website needs next?</h2>
            <p id="free-audit-popup-description" className="free-audit-popup__description type-body">Get a focused review of your website's clarity, mobile experience, usability and conversion opportunities.</p>

            <ul className="free-audit-popup__proof" aria-label="Audit review areas">
              {['Website clarity', 'Mobile experience', 'Conversion opportunities'].map((item) => (
                <li key={item} className="type-small"><Check size={16} strokeWidth={2.5} aria-hidden="true" />{item}</li>
              ))}
            </ul>

            <div className="free-audit-popup__actions">
              <SiteLink href="/free-website-audit" className="aning-button aning-button--primary" onClick={handleAuditClick}>
                Request My Free Audit
                <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
              </SiteLink>
              <button type="button" className="free-audit-popup__later type-small" onClick={dismissPopup}>Maybe later</button>
            </div>
          </div>

          <aside className="free-audit-popup__preview" aria-label="Website audit preview">
            <p className="free-audit-popup__preview-label type-eyebrow">Focused review</p>
            <div className="free-audit-popup__preview-card">
              <div className="free-audit-popup__preview-bar"><span></span><span></span><span></span></div>
              <div className="free-audit-popup__preview-line free-audit-popup__preview-line--wide"></div>
              <div className="free-audit-popup__preview-line"></div>
              <div className="free-audit-popup__preview-grid">
                <span>Clarity</span><span>Mobile</span><span>Conversion</span>
              </div>
            </div>
            <blockquote className="free-audit-popup__quote type-body-large">&quot;Clear, practical feedback before investing in a redesign.&quot;</blockquote>
          </aside>
        </div>
      </section>
    </div>,
    document.body
  )
}

export default FreeWebsiteAuditPopup
