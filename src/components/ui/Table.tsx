import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
}

const Table = ({ className, children, striped = false, hoverable = true, compact = false, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          'w-full border-collapse',
          compact ? 'text-sm' : 'text-base',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export default Table

