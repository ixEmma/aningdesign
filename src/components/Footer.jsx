import { getExternalLinkProps } from '../utils/links'
import './Footer.css'

function XLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.72 10.46 22.04 2h-1.73l-6.36 7.35L8.88 2H3.03l7.68 11.12L3.03 22h1.73l6.72-7.77L16.85 22h5.85l-7.98-11.54Zm-2.38 2.75-.78-1.11L5.37 3.3h2.68l5 7.1.78 1.11 6.49 9.23h-2.68l-5.3-7.53Z" />
    </svg>
  )
}

function LinkedInLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function BehanceLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.6 11.56c.98 0 1.68-.44 1.68-1.47 0-1.13-.86-1.43-1.84-1.43H4.38v2.9H7.6Zm.2 5.79c1.1 0 1.92-.4 1.92-1.66 0-1.23-.73-1.72-1.87-1.72H4.38v3.38H7.8ZM.75 5.7h7.13c2.88 0 4.82.93 4.82 3.6 0 1.36-.68 2.31-1.89 2.9 1.7.49 2.55 1.79 2.55 3.52 0 2.82-2.39 4.03-4.9 4.03H.75V5.7Zm15.82.8h5.6v1.36h-5.6V6.5Zm2.8 4.06c-1.44 0-2.11.86-2.2 2.2h4.29c-.13-1.42-.87-2.2-2.09-2.2Zm.11 9.48c-3.06 0-5.01-2.11-5.01-5.13 0-2.93 2.07-5.16 5.01-5.16 3.31 0 4.89 2.78 4.7 5.89h-7.01c.1 1.53.81 2.5 2.4 2.5 1.15 0 2.07-.7 2.25-1.34h2.23c-.71 2.18-2.23 3.24-4.57 3.24Z" />
    </svg>
  )
}

function YoutubeLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.51 3.56 12 3.56 12 3.56s-7.51 0-9.38.51A3.01 3.01 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.01 3.01 0 0 0 2.12 2.13c1.87.51 9.38.51 9.38.51s7.51 0 9.38-.51a3.01 3.01 0 0 0 2.12-2.13C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  )
}

function GithubLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.45 11.45 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

function TelegramLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21.88 3.24c.34-.13.74-.05 1 .21.25.26.34.65.22 1l-6.56 17.53c-.16.43-.58.71-1.04.7-.45-.01-.86-.3-1-.73l-2.22-6.73-3.61 3.47c-.31.3-.78.39-1.18.22a1.12 1.12 0 0 1-.68-1.04v-4.3L1.54 11.8a1.1 1.1 0 0 1-.77-1.04c0-.48.31-.91.76-1.08l20.35-6.44ZM8.96 13.03v2.27l1.97-1.9 6.68-6.39-8.65 6.02Zm5.65 5.77 4.55-12.16-9.5 6.6 4.95 5.56Z" />
    </svg>
  )
}

const footerMainLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/services' },
  { label: 'About Me', href: '/#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
]

const footerProjectLinks = [
  { label: 'Website Design', href: '/services/website-design' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Startups', href: '/startups' }
]

const footerSocialLinks = [
  { label: 'X (Twitter)', href: 'https://x.com/Aningdesigns', icon: XLogoIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310', icon: LinkedInLogoIcon },
  { label: 'Behance', href: 'https://www.behance.net/emmaaning', icon: BehanceLogoIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg', icon: YoutubeLogoIcon },
  { label: 'GitHub', href: 'https://github.com/ixEmma', icon: GithubLogoIcon },
  { label: 'Telegram', href: 'https://t.me/AningDzn', icon: TelegramLogoIcon }
]

const getLinkAttributes = (link) => {
  const externalProps = getExternalLinkProps(link.href)

  return {
    target: link.target || externalProps.target,
    rel: link.rel || externalProps.rel
  }
}

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
              <img src="/images/LOGO-96.png" alt="Aning Design Lab logo" width="96" height="96" loading="lazy" decoding="async" />
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
                  <a href={link.href} {...getExternalLinkProps(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-link-group" aria-label="Project links">
            <h2>Projects</h2>
            <ul className="footer-links">
              {footerProjectLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...getLinkAttributes(link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-link-group footer-connect">
            <h2>Connect</h2>
            <div className="footer-social">
              {footerSocialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} {...getExternalLinkProps(href)} aria-label={label}>
                  <Icon />
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
