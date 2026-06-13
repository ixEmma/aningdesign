import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect } from 'react'
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
    image: post.thumbnail ? `https://aningdesign.com${post.thumbnail}` : undefined,
    keywords: post.tags.join(', '),
    type: 'article'
  })

  useEffect(() => {
    const schemaId = 'blog-post-schema'
    let script = document.getElementById(schemaId)

    if (!script) {
      script = document.createElement('script')
      script.id = schemaId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: `https://aningdesign.com/blog/${post.slug}`,
      image: post.thumbnail ? `https://aningdesign.com${post.thumbnail}` : 'https://aningdesign.com/images/LOGO.png',
      keywords: post.tags.join(', '),
      author: {
        '@type': 'Person',
        '@id': 'https://aningdesign.com/#person',
        name: 'Emmanuel Aning'
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://aningdesign.com/#business',
        name: 'Aning Design',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aningdesign.com/images/LOGO.png'
        }
      }
    })

    return () => script.remove()
  }, [post])

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
