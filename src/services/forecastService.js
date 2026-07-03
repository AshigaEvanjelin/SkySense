const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const apiBase = 'https://api.weatherapi.com/v1'
const timeoutMs = 10000

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

function getDayName(dateString) {
  try {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

function formatHourlyForecast(hours, currentLocaltime) {
  const currentTimestamp = new Date(currentLocaltime).getTime()

  return hours
    .filter((hour) => new Date(hour.time).getTime() >= currentTimestamp)
    .slice(0, 12)
    .map((hour) => ({
      time: hour.time.split(' ')[1],
      temp: `${Math.round(hour.temp_c)}°`,
      icon: hour.condition.icon.startsWith('http') ? hour.condition.icon : `https:${hour.condition.icon}`,
      conditionText: hour.condition.text,
      chanceOfRain: hour.chance_of_rain != null ? `${hour.chance_of_rain}%` : '0%',
    }))
}

function formatDailyForecast(forecastDays) {
  return forecastDays.map((day) => {
    const maxTemp = `${Math.round(day.day.maxtemp_c)}°`
    const minTemp = `${Math.round(day.day.mintemp_c)}°`
    const chanceOfRain = day.day.daily_chance_of_rain != null ? `${day.day.daily_chance_of_rain}%` : '0%'

    return {
      day: getDayName(day.date),
      icon: day.day.condition.icon.startsWith('http') ? day.day.condition.icon : `https:${day.day.condition.icon}`,
      condition: day.day.condition.text,
      temp: `${maxTemp} / ${minTemp}`,
      rain: chanceOfRain,
      maxTemp,
      minTemp,
      chanceOfRain,
    }
  })
}

export async function getWeatherForecast(city, days = 3) {
  if (!city || !city.trim()) {
    throw new Error('Please provide a city name.')
  }

  if (!apiKey) {
    throw new Error('Weather API key is not configured.')
  }

  const query = encodeURIComponent(city.trim())
  const url = `${apiBase}/forecast.json?key=${apiKey}&q=${query}&days=${days}&aqi=yes&alerts=no`
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

    const { name: cityName, country, localtime } = data.location
    const { temp_c, feelslike_c, condition, humidity, wind_kph, vis_km, pressure_mb, cloud, uv, air_quality } = data.current
    const forecastDays = data.forecast?.forecastday || []

    if (forecastDays.length === 0) {
      throw new Error('Forecast data is unavailable for this location.')
    }

    const daily = formatDailyForecast(forecastDays)
    const hourly = formatHourlyForecast(forecastDays[0].hour || [], data.location.localtime)
    const { date, time } = parseLocalTime(localtime)
    const currentDay = forecastDays[0]
    const sunrise = currentDay?.astro?.sunrise ?? null
    const sunset = currentDay?.astro?.sunset ?? null
    const moonPhase = currentDay?.astro?.moon_phase ?? null
    const maxTemp = currentDay?.day?.maxtemp_c != null ? `${Math.round(currentDay.day.maxtemp_c)}°` : null
    const minTemp = currentDay?.day?.mintemp_c != null ? `${Math.round(currentDay.day.mintemp_c)}°` : null

    return {
      location: {
        city: cityName,
        country,
      },
      current: {
        tempC: temp_c,
        feelsLikeC: feelslike_c,
        conditionText: condition.text,
        conditionIcon: condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`,
        humidity,
        windKph: wind_kph,
        visibilityKm: vis_km,
        pressureMb: pressure_mb,
        cloudCover: cloud,
        uvIndex: uv,
        aqi: air_quality?.['us-epa-index'] ?? null,
      },
      forecast: {
        hourly,
        daily,
        sunrise,
        sunset,
        moonPhase,
        maxTemp,
        minTemp,
      },
      localDate: date,
      localTime: time,
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw new Error(error.message || 'Unable to load forecast data.', { cause: error })
  } finally {
    cleanup()
  }
}
