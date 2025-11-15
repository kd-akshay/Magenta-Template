import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCopyToClipboard } from '../useCopyToClipboard'

describe('useCopyToClipboard', () => {
  let writeTextSpy: any
  let execCommandSpy: any

  beforeEach(() => {
    vi.useFakeTimers()
    writeTextSpy = vi.fn().mockResolvedValue(undefined)
    
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextSpy,
      },
    })

    // Mock execCommand as fallback
    execCommandSpy = vi.fn().mockReturnValue(true)
    document.execCommand = execCommandSpy

    // Mock window.isSecureContext
    Object.defineProperty(window, 'isSecureContext', {
      writable: true,
      value: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('initializes with false copied state', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    
    expect(result.current[0]).toBe(false)
    expect(result.current[2]).toBe(null)
  })

  it('copies text to clipboard', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    
    await act(async () => {
      await result.current[1]('test text')
    })
    
    expect(writeTextSpy).toHaveBeenCalledWith('test text')
    expect(result.current[0]).toBe(true)
    expect(result.current[2]).toBe(null)
  })

  it('resets copied state after 2 seconds', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    
    await act(async () => {
      await result.current[1]('test text')
    })
    
    expect(result.current[0]).toBe(true)
    
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    
    await waitFor(() => {
      expect(result.current[0]).toBe(false)
    })
  })

  it('uses initial text if no text provided to copy function', async () => {
    const { result } = renderHook(() => useCopyToClipboard('initial text'))
    
    await act(async () => {
      await result.current[1]()
    })
    
    expect(writeTextSpy).toHaveBeenCalledWith('initial text')
  })

  it('handles copy errors', async () => {
    const error = new Error('Clipboard write failed')
    writeTextSpy.mockRejectedValue(error)
    
    const { result } = renderHook(() => useCopyToClipboard())
    
    await act(async () => {
      await result.current[1]('test text')
    })
    
    expect(result.current[0]).toBe(false)
    expect(result.current[2]).toBe(error)
  })

  it('handles missing text', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    
    await act(async () => {
      await result.current[1](undefined)
    })
    
    expect(result.current[2]).not.toBe(null)
    expect(result.current[0]).toBe(false)
  })

  it('uses execCommand fallback when clipboard API unavailable', async () => {
    // Mock non-secure context
    Object.defineProperty(window, 'isSecureContext', {
      writable: true,
      value: false,
    })

    Object.assign(navigator, {
      clipboard: undefined,
    })

    const { result } = renderHook(() => useCopyToClipboard())
    
    // Mock createElement and appendChild
    const createElementSpy = vi.spyOn(document, 'createElement')
    const textarea = document.createElement('textarea')
    textarea.select = vi.fn()
    textarea.focus = vi.fn()
    createElementSpy.mockReturnValue(textarea as any)

    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const removeChildSpy = vi.spyOn(document.body, 'removeChild')
    
    await act(async () => {
      await result.current[1]('test text')
    })
    
    expect(execCommandSpy).toHaveBeenCalledWith('copy')
    expect(removeChildSpy).toHaveBeenCalled()
  })
})

