function WeeklyForecastItem({ day, icon: Icon, condition, temp, rain }) {
  return (
    <article className="weekly-item" tabIndex="0">
      <div className="weekly-day">{day}</div>
      <div className="weekly-mid">
        <Icon size={20} />
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
