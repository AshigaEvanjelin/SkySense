function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>SkySense foundation · {year}</p>
    </footer>
  )
}

export default Footer
