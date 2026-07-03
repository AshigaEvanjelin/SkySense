function AnalyticsCard({ icon: Icon, title, description }) {
  return (
    <article className="analytics-card" tabIndex="0">
      <div className="analytics-card-top">
        <div className="analytics-card-icon">
          <Icon size={18} />
        </div>
        <p className="analytics-card-title">{title}</p>
      </div>
      <p className="analytics-card-description">{description}</p>
      <div className="analytics-card-placeholder" aria-hidden="true">
        <span>Preview</span>
      </div>
    </article>
  )
}

export default AnalyticsCard
