import './Footer.css'

const footerMainLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'About Me', href: '/#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' }
]

const footerProjectLinks = [
  { label: 'Website Design', href: '/#projects' },
  { label: 'Graphic Design', href: 'https://www.behance.net/emmaaning', target: '_blank', rel: 'noopener noreferrer' },
  { label: 'Startups', href: '/startups' }
]

const footerSocialLinks = [
  { label: 'X (Twitter)', href: 'https://x.com/Aningdesigns', icon: 'fab fa-x-twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310', icon: 'fab fa-linkedin' },
  { label: 'Behance', href: 'https://www.behance.net/emmaaning', icon: 'fab fa-behance' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg', icon: 'fab fa-youtube' },
  { label: 'GitHub', href: 'https://github.com/ixEmma', icon: 'fab fa-github' },
  { label: 'Telegram', href: 'https://t.me/AningDzn', icon: 'fab fa-telegram' }
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const openFeedback = () => {
    window.dispatchEvent(new CustomEvent('open-feedback'))
  }

  return (
    <footer className="footer-name">
      <div className="footer-content">
        <div className="footer-layout">
          <div className="footer-brand">
            <a href="/#home" className="footer-brand-mark" aria-label="Go to homepage">
              <img src="/images/LOGO.png" alt="Aning Design Lab logo" />
              <span>Aning Design Lab</span>
            </a>
            <p>Building websites, web apps, tutorials, and digital products.</p>
            <span className="footer-status">
              <span className="footer-status-dot" aria-hidden="true"></span>
              Available for new projects
            </span>
          </div>

          <nav className="footer-link-group" aria-label="Explore links">
            <h2>Explore</h2>
            <ul className="footer-links">
              {footerMainLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-link-group" aria-label="Project links">
            <h2>Projects</h2>
            <ul className="footer-links">
              {footerProjectLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.target} rel={link.rel}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-link-group footer-connect">
            <h2>Connect</h2>
            <div className="footer-social">
              {footerSocialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
            <button type="button" className="footer-feedback-link" onClick={openFeedback}>
              Send Feedback
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} AningDesigns. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
