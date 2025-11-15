import { Fragment, type ReactNode } from 'react'
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

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <HeadlessRadioGroup
        value={controlledValue ?? defaultValue}
        onChange={handleChange}
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
                orientation === 'horizontal' ? 'p-3 flex-1 min-w-[150px]' : 'p-4 w-full',
                checked
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
                active && 'ring-2 ring-primary ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                error && 'border-red-500'
              )
            }
          >
            {({ checked, disabled }) => (
              <div className="flex w-full items-center">
                <div className="flex h-5 items-center">
                  <HeadlessRadioGroup.Label
                    as="div"
                    className={cn(
                      'flex items-center',
                      orientation === 'horizontal' ? 'flex-col text-center' : 'flex-row'
                    )}
                  >
                    {option.icon && (
                      <span className={cn('flex-shrink-0', orientation === 'horizontal' ? 'mb-2' : 'mr-3')}>
                        {option.icon}
                      </span>
                    )}
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {option.label}
                    </span>
                  </HeadlessRadioGroup.Label>
                </div>
                {checked && (
                  <div className="ml-auto flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                )}
              </div>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </HeadlessRadioGroup>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default RadioGroup

