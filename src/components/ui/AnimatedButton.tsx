import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'bounce' | 'pulse' | 'shake' | 'none'
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant = 'primary', size = 'md', animation = 'none', children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary active:scale-95',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500 active:scale-95',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary active:scale-95',
      ghost: 'text-primary hover:bg-primary/10 focus:ring-primary active:scale-95',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:scale-95',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    const animations = {
      bounce: 'hover:animate-bounce',
      pulse: 'hover:animate-pulse',
      shake: 'hover:animate-shake',
      none: '',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], animations[animation], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

export default AnimatedButton

