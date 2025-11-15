import { useTransition } from '@/contexts/TransitionContext'

/**
 * Hook to get transition classes
 * Returns Tailwind classes for smooth transitions based on global transition settings
 */
export const useTransitionClasses = () => {
  const { getDurationClass, config } = useTransition()
  
  return {
    // Standard transition classes
    base: `transition-all ${getDurationClass()} ease-in-out`,
    
    // Specific transition types
    colors: `transition-colors ${getDurationClass()} ease-in-out`,
    transform: `transition-transform ${getDurationClass()} ease-in-out`,
    opacity: `transition-opacity ${getDurationClass()} ease-in-out`,
    shadow: `transition-shadow ${getDurationClass()} ease-in-out`,
    
    // Get duration in ms for inline styles
    duration: config.duration,
    durationMs: `${config.duration}ms`,
    
    // Get duration class
    durationClass: getDurationClass(),
  }
}

/**
 * Get transition classes without hook (for non-component usage)
 */
export const getTransitionClasses = (duration: number = 300) => {
  // Map duration to Tailwind classes
  let durationClass = 'duration-300'
  if (duration <= 150) {
    durationClass = 'duration-150'
  } else if (duration <= 200) {
    durationClass = 'duration-200'
  } else if (duration <= 300) {
    durationClass = 'duration-300'
  } else if (duration <= 500) {
    durationClass = 'duration-500'
  } else if (duration <= 700) {
    durationClass = 'duration-700'
  } else {
    durationClass = 'duration-1000'
  }

  return {
    base: `transition-all ${durationClass} ease-in-out`,
    colors: `transition-colors ${durationClass} ease-in-out`,
    transform: `transition-transform ${durationClass} ease-in-out`,
    opacity: `transition-opacity ${durationClass} ease-in-out`,
    shadow: `transition-shadow ${durationClass} ease-in-out`,
    durationClass,
  }
}

export default useTransitionClasses

