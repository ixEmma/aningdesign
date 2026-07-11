import { useEffect, useRef, useState } from 'react'
import './Works.css'

const workImages = [
  {
    src: '/images/work1.jpg',
    webp: '/images/work1.webp',
    alt: 'Web design portfolio preview for AningDesign project one'
  },
  {
    src: '/images/work2.jpg',
    webp: '/images/work2.webp',
    alt: 'Web design portfolio preview for AningDesign project two'
  },
  {
    src: '/images/work3.jpg',
    webp: '/images/work3.webp',
    alt: 'Web design portfolio preview for AningDesign project three'
  }
]

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

  return (
    <section className="works-section">
      <div className="works-slider">
        <div
          ref={trackRef}
          className={`works-track ${isVisible ? 'is-visible' : ''}`}
        >
          {[...workImages, ...workImages].map((image, index) => (
            <div className="work-card" key={`${image.src}-${index}`}>
              <picture>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.src}
                  alt={image.alt}
                  width="1024"
                  height="320"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Works
