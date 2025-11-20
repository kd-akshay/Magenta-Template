import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const Tooltip = ({ content, children, position = 'top', delay = 200 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

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
  
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId}
          className={cn(
            'absolute z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200',
            'bg-gray-600 dark:bg-gray-800 text-white dark:text-gray-100',
            'border border-gray-500 dark:border-gray-700',
            positions[position],
            'opacity-100 scale-100'
          )}
          role="tooltip"
          aria-live="polite"
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 transform rotate-45',
              'bg-gray-600 dark:bg-gray-800 border-gray-500 dark:border-gray-700',
              arrowPositions[position]
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

export default Tooltip

