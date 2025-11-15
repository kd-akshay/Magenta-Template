import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { TransitionProvider, useTransition } from '../TransitionContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TransitionProvider>{children}</TransitionProvider>
)

describe('TransitionContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('provides default transition configuration', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    expect(result.current.config.speed).toBe('normal')
    expect(result.current.config.duration).toBe(300)
  })

  it('allows setting transition speed', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setSpeed('fast')
    })
    
    expect(result.current.config.speed).toBe('fast')
    expect(result.current.config.duration).toBe(150)
  })

  it('allows setting slow speed', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setSpeed('slow')
    })
    
    expect(result.current.config.speed).toBe('slow')
    expect(result.current.config.duration).toBe(500)
  })

  it('allows setting custom duration', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setDuration(250)
    })
    
    expect(result.current.config.speed).toBe('custom')
    expect(result.current.config.duration).toBe(250)
  })

  it('generates duration class names', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setSpeed('fast')
    })
    
    expect(result.current.getDurationClass()).toBe('duration-150')
    
    act(() => {
      result.current.setSpeed('normal')
    })
    
    expect(result.current.getDurationClass()).toBe('duration-300')
    
    act(() => {
      result.current.setSpeed('slow')
    })
    
    expect(result.current.getDurationClass()).toBe('duration-500')
  })

  it('applies CSS variables to document root', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setDuration(250)
    })
    
    const root = document.documentElement
    expect(root.style.getPropertyValue('--transition-duration')).toBe('250ms')
  })

  it('persists settings to localStorage', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    act(() => {
      result.current.setSpeed('fast')
    })
    
    expect(localStorage.getItem('transition-speed')).toBe('fast')
  })

  it('loads settings from localStorage on mount', () => {
    localStorage.setItem('transition-speed', 'slow')
    
    const { result } = renderHook(() => useTransition(), { wrapper })
    
    expect(result.current.config.speed).toBe('slow')
    expect(result.current.config.duration).toBe(500)
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useTransition())
    }).toThrow('useTransition must be used within a TransitionProvider')
    
    consoleSpy.mockRestore()
  })
})

