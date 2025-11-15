import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${radioId}-error` : undefined
    
    return (
      <div className="w-full">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <label
              htmlFor={radioId}
              className={cn(
                'flex items-center justify-center w-5 h-5 border-2 rounded-full cursor-pointer transition-all transition-all relative',
                'border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'hover:border-primary',
                'focus-within:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'has-[:checked]:border-primary',
                '[&:has(input:checked)>span]:opacity-100',
                props.disabled && 'opacity-50 cursor-not-allowed',
                error && 'border-red-500',
                className
              )}
            >
              <input
                ref={ref}
                type="radio"
                id={radioId}
                className="sr-only"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={errorId}
                {...props}
              />
              <span 
                className="absolute w-2.5 h-2.5 bg-primary rounded-full transition-opacity transition-all opacity-0" 
                aria-hidden="true" 
              />
            </label>
          </div>
          {label && (
            <label
              htmlFor={radioId}
              className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio

