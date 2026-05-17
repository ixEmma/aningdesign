import BlogCard from './BlogCard'
import './BlogGrid.css'

function BlogGrid({ posts }) {
  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <BlogCard post={post} key={post.slug} />
      ))}
    </div>
  )
}

export default BlogGrid
