import './About.css'

function About() {
  return (
    <div className="flex-Container" id="about">
      <div className="aboutUs">
        <img
          src="/images/papi.jpg"
          alt="Mr Aning"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="aboutUs">
        <h1>MEET ANING</h1>
        <p className="myself-description">
          <strong>
            Hi, I'm Emmanuel Aning and I'm passionate Freelance Graphic Designer
            and Web Designer. I specialize in creating visually striking designs
            and functional websites that not only look great but also deliver
            results.
          </strong>
        </p>
        <p>
          Over 5 years, I have worked on a wide range of creative projects
          including website design, brand identity systems, product packaging,
          social media campaigns, event promotions, marketing materials, and
          digital/print advertising.
        </p>
      </div>
    </div>
  )
}

export default About

