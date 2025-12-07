import { useState, useEffect } from 'react'
import './NavLink.css'

function NavLink({ href, children, onClick }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(href)
      if (section) {
        const rect = section.getBoundingClientRect()
        const isInView = rect.top <= 150 && rect.bottom >= 150
        setIsActive(isInView)
      }
    }

    // Check on mount
    handleScroll()
    
    // Check initial hash
    if (window.location.hash === href) {
      setIsActive(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [href])

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

