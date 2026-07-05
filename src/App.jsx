import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Works from './components/Works'
import Skills from './components/Skills'
import Blueprint from './components/Blueprint'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import YoutubeShowcase from './components/YoutubeShowcase'
import Feedback from './components/Feedback'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnimatedBackground from './components/AnimatedBackground'
import Testimonials from './components/Testimonials'
import LatestBlogTutorials from './components/blog/LatestBlogTutorials'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ThankYou from './pages/ThankYou'
import StartupPage from './pages/StartupPage'
import { useSeo } from './utils/seo'
import { getDomain } from './utils/domain'

function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [location.pathname, location.hash])

  return null
}

function LandingPage() {
  useSeo({
    title: 'Emmanuel Aning | Web Designer & Software Developer in Ghana',
    description: 'Emmanuel Aning is a web designer, software developer, and graphic designer in Accra, Ghana, building WordPress, React, UI/UX, and conversion-focused digital experiences for clients worldwide.',
    canonical: getDomain(),
    keywords: 'web designer Ghana, software developer Ghana, WordPress developer Ghana, React developer Ghana, UI UX designer Ghana, graphic designer Accra, international web design services, Emmanuel Aning, Aning Design',
    type: 'website'
  })

  return (
    <>
      <Hero />
      <Works />
      <Skills />
      <Blueprint />
      <About />
      <Projects />
      <Testimonials />
      <YoutubeShowcase />
      <LatestBlogTutorials />
      <Services />
      <Contact />
    </>
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
  return (
    <>
      <AnimatedBackground />
      <Preloader />
      <HashScroller />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/startups" element={<StartupPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <Feedback />
    </>
  )
}

export default App
