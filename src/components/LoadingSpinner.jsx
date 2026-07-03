function LoadingSpinner() {
  return (
    <div className="loading-card" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading weather data...</p>
    </div>
  )
}

export default LoadingSpinner
