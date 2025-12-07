import { useEffect, useState, useRef } from 'react'

function Preloader() {
  const [isHidden, setIsHidden] = useState(false)
  const [shouldRemove, setShouldRemove] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleLoad = () => {
      setIsHidden(true)
      timeoutRef.current = setTimeout(() => {
        setShouldRemove(true)
      }, 350)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
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

