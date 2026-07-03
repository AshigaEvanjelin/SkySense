import { useCallback, useEffect, useState } from 'react'
import { Star, RefreshCcw, Trash2 } from 'lucide-react'
import FavoriteCityCard from '../components/FavoriteCityCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorCard from '../components/ErrorCard'
import { loadFavorites, saveFavorites, removeFavoriteCity } from '../utils/storage'
import { getWeatherForecast } from '../services/forecastService'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshFavorites = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const stored = loadFavorites()
      if (!stored.length) {
        setFavorites([])
        return
      }

      const refreshed = await Promise.all(
        stored.map(async (favorite) => {
          try {
            const result = await getWeatherForecast(favorite.city)
            return {
              ...favorite,
              country: result.location.country,
              temp: `${Math.round(result.current.tempC)}°`,
              condition: result.current.conditionText,
              icon: result.current.conditionIcon,
            }
          } catch {
            return favorite
          }
        }),
      )
      setFavorites(refreshed)
    } catch (fetchError) {
      setError('Unable to refresh favorites.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshFavorites()
  }, [refreshFavorites])

  const handleRemove = useCallback(
    (cityName) => {
      const nextFavorites = removeFavoriteCity(favorites, cityName)
      setFavorites(nextFavorites)
      saveFavorites(nextFavorites)
    },
    [favorites],
  )

  const handleRefresh = useCallback(() => {
    void refreshFavorites()
  }, [refreshFavorites])

  return (
    <div className="favorites-page">
      <section className="page-hero glass-card">
        <div>
          <p className="page-overline">Favorites</p>
          <h2>Saved cities, ready to explore.</h2>
          <p className="page-subtitle">
            Your favorite locations refresh live weather each time you visit.
            Remove or refresh a row whenever you want.
          </p>
        </div>
        <div className="page-hero-actions">
          <button type="button" className="pill-button pill-primary" onClick={handleRefresh}>
            <RefreshCcw size={16} /> Refresh all
          </button>
          <button
            type="button"
            className="pill-button pill-secondary"
            onClick={() => {
              setFavorites([])
              saveFavorites([])
            }}
          >
            <Trash2 size={16} /> Clear favorites
          </button>
        </div>
      </section>

      {loading && <LoadingSpinner />}
      {error && <ErrorCard message={error} />}

      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((city) => (
            <FavoriteCityCard
              key={city.city}
              {...city}
              onSelect={() => refreshFavorites()}
              onRemove={() => handleRemove(city.city)}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <article className="empty-state-card glass-card">
            <Star size={32} />
            <h3>No saved favorites yet</h3>
            <p>Add a city from the Dashboard to keep it ready in this list.</p>
          </article>
        )
      )}
    </div>
  )
}

export default Favorites
