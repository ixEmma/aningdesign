import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, ClipboardCheck, Wrench } from 'lucide-react'
import BlogNewsletter from '../components/blog/BlogNewsletter'
import Breadcrumbs from '../components/resources/Breadcrumbs'
import ResourceCard from '../components/resources/ResourceCard'
import { startupProjects } from '../data/startupProjects'
import { getFreeResourcePosts } from '../utils/blogUtils'
import { getDomain } from '../utils/domain'
import { getExternalLinkProps } from '../utils/links'
import { useSeo } from '../utils/seo'
import './FreeResources.css'

const categoryLinks = [
  { title: 'Prompt Library', description: 'Copy-ready prompts for practical AI and product workflows.', href: '/free-resources/prompts', icon: BookOpen },
  { title: 'Free Tools', description: 'Public web apps and focused digital utilities.', href: '#free-tools', icon: Wrench },
  { title: 'Checklists', description: 'Structured checks for planning, building, and launching websites.', href: '#checklists', icon: ClipboardCheck },
  { title: 'Guides', description: 'Detailed workflows for clearer project decisions.', href: '#guides', icon: BookOpen }
]

function FreeResources() {
  const promptPosts = getFreeResourcePosts('prompt')
  const checklistPosts = getFreeResourcePosts('checklist')
  const guidePosts = getFreeResourcePosts('guide')
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Free Resources', href: '/free-resources' }
  ]

  useSeo({
    title: 'Free Tools, Prompts, Checklists & Guides | AningDesign',
    description: 'Use free prompts, website checklists, practical guides, and digital tools from AningDesign.',
    canonical: `${getDomain()}/free-resources`,
    keywords: 'free website resources, free AI prompts, website checklists, free web tools, WordPress guides',
    type: 'website'
  })

  return (
    <main className="free-resources-page">
      <section className="free-resources-hero">
        <div className="free-resources-shell">
          <Breadcrumbs items={breadcrumbItems} schemaId="free-resources-breadcrumb-schema" />
          <p className="free-resources-kicker">Free Resources</p>
          <h1>Free tools, prompts, and guides</h1>
          <p>Explore practical prompts, tools, checklists, and guides created to help you design, build, launch, and improve digital products.</p>
        </div>
      </section>

      <div className="free-resources-shell free-resources-content">
        <nav className="resource-category-grid" aria-label="Free resource categories">
          {categoryLinks.map(({ icon: Icon, ...item }) => (
            <Link to={item.href} key={item.title}>
              <Icon size={19} strokeWidth={2.1} aria-hidden="true" />
              <span><strong>{item.title}</strong><small>{item.description}</small></span>
            </Link>
          ))}
        </nav>

        <section className="resource-archive-section" id="prompts" aria-labelledby="free-prompts-title">
          <header><p>Copy and adapt</p><h2 id="free-prompts-title">Free Prompts</h2><Link to="/free-resources/prompts">View Prompt Library</Link></header>
          <div className="resource-card-grid">{promptPosts.map((post) => <ResourceCard resource={post} key={post.slug} />)}</div>
        </section>

        <section className="resource-archive-section" id="free-tools" aria-labelledby="free-tools-title">
          <header><p>Use online</p><h2 id="free-tools-title">Free Tools</h2></header>
          <div className="free-tool-pill-list">
            {startupProjects.map((tool) => (
              <a
                href={tool.url}
                {...getExternalLinkProps(tool.url)}
                className="free-tool-pill"
                key={tool.name}
              >
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.category}</small>
                </span>
                <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="resource-archive-section" id="checklists" aria-labelledby="free-checklists-title">
          <header><p>Review with structure</p><h2 id="free-checklists-title">Free Checklists</h2></header>
          <div className="resource-card-grid">{checklistPosts.map((post) => <ResourceCard resource={post} key={post.slug} />)}</div>
        </section>

        <section className="resource-archive-section" id="guides" aria-labelledby="free-guides-title">
          <header><p>Plan with context</p><h2 id="free-guides-title">Free Guides</h2></header>
          <div className="resource-card-grid">{guidePosts.map((post) => <ResourceCard resource={post} key={post.slug} />)}</div>
        </section>

        <BlogNewsletter
          source="free-resources"
          title="Get new free prompts and resources"
          description="Get practical prompts, tools, checklists, and guides when new resources are published."
        />
      </div>
    </main>
  )
}

export default FreeResources
