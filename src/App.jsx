import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Works from './components/Works'
import Skills from './components/Skills'
import Blueprint from './components/Blueprint'
import About from './components/About'
import Projects from './components/Projects'
import Feedback from './components/Feedback'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnimatedBackground from './components/AnimatedBackground'
import Testimonials from './components/Testimonials'
import { useSeo } from './utils/seo'
import { getDomain } from './utils/domain'

const YoutubeShowcase = lazy(() => import('./components/YoutubeShowcase'))
const LatestBlogTutorials = lazy(() => import('./components/blog/LatestBlogTutorials'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const StartupPage = lazy(() => import('./pages/StartupPage'))
const FreeResources = lazy(() => import('./pages/FreeResources'))
const PromptLibrary = lazy(() => import('./pages/PromptLibrary'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const BooksPage = lazy(() => import('./pages/BooksPage'))
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'))

function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return undefined
    }

    const targetId = decodeURIComponent(location.hash.slice(1))
    let frameId
    let timeoutId
    let observer

    const scrollToTarget = () => {
      const target = document.getElementById(targetId)

      if (!target) return false

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      })
      return true
    }

    frameId = window.requestAnimationFrame(() => {
      if (scrollToTarget()) return

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      const routeShell = document.querySelector('.route-content-shell')
      if (!routeShell) return

      observer = new MutationObserver(() => {
        if (scrollToTarget()) {
          observer.disconnect()
          window.clearTimeout(timeoutId)
        }
      })

      observer.observe(routeShell, { childList: true, subtree: true })
      timeoutId = window.setTimeout(() => observer.disconnect(), 2500)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
      observer?.disconnect()
    }
  }, [location.pathname, location.hash, location.key])

  return null
}

function RouteFallback() {
  return (
    <div className="route-loading-shell" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
    </div>
  )
}

function DeferredHomepageSection({ children, minHeight = 1 }) {
  const [shouldRender, setShouldRender] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || shouldRender) return undefined

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '900px 0px' }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [shouldRender])

  return (
    <div ref={sectionRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender && (
        <Suspense fallback={null}>
          {children}
        </Suspense>
      )}
    </div>
  )
}

function LandingPage() {
  useSeo({
    title: 'Emmanuel Aning | Web Designer & Software Developer in Ghana',
    description: 'Emmanuel Aning is a web designer, software developer, and graphic designer in Accra, Ghana, building WordPress, React, UI/UX, and conversion-focused digital experiences for clients worldwide.',
    canonical: getDomain(),
    keywords: 'web designer Ghana, software developer Ghana, WordPress developer Ghana, React developer Ghana, UI UX designer Ghana, graphic designer Accra, international web design services, Emmanuel Aning, AningDesign',
    type: 'website'
  })

  return (
    <main id="main-content">
      <Hero />
      <Works />
      <Skills />
      <Blueprint />
      <About />
      <Projects />
      <Testimonials />
      <DeferredHomepageSection minHeight={680}>
        <YoutubeShowcase />
      </DeferredHomepageSection>
      <DeferredHomepageSection minHeight={520}>
        <LatestBlogTutorials />
      </DeferredHomepageSection>
      <Contact />
    </main>
  )
}

function NotFound() {
  useSeo({
    title: '404 - Page Not Found | Emmanuel Aning',
    description: 'The page you are looking for could not be found.',
    canonical: getDomain() + '/404',
    type: 'website'
  })

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '20px', color: '#666', marginBottom: '30px' }}>Page not found</p>
      <a href="/" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '16px' }}>
        Back to Home
      </a>
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <>
      <AnimatedBackground />
      <Preloader />
      <HashScroller />
      <Header />
      <div className="route-content-shell" key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:slug" element={<BookDetailPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/startups" element={<StartupPage />} />
            <Route path="/free-resources" element={<FreeResources />} />
            <Route path="/free-resources/prompts" element={<PromptLibrary />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ScrollToTop />
      <Feedback />
    </>
  )
}

export default App
