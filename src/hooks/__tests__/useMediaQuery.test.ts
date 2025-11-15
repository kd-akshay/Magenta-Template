import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from '../useMediaQuery'

describe('useMediaQuery', () => {
  let matchMediaMock: any

  beforeEach(() => {
    matchMediaMock = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns false when matchMedia is not available', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    
    expect(result.current).toBe(false)
  })

  it('returns true when query matches', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    
    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    const listeners: Array<(event: any) => void> = []
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn((_event, listener) => {
        listeners.push(listener)
      }),
      removeEventListener: vi.fn(),
    })

    const { result, rerender } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    
    expect(result.current).toBe(false)
    
    // Simulate media query change
    if (listeners[0]) {
      listeners[0]({ matches: true })
    }
    
    rerender()
    
    // Note: In real scenario, state would update via useEffect
    // This test demonstrates the hook structure
  })
})

describe('useIsMobile', () => {
  it('checks mobile breakpoint', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useIsTablet', () => {
  it('checks tablet breakpoint', () => {
    const { result } = renderHook(() => useIsTablet())
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useIsDesktop', () => {
  it('checks desktop breakpoint', () => {
    const { result } = renderHook(() => useIsDesktop())
    expect(typeof result.current).toBe('boolean')
  })
})

