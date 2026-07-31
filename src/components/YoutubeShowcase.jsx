import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { youtubeAuthorityVideos } from '../data/youtubeAuthority'
import { getExternalLinkProps } from '../utils/links'
import HomepageSectionHeading from './HomepageSectionHeading'
import './YoutubeShowcase.css'

const DRAG_THRESHOLD = 10

function getYouTubeWatchUrl(video) {
  const videoId = video?.videoId || video?.id?.videoId || video?.snippet?.resourceId?.videoId || video?.id

  if (typeof videoId !== 'string' || !videoId.trim()) {
    if (import.meta.env.DEV) {
      console.warn('YouTube video is missing a valid video ID.', video)
    }
    return null
  }

  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
}

function isCarouselInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest('a, button, input, select, textarea, [data-carousel-interactive]'))
}

function YoutubeSlide({ active, index, onActivate, slideRef, video }) {
  const watchUrl = getYouTubeWatchUrl(video)
  const content = (
    <>
      <img src={video.thumbnail} alt={video.thumbnailAlt} width="1280" height="720" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
      <span className="youtube-slide__overlay">
        <span className="youtube-slide__series type-eyebrow">{video.series}</span>
        <span className="youtube-slide__title type-h3">{video.title}</span>
        <span className="youtube-slide__description type-body">{video.description}</span>
        {active && watchUrl && (
          <a
            className="youtube-slide__watch aning-button aning-button--secondary"
            href={watchUrl}
            data-carousel-interactive
            aria-label={`Watch ${video.title} on YouTube`}
          >
            <Play size={17} fill="currentColor" aria-hidden="true" />
            <span>Watch the Video</span>
          </a>
        )}
      </span>
    </>
  )

  const handleSurfaceClick = (event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    if (active) return
    onActivate(index, event)
  }

  const handleSurfaceKeyDown = (event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    if (active || (event.key !== 'Enter' && event.key !== ' ')) return

    event.preventDefault()
    onActivate(index, event)
  }

  return (
    <article className="youtube-slide" aria-current={active ? 'true' : undefined} aria-label={`Video ${index + 1} of ${youtubeAuthorityVideos.length}: ${video.title}`} ref={slideRef}>
      <div
        className="youtube-slide__surface"
        role={active ? undefined : 'button'}
        tabIndex={active ? undefined : 0}
        aria-label={active ? undefined : `Show video ${index + 1}: ${video.title}`}
        onClick={handleSurfaceClick}
        onKeyDown={handleSurfaceKeyDown}
      >
        {content}
      </div>
    </article>
  )
}

function YoutubeShowcase() {
  const viewportRef = useRef(null)
  const slideRefs = useRef([])
  const dragStart = useRef({ x: 0, y: 0 })
  const dragState = useRef(null)
  const didDrag = useRef(false)
  const scrollFrame = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveSlide = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
    const nearestIndex = slideRefs.current.reduce((closestIndex, slide, index) => {
      if (!slide) return closestIndex
      const closestSlide = slideRefs.current[closestIndex]
      const closestDistance = Math.abs(closestSlide.offsetLeft + closestSlide.offsetWidth / 2 - viewportCenter)
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - viewportCenter)
      return distance < closestDistance ? index : closestIndex
    }, 0)

    setActiveIndex(nearestIndex)
  }

  const goToSlide = (index) => {
    const slide = slideRefs.current[index]
    if (!slide) return

    slide.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }

  const handleScroll = () => {
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
    scrollFrame.current = requestAnimationFrame(updateActiveSlide)
  }

  const handlePointerDown = (event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    const viewport = viewportRef.current
    if (!viewport) return

    dragStart.current = { x: event.clientX, y: event.clientY }
    didDrag.current = false
    dragState.current = { pointerId: event.pointerId, startScrollLeft: viewport.scrollLeft }
    viewport.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    const viewport = viewportRef.current
    const state = dragState.current
    if (!viewport || !state || state.pointerId !== event.pointerId) return

    const distanceX = Math.abs(event.clientX - dragStart.current.x)
    const distanceY = Math.abs(event.clientY - dragStart.current.y)
    if (distanceX > DRAG_THRESHOLD && distanceX > distanceY) {
      didDrag.current = true
      viewport.classList.add('is-dragging')
      viewport.scrollLeft = state.startScrollLeft - (event.clientX - dragStart.current.x)
      event.preventDefault()
    }
  }

  const handlePointerEnd = (event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    const viewport = viewportRef.current
    const state = dragState.current
    if (!viewport || !state || state.pointerId !== event.pointerId) return

    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId)
    viewport.classList.remove('is-dragging')
    dragState.current = null
    updateActiveSlide()
    window.setTimeout(() => {
      didDrag.current = false
    }, 120)
  }

  const handleSlideActivate = (index, event) => {
    if (isCarouselInteractiveTarget(event.target)) return
    if (didDrag.current) {
      event.preventDefault()
      event.stopPropagation()
      didDrag.current = false
      return
    }

    goToSlide(index)
  }

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': youtubeAuthorityVideos.map((video) => ({
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: new URL(video.thumbnail, window.location.origin).href,
        embedUrl: `https://www.youtube.com/embed/${video.id}`,
        url: getYouTubeWatchUrl(video),
        publisher: { '@type': 'Organization', name: 'Aning Design Lab', url: 'https://www.youtube.com/@Aningdesignlab' }
      }))
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.youtubeAuthoritySchema = 'true'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
      script.remove()
    }
  }, [])

  return (
    <section className="youtube-showcase" id="content-process" aria-labelledby="youtube-showcase-title">
      <div className="youtube-showcase__inner">
        <HomepageSectionHeading
          action={(
            <a className="youtube-showcase__channel aning-button aning-button--text" href="https://www.youtube.com/@Aningdesignlab" {...getExternalLinkProps('https://www.youtube.com/@Aningdesignlab')}>
              <span>Visit Aning Design Lab</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          )}
          description="WordPress, website-design and development lessons drawn from real workflows, projects and implementation experience."
          eyebrow="Aning Design Lab"
          title="Practical knowledge behind the work"
          titleId="youtube-showcase-title"
        />

        <div className="youtube-carousel-shell">
          <div
            className="youtube-carousel__viewport"
            ref={viewportRef}
            role="region"
            aria-label="Aning Design Lab video tutorials"
            tabIndex="0"
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onKeyDown={(event) => {
              if (isCarouselInteractiveTarget(event.target)) return
              if (event.key === 'ArrowLeft' && activeIndex > 0) {
                event.preventDefault()
                goToSlide(activeIndex - 1)
              }
              if (event.key === 'ArrowRight' && activeIndex < youtubeAuthorityVideos.length - 1) {
                event.preventDefault()
                goToSlide(activeIndex + 1)
              }
            }}
          >
            <div className="youtube-carousel__track">
              {youtubeAuthorityVideos.map((video, index) => (
                <YoutubeSlide active={index === activeIndex} index={index} key={video.id} onActivate={handleSlideActivate} slideRef={(element) => { slideRefs.current[index] = element }} video={video} />
              ))}
            </div>
          </div>

          <div className="youtube-carousel__controls" aria-label="Video carousel controls">
            <button className="youtube-carousel__control" type="button" onClick={() => goToSlide(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous video"><ChevronLeft size={20} aria-hidden="true" /></button>
            <button className="youtube-carousel__control" type="button" onClick={() => goToSlide(activeIndex + 1)} disabled={activeIndex === youtubeAuthorityVideos.length - 1} aria-label="Next video"><ChevronRight size={20} aria-hidden="true" /></button>
          </div>
        </div>

        <div className="youtube-pagination" aria-label="Choose a video">
          {youtubeAuthorityVideos.map((video, index) => (
            <button className="youtube-pagination__dot" type="button" onClick={() => goToSlide(index)} aria-current={index === activeIndex ? 'true' : undefined} aria-label={`Go to video ${index + 1}: ${video.title}`} key={video.id} />
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">Video {activeIndex + 1} of {youtubeAuthorityVideos.length}</p>
      </div>
    </section>
  )
}

export default YoutubeShowcase
