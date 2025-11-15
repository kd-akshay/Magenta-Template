import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePageLoader } from '../usePageLoader'

describe('usePageLoader', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => usePageLoader())
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.loadingMessage).toBe('Loading...')
  })

  it('initializes with custom message', () => {
    const { result } = renderHook(() => usePageLoader('Custom loading...'))
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.loadingMessage).toBe('Custom loading...')
  })

  it('starts loading with default message', () => {
    const { result } = renderHook(() => usePageLoader())
    
    act(() => {
      result.current.startLoading()
    })
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadingMessage).toBe('Loading...')
  })

  it('starts loading with custom message', () => {
    const { result } = renderHook(() => usePageLoader())
    
    act(() => {
      result.current.startLoading('Fetching data...')
    })
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadingMessage).toBe('Fetching data...')
  })

  it('updates message when startLoading is called with new message', () => {
    const { result } = renderHook(() => usePageLoader('Initial message'))
    
    act(() => {
      result.current.startLoading('New message')
    })
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadingMessage).toBe('New message')
  })

  it('stops loading', () => {
    const { result } = renderHook(() => usePageLoader())
    
    act(() => {
      result.current.startLoading('Loading...')
    })
    
    expect(result.current.isLoading).toBe(true)
    
    act(() => {
      result.current.stopLoading()
    })
    
    expect(result.current.isLoading).toBe(false)
  })

  it('sets loading message directly', () => {
    const { result } = renderHook(() => usePageLoader())
    
    act(() => {
      result.current.setLoadingMessage('Direct message')
    })
    
    expect(result.current.loadingMessage).toBe('Direct message')
  })

  it('preserves message when stopping loading', () => {
    const { result } = renderHook(() => usePageLoader())
    
    act(() => {
      result.current.startLoading('Custom message')
    })
    
    expect(result.current.loadingMessage).toBe('Custom message')
    
    act(() => {
      result.current.stopLoading()
    })
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.loadingMessage).toBe('Custom message')
  })
})

