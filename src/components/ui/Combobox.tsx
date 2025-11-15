import { Fragment, useState, useId } from 'react'
import type { ReactNode } from 'react'
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'

export interface ComboboxOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: ReactNode
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  onInputChange?: (query: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  displayValue?: (option: ComboboxOption) => string
  filterFunction?: (options: ComboboxOption[], query: string) => ComboboxOption[]
}

const defaultFilter = (options: ComboboxOption[], query: string) => {
  return query === ''
    ? options
    : options.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
}

const Combobox = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  onInputChange,
  label,
  placeholder = 'Search...',
  disabled = false,
  error,
  className,
  size = 'md',
  displayValue = (option) => option.label,
  filterFunction = defaultFilter,
}: ComboboxProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [query, setQuery] = useState('')
  const { config } = useTransition()

  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue
  const selectedOption = options.find((opt) => opt.value === selectedValue)

  const filteredOptions = filterFunction(options, query)

  const sizes = {
    sm: 'px-3 py-1.5 pl-10 text-sm',
    md: 'px-4 py-2 pl-10 text-base',
    lg: 'px-4 py-2.5 pl-10 text-lg',
  }

  const handleChange = (newValue: string | number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
    setQuery('')
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    onInputChange?.(value)
  }

  const comboboxId = useId()
  const errorId = error ? `${comboboxId}-error` : undefined

  // Convert duration to seconds for Headless UI Transition
  const transitionDuration = config.duration / 1000

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={comboboxId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <HeadlessCombobox
        value={selectedOption}
        onChange={(option) => option && handleChange(option.value)}
        disabled={disabled}
      >
        <div className="relative">
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
            <HeadlessCombobox.Input
              id={comboboxId}
              className={cn(
                'w-full cursor-default rounded-lg border bg-white dark:bg-gray-800 text-left shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                sizes[size],
                'border-gray-300 dark:border-gray-600',
                'text-gray-900 dark:text-gray-100',
                'placeholder-gray-400 dark:placeholder-gray-500',
                error && 'border-red-500 focus:ring-red-500',
                disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900',
                'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500'
              )}
              displayValue={displayValue}
              onChange={(event) => handleInputChange(event.target.value)}
              placeholder={placeholder}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId}
              aria-expanded="true"
              aria-autocomplete="list"
            />
            <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </HeadlessCombobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <HeadlessCombobox.Options 
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none"
              style={{
                transitionDuration: `${transitionDuration}s`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <HeadlessCombobox.Option
                    key={option.value}
                    value={option}
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
                  </HeadlessCombobox.Option>
                ))
              )}
            </HeadlessCombobox.Options>
          </Transition>
        </div>
      </HeadlessCombobox>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Combobox

