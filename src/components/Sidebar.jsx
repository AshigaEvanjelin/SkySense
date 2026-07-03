import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import navItems from '../services/navigation'

function Sidebar({ isOpen, onClose, onToggle }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Primary navigation">
      <div className="sidebar-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <div>
            <p className="brand-name">SkySense</p>
            <p className="brand-tag">Weather dashboard</p>
          </div>
        </div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Primary links">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={onClose}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
