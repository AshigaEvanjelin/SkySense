import { useState } from 'react'
import { ChevronRight, Trash2, Zap } from 'lucide-react'
import { saveFavorites, saveRecents } from '../utils/storage'

function Settings() {
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius')
  const [timeFormat, setTimeFormat] = useState('24h')
  const [message, setMessage] = useState('')

  return (
    <div className="settings-page">
      <section className="page-hero glass-card">
        <div>
          <p className="page-overline">Settings</p>
          <h2>Personalize your SkySense experience.</h2>
          <p className="page-subtitle">
            Adjust display preferences, clear your dashboard data, and review app settings.
          </p>
        </div>
        <div className="settings-meta">
          <span>UI preference only</span>
          <span>No backend changes</span>
        </div>
      </section>

      <section className="section-group">
        <article className="settings-card glass-card">
          <h3>Display preferences</h3>
          <div className="settings-control">
            <label>
              <span>Temperature unit</span>
              <select
                value={temperatureUnit}
                onChange={(event) => setTemperatureUnit(event.target.value)}
              >
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
              </select>
            </label>
          </div>
          <div className="settings-control">
            <label>
              <span>Time format</span>
              <select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value)}>
                <option value="24h">24-hour</option>
                <option value="12h">12-hour</option>
              </select>
            </label>
          </div>
        </article>

        <article className="settings-card glass-card">
          <h3>Dashboard controls</h3>
          <button
            type="button"
            className="pill-button pill-secondary"
            onClick={() => {
              saveRecents([])
              setMessage('Recent searches cleared.')
            }}
          >
            <Trash2 size={16} /> Clear recent searches
          </button>
          <button
            type="button"
            className="pill-button pill-secondary"
            onClick={() => {
              saveFavorites([])
              setMessage('Favorites cleared.')
            }}
          >
            <Trash2 size={16} /> Clear favorites
          </button>
          {message && <p className="settings-message">{message}</p>}
        </article>

        <article className="settings-card glass-card">
          <h3>Application info</h3>
          <p>SkySense is a premium weather UI built for fast, modern frontend dashboards.</p>
          <ul>
            <li>Temperature unit preference is UI-only.</li>
            <li>Time format selection is illustrative.</li>
            <li>Local storage controls affect saved dashboard data.</li>
          </ul>
          <p className="settings-note">
            Want to learn more? Visit the About page for technology details.
          </p>
        </article>
      </section>
    </div>
  )
}

export default Settings
