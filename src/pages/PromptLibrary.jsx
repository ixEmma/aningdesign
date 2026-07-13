import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogArchiveSearch from '../components/blog/BlogArchiveSearch'
import BlogNewsletter from '../components/blog/BlogNewsletter'
import Breadcrumbs from '../components/resources/Breadcrumbs'
import ResourceCard from '../components/resources/ResourceCard'
import { filterPostsBySearch, getFreeResourcePosts, getResourceCategories } from '../utils/blogUtils'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'
import './FreeResources.css'

function PromptLibrary() {
  const prompts = getFreeResourcePosts('prompt')
  const categories = getResourceCategories('prompt')
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredPrompts = useMemo(() => {
    const categoryPrompts = activeCategory === 'All'
      ? prompts
      : prompts.filter((post) => post.resourceCategory === activeCategory)

    return filterPostsBySearch(categoryPrompts, query)
  }, [activeCategory, prompts, query])
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Free Resources', href: '/free-resources' },
    { label: 'Prompts', href: '/free-resources/prompts' }
  ]

  useSeo({
    title: 'Free Prompt Library for Websites & App Workflows | AningDesign',
    description: 'Browse copy-ready prompts for AI app building, website workflows, and practical digital product work.',
    canonical: `${getDomain()}/free-resources/prompts`,
    keywords: 'free AI prompts, MVP app prompt, website design prompts, app building prompt library',
    type: 'website'
  })

  return (
    <main className="free-resources-page">
      <section className="free-resources-hero">
        <div className="free-resources-shell">
          <Breadcrumbs items={breadcrumbItems} schemaId="prompt-library-breadcrumb-schema" />
          <p className="free-resources-kicker">Prompt Library</p>
          <h1>Practical prompts for focused digital work</h1>
          <p>Copy complete prompts, understand how they are structured, and adapt them to your own website or product workflow.</p>
        </div>
      </section>

      <div className="free-resources-shell free-resources-content">
        <BlogArchiveSearch
          id="prompt-library-search"
          label="Search prompts"
          placeholder="Search MVP, React, WordPress, or SEO prompts"
          value={query}
          onChange={setQuery}
        />

        {categories.length > 2 && (
          <div className="prompt-library-filters" aria-label="Prompt categories">
            {categories.map((category) => (
              <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        )}

        <p className="prompt-library-count" aria-live="polite">{filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'} available</p>
        {filteredPrompts.length > 0 ? (
          <div className="resource-card-grid">{filteredPrompts.map((post) => <ResourceCard resource={post} key={post.slug} />)}</div>
        ) : (
          <div className="prompt-library-empty" role="status"><h2>No prompts found</h2><p>Try a broader search term or clear the current filter.</p></div>
        )}

        <BlogNewsletter
          source="prompt-library"
          title="Get new free prompts and resources"
          description="Get practical prompts, tools, checklists, and guides when new resources are published."
          defaultInterest="Free Resources"
        />

        <nav className="related-resource-links" aria-label="Related free resource categories">
          <Link to="/free-resources#free-tools">Free Tools</Link>
          <Link to="/free-resources#checklists">Checklists</Link>
          <Link to="/free-resources#guides">Guides</Link>
        </nav>
      </div>
    </main>
  )
}

export default PromptLibrary
