import { useEffect, useRef, useState } from 'react'

function Skills() {
  const skillsGridRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const autoScrollIntervalRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const scrollUpdateTimeoutRef = useRef(null)
  const itemsClonedRef = useRef(false)

  const skills = [
    { name: 'Adobe Photoshop', icon: '/images/photoshop.svg' },
    { name: 'Figma', icon: '/images/figma.svg' },
    { name: 'Adobe Illustrator', icon: '/images/adobe-illustrator-cc.svg' },
    { name: 'Adobe After Effects', icon: '/images/after-effects.svg' },
    { name: 'Adobe Premiere Pro', icon: '/images/premiere-pro-cc.svg' },
    { name: 'Adobe InDesign', icon: '/images/adobe-indesign.svg' },
    { name: 'HTML', icon: '/images/html-1.svg' },
    { name: 'CSS', icon: '/images/css-3.svg' },
    { name: 'Git', icon: '/images/git-icon.svg' },
    { name: 'WordPress', icon: '/images/wordpress-icon.svg' },
    { name: 'Framer', icon: '/images/framer.svg' },
    { name: 'Webflow', icon: '/images/Webflow.webp' },
    { name: 'Canva', icon: '/images/canva.svg' },
    { name: 'Affinity', icon: '/images/affinity.svg' },
    { name: 'Squarespace', icon: '/images/squarespace.svg' }
  ]

  const isMobile = () => window.innerWidth <= 768

  const getItemWidth = () => {
    if (!skillsGridRef.current) return 0
    const items = skillsGridRef.current.querySelectorAll('.skill-item')
    return items.length > 0 ? items[0].offsetWidth : 0
  }

  const cloneItemsForSeamlessScroll = () => {
    if (itemsClonedRef.current || !isMobile() || !skillsGridRef.current) return

    const allItems = skillsGridRef.current.querySelectorAll('.skill-item')
    if (allItems.length < 2) return

    const firstClone = allItems[0].cloneNode(true)
    firstClone.classList.add('skill-clone')
    skillsGridRef.current.appendChild(firstClone)

    const lastClone = allItems[allItems.length - 1].cloneNode(true)
    lastClone.classList.add('skill-clone')
    skillsGridRef.current.insertBefore(lastClone, allItems[0])

    itemsClonedRef.current = true

    setTimeout(() => {
      const itemWidth = getItemWidth()
      if (itemWidth > 0) {
        skillsGridRef.current.scrollLeft = itemWidth
      }
    }, 50)
  }

  const updateCarousel = (index, immediate = false) => {
    if (!isMobile() || isScrolling || !skillsGridRef.current) return

    const itemWidth = getItemWidth()
    if (itemWidth === 0) return

    setIsScrolling(true)
    const scrollPosition = (index + 1) * itemWidth

    if (immediate) {
      skillsGridRef.current.scrollLeft = scrollPosition
      setIsScrolling(false)
    } else {
      skillsGridRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })

      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollLeft = skillsGridRef.current.scrollLeft
        const realItemsCount = skills.length
        const clonedFirstPos = (realItemsCount + 1) * itemWidth
        const firstRealItemPos = itemWidth
        const clonedLastPos = 0

        if (scrollLeft >= clonedFirstPos - 20) {
          skillsGridRef.current.scrollLeft = firstRealItemPos
          setCurrentIndex(0)
        } else if (scrollLeft <= clonedLastPos + 20) {
          skillsGridRef.current.scrollLeft = realItemsCount * itemWidth
          setCurrentIndex(realItemsCount - 1)
        }
        setIsScrolling(false)
      }, 450)
    }
  }

  const nextSkill = () => {
    if (!isMobile() || isScrolling) return
    stopAutoScroll()
    const newIndex = (currentIndex + 1) % skills.length
    setCurrentIndex(newIndex)
    updateCarousel(newIndex, false)
    resetAutoScroll()
  }

  const prevSkill = () => {
    if (!isMobile() || isScrolling) return
    stopAutoScroll()
    const newIndex = (currentIndex - 1 + skills.length) % skills.length
    setCurrentIndex(newIndex)
    updateCarousel(newIndex, false)
    resetAutoScroll()
  }

  const startAutoScroll = () => {
    if (!isMobile() || isUserInteracting || isScrolling) return
    stopAutoScroll()
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isUserInteracting && !isScrolling) {
        nextSkill()
      }
    }, 3000)
  }

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  const resetAutoScroll = () => {
    stopAutoScroll()
    setTimeout(() => {
      if (!isUserInteracting && !isScrolling) {
        startAutoScroll()
      }
    }, 2500)
  }

  useEffect(() => {
    if (!isMobile()) return

    cloneItemsForSeamlessScroll()

    const handleScroll = () => {
      if (isScrolling || !itemsClonedRef.current || !skillsGridRef.current) return

      clearTimeout(scrollUpdateTimeoutRef.current)
      scrollUpdateTimeoutRef.current = setTimeout(() => {
        const itemWidth = getItemWidth()
        if (itemWidth > 0) {
          const scrollLeft = skillsGridRef.current.scrollLeft
          const realItemsCount = skills.length
          const lastItemPosition = (realItemsCount + 1) * itemWidth
          const firstItemPosition = itemWidth

          if (scrollLeft >= lastItemPosition - 15) {
            skillsGridRef.current.scrollLeft = firstItemPosition
            setCurrentIndex(0)
          } else if (scrollLeft < firstItemPosition - 15) {
            skillsGridRef.current.scrollLeft = realItemsCount * itemWidth
            setCurrentIndex(realItemsCount - 1)
          } else {
            const adjustedScroll = scrollLeft - firstItemPosition
            const newIndex = Math.round(adjustedScroll / itemWidth)
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < realItemsCount) {
              setCurrentIndex(newIndex)
            }
          }
        }
      }, 80)
    }

    const grid = skillsGridRef.current
    if (grid) {
      grid.addEventListener('scroll', handleScroll, { passive: true })

      setTimeout(() => {
        const itemWidth = getItemWidth()
        if (itemWidth > 0) {
          grid.scrollLeft = itemWidth
        }
        startAutoScroll()
      }, 150)
    }

    return () => {
      if (grid) {
        grid.removeEventListener('scroll', handleScroll)
      }
      stopAutoScroll()
      clearTimeout(scrollTimeoutRef.current)
      clearTimeout(scrollUpdateTimeoutRef.current)
    }
  }, [])


  const handleNextClick = (e) => {
    e.preventDefault()
    if (isScrolling) return
    setIsUserInteracting(true)
    nextSkill()
    setTimeout(() => {
      setIsUserInteracting(false)
      if (!isScrolling) {
        startAutoScroll()
      }
    }, 4000)
  }

  const handlePrevClick = (e) => {
    e.preventDefault()
    if (isScrolling) return
    setIsUserInteracting(true)
    prevSkill()
    setTimeout(() => {
      setIsUserInteracting(false)
      if (!isScrolling) {
        startAutoScroll()
      }
    }, 4000)
  }

  return (
    <div className="my-skills">
      <h1>MY SKILLS</h1>
      <div className="skills-carousel-wrapper">
        <button
          className="skill-nav-btn skill-nav-prev"
          onClick={handlePrevClick}
          aria-label="Previous skill"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="skills-grid" ref={skillsGridRef}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`skill-item ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={skill.icon} alt={`${skill.name} Logo`} />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
        <button
          className="skill-nav-btn skill-nav-next"
          onClick={handleNextClick}
          aria-label="Next skill"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <hr className="rule" />
    </div>
  )
}

export default Skills

