function formatRouteLabel(pathname) {
  if (pathname === '/' || pathname === '') return 'Dashboard'

  return pathname
    .replace(/\//g, '')
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    )
    .join(' · ')
}

export default formatRouteLabel
