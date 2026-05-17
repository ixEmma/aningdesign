import './BlogVideoEmbed.css'

function BlogVideoEmbed({ title, youtubeEmbedUrl }) {
  if (!youtubeEmbedUrl) return null

  return (
    <div className="blog-video-embed">
      <iframe
        src={`${youtubeEmbedUrl}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default BlogVideoEmbed
