import { Fragment, useState, useId } from 'react'
import type { ReactNode } from 'react'
import { Listbox as HeadlessListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'

export interface ListboxOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: ReactNode
}

export interface ListboxProps {
  options: ListboxOption[]
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Listbox = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  placeholder = 'Select an option...',
  disabled = false,
  error,
  className,
  size = 'md',
}: ListboxProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const { config } = useTransition()

  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue
  const selectedOption = options.find((opt) => opt.value === selectedValue)

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  }

  const handleChange = (newValue: string | number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const listboxId = useId()
  const errorId = error ? `${listboxId}-error` : undefined

  // Convert duration to seconds for Headless UI Transition
  const transitionDuration = config.duration / 1000

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={listboxId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <HeadlessListbox
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
      >
        <div className="relative">
          <HeadlessListbox.Button
            id={listboxId}
            className={cn(
              'relative w-full cursor-pointer rounded-lg border bg-white dark:bg-gray-800 text-left shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              sizes[size],
              'border-gray-300 dark:border-gray-600',
              'text-gray-900 dark:text-gray-100',
              'placeholder-gray-400 dark:placeholder-gray-500',
              error && 'border-red-500 focus:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900',
              'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500'
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={errorId}
          >
            <span className={cn('block truncate', !selectedOption && 'text-gray-500 dark:text-gray-400')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </HeadlessListbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessListbox.Options 
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none"
              style={{
                transitionDuration: `${transitionDuration}s`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {options.map((option) => (
                <HeadlessListbox.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active, disabled: optionDisabled }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-900 dark:text-gray-100',
                      optionDisabled && 'opacity-50 cursor-not-allowed'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      {option.icon && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {option.icon}
                        </span>
                      )}
                    </>
                  )}
                </HeadlessListbox.Option>
              ))}
            </HeadlessListbox.Options>
          </Transition>
        </div>
      </HeadlessListbox>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Listbox

