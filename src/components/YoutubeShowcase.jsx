import { useEffect, useMemo, useState } from 'react'
import { useYoutubeVideos } from '../hooks/useYoutubeUploads'
import './YoutubeShowcase.css'

const buildEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)

    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)

    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}

function VideoFrame({ video, playing, onPlay, featured = false }) {
  const embedUrl = useMemo(() => buildEmbedUrl(video.id), [video.id])

  return (
    <div className={`youtube-media${featured ? ' youtube-media-featured' : ''}${playing ? ' is-active' : ''}`}>
      {playing ? (
        <iframe
          src={embedUrl}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          type="button"
          className="youtube-thumb"
          onClick={onPlay}
          aria-label={`Play ${video.title}`}
        >
          <img src={video.thumbnail} alt="" loading={featured ? 'eager' : 'lazy'} />
          <span className="youtube-vignette" aria-hidden="true"></span>
          <span className="youtube-play" aria-hidden="true">
            <span></span>
          </span>
        </button>
      )}
      <span className="youtube-duration">{video.duration}</span>
    </div>
  )
}

function FeaturedVideoCard({ video, playing, onPlay }) {
  return (
    <article className="youtube-feature-card youtube-reveal" style={{ '--delay': '80ms' }}>
      <VideoFrame video={video} featured playing={playing} onPlay={onPlay} />
      <div className="youtube-feature-copy">
        <p className="youtube-kicker">Latest upload</p>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  )
}

function DesktopPreviewCard({ video, index }) {
  return (
    <article
      className="youtube-small-card youtube-preview-card youtube-reveal"
      style={{ '--delay': `${160 + index * 90}ms` }}
    >
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="youtube-preview-media" aria-label={`Open ${video.title} on YouTube`}>
        <img src={video.thumbnail} alt="" loading="lazy" />
        <span className="youtube-vignette" aria-hidden="true"></span>
        <span className="youtube-duration">{video.duration}</span>
      </a>
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="youtube-small-copy youtube-preview-link">
        <span className="youtube-selector-label">Watch on YouTube</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
    </article>
  )
}

function MobileVideoCard({ video, playing, onPlay, index }) {
  return (
    <article className="youtube-small-card youtube-mobile-card youtube-reveal" style={{ '--delay': `${120 + index * 80}ms` }}>
      <VideoFrame video={video} playing={playing} onPlay={onPlay} />
      <div className="youtube-small-copy">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  )
}

function YoutubeShowcase() {
  const { videos, loading, error, debug } = useYoutubeVideos()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [featuredPlaying, setFeaturedPlaying] = useState(false)
  const [mobilePlayingVideoId, setMobilePlayingVideoId] = useState(null)

  const featuredVideo = videos[0]
  const sideVideos = useMemo(() => videos.slice(1, 4), [videos])

  useEffect(() => {
    setFeaturedPlaying(false)
    setMobilePlayingVideoId(null)
  }, [featuredVideo?.id, isMobile])

  useEffect(() => {
    const head = document.head
    const links = [
      { rel: 'preconnect', href: 'https://www.youtube.com' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' },
      { rel: 'dns-prefetch', href: 'https://www.youtube.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' }
    ]

    const appendedLinks = links
      .filter(({ rel, href }) => !document.querySelector(`link[rel="${rel}"][href="${href}"]`))
      .map(({ rel, href }) => {
        const link = document.createElement('link')
        link.rel = rel
        link.href = href
        if (rel === 'preconnect') {
          link.crossOrigin = ''
        }
        head.appendChild(link)
        return link
      })

    return () => {
      appendedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })
    }
  }, [])

  return (
    <section className="youtube-showcase" id="content-process" aria-labelledby="youtube-showcase-title">
      <div className="youtube-ambient youtube-ambient-cyan" aria-hidden="true"></div>
      <div className="youtube-ambient youtube-ambient-green" aria-hidden="true"></div>

      <div className="youtube-showcase-inner">
        <div className="youtube-showcase-header">
          <span className="youtube-badge">
            <span></span>
            CONTENT & PROCESS
          </span>
          <h2 id="youtube-showcase-title">Watch how I build digital experiences.</h2>
          <p>
            Behind the scenes redesigns, UI systems, development walkthroughs, creative
            process videos, and premium website breakdowns.
          </p>

          <div className="youtube-debug-panel" aria-live="polite">
            <span>Mode: {debug.mode}</span>
            <span>API key: {debug.apiKeyPresent ? 'present' : 'missing'}</span>
            <span>Channel: {debug.channelIdPresent ? 'present' : 'missing'}</span>
            <span>Fetch: {debug.status}</span>
            <span>Videos: {debug.videoCount}</span>
            {debug.lastError && <span className="youtube-debug-error">Error: {debug.lastError}</span>}
          </div>
        </div>

        {loading && (
          <div className="youtube-showcase-grid" aria-live="polite">
            <div className="youtube-feature-card youtube-skeleton-card"></div>
            <div className="youtube-stack">
              {[0, 1, 2].map((item) => (
                <div className="youtube-small-card youtube-skeleton-card" key={item}></div>
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="youtube-empty-state" role="status">
            <h3>Video showcase unavailable</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !videos.length && (
          <div className="youtube-empty-state" role="status">
            <h3>No videos found</h3>
            <p>New channel uploads will appear here automatically once they are available.</p>
          </div>
        )}

        {!loading && !error && featuredVideo && !isMobile && (
          <div className="youtube-showcase-grid">
            <FeaturedVideoCard
              video={featuredVideo}
              playing={featuredPlaying}
              onPlay={() => setFeaturedPlaying(true)}
            />

            <div className="youtube-stack" aria-label="More process videos">
              {sideVideos.map((video, index) => (
                <DesktopPreviewCard
                  video={video}
                  index={index}
                  key={video.id}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && videos.length > 0 && isMobile && (
          <div className="youtube-mobile-list" aria-label="Process videos">
            {videos.map((video, index) => (
              <MobileVideoCard
                video={video}
                playing={mobilePlayingVideoId === video.id}
                onPlay={() => setMobilePlayingVideoId(video.id)}
                index={index}
                key={video.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default YoutubeShowcase
