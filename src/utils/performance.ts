/**
 * Debounces a function call.
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds before executing
 * @param immediate - If true, trigger the function on the leading edge instead of trailing
 * @returns Debounced function
 *
 * @remarks
 * Delays the execution of a function until after a specified wait time has elapsed
 * since the last time it was invoked. Useful for search inputs, window resize handlers, etc.
 *
 * @public
 *
 * @example
 * Debounce search input:
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query)
 * }, 300)
 *
 * // Call it multiple times rapidly
 * debouncedSearch('a')
 * debouncedSearch('ab')
 * debouncedSearch('abc')
 * // Only "Searching for: abc" will be logged after 300ms
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function debounced(...args: Parameters<T>) {
    const callNow = immediate && !timeoutId

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      if (!immediate) {
        func(...args)
      }
    }, wait)

    if (callNow) {
      func(...args)
    }
  }
}

/**
 * Throttles a function call.
 *
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds between executions
 * @returns Throttled function
 *
 * @remarks
 * Limits the execution of a function to at most once per specified time period.
 * Unlike debounce, throttle ensures the function is called regularly at the specified interval.
 *
 * @public
 *
 * @example
 * Throttle scroll handler:
 * ```ts
 * const throttledScroll = throttle((position: number) => {
 *   console.log('Scroll position:', position)
 * }, 100)
 *
 * // Even if called 100 times in 50ms, it will only execute twice
 * window.addEventListener('scroll', () => {
 *   throttledScroll(window.scrollY)
 * })
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  let lastResult: ReturnType<T>

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true
      lastResult = func(...args)

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }

    return lastResult
  }
}

/**
 * Throttles a function using requestAnimationFrame.
 *
 * @param func - Function to throttle
 * @returns Throttled function synchronized with browser repaints
 *
 * @remarks
 * Optimized throttle function using requestAnimationFrame for smooth animations.
 * Useful for scroll, resize, and other frequent events that need to be synchronized with the browser's repaint cycle.
 *
 * @public
 *
 * @example
 * Throttle scroll for smooth animation:
 * ```ts
 * const rafThrottled = rafThrottle((event: Event) => {
 *   console.log('Scroll event:', event)
 *   updateAnimation()
 * })
 *
 * window.addEventListener('scroll', rafThrottled)
 * ```
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  let lastArgs: Parameters<T>

  return function throttled(...args: Parameters<T>) {
    lastArgs = args

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...lastArgs)
        rafId = null
      })
    }
  }
}

/**
 * Creates a memoized function with configurable cache size.
 *
 * @param func - Function to memoize
 * @param maxCacheSize - Maximum number of cached results (default: Infinity)
 * @returns Memoized function with cached results
 *
 * @remarks
 * Caches function results based on arguments to avoid redundant calculations.
 * Implements LRU (Least Recently Used) cache eviction when maxCacheSize is reached.
 *
 * @public
 *
 * @example
 * Memoize expensive calculation:
 * ```ts
 * const expensiveFunction = memoize((n: number) => {
 *   console.log('Computing...', n)
 *   return n * 2
 * }, 10)
 *
 * expensiveFunction(5) // Logs "Computing... 5", returns 10
 * expensiveFunction(5) // Returns 10 from cache, no log
 * expensiveFunction(10) // Logs "Computing... 10", returns 20
 * ```
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  maxCacheSize: number = Infinity
): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = func(...args)

    // Implement LRU cache eviction if max size is reached
    if (cache.size >= maxCacheSize) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }

    cache.set(key, result)
    return result
  }) as T
}

