import { forwardRef, memo } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  pill?: boolean
  round?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, pill, round, ...props }, ref) => {
    const baseStyles = `inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${round ? 'rounded-full aspect-square' : pill ? 'rounded-full' : 'rounded-lg'}`
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    }
    
    const sizes = round
      ? {
          sm: 'w-8 h-8 p-0',
          md: 'w-10 h-10 p-0',
          lg: 'w-12 h-12 p-0',
        }
      : {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-base',
          lg: 'px-6 py-3 text-lg',
        }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        <span
          className={cn(
            'inline-flex items-center justify-center transition-all duration-300 ease-in-out',
            isLoading
              ? 'opacity-100 scale-100 max-w-[20px] mr-2'
              : 'opacity-0 scale-90 max-w-0 mr-0 overflow-hidden'
          )}
        >
          <span
            className="spinner-circle h-4 w-4"
            aria-hidden="true"
          />
        </span>
        {isLoading ? <span className="sr-only">Loading</span> : null}
        <span
          className={cn(
            'inline-flex items-center transition-opacity duration-300 ease-in-out',
            isLoading ? 'opacity-50' : 'opacity-100'
          )}
        >
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default memo(Button)

