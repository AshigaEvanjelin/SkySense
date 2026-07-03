function WeatherStatCard({ icon: Icon, title, value, description }) {
  return (
    <article className="stat-card">
      <div className="stat-card-icon">
        <Icon size={18} />
      </div>
      <div>
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
        <p className="stat-card-description">{description}</p>
      </div>
    </article>
  )
}

export default WeatherStatCard
