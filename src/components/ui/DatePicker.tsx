import { useState, useRef, useEffect } from 'react'
import type { InputHTMLAttributes } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTheme } from '@/contexts/ThemeContext'

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  onChange?: (date: string) => void
  label?: string
  error?: string
  helperText?: string
  min?: string
  max?: string
  placeholder?: string
  className?: string
}

const DatePicker = ({
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  error,
  helperText,
  min,
  max,
  placeholder = 'Select a date',
  className,
  disabled,
  ...props
}: DatePickerProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const { isDark } = useTheme()
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleCalendarClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.showPicker?.()
      inputRef.current.focus()
    }
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg border border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'transition-all',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500',
            'px-4 py-2 pr-10',
            className
          )}
          style={{
            colorScheme: isDark ? 'dark' : 'light',
          }}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        <button
          type="button"
          onClick={handleCalendarClick}
          disabled={disabled}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="Open calendar"
          aria-describedby={label ? `${inputRef.current?.id || 'datepicker'}-label` : undefined}
        >
          <CalendarIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default DatePicker

