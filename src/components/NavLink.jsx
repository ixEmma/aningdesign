import { useState, useEffect } from 'react'
import './NavLink.css'

function NavLink({ href, children, onClick }) {
  const [isActive, setIsActive] = useState(false)
  const hash = href.includes('#') ? `#${href.split('#')[1]}` : ''

  useEffect(() => {
    if (!hash) return undefined

    const handleScroll = () => {
      const section = document.querySelector(hash)
      if (section) {
        const rect = section.getBoundingClientRect()
        const isHomePath = window.location.pathname === '/'
        setIsActive(isHomePath && rect.top <= 150 && rect.bottom >= 150)
      }
    }

    handleScroll()
    
    if (window.location.pathname === '/' && window.location.hash === hash) {
      setIsActive(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hash])

  const handleClick = (e) => {
    if (onClick) onClick(e)
  }

  return (
    <a 
      href={href} 
      className={`nav-link ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {isActive && <span className="nav-dot"></span>}
      {children}
    </a>
  )
}

export default NavLink

