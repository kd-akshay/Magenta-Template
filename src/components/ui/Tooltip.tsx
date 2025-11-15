import type { ReactNode } from 'react'
import { Popover } from '@headlessui/react'

export interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }
  
  return (
    <Popover className="relative">
      <Popover.Button as="div" className="cursor-help">
        {children}
      </Popover.Button>
      <Popover.Panel
        className={`
          absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg
          transition-all
          ${positions[position]}
          whitespace-nowrap
        `}
      >
        {content}
        <div
          className={`
            absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : ''}
            ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' : ''}
            ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' : ''}
            ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1' : ''}
          `}
        />
      </Popover.Panel>
    </Popover>
  )
}

export default Tooltip

