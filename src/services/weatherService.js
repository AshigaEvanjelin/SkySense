const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const apiBase = 'https://api.weatherapi.com/v1'
const timeoutMs = 10000

console.log("API Key:", apiKey);



function createTimeoutSignal(timeout) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  return { signal: controller.signal, cleanup: () => clearTimeout(timeoutId) }
}

function parseLocalTime(localtime) {
  if (!localtime) return { date: '', time: '' }
  const [datePart, timePart] = localtime.split(' ')
  return { date: datePart, time: timePart }
}

export async function getCurrentWeather(city) {
  if (!city || !city.trim()) {
    throw new Error('Please provide a city name.')
  }

  if (!apiKey) {
    throw new Error('Weather API key is not configured.')
  }

  const query = encodeURIComponent(city.trim())
  const url = `${apiBase}/current.json?key=${apiKey}&q=${query}&aqi=yes`
  const { signal, cleanup } = createTimeoutSignal(timeoutMs)

  try {
    const response = await fetch(url, { signal })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.error?.message || `Request failed with status ${response.status}`
      throw new Error(message)
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error.message)
    }

    const { city: localCity, country, localtime } = data.location
    const { temp_c, feelslike_c, condition, humidity, wind_kph, vis_km, pressure_mb, cloud, uv, air_quality } = data.current
    const { date, time } = parseLocalTime(localtime)

    
    

    return {
  city: name,
  country,
  tempC: temp_c,
  feelsLikeC: feelslike_c,
  conditionText: condition.text,
  conditionIcon: `https:${condition.icon}`,
  humidity,
  windKph: wind_kph,
  visibilityKm: vis_km,
  pressureMb: pressure_mb,
  cloudCover: cloud,
  uvIndex: uv,
  aqi: air_quality?.["us-epa-index"] ?? "N/A",
  localDate: date,
  localTime: time,
}
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw new Error(error.message || 'Unable to load weather data.')
  } finally {
    cleanup()
  }
}


