/**
 * Theme Context for managing global UI theme settings.
 *
 * @remarks
 * This context provides centralized theme management including:
 * - Light/dark mode with system preference detection
 * - Customizable color palettes
 * - Typography settings (font family, sizes, weights)
 * - Spacing scales (compact, comfortable, spacious)
 * - Border radius and shadow presets
 * - Responsive breakpoints and container widths
 * - Persistence to localStorage
 * - Dynamic CSS variable generation
 *
 * @example
 * Wrap your app with ThemeProvider:
 * ```tsx
 * <ThemeProvider>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 *
 * Use theme in components:
 * ```tsx
 * const { config, isDark, setMode, setColors } = useTheme()
 * ```
 *
 * @packageDocumentation
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

/**
 * Theme mode options.
 *
 * @public
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Spacing scale options.
 *
 * @public
 */
export type SpacingScale = 'compact' | 'comfortable' | 'spacious'

/**
 * Font size scale options.
 *
 * @public
 */
export type FontSizeScale = 'small' | 'medium' | 'large'

/**
 * Border radius scale options.
 *
 * @public
 */
export type BorderRadiusScale = 'none' | 'small' | 'medium' | 'large' | 'full'

/**
 * Shadow scale options.
 *
 * @public
 */
export type ShadowScale = 'none' | 'subtle' | 'medium' | 'elevated'

/**
 * Color palette configuration.
 *
 * @public
 */
export interface ColorPalette {
  /** Primary brand color */
  primary: string
  /** Secondary color */
  secondary: string
  /** Success state color */
  success: string
  /** Warning state color */
  warning: string
  /** Danger/error state color */
  danger: string
  /** Info state color */
  info: string
  /** Background color */
  background: string
  /** Surface/card background color */
  surface: string
  /** Primary text color */
  text: string
  /** Secondary text color */
  textSecondary: string
  /** Border color */
  border: string
}

/**
 * Typography settings configuration.
 *
 * @public
 */
export interface TypographySettings {
  /** Font family stack */
  fontFamily: string
  /** Base font size scale */
  fontSize: FontSizeScale
  /** Line height multiplier */
  lineHeight: number
  /** Font weight values */
  fontWeight: {
    /** Normal weight */
    normal: number
    /** Medium weight */
    medium: number
    /** Semibold weight */
    semibold: number
    /** Bold weight */
    bold: number
  }
}

/**
 * Spacing settings configuration.
 *
 * @public
 */
export interface SpacingSettings {
  /** Spacing scale */
  scale: SpacingScale
  /** Base spacing unit in pixels */
  base: number
  /** Multipliers for different spacing sizes */
  multiplier: {
    /** Extra small spacing */
    xs: number
    /** Small spacing */
    sm: number
    /** Medium spacing */
    md: number
    /** Large spacing */
    lg: number
    /** Extra large spacing */
    xl: number
    /** 2X extra large spacing */
    '2xl': number
  }
}

/**
 * Responsive settings configuration.
 *
 * @public
 */
export interface ResponsiveSettings {
  /** Breakpoint values in pixels */
  breakpoints: {
    /** Small breakpoint */
    sm: number
    /** Medium breakpoint */
    md: number
    /** Large breakpoint */
    lg: number
    /** Extra large breakpoint */
    xl: number
    /** 2X extra large breakpoint */
    '2xl': number
  }
  /** Container max widths */
  containerMaxWidths: {
    /** Small container */
    sm: string
    /** Medium container */
    md: string
    /** Large container */
    lg: string
    /** Extra large container */
    xl: string
    /** 2X extra large container */
    '2xl': string
  }
}

/**
 * Complete theme configuration.
 *
 * @public
 */
export interface ThemeConfig {
  /** Theme mode */
  mode: ThemeMode
  /** Color palette */
  colors: ColorPalette
  /** Typography settings */
  typography: TypographySettings
  /** Spacing settings */
  spacing: SpacingSettings
  /** Border radius scale */
  borderRadius: BorderRadiusScale
  /** Shadow scale */
  shadows: ShadowScale
  /** Responsive settings */
  responsive: ResponsiveSettings
}

/**
 * Theme context value type.
 *
 * @public
 */
interface ThemeContextValue {
  /** Current theme configuration */
  config: ThemeConfig
  /** Boolean indicating if dark mode is active */
  isDark: boolean
  /** Function to set theme mode */
  setMode: (mode: ThemeMode) => void
  /** Function to update color palette */
  setColors: (colors: Partial<ColorPalette>) => void
  /** Function to update typography settings */
  setTypography: (typography: Partial<TypographySettings>) => void
  /** Function to update spacing settings */
  setSpacing: (spacing: Partial<SpacingSettings>) => void
  /** Function to set border radius scale */
  setBorderRadius: (radius: BorderRadiusScale) => void
  /** Function to set shadow scale */
  setShadows: (shadows: ShadowScale) => void
  /** Function to update responsive settings */
  setResponsive: (responsive: Partial<ResponsiveSettings>) => void
  /** Function to reset theme to defaults */
  resetTheme: () => void
  /** Function to get CSS variables object */
  getCSSVariables: () => Record<string, string>
}

const defaultLightColors: ColorPalette = {
  primary: '#e20074',
  secondary: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#111827',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
}

const defaultDarkColors: ColorPalette = {
  primary: '#e20074',
  secondary: '#9ca3af',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  border: '#374151',
}

const defaultTypography: TypographySettings = {
  fontFamily: 'TeleNeo, Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: 'medium',
  lineHeight: 1.5,
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

const defaultSpacing: SpacingSettings = {
  scale: 'comfortable',
  base: 4,
  multiplier: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
    '2xl': 12,
  },
}

const defaultResponsive: ResponsiveSettings = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  containerMaxWidths: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

const spacingScales: Record<SpacingScale, { base: number; multiplier: Record<string, number> }> = {
  compact: {
    base: 3,
    multiplier: { xs: 0.75, sm: 1.5, md: 3, lg: 4, xl: 6, '2xl': 9 },
  },
  comfortable: {
    base: 4,
    multiplier: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8, '2xl': 12 },
  },
  spacious: {
    base: 6,
    multiplier: { xs: 1.5, sm: 3, md: 6, lg: 9, xl: 12, '2xl': 18 },
  },
}

const fontSizeScales: Record<FontSizeScale, { base: number; scale: number }> = {
  small: { base: 14, scale: 0.875 },
  medium: { base: 16, scale: 1 },
  large: { base: 18, scale: 1.125 },
}

const borderRadiusValues: Record<BorderRadiusScale, string> = {
  none: '0px',
  small: '0.25rem',
  medium: '0.5rem',
  large: '0.75rem',
  full: '9999px',
}

const shadowValues: Record<ShadowScale, string> = {
  none: 'none',
  subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  elevated: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
}

/**
 * React Context for theme state.
 *
 * @internal
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Props for the ThemeProvider component.
 *
 * @public
 */
interface ThemeProviderProps {
  /** Child components that need access to theme context */
  children: ReactNode
  /** Optional default theme configuration to override defaults */
  defaultTheme?: Partial<ThemeConfig>
}

/**
 * Detects system theme preference.
 *
 * @returns 'light' or 'dark' based on system preference
 * @internal
 */
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * ThemeProvider Component - Provides theme context to all child components.
 *
 * @param props - Component props
 * @param props.children - Child components that need access to theme context
 * @param props.defaultTheme - Optional default theme configuration
 *
 * @remarks
 * This component:
 * - Manages theme state with localStorage persistence
 * - Detects and responds to system theme changes
 * - Generates CSS variables dynamically
 * - Applies theme to document root
 * - Provides methods to update theme settings
 *
 * @public
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme={{ mode: 'dark' }}>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps): React.JSX.Element {
  const [storedMode, setStoredMode] = useLocalStorage<ThemeMode>('theme-mode', 'system')
  const [storedColors, setStoredColors] = useLocalStorage<Partial<ColorPalette>>('theme-colors', {})
  const [storedTypography, setStoredTypography] = useLocalStorage<Partial<TypographySettings>>('theme-typography', {})
  const [storedSpacing, setStoredSpacing] = useLocalStorage<SpacingScale>('theme-spacing', 'comfortable')
  const [storedBorderRadius, setStoredBorderRadius] = useLocalStorage<BorderRadiusScale>('theme-border-radius', 'medium')
  const [storedShadows, setStoredShadows] = useLocalStorage<ShadowScale>('theme-shadows', 'medium')
  const [storedResponsive, setStoredResponsive] = useLocalStorage<Partial<ResponsiveSettings>>('theme-responsive', {})

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme())
  const [mode, setModeState] = useState<ThemeMode>(storedMode)

  // Listen to system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange as (event: MediaQueryListEvent) => void)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange as (event: MediaQueryListEvent) => void)
      }
    }
  }, [])

  const isDark = mode === 'dark' || (mode === 'system' && systemTheme === 'dark')

  // Get effective colors based on theme mode
  const getEffectiveColors = useCallback((): ColorPalette => {
    const baseColors = isDark ? defaultDarkColors : defaultLightColors
    return { ...baseColors, ...storedColors, ...defaultTheme?.colors }
  }, [isDark, storedColors, defaultTheme?.colors])

  const colors = getEffectiveColors()

  // Get effective spacing based on scale
  const getEffectiveSpacing = useCallback((): SpacingSettings => {
    const scale = storedSpacing || defaultTheme?.spacing?.scale || 'comfortable'
    const scaleConfig = spacingScales[scale]
    return {
      ...defaultSpacing,
      ...defaultTheme?.spacing,
      scale,
      base: scaleConfig.base,
      multiplier: { ...defaultSpacing.multiplier, ...scaleConfig.multiplier },
    }
  }, [storedSpacing, defaultTheme?.spacing])

  const spacing = getEffectiveSpacing()

  const typography: TypographySettings = {
    ...defaultTypography,
    ...defaultTheme?.typography,
    ...storedTypography,
  }

  const responsive: ResponsiveSettings = {
    ...defaultResponsive,
    ...defaultTheme?.responsive,
    ...storedResponsive,
  }

  const config: ThemeConfig = {
    mode,
    colors,
    typography,
    spacing,
    borderRadius: storedBorderRadius || defaultTheme?.borderRadius || 'medium',
    shadows: storedShadows || defaultTheme?.shadows || 'medium',
    responsive,
  }

  // Get CSS variables function
  const getCSSVariables = useCallback((): Record<string, string> => {
    const vars: Record<string, string> = {
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-success': colors.success,
      '--color-warning': colors.warning,
      '--color-danger': colors.danger,
      '--color-info': colors.info,
      '--color-background': colors.background,
      '--color-surface': colors.surface,
      '--color-text': colors.text,
      '--color-text-secondary': colors.textSecondary,
      '--color-border': colors.border,
      '--font-family': typography.fontFamily,
      '--font-size-base': `${fontSizeScales[typography.fontSize].base}px`,
      '--line-height': typography.lineHeight.toString(),
      '--font-weight-normal': typography.fontWeight.normal.toString(),
      '--font-weight-medium': typography.fontWeight.medium.toString(),
      '--font-weight-semibold': typography.fontWeight.semibold.toString(),
      '--font-weight-bold': typography.fontWeight.bold.toString(),
      '--spacing-base': `${spacing.base}px`,
      '--spacing-xs': `${spacing.base * spacing.multiplier.xs}px`,
      '--spacing-sm': `${spacing.base * spacing.multiplier.sm}px`,
      '--spacing-md': `${spacing.base * spacing.multiplier.md}px`,
      '--spacing-lg': `${spacing.base * spacing.multiplier.lg}px`,
      '--spacing-xl': `${spacing.base * spacing.multiplier.xl}px`,
      '--spacing-2xl': `${spacing.base * spacing.multiplier['2xl']}px`,
      '--border-radius': borderRadiusValues[config.borderRadius],
      '--shadow-default': shadowValues[config.shadows],
      '--breakpoint-sm': `${responsive.breakpoints.sm}px`,
      '--breakpoint-md': `${responsive.breakpoints.md}px`,
      '--breakpoint-lg': `${responsive.breakpoints.lg}px`,
      '--breakpoint-xl': `${responsive.breakpoints.xl}px`,
      '--breakpoint-2xl': `${responsive.breakpoints['2xl']}px`,
      '--container-sm': responsive.containerMaxWidths.sm,
      '--container-md': responsive.containerMaxWidths.md,
      '--container-lg': responsive.containerMaxWidths.lg,
      '--container-xl': responsive.containerMaxWidths.xl,
      '--container-2xl': responsive.containerMaxWidths['2xl'],
    }

    return vars
  }, [colors, typography, spacing, config.borderRadius, config.shadows, responsive])

  // Apply theme to document
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const cssVars = getCSSVariables()

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply dark mode class
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [config, isDark, getCSSVariables])

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode)
      setStoredMode(newMode)
    },
    [setStoredMode]
  )

  const setColors = useCallback(
    (newColors: Partial<ColorPalette>) => {
      const updated = { ...storedColors, ...newColors }
      setStoredColors(updated)
    },
    [storedColors, setStoredColors]
  )

  const setTypography = useCallback(
    (newTypography: Partial<TypographySettings>) => {
      const updated = { ...storedTypography, ...newTypography }
      setStoredTypography(updated)
    },
    [storedTypography, setStoredTypography]
  )

  const setSpacing = useCallback(
    (newSpacing: Partial<SpacingSettings>) => {
      if (newSpacing.scale) {
        setStoredSpacing(newSpacing.scale)
      }
    },
    [setStoredSpacing]
  )

  const setBorderRadius = useCallback(
    (radius: BorderRadiusScale) => {
      setStoredBorderRadius(radius)
    },
    [setStoredBorderRadius]
  )

  const setShadows = useCallback(
    (shadows: ShadowScale) => {
      setStoredShadows(shadows)
    },
    [setStoredShadows]
  )

  const setResponsive = useCallback(
    (newResponsive: Partial<ResponsiveSettings>) => {
      const updated = { ...storedResponsive, ...newResponsive }
      setStoredResponsive(updated)
    },
    [storedResponsive, setStoredResponsive]
  )

  const resetTheme = useCallback(() => {
    setStoredMode('system')
    setStoredColors({})
    setStoredTypography({})
    setStoredSpacing('comfortable')
    setStoredBorderRadius('medium')
    setStoredShadows('medium')
    setStoredResponsive({})
    setModeState('system')
  }, [setStoredMode, setStoredColors, setStoredTypography, setStoredSpacing, setStoredBorderRadius, setStoredShadows, setStoredResponsive])

  const value: ThemeContextValue = {
    config,
    isDark,
    setMode,
    setColors,
    setTypography,
    setSpacing,
    setBorderRadius,
    setShadows,
    setResponsive,
    resetTheme,
    getCSSVariables,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Hook to access theme context.
 *
 * @returns The theme context with configuration and update methods
 * @throws {@link Error} If used outside of ThemeProvider
 *
 * @public
 *
 * @example
 * ```tsx
 * const { config, isDark, setMode, setColors } = useTheme()
 *
 * // Toggle theme mode
 * const toggleTheme = () => {
 *   setMode(isDark ? 'light' : 'dark')
 * }
 *
 * // Update colors
 * setColors({ primary: '#ff0000' })
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeProvider