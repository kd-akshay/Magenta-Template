import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', icon, ...props }, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          className={cn(
            'w-full rounded-lg border border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'transition-all',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500',
            icon ? 'pl-10 pr-4 py-2' : 'px-4 py-2',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm font-medium text-red-600 dark:text-red-400" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
  }
)

Input.displayName = 'Input'

export default Input

