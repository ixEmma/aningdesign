import { formatPostDate } from '../../utils/blogUtils'
import './BlogPostHeader.css'

function BlogPostHeader({ post }) {
  return (
    <header className="blog-post-header">
      <a href="/blog" className="blog-post-header-back">Back to Blog</a>
      <div className="blog-post-header-meta">
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div className="blog-post-header-tags" aria-label="Tutorial tags">
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </header>
  )
}

export default BlogPostHeader
