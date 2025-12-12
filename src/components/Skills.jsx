import './Skills.css'

// Skills data - icons for each skill
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
  { name: 'GitHub', icon: '/images/github-icon-1.svg' },
  { name: 'WordPress', icon: '/images/wordpress-icon.svg' },
  { name: 'Framer', icon: '/images/framer.svg' },
  { name: 'Webflow', icon: '/images/Webflow.webp' },
  { name: 'Canva', icon: '/images/canva.svg' },
  { name: 'Affinity', icon: '/images/affinity.svg' },
  { name: 'Squarespace', icon: '/images/squarespace.svg' },
  { name: 'Firebase', icon: '/images/firebase-3.svg' },
  { name: 'Vercel', icon: '/images/vercel.svg' },
  { name: 'Cursor AI', icon: '/images/icons8-cursor-ai-48.png' },
  { name: 'Gemini AI', icon: '/images/gemini-ai.svg' }
]

function Skills() {
  return (
    <div className="my-skills">
      <h1>MY SKILLS</h1>
      
      {/* CSS-only infinite scroll carousel */}
      <div className="skills-slider">
        <div className="skills-track">
          {/* First set of skills */}
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <img src={skill.icon} alt={`${skill.name} Logo`} />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {skills.map((skill, index) => (
            <div key={`dup-${index}`} className="skill-item">
              <img src={skill.icon} alt={`${skill.name} Logo`} />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <hr className="rule" />
    </div>
  )
}

export default Skills
