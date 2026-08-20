import { Boxes, GitBranch, Monitor, Palette } from 'lucide-react'
import './Skills.css'

const toolGroups = [
  {
    id: 'design',
    title: 'Design',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    purpose: 'Visual design, UI systems and production assets.',
    icon: Palette
  },
  {
    id: 'websites',
    title: 'Websites',
    tools: ['WordPress', 'Elementor'],
    purpose: 'Flexible business, marketing and WordPress websites.',
    icon: Monitor
  },
  {
    id: 'products',
    title: 'Products',
    tools: ['React', 'Vite', 'Firebase'],
    purpose: 'Web apps, MVPs and interactive digital products.',
    icon: Boxes
  },
  {
    id: 'workflow',
    title: 'Workflow',
    tools: ['GitHub', 'AI-assisted development'],
    purpose: 'Versioned, reviewable and AI-assisted development.',
    icon: GitBranch
  }
]

function Skills() {
  return (
    <section className="tools-section" id="skills" aria-labelledby="tools-title">
      <div className="tools-section__shell">
        <header className="tools-section__header">
          <p className="tools-section__eyebrow type-eyebrow">Toolkit</p>
          <div className="tools-section__heading-row">
            <h2 className="type-h2" id="tools-title">
              Tools chosen for the work, not the trend.
            </h2>
            <p className="type-body">
              The exact stack follows the website, product, workflow, and technical requirements.
            </p>
          </div>
        </header>

        <div className="tools-groups">
          {toolGroups.map((group) => (
            <section className={`tools-group tools-group--${group.id}`} aria-labelledby={`tools-${group.id}`} key={group.id}>
              <div className="tools-group__heading">
                <group.icon size={18} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="tools-group__title type-eyebrow" id={`tools-${group.id}`}>{group.title}</h3>
              </div>
              <p className="tools-group__list type-body">{group.tools.join(' · ')}</p>
              <p className="tools-group__purpose type-small">{group.purpose}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
