import { Search, MapPin, Moon } from 'lucide-react'
import WeatherStatCard from '../components/WeatherStatCard'
import HourlyForecastCard from '../components/HourlyForecastCard'
import WeeklyForecastItem from '../components/WeeklyForecastItem'
import AnalyticsCard from '../components/AnalyticsCard'
import FavoriteCityCard from '../components/FavoriteCityCard'
import {
  weatherHighlights,
  hourlyForecast,
  weeklyForecast,
  analyticsPreview,
  favoriteCities,
} from '../services/dashboardData'

function Home() {
  return (
    <div className="dashboard-home">
      <section className="hero-panel glass-card">
        <div className="hero-copy">
          <p className="hero-overline">Good morning 👋</p>
          <h2>Welcome to SkySense</h2>
          <p className="hero-description">
            Your premium weather cockpit. Explore clean daily insights, horizon forecasts,
            and elegant controls built for a modern dashboard experience.
          </p>
        </div>

        <div className="hero-actions-card">
          <label className="search-field">
            <Search size={18} />
            <input type="text" placeholder="Search location" aria-label="Search location" />
          </label>
          <div className="hero-action-buttons">
            <button type="button" className="pill-button">
              <MapPin size={16} /> Chennai, India
            </button>
            <button type="button" className="pill-button pill-secondary">
              <Moon size={16} /> Dark mode
            </button>
            <button type="button" className="pill-button pill-secondary">
              °C / °F
            </button>
          </div>
        </div>
      </section>

      <section className="weather-panel">
        <article className="weather-card glass-card">
          <div className="weather-card-top">
            <div>
              <p className="eyebrow-text">Today</p>
              <h1>31°C</h1>
              <p className="weather-location">Chennai, India</p>
            </div>
            <div className="weather-status">Clear Sky</div>
          </div>

          <div className="weather-card-body">
            <div className="weather-details">
              <div className="weather-detail-item">
                <p className="weather-label">Feels like</p>
                <p className="weather-value">34°C</p>
              </div>
              <div className="weather-detail-item">
                <p className="weather-label">High</p>
                <p className="weather-value">33°</p>
              </div>
              <div className="weather-detail-item">
                <p className="weather-label">Low</p>
                <p className="weather-value">28°</p>
              </div>
            </div>
            <div className="weather-visual">
              <div className="weather-illustration" aria-hidden="true">
                <span className="weather-sun" />
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="section-group">
        <div className="section-heading">
          <div>
            <p className="section-overline">Weather Highlights</p>
            <h3>Today's quick insights</h3>
          </div>
        </div>
        <div className="stats-grid">
          {weatherHighlights.map((item) => (
            <WeatherStatCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="section-group">
        <div className="section-heading">
          <div>
            <p className="section-overline">Hourly Forecast</p>
            <h3>What to expect this afternoon</h3>
          </div>
        </div>
        <div className="hourly-scroll" aria-label="Hourly forecast">
          {hourlyForecast.map((item) => (
            <HourlyForecastCard key={item.time} {...item} />
          ))}
        </div>
      </section>

      <section className="section-group section-split">
        <div className="weekly-panel glass-card">
          <div className="section-heading">
            <div>
              <p className="section-overline">7 Day Forecast</p>
              <h3>Week ahead</h3>
            </div>
          </div>
          <div className="weekly-list">
            {weeklyForecast.map((item) => (
              <WeeklyForecastItem key={item.day} {...item} />
            ))}
          </div>
        </div>

        <div className="analytics-panel">
          <div className="section-heading">
            <div>
              <p className="section-overline">Analytics Preview</p>
              <h3>Trends at a glance</h3>
            </div>
          </div>
          <div className="analytics-grid">
            {analyticsPreview.map((item) => (
              <AnalyticsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-group">
        <div className="section-heading">
          <div>
            <p className="section-overline">Favorite Cities</p>
            <h3>Global weather lookbook</h3>
          </div>
        </div>
        <div className="favorites-grid">
          {favoriteCities.map((city) => (
            <FavoriteCityCard key={city.city} {...city} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
