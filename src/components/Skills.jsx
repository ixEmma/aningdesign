import './Skills.css'

// Skills data - icons for each skill
const designSkills = [
  { name: 'Adobe Photoshop', icon: '/images/photoshop.svg' },
  { name: 'Figma', icon: '/images/figma.svg' },
  { name: 'Adobe Illustrator', icon: '/images/adobe-illustrator-cc.svg' },
  { name: 'Adobe After Effects', icon: '/images/after-effects.svg' },
  { name: 'Adobe Premiere Pro', icon: '/images/premiere-pro-cc.svg' },
  { name: 'Adobe InDesign', icon: '/images/adobe-indesign.svg' },
  { name: 'Canva', icon: '/images/canva.svg' },
  { name: 'Affinity', icon: '/images/affinity.svg' },
  { name: 'Framer', icon: '/images/framer.svg' },
  { name: 'Webflow', icon: '/images/Webflow.webp' },
  { name: 'Squarespace', icon: '/images/squarespace.svg' }
]

const developmentSkills = [
  { name: 'HTML', icon: '/images/html-1.svg' },
  { name: 'CSS', icon: '/images/css-3.svg' },
  { name: 'Software Development', icon: '/images/html-1.svg' },
  { name: 'Git', icon: '/images/git-icon.svg' },
  { name: 'GitHub', icon: '/images/github-icon-1.svg' },
  { name: 'WordPress', icon: '/images/wordpress-icon.svg' },
  { name: 'Firebase', icon: '/images/firebase-3.svg' },
  { name: 'Vercel', icon: '/images/vercel.svg' },
  { name: 'React', icon: '/images/react.svg' },
  { name: 'Elementor', icon: '/images/elementor.svg' },
  { name: 'Netlify', icon: '/images/netlify.svg' },
  { name: 'Cloudflare', icon: '/images/cloudflare.svg' },
  { name: 'XAMPP', icon: '/images/xampp.svg' },
  { name: 'Google Search Console', icon: '/images/google-search-console.svg' },
  { name: 'SEO', icon: '/images/seo.svg' },
  { name: 'Codex', icon: '/images/codex.svg' },
  { name: 'Cursor AI', icon: '/images/icons8-cursor-ai-48.png' },
  { name: 'Gemini AI', icon: '/images/gemini-ai.svg' }
]

function SkillCard({ skill }) {
  return (
    <div className="skill-item">
      <img src={skill.icon} alt={`${skill.name} Logo`} />
      <span className="skill-name">{skill.name}</span>
    </div>
  )
}

function SkillsTrack({ skills, reverse = false }) {
  return (
    <div className={`skills-track${reverse ? ' skills-track--reverse' : ''}`}>
      {/* First set of skills */}
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
      {/* Duplicate for seamless loop */}
      {skills.map((skill) => (
        <SkillCard key={`dup-${skill.name}`} skill={skill} />
      ))}
    </div>
  )
}

function Skills() {
  return (
    <div className="my-skills" id="skills">
      <h2 className="section-title">MY SKILLS</h2>
      
      {/* CSS-only infinite scroll carousel */}
      <div className="skills-slider">
        <SkillsTrack skills={designSkills} />
        <SkillsTrack skills={developmentSkills} reverse />
      </div>
      
      <hr className="rule" />
    </div>
  )
}

export default Skills
