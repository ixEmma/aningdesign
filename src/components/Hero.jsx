import { useEffect, useState, useRef } from 'react'

function Hero() {
  const phrases = [
    "WEBSITE DESIGNER",
    "GRAPHIC DESIGNER",
    "UI/UX DESIGNER",
    "FRONTEND DEVELOPER",
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
        <span id="hey">Hi There👋, I'm </span>
        <h1 id="Emma"> EMMANUEL ANING</h1>
        <div>
          <p className="hero-p" id="typewriter">{displayText}</p>
        </div>
        <a
          href="https://wa.me/233557066467?text=Hi Emmanuel, I'm interested in working with you on a project."
          className="cta-button"
        >
          Contact
        </a>
      </div>
      <div className="social-media">
        <a href="https://x.com/Aningdesigns" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://linkedin.com/in/emmanuel-aning-133189310" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://www.behance.net/emmaaning" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-behance"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero

