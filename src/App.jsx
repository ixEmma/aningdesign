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
    title: 'Emmanuel Aning | Top Creative Web Designer & Graphic Designer 2025',
    description: 'Emmanuel Aning is a Graphic Designer and Web Developer in Accra, Ghana, building high-performing websites, brand systems, and conversion-focused digital experiences.',
    canonical: getDomain(),
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
      <Feedback />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App

