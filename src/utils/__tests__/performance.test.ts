import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle, rafThrottle, memoize } from '../performance'

describe('performance utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe('debounce', () => {
    it('debounces function calls', () => {
      const func = vi.fn()
      const debounced = debounce(func, 100)

      debounced()
      debounced()
      debounced()

      expect(func).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(func).toHaveBeenCalledTimes(1)
    })

    it('calls function immediately when immediate is true', () => {
      const func = vi.fn()
      const debounced = debounce(func, 100, true)

      debounced()

      expect(func).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)

      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('throttles function calls', () => {
      const func = vi.fn()
      const throttled = throttle(func, 100)

      throttled()
      throttled()
      throttled()

      expect(func).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)

      throttled()
      expect(func).toHaveBeenCalledTimes(2)
    })
  })

  describe('rafThrottle', () => {
    it('throttles using requestAnimationFrame', () => {
      const func = vi.fn()
      const throttled = rafThrottle(func)

      throttled()
      throttled()
      throttled()

      // RAF should be called
      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('memoize', () => {
    it('memoizes function results', () => {
      const func = vi.fn((x: number) => x * 2)
      const memoized = memoize(func)

      expect(memoized(5)).toBe(10)
      expect(memoized(5)).toBe(10)

      expect(func).toHaveBeenCalledTimes(1)
    })

    it('respects cache size limit', () => {
      const func = vi.fn((x: number) => x)
      const memoized = memoize(func, 2)

      memoized(1)
      memoized(2)
      memoized(3) // Should evict first entry

      memoized(1) // Should recompute

      expect(func).toHaveBeenCalledTimes(4) // 1, 2, 3, and 1 again
    })
  })
})

