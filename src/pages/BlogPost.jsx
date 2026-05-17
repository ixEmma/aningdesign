import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navigate, useParams } from 'react-router-dom'
import BlogPostHeader from '../components/blog/BlogPostHeader'
import BlogVideoEmbed from '../components/blog/BlogVideoEmbed'
import { getPostBySlug } from '../utils/blogUtils'
import { useSeo } from '../utils/seo'
import './BlogPost.css'

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  useSeo({
    title: `${post.title} | Aning Design Lab`,
    description: post.description,
    canonical: `https://aningdesign.com/blog/${post.slug}`,
    type: 'article'
  })

  return (
    <main className="blog-post-page">
      <div className="blog-post-shell">
        <BlogPostHeader post={post} />
        <BlogVideoEmbed title={post.title} youtubeEmbedUrl={post.youtubeEmbedUrl} />

        <article className="blog-post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <section className="blog-post-cta" aria-label="Next step">
          <h2>Need help building your website?</h2>
          <p>
            Watch the tutorial, keep practicing, and contact Aning Design when you are ready
            to turn the lesson into a polished website for your own brand.
          </p>
          <div className="blog-post-cta-actions">
            <a href="/#contact">Contact Aning Design</a>
            <a href={post.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
            <a href="https://t.me/AningDzn" target="_blank" rel="noopener noreferrer">Join Telegram</a>
          </div>
        </section>
      </div>
    </main>
  )
}

export default BlogPost
