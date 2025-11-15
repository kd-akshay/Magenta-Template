import { useEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedCounterProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

const AnimatedCounter = ({ 
  className, 
  value, 
  duration = 2000, 
  decimals = 0,
  prefix = '',
  suffix = '',
  ...props 
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = startTime === currentTime ? 0 : value * easeOut
      
      setDisplayValue(current)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])
  
  const formattedValue = displayValue.toFixed(decimals)
  
  return (
    <span 
      className={cn('inline-block', className)} 
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={props['aria-label'] || `Counter value: ${prefix}${formattedValue}${suffix}`}
      {...props}
    >
      {prefix}{formattedValue}{suffix}
    </span>
  )
}

export default AnimatedCounter

