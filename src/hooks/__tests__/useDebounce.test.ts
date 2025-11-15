import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    
    expect(result.current).toBe('initial')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )
    
    expect(result.current).toBe('initial')
    
    // Update value
    rerender({ value: 'updated', delay: 500 })
    
    // Value should not change immediately
    expect(result.current).toBe('initial')
    
    // Advance time by less than delay
    act(() => {
      vi.advanceTimersByTime(400)
    })
    
    expect(result.current).toBe('initial')
    
    // Advance time past delay
    act(() => {
      vi.advanceTimersByTime(100)
    })
    
    expect(result.current).toBe('updated')
  })

  it('clears timeout on value change before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    )
    
    rerender({ value: 'first' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    
    rerender({ value: 'second' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    
    // Should still be initial (first didn't complete, second hasn't either)
    expect(result.current).toBe('initial')
    
    // Complete the delay for second value
    act(() => {
      vi.advanceTimersByTime(200)
    })
    
    expect(result.current).toBe('second')
  })

  it('uses custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 1000 } }
    )
    
    rerender({ value: 'updated', delay: 1000 })
    
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('initial')
    
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('updated')
  })
})

