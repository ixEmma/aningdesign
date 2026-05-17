import { Link } from 'react-router-dom'
import { getLatestPosts } from '../../utils/blogUtils'
import BlogGrid from './BlogGrid'
import './LatestBlogTutorials.css'

function LatestBlogTutorials() {
  const posts = getLatestPosts(3)

  if (!posts.length) return null

  return (
    <section className="latest-blog-tutorials" id="blog-tutorials" aria-labelledby="latest-blog-tutorials-title">
      <div className="latest-blog-tutorials-inner">
        <div className="latest-blog-tutorials-header">
          <span className="latest-blog-tutorials-badge">Written tutorials</span>
          <h2 id="latest-blog-tutorials-title">Latest Blog Tutorials</h2>
          <p>
            Step-by-step written guides connected to the YouTube channel, built for WordPress,
            web design, SEO, and beginner-friendly website workflows.
          </p>
        </div>

        <BlogGrid posts={posts} />

        <div className="latest-blog-tutorials-actions">
          <Link to="/blog">View All Blog Tutorials</Link>
        </div>
      </div>
    </section>
  )
}

export default LatestBlogTutorials
