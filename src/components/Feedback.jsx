import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle } from 'lucide-react'
import './Feedback.css'

const FEEDBACK_SUBMIT_ENDPOINT = 'https://formsubmit.co/aningemma1@gmail.com'
const FEEDBACK_AJAX_ENDPOINT = 'https://formsubmit.co/ajax/aningemma1@gmail.com'
const THANK_YOU_URL = 'https://aningdesign.com/thank-you'

function FeedbackButton({ onClick, isOpen }) {
  return (
    <button
      type="button"
      className="feedback-floating-button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={isOpen ? 'feedback-dialog' : undefined}
      aria-label="Send feedback"
      title="Send feedback"
    >
      <MessageCircle size={21} strokeWidth={2.3} aria-hidden="true" />
    </button>
  )
}

function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', text: '' })
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    const openFeedback = () => setIsOpen(true)
    window.addEventListener('open-feedback', openFeedback)

    return () => {
      window.removeEventListener('open-feedback', openFeedback)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const dialog = document.getElementById('feedback-dialog')
      const focusable = dialog?.querySelectorAll(
        'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )

      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleDialogKeyDown)

    return () => {
      window.removeEventListener('keydown', handleDialogKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousBodyStyles = {
      left: document.body.style.left,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      right: document.body.style.right,
      top: document.body.style.top,
      width: document.body.style.width
    }

    document.body.classList.add('modal-open')
    document.body.style.left = '0'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.right = '0'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.left = previousBodyStyles.left
      document.body.style.overflow = previousBodyStyles.overflow
      document.body.style.paddingRight = previousBodyStyles.paddingRight
      document.body.style.position = previousBodyStyles.position
      document.body.style.right = previousBodyStyles.right
      document.body.style.top = previousBodyStyles.top
      document.body.style.width = previousBodyStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      previousFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!message.trim()) {
      setSubmitState({ type: 'error', text: 'Please enter feedback before sending.' })
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: '', text: '' })

    try {
      const formData = new FormData(form)
      formData.set('message', message.trim())

      const response = await fetch(FEEDBACK_AJAX_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitState({ type: 'success', text: 'Thanks. Your feedback was sent.' })
      setMessage('')
    } catch (error) {
      setSubmitState({ type: '', text: '' })
      form.submit()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <section className="feedback-layer" id="feedback" aria-label="Feedback">
      <FeedbackButton onClick={() => setIsOpen((open) => !open)} isOpen={isOpen} />
      {isOpen && (
        <div className="feedback-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div
            id="feedback-dialog"
            className="feedback-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="feedback-head">
              <div className="feedback-icon-wrap" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="feedback-copy">
                <h2 id="feedback-title">We Value Your Feedback</h2>
                <p>We&apos;d love to hear your thoughts.</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="feedback-close"
                aria-label="Close feedback"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form action={FEEDBACK_SUBMIT_ENDPOINT} method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New Website Feedback" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={THANK_YOU_URL} />
              <input
                type="text"
                name="_honey"
                className="feedback-honeypot"
                tabIndex={-1}
                autoComplete="off"
              />
              <label htmlFor="feedback-input" className="feedback-label">
                Your feedback
              </label>
              <textarea
                id="feedback-input"
                name="message"
                className="feedback-input"
                placeholder="Tell us what you think..."
                rows="4"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />

              <button type="submit" className="feedback-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send feedback'}
              </button>
              {submitState.text && (
                <p className={`feedback-status ${submitState.type}`}>{submitState.text}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>,
    document.body
  )
}

export default Feedback
