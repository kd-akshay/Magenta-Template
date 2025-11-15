import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

const AnimatedSkeleton = ({ 
  className, 
  variant = 'text', 
  width, 
  height, 
  lines = 1,
  ...props 
}: AnimatedSkeletonProps) => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const baseStyles = cn(
    'bg-gray-200 dark:bg-gray-700 rounded',
    !prefersReducedMotion && 'animate-pulse'
  )
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }
  
  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height
  
  if (lines > 1) {
    return (
      <div 
        className={cn('space-y-2', className)} 
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label={props['aria-label'] || 'Loading content'}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(baseStyles, variants[variant])}
            style={index === lines - 1 ? { ...style, width: width ? style.width : '80%' } : style}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Content is loading...</span>
      </div>
    )
  }
  
  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={props['aria-label'] || 'Loading content'}
      {...props}
    >
      <span className="sr-only">Content is loading...</span>
    </div>
  )
}

export default AnimatedSkeleton

