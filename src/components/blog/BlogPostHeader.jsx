import { formatPostDate } from '../../utils/blogUtils'
import Breadcrumbs from '../resources/Breadcrumbs'
import './BlogPostHeader.css'

function BlogPostHeader({ post, breadcrumbItems }) {
  return (
    <header className="blog-post-header">
      {breadcrumbItems ? (
        <Breadcrumbs items={breadcrumbItems} schemaId="blog-resource-breadcrumb-schema" />
      ) : (
        <a href="/blog" className="blog-post-header-back">Back to Blog</a>
      )}
      {post.isFreeResource && <p className="blog-post-resource-label">{post.resourceLabel || 'Free Resource'}</p>}
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
