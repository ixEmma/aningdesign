import { useEffect, useState, useRef } from 'react'
import './Preloader.css'

function Preloader() {
  const [isHidden, setIsHidden] = useState(false)
  const [shouldRemove, setShouldRemove] = useState(false)
  const hideTimeoutRef = useRef(null)
  const removeTimeoutRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const hidePreloader = () => {
      setIsHidden(true)
      removeTimeoutRef.current = setTimeout(() => {
        setShouldRemove(true)
      }, prefersReducedMotion ? 0 : 300)
    }

    hideTimeoutRef.current = setTimeout(hidePreloader, prefersReducedMotion ? 0 : 250)

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      if (removeTimeoutRef.current) {
        clearTimeout(removeTimeoutRef.current)
      }
    }
  }, [])

  if (shouldRemove) return null

  return (
    <div id="preloader" className={isHidden ? 'hidden' : ''} aria-hidden="true">
      <div className="spinner" role="status" aria-label="Loading"></div>
    </div>
  )
}

export default Preloader

