function ErrorCard({ message }) {
  return (
    <div className="error-card" role="alert">
      <p className="error-title">Unable to load weather</p>
      <p className="error-message">{message}</p>
    </div>
  )
}

export default ErrorCard
