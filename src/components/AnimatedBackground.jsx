import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

function AnimatedBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Initialize mouse position
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    
    // Particle class with improved physics
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.baseSize = this.size
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.4 + 0.2
        this.baseOpacity = this.opacity
      }

      update() {
        const mouse = mouseRef.current
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150
        const minDistance = 50

        if (distance < maxDistance && distance > 0) {
          // Smooth gravity effect - particles are attracted to cursor
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          
          // Apply smooth gravity force
          const strength = force * 0.08
          this.vx += Math.cos(angle) * strength
          this.vy += Math.sin(angle) * strength
          
          // Increase size and opacity when near cursor
          const sizeBoost = force * 2
          this.size = this.baseSize + sizeBoost
          this.opacity = Math.min(this.baseOpacity + force * 0.6, 0.9)
        } else {
          // Smooth return to base size and opacity
          this.size += (this.baseSize - this.size) * 0.05
          this.opacity += (this.baseOpacity - this.opacity) * 0.05
        }

        // Apply smooth friction
        this.vx *= 0.98
        this.vy *= 0.98

        // Update position
        this.x += this.vx
        this.y += this.vy

        // Smooth wrap around edges
        if (this.x < 0) {
          this.x = canvas.width
          this.vx *= 0.5
        }
        if (this.x > canvas.width) {
          this.x = 0
          this.vx *= 0.5
        }
        if (this.y < 0) {
          this.y = canvas.height
          this.vy *= 0.5
        }
        if (this.y > canvas.height) {
          this.y = 0
          this.vy *= 0.5
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = '#00c9ff'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00c9ff'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Set canvas size to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Reinitialize particles on resize
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
      particlesRef.current = Array.from({ length: particleCount }, () => new Particle())
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Draw connection lines between nearby particles
    const drawConnections = () => {
      const particles = particlesRef.current
      const maxConnectionDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxConnectionDistance) {
            const opacity = (1 - distance / maxConnectionDistance) * 0.2
            ctx.save()
            ctx.strokeStyle = `rgba(0, 201, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // Mouse move handler with throttling
    let mouseUpdateTimeout = null
    const handleMouseMove = (e) => {
      if (mouseUpdateTimeout) {
        cancelAnimationFrame(mouseUpdateTimeout)
      }
      mouseUpdateTimeout = requestAnimationFrame(() => {
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY
        }
      })
    }

    // Mouse leave handler - return to center
    const handleMouseLeave = () => {
      mouseRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop with optimized rendering
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first
      drawConnections()

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mouseUpdateTimeout) {
        cancelAnimationFrame(mouseUpdateTimeout)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="animated-background"
      aria-hidden="true"
    />
  )
}

export default AnimatedBackground
