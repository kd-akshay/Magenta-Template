import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    expect(result.current[0]).toBe('initial')
  })

  it('returns value from localStorage when it exists', () => {
    localStorage.setItem('test', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    expect(result.current[0]).toBe('stored')
  })

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
  })

  it('updates value using function setter', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    
    expect(result.current[0]).toBe(1)
    expect(localStorage.getItem('count')).toBe('1')
  })

  it('removes value from localStorage', () => {
    localStorage.setItem('test', JSON.stringify('value'))
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    act(() => {
      result.current[2]()
    })
    
    expect(result.current[0]).toBe('initial')
    expect(localStorage.getItem('test')).toBeNull()
  })

  it('handles complex objects', () => {
    const obj = { name: 'John', age: 30 }
    const { result } = renderHook(() => useLocalStorage('user', obj))
    
    act(() => {
      result.current[1]({ name: 'Jane', age: 25 })
    })
    
    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 })
  })

  it('handles arrays', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('items', []))
    
    act(() => {
      result.current[1]([1, 2, 3])
    })
    
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('handles invalid JSON gracefully', () => {
    localStorage.setItem('test', 'invalid-json')
    const { result } = renderHook(() => useLocalStorage('test', 'default'))
    
    // Should fall back to initial value on parse error
    expect(result.current[0]).toBe('default')
  })
})

