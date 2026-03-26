'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Persist state to localStorage with SSR safety.
 *
 * Usage:
 *   const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item) as T)
      }
    } catch {
      console.warn(`Error reading localStorage key "${key}"`)
    }
  }, [key])

  // Save to localStorage on change
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue))
        } catch {
          console.warn(`Error setting localStorage key "${key}"`)
        }
        return newValue
      })
    },
    [key]
  )

  return [storedValue, setValue]
}
