import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
}

const AnimatedProgress = ({ 
  className, 
  value, 
  max = 100, 
  variant = 'primary', 
  size = 'md',
  showLabel = false,
  animated = true,
  ...props 
}: AnimatedProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const variants = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  }
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }
  
  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variants[variant],
            animated && typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`${Math.round(percentage)}% complete`}
        />
      </div>
    </div>
  )
}

export default AnimatedProgress

