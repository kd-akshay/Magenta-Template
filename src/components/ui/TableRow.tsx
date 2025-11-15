import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

const TableRow = ({ className, children, selected = false, onClick, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn(
        'transition-colors',
        selected && 'bg-primary/10 dark:bg-primary/20',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  )
}

export default TableRow

