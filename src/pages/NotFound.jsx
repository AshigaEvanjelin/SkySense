import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="card card-center">
      <h2>Page not found</h2>
      <p>The requested page does not exist yet.</p>
      <Link to="/" className="button button-primary">
        Return home
      </Link>
    </div>
  )
}

export default NotFound
