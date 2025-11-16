import React, { Fragment, useState, useId, useImperativeHandle, useRef, useMemo, useCallback } from 'react'
import type { SelectHTMLAttributes, ChangeEvent } from 'react'
import { Listbox as HeadlessListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'onChange'> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, value, defaultValue, onChange, disabled, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue as string || '')
  const { config } = useTransition()
  const generatedId = useId()
  const selectId = useMemo(() => id || generatedId, [id, generatedId])
  const errorId = useMemo(() => error ? `${selectId}-error` : undefined, [error, selectId])
  const internalRef = useRef<HTMLSelectElement>(null)

  // Convert duration to seconds for Headless UI Transition
  const transitionDuration = useMemo(() => config.duration / 1000, [config.duration])

  // Use controlled value if provided, otherwise use internal state
  const selectedValue = useMemo(() => value !== undefined ? value : internalValue, [value, internalValue])
  const selectedOption = useMemo(() => options.find((opt) => opt.value === selectedValue), [options, selectedValue])

  // Expose a ref that mimics HTMLSelectElement for backward compatibility
  useImperativeHandle(ref, () => ({
    ...internalRef.current!,
    value: selectedValue,
    focus: () => {
      // Focus the listbox button
      const button = document.getElementById(selectId) as HTMLButtonElement
      button?.focus()
    },
    blur: () => {
      const button = document.getElementById(selectId) as HTMLButtonElement
      button?.blur()
    },
  } as HTMLSelectElement), [selectId, selectedValue])

  const handleChange = useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }

    // Create a synthetic event for backward compatibility
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
          id: selectId,
        },
        currentTarget: {
          value: newValue,
          id: selectId,
        },
      } as ChangeEvent<HTMLSelectElement>
      onChange(syntheticEvent)
    }
  }, [value, onChange, selectId])

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
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
            id={selectId}
            className={cn(
              'relative w-full cursor-pointer rounded-lg border bg-white dark:bg-gray-800 text-left shadow-sm transition-all',
              'px-4 py-2 pr-10',
              'border-gray-300 dark:border-gray-600',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={errorId}
            {...props}
          >
            <span className={cn('block truncate', !selectedOption && 'text-gray-500 dark:text-gray-400')}>
              {selectedOption ? selectedOption.label : placeholder || 'Select an option...'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className={cn(
                  'h-5 w-5',
                  error ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'
                )}
                aria-hidden="true"
              />
            </span>
          </HeadlessListbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <HeadlessListbox.Options
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none"
            >
              {options.map((option) => (
                <HeadlessListbox.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active, disabled: optionDisabled }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all duration-150',
                      active && !optionDisabled
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
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
                    </>
                  )}
                </HeadlessListbox.Option>
              ))}
            </HeadlessListbox.Options>
          </Transition>
        </div>
      </HeadlessListbox>

      {error && (
        <p id={errorId} className="mt-1 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Hidden select element for form compatibility */}
      <select
        ref={internalRef}
        id={`${selectId}-hidden`}
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

SelectComponent.displayName = 'Select'

const Select = React.memo(SelectComponent)

export default Select
