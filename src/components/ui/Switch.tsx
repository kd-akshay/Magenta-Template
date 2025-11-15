import { forwardRef, useState, useEffect } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, error, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${switchId}-error` : undefined
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
    
    const checkedState = checked ?? isChecked
    
    return (
      <div className="w-full">
        <div className="flex items-center">
          <div className="relative inline-flex items-center">
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              className="sr-only peer"
              role="switch"
              checked={checkedState}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              aria-checked={checkedState}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId}
              {...props}
            />
            <label
              htmlFor={switchId}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out cursor-pointer select-none',
                'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
                'peer-checked:bg-primary',
                checkedState ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600',
                props.disabled && 'opacity-50 cursor-not-allowed',
                error && 'ring-2 ring-red-500',
                className
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out select-none pointer-events-none',
                  checkedState ? 'translate-x-6' : 'translate-x-1'
                )}
                aria-hidden="true"
              />
            </label>
          </div>
          {label && (
            <label
              htmlFor={switchId}
              className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
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

Switch.displayName = 'Switch'

export default Switch

