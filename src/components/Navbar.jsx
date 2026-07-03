import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar({ onToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-start">
        <button
          type="button"
          className="menu-button"
          onClick={onToggle}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="topbar-brand">
          SkySense
        </Link>
      </div>
      <div className="topbar-actions" aria-hidden="true">
        <span>Premium layout foundation</span>
      </div>
    </header>
  )
}

export default Navbar
