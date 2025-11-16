import { memo } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = ({ className, variant = 'primary', size = 'md', children, ...props }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full'
  
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }
  
  const isInteractive = props.onClick !== undefined || props.onKeyDown !== undefined
  
  return (
    <span 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={props['aria-label'] || (typeof children === 'string' && !isInteractive ? undefined : `Badge: ${children}`)}
      {...props}
    >
      {children}
    </span>
  )
}

export default memo(Badge)

