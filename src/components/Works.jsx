import { useEffect, useRef, useState } from 'react'
import './Works.css'

function Works() {
  const trackRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(track)

    return () => observer.disconnect()
  }, [])

  // Force animation restart when visibility changes
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (isVisible) {
      // Force browser to restart animation
      track.style.animation = 'none'
      // Trigger reflow
      void track.offsetWidth
      track.style.animation = ''
    }
  }, [isVisible])

  return (
    <section className="works-section">
      <div className="works-slider">
        <div
          ref={trackRef}
          className={`works-track ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="work-card">
            <img src="/images/work1.jpg" alt="Work 1" />
          </div>
          <div className="work-card">
            <img src="/images/work2.jpg" alt="Work 2" />
          </div>
          <div className="work-card">
            <img src="/images/work3.jpg" alt="Work 3" />
          </div>
          {/* repeat again for seamless loop */}
          <div className="work-card">
            <img src="/images/work1.jpg" alt="Work 1" />
          </div>
          <div className="work-card">
            <img src="/images/work2.jpg" alt="Work 2" />
          </div>
          <div className="work-card">
            <img src="/images/work3.jpg" alt="Work 3" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works
