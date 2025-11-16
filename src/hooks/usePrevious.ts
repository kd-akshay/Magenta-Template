import { useEffect, useRef } from 'react'

/**
 * Stores the previous value of a state or prop.
 * Useful for comparing previous and current values.
 * 
 * @param value - The value to track
 * @returns The previous value
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0)
 * const prevCount = usePrevious(count)
 * 
 * useEffect(() => {
 *   if (prevCount !== undefined && count > prevCount) {
 *     console.log('Count increased!')
 *   }
 * }, [count, prevCount])
 * ```
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious

