import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageContainer from '../components/PageContainer'
import useMediaQuery from '../hooks/useMediaQuery'
import formatRouteLabel from '../utils/formatRouteLabel'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const location = useLocation()

  const handleToggle = () => setSidebarOpen((value) => !value)
  const closeSidebar = () => setSidebarOpen(false)

  const pageTitle = formatRouteLabel(location.pathname)

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onToggle={handleToggle} />
      <div className="app-view">
        <Navbar onToggle={handleToggle} />
        <main className="app-main">
          <PageContainer title={pageTitle}>
            <Outlet />
          </PageContainer>
        </main>
        <Footer />
      </div>
      {!isDesktop && sidebarOpen && (
        <button
          type="button"
          className="backdrop"
          onClick={closeSidebar}
          aria-label="Close navigation overlay"
        />
      )}
    </div>
  )
}

export default Layout
