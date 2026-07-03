function WeeklyForecastItem({ day, icon, condition, temp, rain }) {
  return (
    <article className="weekly-item" tabIndex="0">
      <div className="weekly-day">{day}</div>
      <div className="weekly-mid">
        {icon ? <img src={icon} alt="Weather icon" width="20" height="20" /> : null}
        <span>{condition}</span>
      </div>
      <div className="weekly-data">
        <span className="weekly-temp">{temp}</span>
        <span className="weekly-rain">{rain}</span>
      </div>
    </article>
  )
}

export default WeeklyForecastItem
