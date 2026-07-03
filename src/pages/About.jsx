import { Github, CloudRain, Layers, Sparkles, Info } from 'lucide-react'

function About() {
  return (
    <div className="about-page">
      <section className="page-hero glass-card">
        <div>
          <p className="page-overline">About</p>
          <h2>SkySense is a premium weather dashboard.</h2>
          <p className="page-subtitle">
            Crafted for elegant forecasting, analytics, and local storage personalization.
          </p>
        </div>
        <div className="settings-meta">
          <span>WeatherAPI-powered frontend</span>
          <span>Built with React, Vite, and Recharts</span>
        </div>
      </section>

      <section className="section-group about-grid">
        <article className="info-card glass-card">
          <div className="info-card-icon">
            <Sparkles size={24} />
          </div>
          <h3>Project overview</h3>
          <p>
            SkySense delivers modern weather visualization with search, forecast, favorites,
            analytics, and smooth navigation across a premium dashboard experience.
          </p>
        </article>

        <article className="info-card glass-card">
          <div className="info-card-icon">
            <Layers size={24} />
          </div>
          <h3>Technologies used</h3>
          <ul>
            <li>React 19</li>
            <li>Vite</li>
            <li>Recharts</li>
            <li>WeatherAPI</li>
            <li>Lucide icons</li>
          </ul>
        </article>

        <article className="info-card glass-card">
          <div className="info-card-icon">
            <CloudRain size={24} />
          </div>
          <h3>WeatherAPI information</h3>
          <p>
            Forecast data is fetched directly from WeatherAPI and normalized for charts,
            hourly detail, and summary cards.
          </p>
        </article>

        <article className="info-card glass-card">
          <div className="info-card-icon">
            <Github size={24} />
          </div>
          <h3>Developer</h3>
          <p>SkySense is authored as a frontend-only weather dashboard with no backend.</p>
          <p className="info-quiet">GitHub repository placeholder included in the UI.</p>
          <p className="info-version">Version 1.0.0</p>
          <a href="#" className="button button-secondary" aria-label="GitHub repository placeholder">
            View repository
          </a>
        </article>
      </section>
    </div>
  )
}

export default About
