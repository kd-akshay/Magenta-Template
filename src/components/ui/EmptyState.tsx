import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps {
  /** Icon or illustration */
  icon?: ReactNode
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Primary action button */
  action?: ReactNode
  /** Secondary action button */
  secondaryAction?: ReactNode
  /** Custom className */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = ({
  icon,
  title = 'No data found',
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: {
      icon: 'w-12 h-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    md: {
      icon: 'w-16 h-16',
      title: 'text-xl',
      description: 'text-base',
    },
    lg: {
      icon: 'w-24 h-24',
      title: 'text-2xl',
      description: 'text-lg',
    },
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            'mb-4 text-gray-400 dark:text-gray-500',
            sizeClasses[size].icon
          )}
          aria-hidden="true"
        >
          {typeof icon === 'string' ? (
            <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-100 dark:bg-gray-800">
              <span className="text-2xl">{icon}</span>
            </div>
          ) : (
            icon
          )}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3
          className={cn(
            'font-semibold text-gray-900 dark:text-gray-100 mb-2',
            sizeClasses[size].title
          )}
          id={`empty-state-title-${Math.random().toString(36).substr(2, 9)}`}
        >
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-gray-600 dark:text-gray-400 max-w-md mb-6',
            sizeClasses[size].description
          )}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}

export default EmptyState

