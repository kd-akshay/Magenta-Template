import type { ReactNode } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import TableCell from './TableCell'

export type SortDirection = 'asc' | 'desc' | null

export interface SortableTableHeaderProps {
  children: ReactNode
  sortKey?: string
  currentSortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string) => void
  align?: 'left' | 'center' | 'right'
  className?: string
}

const SortableTableHeader = ({
  children,
  sortKey,
  currentSortKey,
  sortDirection,
  onSort,
  align = 'left',
  className,
}: SortableTableHeaderProps) => {
  const isActive = sortKey && currentSortKey === sortKey
  const isSortable = sortKey && onSort

  const handleClick = () => {
    if (isSortable) {
      onSort(sortKey)
    }
  }

  return (
    <TableCell
      header
      align={align}
      className={cn(
        'select-none',
        isSortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors transition-all',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        {isSortable && (
          <span className="flex flex-col">
            <ChevronUpIcon
              className={cn(
                'h-3 w-3 transition-opacity transition-all',
                isActive && sortDirection === 'asc'
                  ? 'text-primary opacity-100'
                  : 'text-gray-400 opacity-50'
              )}
              aria-hidden="true"
            />
            <ChevronDownIcon
              className={cn(
                'h-3 w-3 -mt-1 transition-opacity transition-all',
                isActive && sortDirection === 'desc'
                  ? 'text-primary opacity-100'
                  : 'text-gray-400 opacity-50'
              )}
              aria-hidden="true"
            />
          </span>
        )}
      </div>
    </TableCell>
  )
}

export default SortableTableHeader

