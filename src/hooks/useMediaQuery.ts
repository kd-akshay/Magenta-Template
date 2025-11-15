import { useState, useEffect } from 'react'

/**
 * Hook to track media query matches.
 *
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the media query currently matches
 *
 * @remarks
 * Reactively tracks media query matches and updates when the query result changes.
 * Supports both modern addEventListener and legacy addListener for browser compatibility.
 *
 * @public
 *
 * @example
 * Check if screen is mobile:
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * return isMobile ? <MobileView /> : <DesktopView />
 * ```
 *
 * @example
 * Check system preferences:
 * ```tsx
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches)
    }

    // Use addListener for older browsers, addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange as (event: MediaQueryListEvent) => void)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange as (event: MediaQueryListEvent) => void)
      }
    }
  }, [query])

  return matches
}

/**
 * Hook to check if screen is mobile size.
 *
 * @returns Boolean indicating if screen width is 640px or less (Tailwind's sm breakpoint)
 *
 * @public
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile()
 * return isMobile ? <MobileMenu /> : <DesktopMenu />
 * ```
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)')
}

/**
 * Hook to check if screen is tablet size.
 *
 * @returns Boolean indicating if screen width is between 641px and 1024px
 *
 * @public
 *
 * @example
 * ```tsx
 * const isTablet = useIsTablet()
 * if (isTablet) {
 *   // Tablet-specific logic
 * }
 * ```
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
}

/**
 * Hook to check if screen is desktop size.
 *
 * @returns Boolean indicating if screen width is 1025px or greater
 *
 * @public
 *
 * @example
 * ```tsx
 * const isDesktop = useIsDesktop()
 * if (isDesktop) {
 *   // Desktop-specific logic
 * }
 * ```
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

/**
 * Hook to check if user prefers dark mode.
 *
 * @returns Boolean indicating if the system color scheme preference is dark
 *
 * @remarks
 * Detects the system's color scheme preference using the `prefers-color-scheme` media query.
 *
 * @public
 *
 * @example
 * Initialize theme based on system preference:
 * ```tsx
 * const prefersDark = usePrefersDarkMode()
 *
 * useEffect(() => {
 *   if (prefersDark) {
 *     setTheme('dark')
 *   }
 * }, [prefersDark])
 * ```
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/**
 * Hook to check if user prefers reduced motion.
 *
 * @returns Boolean indicating if the user prefers reduced motion
 *
 * @remarks
 * Useful for accessibility - respect user's motion preferences by disabling animations.
 * Aligns with WCAG 2.1 Level AAA requirement for respecting reduced motion preferences.
 *
 * @public
 *
 * @example
 * Conditionally animate based on preference:
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion()
 * const shouldAnimate = !prefersReducedMotion
 *
 * return <AnimatedComponent animate={shouldAnimate} />
 * ```
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export default useMediaQuery

