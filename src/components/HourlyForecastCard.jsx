function HourlyForecastCard({ time, icon, temp }) {
  return (
    <article className="hourly-card" tabIndex="0">
      <p className="hourly-time">{time}</p>
      <div className="hourly-icon-wrapper">
        {icon ? <img src={icon} alt="Weather icon" width="24" height="24" /> : null}
      </div>
      <p className="hourly-temp">{temp}</p>
    </article>
  )
}

export default HourlyForecastCard
