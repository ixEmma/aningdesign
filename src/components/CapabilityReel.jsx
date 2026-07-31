import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './CapabilityReel.css'

const capabilities = [
  'Shape digital strategy',
  'Design conversion paths',
  'Build WordPress websites',
  'Develop web applications',
  'Launch digital products',
  'Improve website performance',
  'Create scalable design systems',
  'Support long-term growth'
]

const middleStart = capabilities.length
const finalStart = capabilities.length * 2
const loopedCapabilities = [...capabilities, ...capabilities, ...capabilities]
const transitionDuration = 650
const rotationInterval = 1900

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  ))

  useEffect(() => {
    const media = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    setMatches(media.matches)
    media.addEventListener('change', handleChange)

    return () => media.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => (
    typeof document === 'undefined' || document.visibilityState !== 'hidden'
  ))

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState !== 'hidden')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

function getOpacity(distance) {
  if (distance === 0) return 1
  if (distance === 1) return 0.45
  if (distance === 2) return 0.3
  if (distance === 3) return 0.18
  return 0.1
}

function CapabilityReel() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isCompact = useMediaQuery('(max-width: 900px)')
  const isPageVisible = usePageVisibility()
  const [activeIndex, setActiveIndex] = useState(middleStart)
  const [transitionEnabled, setTransitionEnabled] = useState(!prefersReducedMotion)
  const [rowHeight, setRowHeight] = useState(62)
  const rowRef = useRef(null)
  const resetTimeoutRef = useRef(null)
  const frameRef = useRef(null)

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return undefined

    const updateRowHeight = () => {
      const nextRowHeight = row.getBoundingClientRect().height
      setRowHeight((currentRowHeight) => (
        currentRowHeight === nextRowHeight ? currentRowHeight : nextRowHeight
      ))
    }

    updateRowHeight()
    const resizeObserver = new ResizeObserver(updateRowHeight)
    resizeObserver.observe(row)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      window.clearTimeout(resetTimeoutRef.current)
      window.cancelAnimationFrame(frameRef.current)
      setTransitionEnabled(false)
      setActiveIndex(middleStart)
      return undefined
    }

    if (!isPageVisible) return undefined

    setTransitionEnabled(true)
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => current + 1)
    }, rotationInterval)

    return () => window.clearInterval(intervalId)
  }, [isPageVisible, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || activeIndex !== finalStart) return undefined

    resetTimeoutRef.current = window.setTimeout(() => {
      setTransitionEnabled(false)
      setActiveIndex(middleStart)
      frameRef.current = window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    }, transitionDuration)

    return () => {
      window.clearTimeout(resetTimeoutRef.current)
    }
  }, [activeIndex, prefersReducedMotion])

  useEffect(() => () => {
    window.clearTimeout(resetTimeoutRef.current)
    window.cancelAnimationFrame(frameRef.current)
  }, [])

  const centreRow = isCompact ? 1 : 3
  const offset = -(activeIndex - centreRow) * rowHeight

  return (
    <section className="capability-reel" aria-labelledby="capability-reel-title">
      <h2 className="sr-only" id="capability-reel-title">AningDesign capabilities</h2>
      <ul className="sr-only">
        {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
      </ul>

      <div className="capability-reel__viewport" aria-hidden="true">
        <div
          className={`capability-reel__track${transitionEnabled ? ' is-moving' : ''}`}
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          {loopedCapabilities.map((capability, index) => {
            const distance = Math.abs(index - activeIndex)
            const isActive = distance === 0

            return (
              <div
                className={`capability-reel__row${isActive ? ' is-active' : ''}`}
                key={`${capability}-${index}`}
                ref={index === 0 ? rowRef : null}
                style={{ opacity: getOpacity(distance) }}
              >
                <ArrowRight className="capability-reel__marker" size={25} strokeWidth={2.2} />
                <span>{capability}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CapabilityReel
