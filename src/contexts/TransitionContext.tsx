/**
 * Transition Context for managing global UI transition settings.
 *
 * @remarks
 * This context provides centralized transition management including:
 * - Transition speed presets (fast, normal, slow)
 * - Custom duration control
 * - localStorage persistence
 * - Dynamic CSS variable updates
 * - Duration class helper for Tailwind
 *
 * @example
 * Wrap your app with TransitionProvider:
 * ```tsx
 * <TransitionProvider>
 *   <YourApp />
 * </TransitionProvider>
 * ```
 *
 * Use transitions in components:
 * ```tsx
 * const { config, setSpeed, setDuration } = useTransition()
 * ```
 *
 * @packageDocumentation
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/**
 * Transition speed preset options.
 *
 * @public
 */
export type TransitionSpeed = 'fast' | 'normal' | 'slow' | 'custom'

/**
 * Transition configuration.
 *
 * @public
 */
export interface TransitionConfig {
  /** Transition speed preset */
  speed: TransitionSpeed
  /** Custom duration in milliseconds */
  duration: number
}

/**
 * Transition context value type.
 *
 * @public
 */
interface TransitionContextValue {
  /** Current transition configuration */
  config: TransitionConfig
  /** Function to set transition speed preset */
  setSpeed: (speed: TransitionSpeed) => void
  /** Function to set custom transition duration */
  setDuration: (duration: number) => void
  /** Function to get Tailwind duration class */
  getDurationClass: () => string
}

/**
 * Transition speed presets in milliseconds.
 *
 * @internal
 */
const TRANSITION_SPEEDS: Record<TransitionSpeed, number> = {
  fast: 150,
  normal: 300,
  slow: 500,
  custom: 300,
}

/**
 * React Context for transition state.
 *
 * @internal
 */
const TransitionContext = createContext<TransitionContextValue | undefined>(undefined)

/**
 * Props for the TransitionProvider component.
 *
 * @public
 */
interface TransitionProviderProps {
  /** Child components that need access to transition context */
  children: ReactNode
  /** Default transition speed preset */
  defaultSpeed?: TransitionSpeed
  /** Default custom duration in milliseconds */
  defaultDuration?: number
}

/**
 * TransitionProvider Component - Provides transition context to all child components.
 *
 * @param props - Component props
 * @param props.children - Child components that need access to transition context
 * @param props.defaultSpeed - Default transition speed preset
 * @param props.defaultDuration - Default custom duration in milliseconds
 *
 * @remarks
 * This component:
 * - Manages transition speed and duration with localStorage persistence
 * - Applies CSS variables to document root
 * - Provides methods to update transition settings
 * - Maps durations to Tailwind classes
 *
 * @public
 *
 * @example
 * ```tsx
 * <TransitionProvider defaultSpeed="fast" defaultDuration={200}>
 *   <YourApp />
 * </TransitionProvider>
 * ```
 */
export function TransitionProvider({
  children,
  defaultSpeed = 'normal',
  defaultDuration,
}: TransitionProviderProps): React.JSX.Element {
  const [speed, setSpeedState] = useState<TransitionSpeed>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('transition-speed')
      if (saved && ['fast', 'normal', 'slow', 'custom'].includes(saved)) {
        return saved as TransitionSpeed
      }
    }
    return defaultSpeed
  })

  const [customDuration, setCustomDuration] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('transition-duration')
      if (saved) {
        const parsed = parseInt(saved, 10)
        if (!isNaN(parsed) && parsed > 0) {
          return parsed
        }
      }
    }
    return defaultDuration || TRANSITION_SPEEDS.normal
  })

  /**
   * Gets the effective transition duration.
   *
   * @returns Duration in milliseconds
   * @internal
   */
  const getDuration = () => {
    if (speed === 'custom') {
      return customDuration
    }
    return TRANSITION_SPEEDS[speed]
  }

  const duration = getDuration()

  // Apply CSS custom property to root element for global transitions
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty('--transition-duration', `${duration}ms`)
      root.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0, 0.2, 1)')
    }
  }, [duration])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transition-speed', speed)
      if (speed === 'custom') {
        localStorage.setItem('transition-duration', customDuration.toString())
      }
    }
  }, [speed, customDuration])

  /**
   * Sets the transition speed preset.
   *
   * @param newSpeed - Transition speed preset
   * @public
   */
  const setSpeed = (newSpeed: TransitionSpeed): void => {
    setSpeedState(newSpeed)
  }

  /**
   * Sets a custom transition duration and switches to 'custom' speed.
   *
   * @param duration - Custom duration in milliseconds
   * @public
   */
  const setDuration = (duration: number): void => {
    setCustomDuration(duration)
    setSpeedState('custom')
  }

  /**
   * Gets the appropriate Tailwind duration class for the current duration.
   *
   * @returns Tailwind duration class name
   * @public
   */
  const getDurationClass = (): string => {
    // Map duration to Tailwind classes
    if (duration <= 150) {
      return 'duration-150'
    } else if (duration <= 200) {
      return 'duration-200'
    } else if (duration <= 300) {
      return 'duration-300'
    } else if (duration <= 500) {
      return 'duration-500'
    } else if (duration <= 700) {
      return 'duration-700'
    } else {
      return 'duration-1000'
    }
  }

  const value: TransitionContextValue = {
    config: {
      speed,
      duration,
    },
    setSpeed,
    setDuration,
    getDurationClass,
  }

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>
}

/**
 * Hook to access transition context.
 *
 * @returns The transition context with configuration and update methods
 * @throws {@link Error} If used outside of TransitionProvider
 *
 * @public
 *
 * @example
 * ```tsx
 * const { config, setSpeed, setDuration, getDurationClass } = useTransition()
 *
 * // Set speed preset
 * setSpeed('fast')
 *
 * // Set custom duration
 * setDuration(250)
 *
 * // Get Tailwind class
 * const durationClass = getDurationClass() // 'duration-200'
 * ```
 */
export function useTransition(): TransitionContextValue {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
}

export default TransitionProvider