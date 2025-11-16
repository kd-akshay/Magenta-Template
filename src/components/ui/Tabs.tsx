import { memo, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Tab } from '@headlessui/react'
import { cn } from '@/utils/cn'

export interface TabItem {
  label: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
  defaultTab?: number // Backward compatibility
  className?: string
  onChange?: (index: number) => void
}

const Tabs = memo(({ items, defaultIndex, defaultTab, className, onChange }: TabsProps) => {
  // Support both defaultIndex (Headless UI) and defaultTab (backward compatibility)
  const initialIndex = useMemo(() => defaultIndex ?? defaultTab ?? 0, [defaultIndex, defaultTab])
  
  return (
    <Tab.Group defaultIndex={initialIndex} onChange={onChange}>
      <div className={cn('w-full', className)}>
        <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
          {items.map((item, index) => (
            <Tab
              key={index}
              disabled={item.disabled}
              className={({ selected }) =>
                cn(
                  'px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
                  'outline-none border-b-2 border-transparent',
                  'focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2',
                  selected
                    ? 'text-primary border-primary bg-primary/10 dark:bg-primary/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {items.map((item, index) => (
            <Tab.Panel
              key={index}
              className="transition-opacity duration-200 ease-in-out"
            >
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
})

Tabs.displayName = 'Tabs'

export default Tabs

