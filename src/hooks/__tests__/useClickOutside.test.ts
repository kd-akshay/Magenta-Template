import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useClickOutside } from '../useClickOutside'

describe('useClickOutside', () => {
  let addEventListenerSpy: any
  let removeEventListenerSpy: any

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('attaches event listeners on mount', () => {
    const handler = vi.fn()
    renderHook(() => useClickOutside(handler))
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('removes event listeners on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useClickOutside(handler))
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('returns a ref', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useClickOutside(handler))
    
    expect(result.current).toHaveProperty('current')
  })
})

