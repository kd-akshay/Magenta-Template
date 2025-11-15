import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
  striped?: boolean
  hoverable?: boolean
}

const TableBody = ({ className, children, striped = false, hoverable = true, ...props }: TableBodyProps) => {
  return (
    <tbody
      className={cn(
        'divide-y divide-gray-200 dark:divide-gray-700',
        striped && '[&>tr:nth-child(even)]:bg-gray-50 dark:[&>tr:nth-child(even)]:bg-gray-800/50',
        hoverable && '[&>tr]:transition-colors  [&>tr:hover]:bg-gray-50 dark:[&>tr:hover]:bg-gray-800/50',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  )
}

export default TableBody

