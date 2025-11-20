import { Fragment, useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface CommandPaletteOption {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  keywords?: string[]
  action: () => void
  group?: string
}

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  options: CommandPaletteOption[]
  placeholder?: string
  emptyMessage?: string
  className?: string
}

const CommandPalette = ({
  isOpen,
  onClose,
  options,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  className,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const filteredOptions = options.filter((option) => {
    if (!query) return true
    
    const searchTerm = query.toLowerCase()
    const matchesLabel = option.label.toLowerCase().includes(searchTerm)
    const matchesDescription = option.description?.toLowerCase().includes(searchTerm)
    const matchesKeywords = option.keywords?.some((keyword) => keyword.toLowerCase().includes(searchTerm))
    
    return matchesLabel || matchesDescription || matchesKeywords
  })

  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || 'Other'
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(option)
    return acc
  }, {} as Record<string, CommandPaletteOption[]>)

  const handleSelect = (option: CommandPaletteOption) => {
    option.action()
    onClose()
    setQuery('')
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[10000]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-[20vh]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all',
                  className
                )}
                aria-label="Command palette"
              >
                <Combobox onChange={handleSelect}>
                  <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      ref={inputRef}
                      className="w-full border-0 bg-transparent py-4 pl-3 pr-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      placeholder={placeholder}
                      displayValue={() => query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <Combobox.Options
                    static
                    className="max-h-96 overflow-y-auto px-2 py-2"
                  >
                    {filteredOptions.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        {emptyMessage}
                      </div>
                    ) : (
                      Object.entries(groupedOptions).map(([group, groupOptions]) => (
                        <div key={group}>
                          {group !== 'Other' && (
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {group}
                            </div>
                          )}
                          {groupOptions.map((option) => (
                            <Combobox.Option
                              key={option.id}
                              value={option}
                              className={({ active }) =>
                                cn(
                                  'relative flex cursor-pointer select-none items-center rounded-lg px-4 py-3 transition-colors',
                                  active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-900 dark:text-gray-100'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  {option.icon && (
                                    <div
                                      className={cn(
                                        'flex-shrink-0 mr-3',
                                        active ? 'text-primary' : 'text-gray-400'
                                      )}
                                    >
                                      {option.icon}
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium">{option.label}</div>
                                    {option.description && (
                                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {option.description}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </div>
                      ))
                    )}
                  </Combobox.Options>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CommandPalette

