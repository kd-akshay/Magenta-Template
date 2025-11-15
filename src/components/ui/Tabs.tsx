import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TabItem {
  label: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultTab?: number
  className?: string
}

const Tabs = ({ items, defaultTab = 0, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  const activeItem = items[activeTab]
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const direction = e.key === 'ArrowLeft' ? -1 : 1
      let newIndex = index + direction
      
      if (newIndex < 0) {
        newIndex = items.length - 1
      } else if (newIndex >= items.length) {
        newIndex = 0
      }
      
      // Skip disabled tabs
      while (items[newIndex]?.disabled) {
        newIndex += direction
        if (newIndex < 0) {
          newIndex = items.length - 1
        } else if (newIndex >= items.length) {
          newIndex = 0
        }
        // Prevent infinite loop if all tabs are disabled
        if (newIndex === index) break
      }
      
      if (!items[newIndex]?.disabled) {
        setActiveTab(newIndex)
        const tabButton = document.querySelector(`[role="tab"][aria-controls="tab-panel-${newIndex}"]`) as HTMLElement
        tabButton?.focus()
      }
    } else if (e.key === 'Home') {
      e.preventDefault()
      const firstEnabledIndex = items.findIndex(item => !item.disabled)
      if (firstEnabledIndex !== -1) {
        setActiveTab(firstEnabledIndex)
        const tabButton = document.querySelector(`[role="tab"][aria-controls="tab-panel-${firstEnabledIndex}"]`) as HTMLElement
        tabButton?.focus()
      }
    } else if (e.key === 'End') {
      e.preventDefault()
      const lastEnabledIndex = items.length - 1 - [...items].reverse().findIndex(item => !item.disabled)
      if (lastEnabledIndex !== -1) {
        setActiveTab(lastEnabledIndex)
        const tabButton = document.querySelector(`[role="tab"][aria-controls="tab-panel-${lastEnabledIndex}"]`) as HTMLElement
        tabButton?.focus()
      }
    }
  }
  
  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-gray-200 dark:border-gray-700" role="tablist" aria-label="Tabs">
        <div className="flex space-x-1">
          {items.map((item, index) => (
            <button
              key={index}
              id={`tab-${index}`}
              onClick={() => !item.disabled && setActiveTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={item.disabled}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tab-panel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
                'outline-none shadow-none',
                activeTab === index
                  ? 'text-primary !border-0 !border-b-2 !border-primary bg-primary/5 focus:ring-0'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-0',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`tab-panel-${activeTab}`}
        role="tabpanel"
        className="mt-4 transition-opacity duration-200 ease-in-out"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
      >
        {activeItem?.content}
      </div>
    </div>
  )
}

export default Tabs

