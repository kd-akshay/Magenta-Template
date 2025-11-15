import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

const TableHeader = ({ className, children, ...props }: TableHeaderProps) => {
  return (
    <thead
      className={cn(
        'bg-primary/10 dark:bg-primary/20 border-b border-primary/20 dark:border-primary/30',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  )
}

export default TableHeader

