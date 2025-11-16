import { useEffect, useRef, useState } from 'react'

/**
 * Throttles a value, updating it at most once per specified delay.
 * Unlike debounce, throttle ensures the value updates at regular intervals.
 * 
 * @param value - The value to throttle
 * @param delay - The delay in milliseconds (default: 500)
 * @returns The throttled value
 * 
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0)
 * const throttledScrollY = useThrottle(scrollY, 100)
 * 
 * useEffect(() => {
 *   const handleScroll = () => setScrollY(window.scrollY)
 *   window.addEventListener('scroll', handleScroll)
 *   return () => window.removeEventListener('scroll', handleScroll)
 * }, [])
 * 
 * // throttledScrollY updates at most once per 100ms
 * ```
 */
function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<number>(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, Math.max(0, delay - (Date.now() - lastRan.current)))

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return throttledValue
}

export default useThrottle

