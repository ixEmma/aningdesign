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

function App() {
  return (
    <>
      <AnimatedBackground />
      <Preloader />
      <Header />
      <Hero />
      <Works />
      <Skills />
      <Blueprint />
      <About />
       <Projects />
      <YoutubeShowcase />
      <Feedback />
      <Services />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App

