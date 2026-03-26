'use client'

import { useEffect, useState } from 'react'

/**
 * React hook for responsive media queries.
 *
 * Usage:
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [query])

  return matches
}
