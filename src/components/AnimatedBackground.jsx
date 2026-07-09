import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

const PARTICLE_DENSITY = 12000
const MOBILE_PARTICLE_DENSITY = 16500
const MOBILE_BREAKPOINT = 640
const DESKTOP_MOUSE_RADIUS = 260
const MOUSE_ATTRACTION_STRENGTH = 0.075
const MOUSE_MAX_PARTICLE_SPEED = 1.75
const MOUSE_CORE_RADIUS = 34
const MOUSE_LINE_OPACITY_BOOST = 0.22
const INITIAL_ANIMATION_DELAY = 120
const SCROLL_DRIFT_STRENGTH = 0.0008
const SCROLL_DELTA_LIMIT = 70
const SCROLL_DECAY = 0.88
const CONNECTION_MAX_DISTANCE = 120
const MOBILE_CONNECTION_MAX_DISTANCE = 95
const PARTICLE_SHADOW_BLUR = 10
const MOBILE_PARTICLE_SHADOW_BLUR = 7
const PARTICLE_COLOR = '#00c9ff'
const PARTICLE_RGB = '0, 201, 255'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const getMouseRadius = (width) => (width < MOBILE_BREAKPOINT ? 0 : DESKTOP_MOUSE_RADIUS)
const getConnectionDistance = (width) => (
  width < MOBILE_BREAKPOINT ? MOBILE_CONNECTION_MAX_DISTANCE : CONNECTION_MAX_DISTANCE
)
const getParticleShadowBlur = (width) => (
  width < MOBILE_BREAKPOINT ? MOBILE_PARTICLE_SHADOW_BLUR : PARTICLE_SHADOW_BLUR
)

const getParticleCount = (width, height) => {
  const isMobile = width < MOBILE_BREAKPOINT
  const minParticles = isMobile ? 18 : 45
  const maxParticles = isMobile ? 32 : 140
  const density = isMobile ? MOBILE_PARTICLE_DENSITY : PARTICLE_DENSITY
  const baselineCount = Math.floor((width * height) / density)

  return clamp(baselineCount, minParticles, maxParticles)
}

function AnimatedBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false, radius: 0 })
  const scrollRef = useRef({ y: 0, delta: 0 })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = motionQuery.matches
    let resizeFrame = null
    let pointerFrame = null
    let staticFrame = null
    let initFrame = null
    let initTimeout = null
    let interactionListenersActive = false
    let isDisposed = false

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.baseSize = this.size
        this.baseVx = (Math.random() - 0.5) * 0.5
        this.baseVy = (Math.random() - 0.5) * 0.5
        this.vx = this.baseVx
        this.vy = this.baseVy
        this.opacity = Math.random() * 0.4 + 0.2
        this.baseOpacity = this.opacity
      }

      update() {
        const mouse = mouseRef.current
        const scroll = scrollRef.current
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (mouse.active && mouse.radius > 0 && distance < mouse.radius && distance > 0) {
          const force = 1 - distance / mouse.radius
          const coreSoftener = distance < MOUSE_CORE_RADIUS ? Math.max(distance / MOUSE_CORE_RADIUS, 0.25) : 1
          const strength = force * MOUSE_ATTRACTION_STRENGTH * coreSoftener

          this.vx += (dx / distance) * strength
          this.vy += (dy / distance) * strength
          this.size += (this.baseSize + force * 1.7 - this.size) * 0.14
          this.opacity += (Math.min(this.baseOpacity + force * 0.5, 0.9) - this.opacity) * 0.12
        } else {
          this.size += (this.baseSize - this.size) * 0.05
          this.opacity += (this.baseOpacity - this.opacity) * 0.05
        }

        if (Math.abs(scroll.delta) > 0.01) {
          this.vy += scroll.delta * SCROLL_DRIFT_STRENGTH * (0.35 + this.baseSize * 0.1)
        }

        this.vx = this.vx * 0.98 + this.baseVx * 0.02
        this.vy = this.vy * 0.98 + this.baseVy * 0.02

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > MOUSE_MAX_PARTICLE_SPEED) {
          const speedRatio = MOUSE_MAX_PARTICLE_SPEED / speed
          this.vx *= speedRatio
          this.vy *= speedRatio
        }

        this.x += this.vx
        this.y += this.vy

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
        ctx.fillStyle = PARTICLE_COLOR
        ctx.shadowBlur = getParticleShadowBlur(canvas.width)
        ctx.shadowColor = PARTICLE_COLOR
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const connectionDistance = getConnectionDistance(canvas.width)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            let opacity = (1 - distance / connectionDistance) * 0.2

            if (mouse.active && mouse.radius > 0) {
              const midX = (particles[i].x + particles[j].x) / 2
              const midY = (particles[i].y + particles[j].y) / 2
              const mouseDx = mouse.x - midX
              const mouseDy = mouse.y - midY
              const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

              if (mouseDistance < mouse.radius) {
                const cursorForce = 1 - mouseDistance / mouse.radius
                opacity += cursorForce * MOUSE_LINE_OPACITY_BOOST
              }
            }

            opacity = clamp(opacity, 0, 0.46)

            ctx.save()
            ctx.strokeStyle = `rgba(${PARTICLE_RGB}, ${opacity})`
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

    const drawFrame = (shouldUpdate = true) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawConnections()

      particlesRef.current.forEach((particle) => {
        if (shouldUpdate) {
          particle.update()
        }
        particle.draw()
      })

      if (shouldUpdate) {
        const scroll = scrollRef.current
        scroll.delta *= SCROLL_DECAY

        if (Math.abs(scroll.delta) < 0.01) {
          scroll.delta = 0
        }
      }
    }

    const queueStaticFrame = () => {
      if (staticFrame !== null) {
        window.cancelAnimationFrame(staticFrame)
      }

      staticFrame = window.requestAnimationFrame(() => {
        staticFrame = null
        drawFrame(false)
      })
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      mouseRef.current = {
        ...mouseRef.current,
        x: clamp(mouseRef.current.x, 0, canvas.width),
        y: clamp(mouseRef.current.y, 0, canvas.height),
        active: false,
        radius: getMouseRadius(canvas.width)
      }
      scrollRef.current = { y: window.scrollY || window.pageYOffset || 0, delta: 0 }

      const particleCount = getParticleCount(canvas.width, canvas.height)
      particlesRef.current = Array.from({ length: particleCount }, () => new Particle())
      queueStaticFrame()
    }

    const handleResize = () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame)
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null
        resizeCanvas()
      })
    }

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }

    const animate = () => {
      if (isDisposed || prefersReducedMotion || document.hidden) {
        animationFrameRef.current = null
        return
      }

      drawFrame(true)
      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (isDisposed || prefersReducedMotion || document.hidden || animationFrameRef.current !== null) {
        return
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    const deactivatePointer = () => {
      mouseRef.current = {
        ...mouseRef.current,
        active: false
      }
    }

    const handlePointerMove = (event) => {
      const radius = getMouseRadius(canvas.width)

      if (radius === 0 || event.pointerType === 'touch') {
        deactivatePointer()
        return
      }

      const { clientX, clientY } = event

      if (pointerFrame !== null) {
        window.cancelAnimationFrame(pointerFrame)
      }

      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = null
        mouseRef.current = {
          x: clientX,
          y: clientY,
          active: true,
          radius
        }
      })
    }

    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0

      if (canvas.width < MOBILE_BREAKPOINT) {
        scrollRef.current = { y: nextY, delta: 0 }
        return
      }

      const delta = clamp(nextY - scrollRef.current.y, -SCROLL_DELTA_LIMIT, SCROLL_DELTA_LIMIT)

      scrollRef.current = {
        y: nextY,
        delta: clamp(scrollRef.current.delta + delta, -SCROLL_DELTA_LIMIT, SCROLL_DELTA_LIMIT)
      }
    }

    const addInteractionListeners = () => {
      if (interactionListenersActive) return

      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', deactivatePointer, { passive: true })
      window.addEventListener('blur', deactivatePointer)
      window.addEventListener('scroll', handleScroll, { passive: true })
      document.addEventListener('mouseleave', deactivatePointer, { passive: true })
      interactionListenersActive = true
    }

    const removeInteractionListeners = () => {
      if (!interactionListenersActive) return

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', deactivatePointer)
      window.removeEventListener('blur', deactivatePointer)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', deactivatePointer)
      interactionListenersActive = false

      if (pointerFrame !== null) {
        window.cancelAnimationFrame(pointerFrame)
        pointerFrame = null
      }

      deactivatePointer()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation()
        return
      }

      queueStaticFrame()
      startAnimation()
    }

    const handleMotionPreferenceChange = (event) => {
      prefersReducedMotion = event.matches

      if (prefersReducedMotion) {
        stopAnimation()
        removeInteractionListeners()
        deactivatePointer()
        queueStaticFrame()
        return
      }

      addInteractionListeners()
      startAnimation()
    }

    const initializeBackground = () => {
      if (isDisposed) return

      resizeCanvas()
      window.addEventListener('resize', handleResize)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', handleMotionPreferenceChange)
      } else {
        motionQuery.addListener(handleMotionPreferenceChange)
      }

      if (!prefersReducedMotion) {
        addInteractionListeners()
        startAnimation()
      }
    }

    initFrame = window.requestAnimationFrame(() => {
      initFrame = null
      initTimeout = window.setTimeout(initializeBackground, INITIAL_ANIMATION_DELAY)
    })

    return () => {
      isDisposed = true
      stopAnimation()
      removeInteractionListeners()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionPreferenceChange)
      } else {
        motionQuery.removeListener(handleMotionPreferenceChange)
      }

      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame)
      }
      if (pointerFrame !== null) {
        window.cancelAnimationFrame(pointerFrame)
      }
      if (staticFrame !== null) {
        window.cancelAnimationFrame(staticFrame)
      }
      if (initFrame !== null) {
        window.cancelAnimationFrame(initFrame)
      }
      if (initTimeout !== null) {
        window.clearTimeout(initTimeout)
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
