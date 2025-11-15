import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../ThemeContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('provides default theme configuration', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    expect(result.current.config.mode).toBe('system')
    expect(result.current.config.colors.primary).toBe('#e20074')
    expect(result.current.config.spacing.scale).toBe('comfortable')
    expect(result.current.config.borderRadius).toBe('medium')
  })

  it('allows setting theme mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setMode('dark')
    })
    
    expect(result.current.config.mode).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })

  it('allows setting theme mode to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setMode('light')
    })
    
    expect(result.current.config.mode).toBe('light')
    expect(result.current.isDark).toBe(false)
  })

  it('allows setting custom colors', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setColors({ primary: '#ff0000' })
    })
    
    expect(result.current.config.colors.primary).toBe('#ff0000')
  })

  it('allows setting typography', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setTypography({ fontSize: 'large' })
    })
    
    expect(result.current.config.typography.fontSize).toBe('large')
  })

  it('allows setting spacing scale', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setSpacing({ scale: 'spacious' })
    })
    
    expect(result.current.config.spacing.scale).toBe('spacious')
  })

  it('allows setting border radius', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setBorderRadius('large')
    })
    
    expect(result.current.config.borderRadius).toBe('large')
  })

  it('allows setting shadows', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setShadows('elevated')
    })
    
    expect(result.current.config.shadows).toBe('elevated')
  })

  it('resets theme to defaults', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setMode('dark')
      result.current.setColors({ primary: '#ff0000' })
      result.current.setBorderRadius('large')
    })
    
    act(() => {
      result.current.resetTheme()
    })
    
    expect(result.current.config.mode).toBe('system')
    expect(result.current.config.colors.primary).toBe('#e20074')
    expect(result.current.config.borderRadius).toBe('medium')
  })

  it('generates CSS variables', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    const cssVars = result.current.getCSSVariables()
    
    expect(cssVars['--color-primary']).toBeDefined()
    expect(cssVars['--font-family']).toBeDefined()
    expect(cssVars['--spacing-base']).toBeDefined()
    expect(cssVars['--border-radius']).toBeDefined()
  })

  it('applies CSS variables to document root', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    act(() => {
      result.current.setColors({ primary: '#ff0000' })
    })
    
    const root = document.documentElement
    expect(root.style.getPropertyValue('--color-primary')).toBe('rgb(255, 0, 0)')
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    consoleSpy.mockRestore()
  })
})

