import { Link } from 'react-router-dom'
import { formatPostDate } from '../../utils/blogUtils'
import './BlogCard.css'

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      {post.thumbnail && (
        <div className="blog-card__image-wrap">
          <img
            src={post.thumbnail}
            alt={post.thumbnailAlt || post.title}
            className="blog-card__image"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="blog-card-meta">
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </div>

      <h3>{post.title}</h3>
      <p>{post.description}</p>

      <div className="blog-card-tags" aria-label="Tutorial tags">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        Read Tutorial
      </Link>
    </article>
  )
}

export default BlogCard
