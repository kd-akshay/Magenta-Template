import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  onRemove?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  removable?: boolean
  disabled?: boolean
  icon?: ReactNode
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      onRemove,
      variant = 'primary',
      size = 'md',
      removable = false,
      disabled = false,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
      secondary: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
      success: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700',
      danger: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700',
      info: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700',
      outline: 'bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-600',
    }

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    const iconSizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!disabled && onRemove) {
        onRemove()
      }
    }

    return (
      <div
        ref={ref}
        role={removable ? 'group' : undefined}
        aria-label={removable ? `${children} chip` : undefined}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-medium transition-all',
          variantClasses[variant],
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && removable && 'pr-1',
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
            {icon}
          </span>
        )}
        <span>{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              'flex-shrink-0 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
              iconSizeClasses[size],
              disabled && 'cursor-not-allowed'
            )}
            aria-label="Remove"
          >
            <XMarkIcon className={iconSizeClasses[size]} />
          </button>
        )}
      </div>
    )
  }
)

Chip.displayName = 'Chip'

export default Chip

