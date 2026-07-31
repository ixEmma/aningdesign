import './Skills.css'

const toolGroups = [
  {
    title: 'Design',
    tools: ['Photoshop', 'Illustrator', 'Figma']
  },
  {
    title: 'Websites',
    tools: ['WordPress', 'Elementor']
  },
  {
    title: 'Products',
    tools: ['React', 'Vite', 'Firebase']
  },
  {
    title: 'Workflow',
    tools: ['GitHub', 'AI-assisted development']
  }
]

function Skills() {
  return (
    <section className="tools-section" id="skills" aria-labelledby="tools-title">
      <div className="tools-section__shell">
        <header className="tools-section__header">
          <p className="tools-section__eyebrow type-eyebrow">Toolkit</p>
          <div className="tools-section__heading-row">
            <h2 className="type-h3" id="tools-title">
              Tools and platforms
            </h2>
            <p className="type-body">
              A focused toolkit selected according to the needs of each website or digital
              product.
            </p>
          </div>
        </header>

        <div className="tools-groups">
          {toolGroups.map((group) => (
            <section className="tools-group" aria-labelledby={`tools-${group.title.toLowerCase()}`} key={group.title}>
              <h3 className="tools-group__title type-eyebrow" id={`tools-${group.title.toLowerCase()}`}>
                {group.title}
              </h3>
              <ul className="tools-group__list type-body">
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
