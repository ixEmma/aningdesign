import './Works.css'

function Works() {
  return (
    <section className="works-section">
      <div className="works-slider">
        <div className="works-track">
          {/* First set of works */}
          <div className="work-card">
            <img src="/images/work1.jpg" alt="Work 1" />
          </div>
          <div className="work-card">
            <img src="/images/work2.jpg" alt="Work 2" />
          </div>
          <div className="work-card">
            <img src="/images/work3.jpg" alt="Work 3" />
          </div>

          {/* Duplicate for seamless loop */}
          <div className="work-card">
            <img src="/images/work1.jpg" alt="Work 1" />
          </div>
          <div className="work-card">
            <img src="/images/work2.jpg" alt="Work 2" />
          </div>
          <div className="work-card">
            <img src="/images/work3.jpg" alt="Work 3" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works

