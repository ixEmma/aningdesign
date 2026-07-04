import {
  Bot,
  Gauge,
  LayoutDashboard,
  PanelsTopLeft,
  SearchCheck,
  Workflow
} from 'lucide-react'
import './Blueprint.css'

const blueprintFeatures = [
  {
    title: 'AI-Powered Creative Workflow',
    description:
      'AI image generation, design systems, and rapid iteration workflows help move ideas from concept to polished execution without lowering the quality bar.',
    icon: Bot
  },
  {
    title: 'React & Frontend Engineering',
    description:
      'Component-based interfaces, responsive layouts, clean UI systems, and optimized frontend builds designed for modern business websites.',
    icon: PanelsTopLeft
  },
  {
    title: 'WordPress & CMS Expertise',
    description:
      'Elementor builds, CMS integrations, blog systems, and scalable content structures that keep marketing teams in control after launch.',
    icon: LayoutDashboard
  },
  {
    title: 'Conversion-Focused UI Design',
    description:
      'Strategic page structures, trust-building visual hierarchy, and focused landing pages shaped to improve engagement and lead quality.',
    icon: SearchCheck
  },
  {
    title: 'Performance & SEO Optimization',
    description:
      'Fast-loading pages, technical SEO foundations, schema-ready structure, and responsive optimization across desktop, tablet, and mobile.',
    icon: Gauge
  },
  {
    title: 'AI-Assisted Development Stack',
    description:
      'Claude Code, Codex, OpenAI workflows, and automation-enhanced production pipelines help deliver sharper work with faster iteration cycles.',
    icon: Workflow
  }
]

const blueprintWhatsappMessage = encodeURIComponent(
  "Hi Emmanuel, I'm ready to turn my idea into a fast, conversion-focused website."
)

const blueprintWhatsappLink = `https://wa.me/233557066467?text=${blueprintWhatsappMessage}`

function Blueprint() {
  return (
    <section className="blueprint-section" aria-labelledby="blueprint-title">
      <div className="blueprint-wrap">
        <div className="blueprint-intro">
          <span className="blueprint-eyebrow">Studio Blueprint</span>
          <h2 id="blueprint-title">
            Digital systems built for measurable business growth.
          </h2>
          <p>
            We combine results-driven web design, frontend development, WordPress expertise, and
            AI-assisted workflows to create digital experiences that feel premium, load fast, and
            support real business goals.
          </p>

          <div className="blueprint-cta">
            <p>Ready to turn your idea into a fast, conversion-focused website?</p>
            <a
              href={blueprintWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="blueprint-cta-button"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="blueprint-grid">
          {blueprintFeatures.map(({ title, description, icon: Icon }) => (
            <article className="blueprint-card" key={title}>
              <div className="blueprint-icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blueprint
