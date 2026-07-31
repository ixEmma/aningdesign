import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HomepageSectionHeading from '../HomepageSectionHeading'
import { homepageArticleSlugs } from '../../data/homepageArticles'
import { formatPostDate, getPostBySlug } from '../../utils/blogUtils'
import './LatestBlogTutorials.css'

function HomepageArticleCard({ post, featured = false }) {
  const articlePath = `/blog/${post.slug}`

  return (
    <article className={`home-article-card${featured ? ' home-article-card--featured' : ''}`}>
      <figure className="home-article-card__media">
        <img
          src={post.thumbnail}
          alt={post.thumbnailAlt}
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="home-article-card__content">
        <div className="home-article-card__meta">
          <span className="type-eyebrow">{post.category}</span>
          {post.date && (
            <time className="type-small" dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
          )}
        </div>
        <h3 className={featured ? 'type-h3' : ''}>{post.title}</h3>
        <p className="home-article-card__description type-body">{post.description}</p>
        <Link className="aning-button aning-button--text" to={articlePath}>
          <span>Read the Guide</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function LatestBlogTutorials() {
  const posts = homepageArticleSlugs.map(getPostBySlug).filter(Boolean)
  const [featuredPost, ...supportingPosts] = posts

  if (!featuredPost) return null

  return (
    <section className="latest-blog-tutorials" id="blog-tutorials" aria-labelledby="latest-blog-tutorials-title">
      <div className="latest-blog-tutorials__inner">
        <HomepageSectionHeading
          description="Practical articles covering WordPress, website planning, design decisions and the workflows behind professional digital projects."
          eyebrow="Latest insights"
          title="Website and WordPress guides"
          titleId="latest-blog-tutorials-title"
        />

        <div className="home-blog-grid">
          <HomepageArticleCard post={featuredPost} featured />
          <div className="home-blog-supporting">
            {supportingPosts.map((post) => (
              <HomepageArticleCard post={post} key={post.slug} />
            ))}
          </div>
        </div>

        <div className="latest-blog-tutorials__action">
          <Link className="aning-button aning-button--secondary" to="/blog">
            <span>View All Guides</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestBlogTutorials
