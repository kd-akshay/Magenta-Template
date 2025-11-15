import { useState, useEffect } from 'react'

/**
 * Hook to debounce a value.
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns Debounced value that updates after the specified delay
 *
 * @remarks
 * Returns a debounced value that only updates after the specified delay has elapsed
 * since the last time the source value changed. Useful for search inputs, API calls, etc.
 *
 * @public
 *
 * @example
 * Debounce search input:
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 *
 * useEffect(() => {
 *   // This will only run when debouncedSearchTerm changes
 *   // (300ms after user stops typing)
 *   if (debouncedSearchTerm) {
 *     fetchSearchResults(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup timeout if value changes before delay completes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

