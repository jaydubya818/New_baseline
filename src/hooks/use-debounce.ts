'use client'

import { useEffect, useState } from 'react'

/**
 * Debounce a value — useful for search inputs, API calls.
 *
 * Usage:
 *   const [search, setSearch] = useState('')
 *   const debouncedSearch = useDebounce(search, 300)
 *   useEffect(() => { fetchResults(debouncedSearch) }, [debouncedSearch])
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
