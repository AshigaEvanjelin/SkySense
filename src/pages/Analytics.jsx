import { useEffect, useMemo, useState } from 'react'
import { Droplet, Wind, Gauge, Sun, Cloud, Eye } from 'lucide-react'
import WeatherAnalyticsCharts from '../components/WeatherAnalyticsCharts'
import WeatherSummaryCard from '../components/WeatherSummaryCard'
import WeatherStatCard from '../components/WeatherStatCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorCard from '../components/ErrorCard'
import { loadRecents, loadFavorites } from '../utils/storage'
import { getWeatherForecast } from '../services/forecastService'

const defaultCity = 'Chennai'

function Analytics() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sourceCity, setSourceCity] = useState(defaultCity)

  useEffect(() => {
    const initial = async () => {
      setLoading(true)
      setError(null)
      const recent = loadRecents()
      const favorite = loadFavorites()
      const city = recent[0] || favorite[0]?.city || defaultCity
      setSourceCity(city)

      try {
        const result = await getWeatherForecast(city)
        setWeatherData(result)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    void initial()
  }, [])

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
        description: 'Wind speed',
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
        description: 'UV exposure',
        icon: Sun,
      },
      {
        title: 'Cloud Cover',
        value: `${current.cloudCover}%`,
        description: 'Cloud coverage',
        icon: Cloud,
      },
    ]

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

  return (
    <div className="analytics-page">
      <section className="page-hero glass-card">
        <div>
          <p className="page-overline">Analytics</p>
          <h2>Weather trends and live scorecards.</h2>
          <p className="page-subtitle">
            Explore temperature, humidity, wind, and UV insights for your latest location.
          </p>
        </div>
        <div className="page-hero-meta">
          <span>{sourceCity}</span>
          <span>Live analytics overview</span>
        </div>
      </section>

      {loading && <LoadingSpinner />}
      {error && <ErrorCard message={error} />}

      {!loading && weatherData && (
        <>
          <section className="section-group">
            <div className="section-heading">
              <div>
                <p className="section-overline">Insights</p>
                <h3>Key metrics</h3>
              </div>
            </div>
            <div className="stats-grid">
              {weatherHighlights.map((item) => (
                <WeatherStatCard key={item.title} {...item} />
              ))}
            </div>
          </section>

          <section className="section-group section-split">
            <WeatherSummaryCard summary={weatherSummary} />
          </section>

          <section className="section-group">
            <div className="section-heading">
              <div>
                <p className="section-overline">Trend charts</p>
                <h3>Hourly weather patterns</h3>
              </div>
            </div>
            <WeatherAnalyticsCharts hourlyData={hourlyChartData} />
          </section>
        </>
      )}

      {!loading && !weatherData && !error && (
        <article className="empty-state-card glass-card">
          <h3>No analytics available yet.</h3>
          <p>Search a location on the Dashboard to populate this page.</p>
        </article>
      )}
    </div>
  )
}

export default Analytics
