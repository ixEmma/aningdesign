import { useState } from 'react'
import './Feedback.css'

function FeedbackButton({ onClick }) {
  return (
    <div className="feedback-trigger-wrap">
      <button type="button" className="feedback-trigger" onClick={onClick}>
        Feedback
      </button>
    </div>
  )
}

function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', text: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!message.trim()) {
      setSubmitState({ type: 'error', text: 'Please enter feedback before sending.' })
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: '', text: '' })

    try {
      const formData = new FormData()
      formData.append('message', message.trim())
      formData.append('_subject', 'New Website Feedback')
      formData.append('_captcha', 'false')

      const response = await fetch('https://formsubmit.co/ajax/aningemma1@gmail.com', {
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
      setSubmitState({ type: 'error', text: 'Could not send feedback. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <section className="feedback-section" id="feedback">
        <FeedbackButton onClick={() => setIsOpen(true)} />
      </section>
    )
  }

  return (
    <section className="feedback-section" id="feedback">
      <div className="feedback-card">
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
            <h2>We Value Your Feedback</h2>
            <p>We&apos;d love to hear your thoughts.</p>
          </div>
          <button
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

        <form onSubmit={handleSubmit}>
          <label htmlFor="feedback-input" className="feedback-label">
            Your feedback
          </label>
          <textarea
            id="feedback-input"
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
    </section>
  )
}

export default Feedback
