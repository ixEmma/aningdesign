import { useEffect, useRef, useState } from 'react'
import { Check, Clipboard, TriangleAlert } from 'lucide-react'
import './PromptBlock.css'

function PromptBlock({ title = 'Copy-ready prompt', promptText, bestFor = '' }) {
  const [copyState, setCopyState] = useState('idle')
  const resetTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), [])

  const copyPrompt = async () => {
    window.clearTimeout(resetTimerRef.current)

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(promptText.trim())
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    resetTimerRef.current = window.setTimeout(() => setCopyState('idle'), 2400)
  }

  const buttonLabel = copyState === 'copied'
    ? 'Copied'
    : copyState === 'error'
      ? 'Copy failed'
      : 'Copy prompt'
  const ButtonIcon = copyState === 'copied' ? Check : copyState === 'error' ? TriangleAlert : Clipboard

  return (
    <section className="prompt-block" aria-label={title}>
      <header className="prompt-block__header">
        <div>
          <p>Free prompt</p>
          <h3>{title}</h3>
        </div>
        <button type="button" onClick={copyPrompt} className={`prompt-block__copy prompt-block__copy--${copyState}`}>
          <ButtonIcon size={16} strokeWidth={2.2} aria-hidden="true" />
          {buttonLabel}
        </button>
      </header>
      {bestFor && <p className="prompt-block__best-for"><strong>Best for:</strong> {bestFor}</p>}
      <pre className="prompt-block__content"><code>{promptText.trim()}</code></pre>
      <p className="sr-only" role={copyState === 'error' ? 'alert' : 'status'} aria-live="polite">
        {copyState === 'copied' ? 'Prompt copied to clipboard.' : copyState === 'error' ? 'Prompt could not be copied. Select the prompt text and copy it manually.' : ''}
      </p>
    </section>
  )
}

export default PromptBlock
