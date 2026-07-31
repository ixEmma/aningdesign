import './HomepageSectionHeading.css'

function HomepageSectionHeading({ action, className = '', description, eyebrow, title, titleId }) {
  const classes = [
    'homepage-section-heading',
    action ? 'homepage-section-heading--with-action' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="homepage-section-heading__copy">
        <p className="homepage-section-heading__eyebrow type-eyebrow">{eyebrow}</p>
        <h2 className="homepage-section-heading__title type-h2" id={titleId}>{title}</h2>
        <p className="homepage-section-heading__intro type-body-large">{description}</p>
      </div>
      {action && <div className="homepage-section-heading__action">{action}</div>}
    </header>
  )
}

export default HomepageSectionHeading
