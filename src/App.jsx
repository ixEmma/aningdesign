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
    canonical: 'https://aningdesign.com',
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
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App

