import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../../utils/blogUtils'
import './FeaturedBlogCard.css'

function FeaturedBlogCard({ post }) {
  return (
    <article className={`featured-blog-card${post.thumbnail ? '' : ' featured-blog-card--no-image'}`}>
      {post.thumbnail && (
        <Link
          to={`/blog/${post.slug}`}
          className="featured-blog-card__image-link"
          aria-label={`Read ${post.title}`}
        >
          <img
            src={post.thumbnail}
            alt={post.thumbnailAlt || post.title}
            className="featured-blog-card__image"
            width="1280"
            height="720"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Link>
      )}

      <div className="featured-blog-card__content">
        <p className="featured-blog-card__eyebrow">Featured article</p>
        <div className="featured-blog-card__meta">
          <span>{post.category}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>

        <h2>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="featured-blog-card__description">{post.description}</p>

        <Link to={`/blog/${post.slug}`} className="featured-blog-card__cta">
          Read article
          <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default FeaturedBlogCard
