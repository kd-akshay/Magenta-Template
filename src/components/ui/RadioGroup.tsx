import type { ReactNode } from 'react'
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface RadioGroupOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
  icon?: ReactNode
}

export interface RadioGroupProps {
  options: RadioGroupOption[]
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  label?: string
  error?: string
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  error,
  className,
  orientation = 'vertical',
}: RadioGroupProps) => {
  const handleChange = (newValue: string | number) => {
    onChange?.(newValue)
  }

  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${groupId}-error` : undefined

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined
  const radioGroupProps = isControlled
    ? { value: controlledValue, onChange: handleChange }
    : { defaultValue, onChange: handleChange }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <HeadlessRadioGroup
        {...radioGroupProps}
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'
        )}
        aria-label={label || 'Radio group'}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
      >
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={({ active, checked, disabled }) =>
              cn(
                'relative flex cursor-pointer rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                orientation === 'horizontal' ? 'p-4 flex-1 min-w-[120px]' : 'p-4 w-full',
                checked
                  ? error 
                    ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800'
                  : error
                    ? 'border-red-500 dark:border-red-500 bg-white dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
                active && 'ring-2 ring-gray-300 dark:ring-gray-600 ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed'
              )
            }
          >
            {({ checked }) => (
              <div className={cn(
                'flex w-full',
                orientation === 'horizontal' ? 'flex-col items-center justify-center relative' : 'items-center'
              )}>
                {orientation === 'horizontal' && checked && (
                  <div className="absolute top-2 right-2 flex-shrink-0">
                    <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-100" aria-hidden="true" />
                  </div>
                )}
                <HeadlessRadioGroup.Label
                  as="div"
                  className={cn(
                    'flex items-center w-full',
                    orientation === 'horizontal' ? 'flex-col text-center gap-2' : 'flex-row'
                  )}
                >
                  {option.icon && (
                    <span className={cn('flex-shrink-0', orientation === 'horizontal' ? '' : 'mr-3')}>
                      {option.icon}
                    </span>
                  )}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {option.label}
                  </span>
                  {option.description && orientation === 'vertical' && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </span>
                  )}
                </HeadlessRadioGroup.Label>
                {orientation === 'vertical' && checked && (
                  <div className="ml-auto flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" aria-hidden="true" />
                  </div>
                )}
                {orientation === 'horizontal' && option.description && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                    {option.description}
                  </p>
                )}
              </div>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </HeadlessRadioGroup>

      {error && (
        <p id={errorId} className="mt-1 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default RadioGroup

