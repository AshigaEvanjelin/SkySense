import { useCallback, useEffect, useMemo, useState } from 'react'
import { Search, MapPin, Moon, Droplet, Wind, Eye, Gauge, Sun, Airplay, Cloud } from 'lucide-react'
import WeatherStatCard from '../components/WeatherStatCard'
import HourlyForecastCard from '../components/HourlyForecastCard'
import WeeklyForecastItem from '../components/WeeklyForecastItem'
import AnalyticsCard from '../components/AnalyticsCard'
import FavoriteCityCard from '../components/FavoriteCityCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorCard from '../components/ErrorCard'
import {
  analyticsPreview,
  favoriteCities,
} from '../services/dashboardData'
import { getWeatherForecast } from '../services/forecastService'

const defaultCity = 'Chennai'

function Home() {
  const [searchValue, setSearchValue] = useState(defaultCity)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const weatherHighlights = useMemo(() => {
    if (!weatherData) return []

    const { current, forecast } = weatherData
    const items = [
      {
        title: 'Humidity',
        value: `${current.humidity}%`,
        description: 'Comfort level',
        icon: Droplet,
      },
      {
        title: 'Wind',
        value: `${current.windKph} km/h`,
        description: 'Current breeze',
        icon: Wind,
      },
      {
        title: 'Visibility',
        value: `${current.visibilityKm} km`,
        description: 'Clear sight',
        icon: Eye,
      },
      {
        title: 'Pressure',
        value: `${current.pressureMb} mb`,
        description: 'Atmospheric pressure',
        icon: Gauge,
      },
      {
        title: 'UV Index',
        value: `${current.uvIndex}`,
        description: 'Current UV exposure',
        icon: Sun,
      },
      {
        title: 'Air Quality',
        value: current.aqi ? `${current.aqi}` : 'N/A',
        description: 'EPA index',
        icon: Airplay,
      },
      {
        title: 'Cloud Cover',
        value: `${current.cloudCover}%`,
        description: 'Cloud coverage',
        icon: Cloud,
      },
    ]

    if (forecast.sunrise) {
      items.push({
        title: 'Sunrise',
        value: forecast.sunrise,
        description: 'Day begins',
        icon: Sun,
      })
    }

    if (forecast.sunset) {
      items.push({
        title: 'Sunset',
        value: forecast.sunset,
        description: 'Golden hour',
        icon: Sun,
      })
    }

    if (forecast.moonPhase) {
      items.push({
        title: 'Moon Phase',
        value: forecast.moonPhase,
        description: 'Lunar phase',
        icon: Cloud,
      })
    }

    if (forecast.maxTemp) {
      items.push({
        title: 'Max Temp',
        value: forecast.maxTemp,
        description: 'Highest today',
        icon: Sun,
      })
    }

    if (forecast.minTemp) {
      items.push({
        title: 'Min Temp',
        value: forecast.minTemp,
        description: 'Lowest today',
        icon: Cloud,
      })
    }

    return items
  }, [weatherData])

  const iconUrl = useMemo(() => {
    if (!weatherData?.current?.conditionIcon) return ''
    return weatherData.current.conditionIcon
  }, [weatherData])

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim() || loading) return

    setLoading(true)
    setError(null)

    try {
      const result = await getWeatherForecast(city)
      setWeatherData(result)
    } catch (fetchError) {
      setWeatherData(null)
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await getWeatherForecast(defaultCity)
        setWeatherData(result)
      } catch (fetchError) {
        setWeatherData(null)
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    void initialFetch()
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
          {weatherData && (
            <p className="hero-meta">
              {weatherData.localDate} · {weatherData.localTime}
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
              <MapPin size={16} /> {weatherData ? `${weatherData.location.city}, ${weatherData.location.country}` : 'Chennai, India'}
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

{!loading && weatherData && (
        <>
          <section className="weather-panel">
            <article className="weather-card glass-card">
              <div className="weather-card-top">
                <div>
                  <p className="eyebrow-text">Today</p>
                  <h1>{Math.round(weatherData.current.tempC)}°C</h1>
                  <p className="weather-location">{weatherData.location.city}, {weatherData.location.country}</p>
                </div>
                <div className="weather-status">{weatherData.current.conditionText}</div>
              </div>

              <div className="weather-card-body">
                <div className="weather-details">
                  <div className="weather-detail-item">
                    <p className="weather-label">Feels like</p>
                    <p className="weather-value">{Math.round(weatherData.current.feelsLikeC)}°C</p>
                  </div>
                  <div className="weather-detail-item">
                    <p className="weather-label">Local time</p>
                    <p className="weather-value">{weatherData.localTime}</p>
                  </div>
                  <div className="weather-detail-item">
                    <p className="weather-label">Local date</p>
                    <p className="weather-value">{weatherData.localDate}</p>
                  </div>
                </div>
                <div className="weather-visual">
                  <div className="weather-condition-card">
                    <img
                      src={iconUrl}
                      alt={weatherData.current.conditionText}
                      width="104"
                      height="104"
                    />
                    <p className="weather-condition-text">{weatherData.current.conditionText}</p>
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

      {!loading && !weatherData && !error && <p className="empty-state">Search for a city to view weather.</p>}

      <section className="section-group">
        <div className="section-heading">
          <div>
            <p className="section-overline">Hourly Forecast</p>
            <h3>What to expect this afternoon</h3>
          </div>
        </div>
        <div className="hourly-scroll" aria-label="Hourly forecast">
          {weatherData?.forecast?.hourly?.length > 0
            ? weatherData.forecast.hourly.map((item) => (
                <HourlyForecastCard key={item.time} {...item} />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <HourlyForecastCard key={`placeholder-${index}`} time="--:--" temp="--" icon={null} chanceOfRain="--" />
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
            {weatherData?.forecast?.daily?.length > 0
              ? weatherData.forecast.daily.map((item) => (
                  <WeeklyForecastItem key={item.day} {...item} />
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <WeeklyForecastItem key={`placeholder-${index}`} day="--" condition="--" maxTemp="--" minTemp="--" rain="--" icon={null} />
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
