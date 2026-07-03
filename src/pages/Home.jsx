import { useCallback, useEffect, useMemo, useState } from 'react'
import { Search, MapPin, Moon, Droplet, Wind, Eye, Gauge, Sun, Airplay, Cloud } from 'lucide-react'
import WeatherStatCard from '../components/WeatherStatCard'
import HourlyForecastCard from '../components/HourlyForecastCard'
import WeeklyForecastItem from '../components/WeeklyForecastItem'
import WeatherAnalyticsCharts from '../components/WeatherAnalyticsCharts'
import WeatherSummaryCard from '../components/WeatherSummaryCard'
import FavoriteCityCard from '../components/FavoriteCityCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorCard from '../components/ErrorCard'
import Toast from '../components/Toast'
import {
  loadFavorites,
  saveFavorites,
  loadRecents,
  saveRecents,
  addRecentCity,
  addFavoriteCity,
  removeFavoriteCity,
  isFavoriteCity,
} from '../utils/storage'
import { getWeatherForecast } from '../services/forecastService'

const defaultCity = 'Chennai'

function Home() {
  const [searchValue, setSearchValue] = useState(defaultCity)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [toast, setToast] = useState(null)

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }, [])

  const themeClass = useMemo(() => {
    const condition = weatherData?.current?.conditionText?.toLowerCase() || ''
    if (condition.includes('snow')) return 'theme-snow'
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('storm')) return 'theme-rain'
    if (condition.includes('cloud')) return 'theme-cloudy'
    if (weatherData?.current?.isDay === 0 || condition.includes('night')) return 'theme-night'
    return 'theme-sunny'
  }, [weatherData])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timerId = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timerId)
  }, [toast])

  const updateRecents = useCallback((city) => {
    setRecentSearches((current) => {
      const next = addRecentCity(current, city)
      saveRecents(next)
      return next
    })
  }, [])

  const updateFavorites = useCallback((nextFavorites) => {
    setFavorites(nextFavorites)
    saveFavorites(nextFavorites)
  }, [])

  useEffect(() => {
    const storedFavorites = loadFavorites()
    const storedRecents = loadRecents()
    setFavorites(storedFavorites)
    setRecentSearches(storedRecents)

    if (storedFavorites.length === 0) return
    const refreshFavorites = async () => {
      const refreshed = await Promise.all(
        storedFavorites.map(async (favorite) => {
          try {
            const result = await getWeatherForecast(favorite.city)
            return {
              city: favorite.city,
              country: favorite.country ?? result.location.country,
              temp: `${Math.round(result.current.tempC)}°`,
              condition: result.current.conditionText,
              icon: result.current.conditionIcon,
            }
          } catch {
            return favorite
          }
        }),
      )
      updateFavorites(refreshed)
    }

    void refreshFavorites()
  }, [updateFavorites])

  const iconUrl = useMemo(() => {
    if (!weatherData?.current?.conditionIcon) return ''
    return weatherData.current.conditionIcon
  }, [weatherData])

  const fetchWeather = useCallback(
    async (city, saveRecent = false) => {
      const trimmedCity = city.trim()
      if (!trimmedCity || loading) return

      setLoading(true)
      setError(null)

      try {
        const result = await getWeatherForecast(trimmedCity)
        setWeatherData(result)

        if (saveRecent) {
          updateRecents(trimmedCity)
        }
        setSearchValue(trimmedCity)
      } catch (fetchError) {
        setWeatherData(null)
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    },
    [loading, updateRecents],
  )

  const handleAddFavorite = useCallback(() => {
    if (!weatherData) return

    const cityName = weatherData.location.city
    if (isFavoriteCity(favorites, cityName)) {
      showToast(`${cityName} is already in Favorites`, 'info')
      return
    }

    if (favorites.length >= 10) {
      showToast('Favorites limit is 10 cities. Remove one to add another.', 'warning')
      return
    }

    const nextFavorites = addFavoriteCity(favorites, {
      city: cityName,
      country: weatherData.location.country,
      temp: `${Math.round(weatherData.current.tempC)}°`,
      condition: weatherData.current.conditionText,
      icon: iconUrl,
    })

    updateFavorites(nextFavorites)
    showToast(`Added ${cityName} to Favorites`, 'success')
  }, [favorites, iconUrl, showToast, updateFavorites, weatherData])

  const handleRemoveFavorite = useCallback(
    (cityName) => {
      const nextFavorites = removeFavoriteCity(favorites, cityName)
      updateFavorites(nextFavorites)
      showToast(`Removed ${cityName} from Favorites`, 'success')
    },
    [favorites, showToast, updateFavorites],
  )

  const handleSelectFavorite = useCallback(
    (cityName) => {
      void fetchWeather(cityName, true)
    },
    [fetchWeather],
  )

  const handleUseRecent = useCallback(
    (cityName) => {
      void fetchWeather(cityName, true)
    },
    [fetchWeather],
  )

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

  const hourlyChartData = useMemo(() => {
    if (!weatherData?.forecast?.hourly) return []

    return weatherData.forecast.hourly.slice(0, 12).map((hour) => ({
      time: hour.time,
      temperature: Number((hour.temperature ?? hour.temp)?.toString().replace('°', '')) || 0,
      humidity: Number(hour.humidity ?? 0),
      wind: Number(hour.wind ?? 0),
      rainChance: Number(hour.rainChance ?? 0),
      uv: Number(hour.uv ?? 0),
    }))
  }, [weatherData])

  const weatherSummary = useMemo(() => {
    if (!weatherData) return []

    const hourly = weatherData.forecast.hourly || []
    const numericTemps = hourly
      .map((hour) => Number(hour.temperature?.toString().replace('°', '')))
      .filter((temp) => !Number.isNaN(temp))
    const averageTemp = numericTemps.length
      ? `${(numericTemps.reduce((sum, temp) => sum + temp, 0) / numericTemps.length).toFixed(1)}°`
      : '--'

    return [
      { label: 'Highest temperature', value: weatherData.forecast.maxTemp ?? '--' },
      { label: 'Lowest temperature', value: weatherData.forecast.minTemp ?? '--' },
      { label: 'Average temperature', value: averageTemp },
      { label: 'Sunrise', value: weatherData.forecast.sunrise ?? '--' },
      { label: 'Sunset', value: weatherData.forecast.sunset ?? '--' },
      { label: 'Moon phase', value: weatherData.forecast.moonPhase ?? '--' },
      { label: 'UV index', value: weatherData.current.uvIndex ?? '--' },
      { label: 'Air quality', value: weatherData.current.aqi ? `${weatherData.current.aqi}` : '--' },
    ]
  }, [weatherData])

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
    fetchWeather(trimmed, true)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className={`dashboard-home ${themeClass}`}>
      <section className="hero-panel glass-card">
        <div className="hero-copy">
          <p className="hero-overline">{greeting}, welcome back</p>
          <div className="hero-weather-headline">
            <h1>{weatherData ? `${Math.round(weatherData.current.tempC)}°C` : 'SkySense'}</h1>
            <span>{weatherData ? weatherData.current.conditionText : 'Premium weather dashboard'}</span>
          </div>
          <p className="hero-description">
            {weatherData
              ? `Live weather in ${weatherData.location.city}, ${weatherData.location.country}`
              : 'Search a city to reveal live forecasts, charts, and personalized favorites.'}
          </p>
          {weatherData && (
            <div className="hero-meta-row">
              <span>{weatherData.localDate}</span>
              <span>{weatherData.localTime}</span>
            </div>
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

          <div className="hero-action-row">
            <button
              type="button"
              className="pill-button pill-primary"
              onClick={handleAddFavorite}
              disabled={!weatherData || loading}
            >
              {weatherData && isFavoriteCity(favorites, weatherData.location.city)
                ? 'Saved to favorites'
                : 'Save to favorites'}
            </button>
          </div>

          {recentSearches.length > 0 && (
            <div className="recent-searches-panel">
              <p className="recent-searches-label">Recent searches</p>
              <div className="recent-pill-list">
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className="pill-button pill-secondary"
                    onClick={() => handleUseRecent(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

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
          {weatherData ? (
            <>
              <WeatherSummaryCard summary={weatherSummary} />
              <WeatherAnalyticsCharts hourlyData={hourlyChartData} />
            </>
          ) : (
            <div className="analytics-empty-state">Search a city to view analytics.</div>
          )}
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
          {favorites.length > 0 ? (
            favorites.map((city) => (
              <FavoriteCityCard
                key={city.city}
                {...city}
                onSelect={() => handleSelectFavorite(city.city)}
                onRemove={() => handleRemoveFavorite(city.city)}
              />
            ))
          ) : (
            <div className="empty-favorites">No favorites saved yet. Save a city to return quickly.</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
