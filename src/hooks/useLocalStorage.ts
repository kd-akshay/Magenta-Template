import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to synchronize state with localStorage.
 *
 * @param key - localStorage key to store/retrieve value
 * @param initialValue - Initial value if key doesn't exist in localStorage
 * @returns Tuple containing stored value, setter function, and remove function
 *
 * @remarks
 * This hook:
 * - Automatically syncs state with localStorage
 * - Handles JSON serialization/deserialization
 * - Listens for storage events from other tabs/windows
 * - Supports functional updates like useState
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```tsx
 * const [count, setCount, removeCount] = useLocalStorage('count', 0)
 *
 * // Update value (automatically saves to localStorage)
 * setCount(10)
 *
 * // Functional update
 * setCount(prev => prev + 1)
 *
 * // Remove from localStorage
 * removeCount()
 * ```
 *
 * @example
 * With objects:
 * ```tsx
 * const [user, setUser] = useLocalStorage('user', { name: 'John' })
 * setUser({ name: 'Jane' })
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // Save state
        setStoredValue(valueToStore)

        // Save to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Listen for changes to this key from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error)
        }
      } else if (e.key === key && e.newValue === null) {
        // Key was removed
        setStoredValue(initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage

