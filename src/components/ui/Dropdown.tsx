import { Fragment, useState, useRef, useEffect } from 'react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: ReactNode
}

export interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  options: DropdownOption[]
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
  label?: string
  error?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Dropdown = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  className,
  buttonClassName,
  menuClassName,
  disabled = false,
  size = 'md',
  ...props
}: DropdownProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue

  const selectedOption = options.find((opt) => opt.value === selectedValue)

  const handleChange = (newValue: string | number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <Listbox value={selectedValue} onChange={handleChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={cn(
              'relative w-full cursor-pointer rounded-lg border bg-white dark:bg-gray-800 text-left shadow-sm transition-all',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              sizeClasses[size],
              error
                ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600',
              disabled && 'opacity-50 cursor-not-allowed',
              buttonClassName
            )}
            aria-label={label || 'Select an option'}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id || 'dropdown'}-error` : undefined}
            {...props}
          >
            <span className={cn('block truncate', !selectedOption && 'text-gray-500 dark:text-gray-400')}>
              {selectedOption ? (
                <div className="flex items-center gap-2">
                  {selectedOption.icon && <span className="flex-shrink-0">{selectedOption.icon}</span>}
                  <span>{selectedOption.label}</span>
                </div>
              ) : (
                placeholder
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className={cn(
                  'h-5 w-5 text-gray-400',
                  error && 'text-red-500 dark:text-red-400'
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={cn(
                'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none',
                menuClassName
              )}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active, disabled: optionDisabled }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all',
                      active && !optionDisabled
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'text-gray-900 dark:text-gray-100',
                      optionDisabled && 'opacity-50 cursor-not-allowed'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          'block truncate',
                          selected ? 'font-medium' : 'font-normal'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                          <span>{option.label}</span>
                        </div>
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Dropdown

