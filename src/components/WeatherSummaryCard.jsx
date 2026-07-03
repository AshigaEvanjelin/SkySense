function WeatherSummaryCard({ summary }) {
  return (
    <article className="summary-card glass-card" aria-label="Weather summary">
      <div className="summary-card-header">
        <p className="section-overline">Weather Summary</p>
        <h3>Today's weather snapshot</h3>
      </div>
      <div className="summary-grid">
        {summary.map((item) => (
          <div key={item.label} className="summary-metric">
            <p className="summary-label">{item.label}</p>
            <p className="summary-value">{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

export default WeatherSummaryCard
