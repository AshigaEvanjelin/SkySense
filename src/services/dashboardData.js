import {
  Droplet,
  Wind,
  Eye,
  Gauge,
  Sun,
  Airplay,
  Sunrise,
  Sunset,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Thermometer,
  Sparkles,
} from 'lucide-react'

export const weatherHighlights = [
  {
    title: 'Humidity',
    value: '67%',
    description: 'Comfort level',
    icon: Droplet,
  },
  {
    title: 'Wind',
    value: '14 km/h',
    description: 'Gentle breeze',
    icon: Wind,
  },
  {
    title: 'Visibility',
    value: '10 km',
    description: 'Clear sight',
    icon: Eye,
  },
  {
    title: 'Pressure',
    value: '1018 hPa',
    description: 'Stable atmosphere',
    icon: Gauge,
  },
  {
    title: 'UV Index',
    value: '5',
    description: 'Moderate exposure',
    icon: Sun,
  },
  {
    title: 'AQI',
    value: '44',
    description: 'Good air quality',
    icon: Airplay,
  },
  {
    title: 'Sunrise',
    value: '06:05',
    description: 'Day begins',
    icon: Sunrise,
  },
  {
    title: 'Sunset',
    value: '18:27',
    description: 'Golden hour',
    icon: Sunset,
  },
]

export const hourlyForecast = [
  { time: '08 AM', temp: '29°', icon: CloudSun },
  { time: '09 AM', temp: '30°', icon: CloudSun },
  { time: '10 AM', temp: '31°', icon: CloudSun },
  { time: '11 AM', temp: '32°', icon: CloudSun },
  { time: '12 PM', temp: '33°', icon: CloudSun },
  { time: '01 PM', temp: '33°', icon: CloudRain },
  { time: '02 PM', temp: '32°', icon: CloudLightning },
  { time: '03 PM', temp: '31°', icon: CloudFog },
]

export const weeklyForecast = [
  { day: 'Mon', condition: 'Clear', temp: '32°', rain: '10%', icon: CloudSun },
  { day: 'Tue', condition: 'Cloudy', temp: '31°', rain: '15%', icon: CloudFog },
  { day: 'Wed', condition: 'Rain', temp: '29°', rain: '48%', icon: CloudRain },
  { day: 'Thu', condition: 'Storm', temp: '28°', rain: '65%', icon: CloudLightning },
  { day: 'Fri', condition: 'Cool', temp: '27°', rain: '22%', icon: CloudSnow },
  { day: 'Sat', condition: 'Breezy', temp: '30°', rain: '8%', icon: Wind },
  { day: 'Sun', condition: 'Sunny', temp: '33°', rain: '5%', icon: CloudSun },
]

export const analyticsPreview = [
  {
    title: 'Temperature Trend',
    description: 'Daily trend preview for exterior comfort.',
    icon: Thermometer,
  },
  {
    title: 'Humidity Trend',
    description: 'Track humidity shifts for the week.',
    icon: Droplet,
  },
  {
    title: 'Air Quality',
    description: 'Preview air conditions in key zones.',
    icon: Sparkles,
  },
]

export const favoriteCities = [
  {
    city: 'Bali',
    country: 'Indonesia',
    temp: '28°',
    condition: 'Mostly Sunny',
    icon: CloudSun,
  },
  {
    city: 'Dubai',
    country: 'UAE',
    temp: '37°',
    condition: 'Hot & Clear',
    icon: Sun,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    temp: '24°',
    condition: 'Light Rain',
    icon: CloudRain,
  },
  {
    city: 'London',
    country: 'UK',
    temp: '19°',
    condition: 'Cloudy',
    icon: CloudFog,
  },
]
