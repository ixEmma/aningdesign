import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../../utils/blogUtils'
import './BlogCard.css'

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      {post.thumbnail && (
        <Link
          to={`/blog/${post.slug}`}
          className="blog-card__image-wrap"
          aria-label={`Read ${post.title}`}
        >
          <img
            src={post.thumbnail}
            alt={post.thumbnailAlt || post.title}
            className="blog-card__image"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}

      <div className="blog-card__content">
        <div className="blog-card-meta">
          <span>{post.category}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>

        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.description}</p>

        <Link to={`/blog/${post.slug}`} className="blog-card-link">
          Read article
          <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
