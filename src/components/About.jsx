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
            Hi, I'm Emmanuel Aning and I'm a creative Graphic Designer
            and Web Designer from Accra, Ghana. I specialize in creating visually striking designs
            and functional websites that not only look great but also deliver
            results.
          </strong>
        </p>
        <p>
          Over the years, I have worked on a wide range of creative projects
          including sports graphics, website design and UI/UX designs, brand identity systems, product packaging,
          social media campaigns, event promotional flyers, marketing campaign designs, and
          digital/print advertising. My passion for design drives me to stay updated with the latest trends
          and technologies in the industry, ensuring that my work is always fresh and relevant.
        </p>
      </div>
    </div>
  )
}

export default About