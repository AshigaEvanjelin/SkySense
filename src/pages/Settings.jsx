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
          <h2>Professional preferences for your dashboard.</h2>
          <p className="page-subtitle">
            Configure display options, refresh controls, and local storage settings.
          </p>
        </div>
        <div className="settings-meta">
          <span>Offline UI settings</span>
          <span>Fast and responsive</span>
        </div>
      </section>

      <section className="section-group settings-grid">
        <article className="settings-card glass-card">
          <h3>Display preferences</h3>
          <div className="settings-control split">
            <div>
              <p>Temperature unit</p>
              <small>UI only; no conversion is applied globally.</small>
            </div>
            <select
              value={temperatureUnit}
              onChange={(event) => setTemperatureUnit(event.target.value)}
            >
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </select>
          </div>

          <div className="settings-control split">
            <div>
              <p>Time format</p>
              <small>Preferred display style for time labels.</small>
            </div>
            <select value={timeFormat} onChange={(event) => setTimeFormat(event.target.value)}>
              <option value="24h">24-hour</option>
              <option value="12h">12-hour</option>
            </select>
          </div>
        </article>

        <article className="settings-card glass-card">
          <h3>Dashboard controls</h3>
          <div className="settings-actions">
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
          </div>
          {message && <p className="settings-message">{message}</p>}
        </article>

        <article className="settings-card glass-card">
          <h3>Project details</h3>
          <p>SkySense remains a frontend-only professional dashboard experience.</p>
          <ul>
            <li>React + Vite</li>
            <li>Recharts analytics</li>
            <li>WeatherAPI forecast</li>
            <li>Local Storage personalization</li>
          </ul>
          <p className="settings-note">
            About page has been removed; this section now surfaces the same product intent.
          </p>
        </article>
      </section>
    </div>
  )
}

export default Settings
