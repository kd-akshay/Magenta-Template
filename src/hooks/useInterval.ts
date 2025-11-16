import { useEffect, useRef } from 'react'

/**
 * Runs a function at specified intervals.
 * Automatically cleans up on unmount or when delay changes.
 * 
 * @param callback - Function to execute on each interval
 * @param delay - Delay in milliseconds (null to pause)
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0)
 * 
 * useInterval(() => {
 *   setCount(count + 1)
 * }, 1000) // Runs every second
 * 
 * // Pause interval
 * useInterval(() => {
 *   setCount(count + 1)
 * }, null) // Paused
 * ```
 */
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval

