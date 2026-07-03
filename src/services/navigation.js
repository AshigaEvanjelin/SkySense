import {
  Gauge,
  Star,
  Activity,
  Settings,
  Info,
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: Gauge },
  { path: '/favorites', label: 'Favorites', icon: Star },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/about', label: 'About', icon: Info },
]

export default navItems
