import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCategoryFilter from '../components/blog/BlogCategoryFilter'
import FeaturedBlogCard from '../components/blog/FeaturedBlogCard'
import BlogGrid from '../components/blog/BlogGrid'
import { getAllPosts, getCategories } from '../utils/blogUtils'
import { useSeo } from '../utils/seo'
import './Blog.css'

const POSTS_PER_BATCH = 6

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visiblePostCount, setVisiblePostCount] = useState(POSTS_PER_BATCH)
  const posts = getAllPosts()
  const categories = getCategories()

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts

    return posts.filter((post) => post.category === activeCategory)
  }, [activeCategory, posts])

  const featuredPost = filteredPosts[0] || null
  const archivePosts = filteredPosts.slice(1)
  const visiblePosts = archivePosts.slice(0, visiblePostCount)
  const visibleTotal = (featuredPost ? 1 : 0) + visiblePosts.length
  const hasMorePosts = visiblePosts.length < archivePosts.length

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setVisiblePostCount(POSTS_PER_BATCH)
  }

  useSeo({
    title: 'Blog Tutorials | Aning Design Lab',
    description: "Read practical WordPress, software development, web design, SEO, and website-building tutorials from Aning Design Lab, connected to Emmanuel Aning's YouTube guides.",
    canonical: 'https://aningdesign.com/blog',
    keywords: 'web design tutorials, WordPress tutorials, React tutorials, SEO tutorials, AI web design workflow, software development tutorials, Aning Design Lab',
    type: 'website'
  })

  return (
    <main className="blog-archive-page">
      <section className="blog-archive-hero">
        <div className="blog-archive-hero-inner">
          <span className="blog-archive-kicker">Insights</span>
          <h1>Ideas, systems, and practical web insights</h1>
          <p>
            Clear tutorials and field notes on website design, WordPress, development, SEO, and the
            workflows behind better digital products.
          </p>
        </div>
      </section>

      <section className="blog-archive-list" aria-label="Blog tutorial archive">
        <div className="blog-archive-list-inner">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          <div className="blog-archive-results-bar">
            <p aria-live="polite">
              Showing {visibleTotal} of {filteredPosts.length} {filteredPosts.length === 1 ? 'tutorial' : 'tutorials'}
            </p>
          </div>

          {featuredPost ? (
            <>
              <FeaturedBlogCard post={featuredPost} />

              <section className="blog-archive-grid-section" aria-labelledby="latest-tutorials-heading">
                <header className="blog-archive-grid-heading">
                  <p>Archive</p>
                  <h2 id="latest-tutorials-heading">Latest tutorials</h2>
                </header>
                <BlogGrid posts={visiblePosts} />
              </section>

              <div className="blog-archive-load-more">
                {hasMorePosts ? (
                  <button
                    type="button"
                    onClick={() => setVisiblePostCount((count) => count + POSTS_PER_BATCH)}
                  >
                    Load More
                  </button>
                ) : (
                  <p>All {filteredPosts.length} tutorials are showing.</p>
                )}
              </div>

              <details className="blog-archive-directory">
                <summary>Browse all {filteredPosts.length} tutorial titles</summary>
                <nav aria-label={`${activeCategory} tutorial directory`}>
                  <ul>
                    {filteredPosts.map((post) => (
                      <li key={`directory-${post.slug}`}>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            </>
          ) : (
            <div className="blog-archive-empty" role="status">
              <h2>No tutorials found</h2>
              <p>Choose another category to continue browsing.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blog
