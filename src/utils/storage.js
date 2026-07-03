const FAVORITES_KEY = 'skysense_favorites'
const RECENTS_KEY = 'skysense_recents'
const MAX_FAVORITES = 10
const MAX_RECENTS = 8

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function loadFavorites() {
  const stored = window.localStorage.getItem(FAVORITES_KEY)
  return Array.isArray(safeParse(stored)) ? safeParse(stored) : []
}

export function saveFavorites(favorites) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.slice(0, MAX_FAVORITES)))
}

export function loadRecents() {
  const stored = window.localStorage.getItem(RECENTS_KEY)
  return Array.isArray(safeParse(stored)) ? safeParse(stored) : []
}

export function saveRecents(recents) {
  window.localStorage.setItem(RECENTS_KEY, JSON.stringify(recents.slice(0, MAX_RECENTS)))
}

export function addRecentCity(recents, city) {
  const normalized = city.trim()
  if (!normalized) return recents

  const updated = [normalized, ...recents.filter((item) => item.toLowerCase() !== normalized.toLowerCase())]
  return updated.slice(0, MAX_RECENTS)
}

export function addFavoriteCity(favorites, cityData) {
  const normalized = cityData.city.trim()
  if (!normalized) return favorites

  const existing = favorites.some((item) => item.city.toLowerCase() === normalized.toLowerCase())
  if (existing) return favorites

  if (favorites.length >= MAX_FAVORITES) {
    return favorites
  }

  return [{ ...cityData, city: normalized }, ...favorites]
}

export function removeFavoriteCity(favorites, cityName) {
  return favorites.filter((item) => item.city.toLowerCase() !== cityName.trim().toLowerCase())
}

export function isFavoriteCity(favorites, cityName) {
  return favorites.some((item) => item.city.toLowerCase() === cityName.trim().toLowerCase())
}
