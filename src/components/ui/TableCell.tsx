import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  header?: boolean
  align?: 'left' | 'center' | 'right'
  colSpan?: number
}

const TableCell = ({ 
  className, 
  children, 
  header = false, 
  align = 'left',
  colSpan,
  ...props 
}: TableCellProps) => {
  const Component = header ? 'th' : 'td'
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Component
      className={cn(
        header 
          ? 'px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'
          : 'px-4 py-3 text-sm text-gray-900 dark:text-gray-100',
        alignClasses[align],
        className
      )}
      colSpan={colSpan}
      {...props}
    >
      {children}
    </Component>
  )
}

export default TableCell

