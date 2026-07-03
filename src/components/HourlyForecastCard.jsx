function HourlyForecastCard({ time, icon: Icon, temp }) {
  return (
    <article className="hourly-card" tabIndex="0">
      <p className="hourly-time">{time}</p>
      <div className="hourly-icon-wrapper">
        <Icon size={24} />
      </div>
      <p className="hourly-temp">{temp}</p>
    </article>
  )
}

export default HourlyForecastCard
