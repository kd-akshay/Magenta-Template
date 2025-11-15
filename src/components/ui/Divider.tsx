import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

const Divider = ({ orientation = 'horizontal', label, className, ...props }: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn('w-px h-full bg-gray-200 dark:bg-gray-700', className)}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    )
  }
  
  if (label) {
    return (
      <div 
        className={cn('flex items-center my-4', className)} 
        role="separator"
        aria-orientation="horizontal"
        aria-label={label}
        {...props}
      >
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" aria-hidden="true" />
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" aria-hidden="true" />
      </div>
    )
  }
  
  return (
    <div
      className={cn('border-t border-gray-200 dark:border-gray-700 my-4', className)}
      role="separator"
      aria-orientation="horizontal"
      aria-hidden={!props['aria-label']}
      {...props}
    />
  )
}

export default Divider

