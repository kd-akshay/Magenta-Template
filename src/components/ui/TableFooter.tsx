import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

const TableFooter = ({ className, children, ...props }: TableFooterProps) => {
  return (
    <tfoot
      className={cn(
        'bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  )
}

export default TableFooter

