import { useEffect, useState } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)

    handler(mediaQuery)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export default useMediaQuery
