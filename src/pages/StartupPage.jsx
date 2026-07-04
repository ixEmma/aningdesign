import FounderPanel from '../components/startups/FounderPanel'
import ProjectGrid from '../components/startups/ProjectGrid'
import { useSeo } from '../utils/seo'
import { getDomain } from '../utils/domain'
import './StartupPage.css'

function StartupPage() {
  useSeo({
    title: 'Startups & Web Apps Built by Emmanuel Aning',
    description: 'Explore web apps, startup projects, and digital products built by Emmanuel Aning, founder of Aning Design Lab, including StudyNest, CityBeat, AssetRax, and Lensora Events.',
    canonical: `${getDomain()}/startups`,
    keywords: 'Aning Design Lab startups, Emmanuel Aning web apps, Ghana web app founder, React Firebase projects, startup projects, web design portfolio, AI web app builder',
    type: 'website'
  })

  return (
    <main className="startup-page">
      <section className="startup-dashboard" aria-label="Startup founder profile and projects">
        <FounderPanel />
        <ProjectGrid />
      </section>
    </main>
  )
}

export default StartupPage
