import { useEffect, useState, useRef } from 'react'
import './Hero.css'

const socialLinks = [
  { label: 'Visit AningDesign on X', href: 'https://x.com/Aningdesigns', icon: 'X' },
  { label: 'Visit Emmanuel Aning on LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310', icon: 'in' },
  { label: 'Visit Emmanuel Aning on Behance', href: 'https://www.behance.net/emmaaning', icon: 'Be' }
]

function Hero() {
  const phrases = [
    "WEBSITE DESIGNER",
    "GRAPHIC DESIGNER",
    "UI/UX DESIGNER",
    "FRONTEND DEVELOPER",
    "SOFTWARE DEVELOPER",
    "FREELANCER"
  ]

  const [displayText, setDisplayText] = useState('')
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseAfter = 1500

    const type = () => {
      const current = phrases[phraseIndexRef.current]

      if (!isDeletingRef.current) {
        if (charIndexRef.current < current.length) {
          setDisplayText(current.slice(0, charIndexRef.current + 1))
          charIndexRef.current += 1
          timeoutRef.current = setTimeout(type, typingSpeed)
        } else {
          isDeletingRef.current = true
          timeoutRef.current = setTimeout(type, pauseAfter)
        }
      } else {
        if (charIndexRef.current > 0) {
          setDisplayText(current.slice(0, charIndexRef.current - 1))
          charIndexRef.current -= 1
          timeoutRef.current = setTimeout(type, deletingSpeed)
        } else {
          isDeletingRef.current = false
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length
          charIndexRef.current = 0
          timeoutRef.current = setTimeout(type, typingSpeed)
        }
      }
    }

    timeoutRef.current = setTimeout(type, typingSpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-content">

        <span id="hey">Hi 👋, I'm Emmanuel</span>

        <h1 className="hero-title">
          I build <span className="hero-accent">premium websites</span>
          <br />
         <span className="hero-script">That convert.</span>
        </h1>

        <p className="hero-p" id="typewriter">{displayText}</p>

        <a
          href="https://wa.me/233557066467?text=Hi, I'm interested in working with you on a project."
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Start a Project →
        </a>
      </div>

      <div className="social-media">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            <span aria-hidden="true">{link.icon}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Hero
