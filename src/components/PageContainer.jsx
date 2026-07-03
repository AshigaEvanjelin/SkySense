function PageContainer({ title, subtitle, children }) {
  return (
    <section className="page-container">
      <header className="page-header">
        <div>
          <p className="page-overline">Overview</p>
          <h1>{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </header>
      <div className="page-content">{children}</div>
    </section>
  )
}

export default PageContainer
