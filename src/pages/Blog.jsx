import { useMemo, useState } from 'react'
import BlogCategoryFilter from '../components/blog/BlogCategoryFilter'
import BlogGrid from '../components/blog/BlogGrid'
import { getAllPosts, getCategories } from '../utils/blogUtils'
import { useSeo } from '../utils/seo'
import './Blog.css'

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const posts = getAllPosts()
  const categories = getCategories()

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts

    return posts.filter((post) => post.category === activeCategory)
  }, [activeCategory, posts])

  useSeo({
    title: 'Blog Tutorials | Aning Design Lab',
    description: 'Read practical WordPress, web design, SEO, and website-building tutorials from Aning Design Lab, connected to Emmanuel Aning’s YouTube guides.',
    canonical: 'https://aningdesign.com/blog',
    type: 'website'
  })

  return (
    <main className="blog-archive-page">
      <section className="blog-archive-hero">
        <div className="blog-archive-hero-inner">
          <span className="blog-archive-kicker">Aning Design Lab</span>
          <h1>Blog Tutorials</h1>
          <p>
            Written guides for WordPress, Elementor, web design, SEO, and practical website-building
            workflows. Each tutorial is built to support the video lessons with a clean step-by-step guide.
          </p>
        </div>
      </section>

      <section className="blog-archive-list" aria-label="Blog tutorial archive">
        <div className="blog-archive-list-inner">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <BlogGrid posts={filteredPosts} />
        </div>
      </section>
    </main>
  )
}

export default Blog
