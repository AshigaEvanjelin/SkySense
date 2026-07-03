import { useEffect, useMemo, useState } from 'react'
import { Search, MapPin, Moon, Droplet, Wind, Eye, Gauge, Sun, Airplay, Cloud } from 'lucide-react'
import WeatherStatCard from '../components/WeatherStatCard'
import HourlyForecastCard from '../components/HourlyForecastCard'
import WeeklyForecastItem from '../components/WeeklyForecastItem'
import AnalyticsCard from '../components/AnalyticsCard'
import FavoriteCityCard from '../components/FavoriteCityCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorCard from '../components/ErrorCard'
import {
  hourlyForecast,
  weeklyForecast,
  analyticsPreview,
  favoriteCities,
} from '../services/dashboardData'
import { getCurrentWeather } from '../services/weatherService'

const defaultCity = 'Chennai'

function Home() {
  const [searchValue, setSearchValue] = useState(defaultCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const weatherHighlights = useMemo(() => {
    if (!weather) return []

    return [
      {
        title: 'Humidity',
        value: `${weather.humidity}%`,
        description: 'Comfort level',
        icon: Droplet,
      },
      {
        title: 'Wind',
        value: `${weather.windKph} km/h`,
        description: 'Current breeze',
        icon: Wind,
      },
      {
        title: 'Visibility',
        value: `${weather.visibilityKm} km`,
        description: 'Clear sight',
        icon: Eye,
      },
      {
        title: 'Pressure',
        value: `${weather.pressureMb} mb`,
        description: 'Atmospheric pressure',
        icon: Gauge,
      },
      {
        title: 'UV Index',
        value: `${weather.uvIndex}`,
        description: 'Current UV exposure',
        icon: Sun,
      },
      {
        title: 'Air Quality',
        value: weather.aqi ? `${weather.aqi}` : 'N/A',
        description: 'EPA index',
        icon: Airplay,
      },
      {
        title: 'Cloud Cover',
        value: `${weather.cloudCover}%`,
        description: 'Cloud coverage',
        icon: Cloud,
      },
    ]
  }, [weather])

  const iconUrl = useMemo(() => {
    if (!weather?.conditionIcon) return ''
    return weather.conditionIcon.startsWith('http')
      ? weather.conditionIcon
      : `https:${weather.conditionIcon}`
  }, [weather])

  const fetchWeather = async (city) => {
    if (!city.trim() || loading) return

    setLoading(true)
    setError(null)

    try {
      const result = await getCurrentWeather(city)
      setWeather(result)
    } catch (fetchError) {
      setWeather(null)
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(defaultCity)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = searchValue.trim()
    if (!trimmed) {
      setError('Please enter a city name to search.')
      return
    }
    fetchWeather(trimmed)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

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
          {weather && (
            <p className="hero-meta">
              {weather.localDate} · {weather.localTime}
            </p>
          )}
        </div>

        <div className="hero-actions-card">
          <form className="search-form" onSubmit={handleSubmit}>
            <label className="search-field">
              <Search size={18} />
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search location"
                aria-label="Search location"
                disabled={loading}
              />
            </label>
            <button type="submit" className="search-button" disabled={loading}>
              Search
            </button>
          </form>
          {error && <ErrorCard message={error} />}
          <div className="hero-action-buttons">
            <button type="button" className="pill-button" disabled>
              <MapPin size={16} /> {weather ? `${weather.city}, ${weather.country}` : 'Chennai, India'}
            </button>
            <button type="button" className="pill-button pill-secondary" disabled>
              <Moon size={16} /> Dark mode
            </button>
            <button type="button" className="pill-button pill-secondary" disabled>
              °C / °F
            </button>
          </div>
        </div>
      </section>

      {loading && <LoadingSpinner />}

      {!loading && weather && (
        <>
          <section className="weather-panel">
            <article className="weather-card glass-card">
              <div className="weather-card-top">
                <div>
                  <p className="eyebrow-text">Today</p>
                  <h1>{Math.round(weather.tempC)}°C</h1>
                  <p className="weather-location">{weather.city}, {weather.country}</p>
                </div>
                <div className="weather-status">{weather.conditionText}</div>
              </div>

              <div className="weather-card-body">
                <div className="weather-details">
                  <div className="weather-detail-item">
                    <p className="weather-label">Feels like</p>
                    <p className="weather-value">{Math.round(weather.feelsLikeC)}°C</p>
                  </div>
                  <div className="weather-detail-item">
                    <p className="weather-label">Local time</p>
                    <p className="weather-value">{weather.localTime}</p>
                  </div>
                  <div className="weather-detail-item">
                    <p className="weather-label">Local date</p>
                    <p className="weather-value">{weather.localDate}</p>
                  </div>
                </div>
                <div className="weather-visual">
                  <div className="weather-condition-card">
                    <img
                      src={iconUrl}
                      alt={weather.conditionText}
                      width="104"
                      height="104"
                    />
                    <p className="weather-condition-text">{weather.conditionText}</p>
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
        </>
      )}

      {!loading && !weather && !error && <p className="empty-state">Search for a city to view weather.</p>}

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
