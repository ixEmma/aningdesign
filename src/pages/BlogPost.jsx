import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Children, isValidElement, useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import BlogPostHeader from '../components/blog/BlogPostHeader'
import BlogVideoEmbed from '../components/blog/BlogVideoEmbed'
import { getPostBySlug, getRelatedPosts, formatPostDate } from '../utils/blogUtils'
import { servicePages, getServicePageBySlug } from '../data/servicePages'
import { getExternalLinkProps } from '../utils/links'
import { useSeo } from '../utils/seo'
import './BlogPost.css'

const getBlogImageUrl = (thumbnail) => {
  if (!thumbnail) return 'https://aningdesign.com/images/LOGO.png'
  if (/^https?:\/\//i.test(thumbnail)) return thumbnail
  if (thumbnail.startsWith('/')) return `https://aningdesign.com${thumbnail}`

  return `https://aningdesign.com/${thumbnail}`
}

const getUniqueKeywords = (keywords) => {
  const seen = new Set()

  return keywords
    .map((keyword) => String(keyword).trim())
    .filter((keyword) => {
      if (!keyword) return false

      const normalizedKeyword = keyword.toLowerCase()

      if (seen.has(normalizedKeyword)) return false

      seen.add(normalizedKeyword)
      return true
    })
}

const getPostKeywords = (post) => {
  return getUniqueKeywords([
    ...(post.tags || []),
    post.primaryKeyword,
    ...(post.keywordCluster || [])
  ])
}

const cleanHeadingText = (value) => {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const slugifyHeading = (value) => {
  return cleanHeadingText(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section'
}

const getUniqueHeadingId = (text, headingCounts) => {
  const baseId = slugifyHeading(text)
  const count = headingCounts.get(baseId) || 0

  headingCounts.set(baseId, count + 1)

  return count === 0 ? baseId : `${baseId}-${count + 1}`
}

const getChildrenText = (children) => {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (isValidElement(child)) return getChildrenText(child.props.children)

      return ''
    })
    .join('')
}

const getTableOfContents = (content) => {
  const headingCounts = new Map()

  return content
    .split('\n')
    .map((line) => line.trim().match(/^##(?!#)\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const title = cleanHeadingText(match[1])

      return {
        id: getUniqueHeadingId(title, headingCounts),
        title
      }
    })
}

const createMarkdownComponents = () => {
  const h2Counts = new Map()
  const h3Counts = new Map()

  return {
    a({ node, href = '', children, ...props }) {
      return (
        <a href={href} {...props} {...getExternalLinkProps(href)}>
          {children}
        </a>
      )
    },
    h2({ node, children, ...props }) {
      const text = getChildrenText(children)

      return (
        <h2 id={getUniqueHeadingId(text, h2Counts)} {...props}>
          {children}
        </h2>
      )
    },
    h3({ node, children, ...props }) {
      const text = getChildrenText(children)

      return (
        <h3 id={`detail-${getUniqueHeadingId(text, h3Counts)}`} {...props}>
          {children}
        </h3>
      )
    },
    img({ node, ...props }) {
      return (
        <img loading="lazy" decoding="async" {...props} />
      )
    }
  }
}

const splitContentForContextCta = (content) => {
  const lines = content.split('\n')
  const h2Indexes = lines.reduce((indexes, line, index) => {
    if (/^##(?!#)\s+/.test(line.trim())) {
      indexes.push(index)
    }

    return indexes
  }, [])

  if (h2Indexes.length < 2) {
    return {
      firstPart: content,
      secondPart: ''
    }
  }

  const splitIndex = h2Indexes[1]

  return {
    firstPart: lines.slice(0, splitIndex).join('\n').trim(),
    secondPart: lines.slice(splitIndex).join('\n').trim()
  }
}

const getYoutubeWatchUrl = (post) => {
  if (post.youtubeUrl) return post.youtubeUrl
  if (!post.youtubeEmbedUrl) return ''

  const videoId = post.youtubeEmbedUrl.match(/\/embed\/([^?/#]+)/)?.[1]

  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
}

const getServiceLink = (post) => {
  const servicePath = post.servicePage || ''
  const relatedService = post.relatedService || ''
  const serviceSlug = relatedService.replace(/^\/services\//, '')
  const matchedService = servicePages.find((service) => service.path === servicePath)
    || getServicePageBySlug(serviceSlug)
    || servicePages.find((service) => service.path === relatedService)

  if (matchedService) {
    return {
      href: matchedService.path,
      label: matchedService.shortTitle || matchedService.title,
      description: matchedService.seoDescription || matchedService.intro || ''
    }
  }

  if (servicePath || relatedService) {
    return {
      href: servicePath || relatedService,
      label: 'Related service',
      description: 'Open the related AningDesign service for this article.'
    }
  }

  return null
}

function BlogFeaturedImage({ post }) {
  if (!post.thumbnail || post.youtubeEmbedUrl) return null

  return (
    <figure className="blog-post-featured-image">
      <img
        src={post.thumbnail}
        alt={post.thumbnailAlt || post.title}
        width="1200"
        height="627"
        loading="eager"
        decoding="async"
      />
      {post.imageCredit && (
        <figcaption>
          Image credit: {post.imageCreditUrl ? (
            <a href={post.imageCreditUrl} {...getExternalLinkProps(post.imageCreditUrl)}>
              {post.imageCredit}
            </a>
          ) : post.imageCredit}
        </figcaption>
      )}
    </figure>
  )
}

function BlogPostSidebar({ tocItems, serviceLink, youtubeWatchUrl, relatedPosts }) {
  return (
    <aside className="blog-post-sidebar" aria-label="Article sidebar">
      <section className="blog-post-sidebar-panel blog-post-sidebar-panel--toc" aria-labelledby="blog-post-toc-title">
        <p className="blog-post-sidebar-label" id="blog-post-toc-title">On this page</p>
        {tocItems.length > 0 ? (
          <nav aria-label="Table of contents">
            {tocItems.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.title}
              </a>
            ))}
          </nav>
        ) : (
          <p className="blog-post-sidebar-note">A short guide with a focused reading path.</p>
        )}
      </section>

      {(serviceLink || youtubeWatchUrl) && (
        <section className="blog-post-sidebar-panel" aria-labelledby="blog-post-actions-title">
          <p className="blog-post-sidebar-label" id="blog-post-actions-title">Related actions</p>
          <div className="blog-post-sidebar-links">
            {serviceLink && (
              <Link to={serviceLink.href}>
                <span>Service</span>
                {serviceLink.label}
              </Link>
            )}
            {youtubeWatchUrl && (
              <a href={youtubeWatchUrl} {...getExternalLinkProps(youtubeWatchUrl)}>
                <span>Video</span>
                Watch the tutorial
              </a>
            )}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="blog-post-sidebar-panel" aria-labelledby="blog-post-sidebar-related-title">
          <p className="blog-post-sidebar-label" id="blog-post-sidebar-related-title">Related guides</p>
          <div className="blog-post-sidebar-related">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
              <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                <span>{relatedPost.category}</span>
                {relatedPost.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="blog-post-sidebar-cta" aria-label="Project inquiry">
        <p>Need this applied to your website?</p>
        <Link to="/contact">Start a project</Link>
      </section>
    </aside>
  )
}

function BlogPostContextCta({ serviceLink }) {
  if (!serviceLink) return null

  return (
    <aside className="blog-post-context-cta" aria-label="Related service">
      <p className="blog-post-context-kicker">Project planning note</p>
      <h2>Want this structure handled for your own website?</h2>
      <p>{serviceLink.description || 'Use the related service page to plan the next step with AningDesign.'}</p>
      <Link to={serviceLink.href}>View {serviceLink.label}</Link>
    </aside>
  )
}

function BlogPostRelatedContent({ relatedPosts }) {
  if (relatedPosts.length === 0) return null

  return (
    <section className="blog-post-related-content" aria-labelledby="blog-post-related-title">
      <div className="blog-post-related-heading">
        <p>Read next</p>
        <h2 id="blog-post-related-title">Related guides</h2>
      </div>
      <div className="blog-post-related-grid">
        {relatedPosts.map((relatedPost) => (
          <article className="blog-post-related-card" key={relatedPost.slug}>
            <div className="blog-post-related-meta">
              <span>{relatedPost.category}</span>
              <time dateTime={relatedPost.date}>{formatPostDate(relatedPost.date)}</time>
            </div>
            <h3>{relatedPost.title}</h3>
            <p>{relatedPost.description}</p>
            <Link to={`/blog/${relatedPost.slug}`}>Read guide</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogPostFinalCta({ post, serviceLink, youtubeWatchUrl, ctaDescription }) {
  return (
    <section className="blog-post-cta" aria-label="Next step">
      <p className="blog-post-cta-kicker">Next step</p>
      <h2>Need help building your website?</h2>
      <p>{ctaDescription}</p>
      <div className="blog-post-cta-actions">
        <Link to="/contact" className="blog-post-cta-primary">Contact AningDesign</Link>
        {serviceLink && (
          <Link to={serviceLink.href}>View related service</Link>
        )}
        {post.youtubeUrl && youtubeWatchUrl && (
          <a href={youtubeWatchUrl} {...getExternalLinkProps(youtubeWatchUrl)}>Watch on YouTube</a>
        )}
      </div>
    </section>
  )
}

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const postImage = getBlogImageUrl(post.thumbnail)
  const postKeywords = getPostKeywords(post)
  const postKeywordString = postKeywords.join(', ')
  const tocItems = useMemo(() => getTableOfContents(post.content), [post.content])
  const relatedPosts = useMemo(() => getRelatedPosts(post, 3), [post])
  const serviceLink = useMemo(() => getServiceLink(post), [post])
  const youtubeWatchUrl = getYoutubeWatchUrl(post)
  const markdownComponents = createMarkdownComponents()
  const shouldShowContextCta = post.type === 'seo' && Boolean(serviceLink)
  const { firstPart, secondPart } = shouldShowContextCta
    ? splitContentForContextCta(post.content)
    : { firstPart: post.content, secondPart: '' }
  const ctaDescription = post.type === 'seo'
    ? 'Use this guide to plan your next step, then contact AningDesign when you are ready to turn the strategy into a working website.'
    : 'Watch the tutorial, keep practicing, and contact AningDesign when you are ready to turn the lesson into a polished website for your own brand.'

  useSeo({
    title: `${post.title} | Aning Design Lab`,
    description: post.description,
    canonical: `https://aningdesign.com/blog/${post.slug}`,
    image: postImage,
    keywords: postKeywordString,
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
      image: postImage,
      keywords: postKeywordString,
      author: {
        '@type': 'Person',
        '@id': 'https://aningdesign.com/#person',
        name: 'Emmanuel Aning'
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://aningdesign.com/#business',
        name: 'AningDesign',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aningdesign.com/images/LOGO.png'
        }
      }
    })

    return () => script.remove()
  }, [post, postImage, postKeywordString])

  return (
    <main className="blog-post-page">
      <div className="blog-post-shell">
        <BlogPostHeader post={post} />

        <div className="blog-post-layout">
          <article className="blog-post-article">
            <BlogVideoEmbed title={post.title} youtubeEmbedUrl={post.youtubeEmbedUrl} />
            <BlogFeaturedImage post={post} />

            <div className="blog-post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {firstPart}
              </ReactMarkdown>

              {shouldShowContextCta && (
                <BlogPostContextCta serviceLink={serviceLink} />
              )}

              {secondPart && (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {secondPart}
                </ReactMarkdown>
              )}
            </div>

            <BlogPostRelatedContent relatedPosts={relatedPosts} />
            <BlogPostFinalCta
              post={post}
              serviceLink={serviceLink}
              youtubeWatchUrl={youtubeWatchUrl}
              ctaDescription={ctaDescription}
            />
          </article>

          <BlogPostSidebar
            tocItems={tocItems}
            serviceLink={serviceLink}
            youtubeWatchUrl={youtubeWatchUrl}
            relatedPosts={relatedPosts}
          />
        </div>
      </div>
    </main>
  )
}

export default BlogPost
