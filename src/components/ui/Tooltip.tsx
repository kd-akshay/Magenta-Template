import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { cn } from '@/utils/cn'

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

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
  }
  
  return (
    <Popover className="relative">
      <Popover.Button as="div" className="cursor-help">
        {children}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          className={cn(
            'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg whitespace-nowrap',
            positions[position]
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45',
              arrowPositions[position]
            )}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Tooltip

