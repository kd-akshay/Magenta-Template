import { forwardRef, useState, useEffect } from 'react'
import type { InputHTMLAttributes } from 'react'
import { FaCheck } from 'react-icons/fa'
import { cn } from '@/utils/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${checkboxId}-error` : undefined
    const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false)
    
    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked)
      }
      onChange?.(e)
    }
    
    return (
      <div className="w-full">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className="sr-only peer"
              checked={checked ?? isChecked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId}
              {...props}
            />
            <label
              htmlFor={checkboxId}
              className={cn(
                'flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ease-in-out',
                'border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'hover:border-primary',
                'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
                'peer-checked:bg-primary peer-checked:border-primary',
                props.disabled && 'opacity-50 cursor-not-allowed',
                error && 'border-red-500',
                className
              )}
            >
              <FaCheck 
                className={cn(
                  'text-white transition-opacity duration-200 ease-in-out font-bold',
                  'w-3.5 h-3.5',
                  (checked ?? isChecked) ? 'opacity-100' : 'opacity-0'
                )} 
                aria-hidden="true" 
              />
            </label>
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox'

export default Checkbox

