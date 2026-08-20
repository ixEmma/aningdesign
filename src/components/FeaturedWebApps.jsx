import { ArrowRight, ExternalLink } from 'lucide-react'
import { featuredWebApps } from '../data/webApps'
import { SiteLink } from './SiteLink'
import './FeaturedWebApps.css'

function AppLink({ app }) {
  return (
    <SiteLink href={app.url} target="_blank" rel="noopener noreferrer" className="featured-web-apps__open aning-button aning-button--text" aria-label={`Open ${app.name}`}>
      Open app
      <ExternalLink size={16} strokeWidth={2.2} aria-hidden="true" />
    </SiteLink>
  )
}

function FeaturedWebApps() {
  const [flagship, ...supportingApps] = featuredWebApps

  if (!flagship) return null

  return (
    <section className="featured-web-apps" id="web-apps" aria-labelledby="featured-web-apps-title">
      <div className="featured-web-apps__shell">
        <header className="featured-web-apps__header">
          <div>
            <p className="type-eyebrow">Owned product proof</p>
            <h2 className="type-h2" id="featured-web-apps-title">Products I’ve built and shipped</h2>
          </div>
          <p className="type-body-large">Live tools and product experiments built around clear, practical workflows.</p>
        </header>

        <div className="featured-web-apps__layout">
          <article className="featured-web-apps__flagship">
            <div className="featured-web-apps__visual featured-web-apps__visual--flagship">
              <img src={flagship.image} alt={flagship.imageAlt} width={flagship.width} height={flagship.height} decoding="async" />
            </div>
            <div className="featured-web-apps__flagship-copy">
              <p className="type-eyebrow">{flagship.category}</p>
              <h3 className="type-h3">{flagship.name}</h3>
              <p className="type-body">{flagship.shortDescription}</p>
              <AppLink app={flagship} />
            </div>
          </article>

          <div className="featured-web-apps__supporting">
            {supportingApps.map((app) => (
              <article className={`featured-web-apps__supporting-card featured-web-apps__supporting-card--${app.id}`} key={app.id}>
                <div className="featured-web-apps__supporting-media">
                  <img src={app.image} alt={app.imageAlt} width={app.width} height={app.height} loading="lazy" decoding="async" />
                </div>
                <div className="featured-web-apps__supporting-copy">
                  <p className="type-eyebrow">{app.category}</p>
                  <h3 className="type-h3">{app.name}</h3>
                  <p className="type-small">{app.shortDescription}</p>
                  <AppLink app={app} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <SiteLink href="/web-apps" className="featured-web-apps__directory-link aning-button aning-button--text">
          Explore all web apps
          <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </SiteLink>
      </div>
    </section>
  )
}

export default FeaturedWebApps
