import { ArrowRight, ExternalLink } from 'lucide-react'
import { SiteLink } from '../components/SiteLink'
import { webApps } from '../data/webApps'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'
import './WebAppsPage.css'

function AppMetadata({ app }) {
  return <div className="web-app-metadata"><span>{app.category}</span><span>{app.status}</span></div>
}

function AppOpenLink({ app, className = '' }) {
  return (
    <SiteLink href={app.url} target="_blank" rel="noopener noreferrer" className={`aning-button aning-button--text ${className}`.trim()} aria-label={`Open ${app.name}`}>
      Open app
      <ExternalLink size={17} strokeWidth={2.2} aria-hidden="true" />
    </SiteLink>
  )
}

function StackList({ app }) {
  return <ul className="web-app-stack" aria-label={`${app.name} stack`}>{app.stack.map((item) => <li key={item}>{item}</li>)}</ul>
}

function WebAppsPage() {
  const flagship = webApps.find((app) => app.featured) || webApps[0]
  const supportingApps = webApps.filter((app) => app.id !== flagship?.id)
  const heroApps = [flagship, ...supportingApps.slice(0, 2)].filter(Boolean)
  const originApps = webApps.filter((app) => app.problem && app.response).slice(0, 3)
  const tutorialApp = webApps.find((app) => app.relatedBlog)

  useSeo({
    title: 'Web Apps & Digital Products | AningDesign',
    description: 'Explore live web apps, tools, and digital products built by AningDesign, including Lensora Events, StudyNest, CityBeat, and AssetRax.',
    canonical: `${getDomain()}/web-apps`,
    image: `${getDomain()}${flagship.image}`,
    keywords: 'AningDesign web apps, digital products, web app portfolio, React Firebase products, Ghana software products',
    type: 'website'
  })

  return (
    <main className="web-apps-page">
      <section className="web-apps-hero" aria-labelledby="web-apps-title">
        <div className="web-apps-shell web-apps-hero__grid">
          <div className="web-apps-hero__copy">
            <p className="type-eyebrow">AningDesign products</p>
            <h1 className="type-h1" id="web-apps-title">Web apps built to solve real problems.</h1>
            <p className="type-body-large">A focused collection of live tools and digital products built around practical workflows, then tested in public.</p>
            <div className="web-apps-hero__actions">
              <a href="#apps" className="aning-button aning-button--primary">Explore the apps <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></a>
              <SiteLink href="/services/react-web-apps" className="aning-button aning-button--text">Build an app with me</SiteLink>
            </div>
          </div>
          <div className="web-apps-hero__canvas" aria-label="Live web app previews">
            {heroApps.map((app, index) => (
              <figure className={`web-apps-hero__preview web-apps-hero__preview--${index + 1}`} key={app.id}>
                <img src={app.image} alt={app.imageAlt} width={app.width} height={app.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <figcaption>{app.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="web-apps-flagship" id="apps" aria-labelledby="flagship-app-title">
        <div className="web-apps-shell web-apps-flagship__grid">
          <div className="web-apps-flagship__copy">
            <p className="type-eyebrow">Flagship product</p>
            <AppMetadata app={flagship} />
            <h2 className="type-h2" id="flagship-app-title">{flagship.name}</h2>
            <p className="type-body-large">{flagship.shortDescription}</p>
            <p className="type-body">{flagship.description}</p>
            <StackList app={flagship} />
            <AppOpenLink app={flagship} className="web-apps-flagship__action" />
          </div>
          <figure className="web-apps-flagship__visual"><img src={flagship.image} alt={flagship.imageAlt} width={flagship.width} height={flagship.height} decoding="async" /></figure>
        </div>
      </section>

      <section className="web-apps-directory" aria-labelledby="web-apps-directory-title">
        <div className="web-apps-shell">
          <header className="web-apps-directory__header"><p className="type-eyebrow">Product directory</p><h2 className="type-h2" id="web-apps-directory-title">Apps, tools, and experiments</h2></header>
          <div className="web-apps-directory__grid">
            {supportingApps.map((app, index) => (
              <article className={`web-apps-directory__item web-apps-directory__item--${index + 1}`} key={app.id}>
                <figure><img src={app.image} alt={app.imageAlt} width={app.width} height={app.height} loading="lazy" decoding="async" /></figure>
                <div className="web-apps-directory__item-copy">
                  <AppMetadata app={app} />
                  <h3 className="type-h3">{app.name}</h3>
                  <p className="type-body">{app.description}</p>
                  <StackList app={app} />
                  <AppOpenLink app={app} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {originApps.length > 0 && <section className="web-apps-origin" aria-labelledby="web-apps-origin-title">
        <div className="web-apps-shell">
          <div className="web-apps-origin__heading"><p className="type-eyebrow">Product thinking</p><h2 className="type-h2" id="web-apps-origin-title">Built from problems worth solving.</h2></div>
          <div className="web-apps-origin__list">
            {originApps.map((app) => <article key={app.id}><h3 className="type-h3">{app.name}</h3><p className="type-body"><span>Problem</span>{app.problem}</p><p className="type-body"><span>Response</span>{app.response}</p></article>)}
          </div>
        </div>
      </section>}

      <section className="web-apps-process" aria-labelledby="web-apps-process-title">
        <div className="web-apps-shell web-apps-process__grid">
          <div><p className="type-eyebrow">How product work moves</p><h2 className="type-h2" id="web-apps-process-title">From a useful problem to a tested product.</h2></div>
          <ol>{['Problem', 'Scope', 'Build', 'Test', 'Ship', 'Improve'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
          <p className="type-body-large">The same discipline supports client work too: define one core workflow, build it clearly, test it properly, then improve from evidence. <SiteLink href="/services/react-web-apps">Explore React web apps</SiteLink>.</p>
        </div>
      </section>

      {tutorialApp && <section className="web-apps-ecosystem" aria-labelledby="web-apps-ecosystem-title">
        <div className="web-apps-shell web-apps-ecosystem__grid">
          <div><p className="type-eyebrow">Product to tutorial</p><h2 className="type-h2" id="web-apps-ecosystem-title">Build it. Document it. Keep improving it.</h2></div>
          <p className="type-body-large">{tutorialApp.name} is a real product example behind the AI build-and-deploy workflow. See the practical process, then open the live tool.</p>
          <div className="web-apps-ecosystem__actions"><SiteLink href={tutorialApp.relatedBlog} className="aning-button aning-button--secondary">Read the workflow</SiteLink><AppOpenLink app={tutorialApp} /></div>
        </div>
      </section>}

      <section className="web-apps-final-cta" aria-labelledby="web-apps-final-cta-title">
        <div className="web-apps-shell"><p className="type-eyebrow">Build with AningDesign</p><h2 className="type-h2" id="web-apps-final-cta-title">Have an idea worth turning into a product?</h2><p className="type-body-large">Start with the user, the core workflow, and the smallest useful release.</p><SiteLink href="/contact" className="aning-button aning-button--primary">Contact Us <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></SiteLink></div>
      </section>
    </main>
  )
}

export default WebAppsPage
