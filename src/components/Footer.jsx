import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-name">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Me</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="https://x.com/Aningdesigns" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://linkedin.com/in/emmanuel-aning-133189310" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.behance.net/emmaaning" target="_blank" rel="noopener noreferrer" aria-label="Behance">
            <i className="fab fa-behance"></i>
          </a>
        </div>
        <p className="footer-copyright">&copy; {currentYear} AningDesigns. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer

