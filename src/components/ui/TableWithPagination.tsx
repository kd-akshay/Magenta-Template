import { useState, useMemo, useEffect } from 'react'
import type { ReactNode } from 'react'
import Table from './Table'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableRow from './TableRow'
import TableCell from './TableCell'
import Pagination from './Pagination'
import Select, { type SelectOption } from './Select'
import { cn } from '@/utils/cn'

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => ReactNode
  sortable?: boolean
}

export interface TableWithPaginationProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  itemsPerPage?: number
  itemsPerPageOptions?: number[]
  className?: string
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  showItemsPerPage?: boolean
  emptyMessage?: string
}

function TableWithPagination<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage: defaultItemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 25, 50, 100],
  className,
  striped = false,
  hoverable = true,
  compact = false,
  showItemsPerPage = true,
  emptyMessage = 'No data available',
}: TableWithPaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  // Ensure itemsPerPage is always valid
  const validItemsPerPage = itemsPerPage > 0 ? itemsPerPage : defaultItemsPerPage

  // Calculate pagination - ensure totalPages is always a valid number >= 1
  const totalPages = useMemo(() => {
    if (data.length === 0) return 1
    const pages = Math.ceil(data.length / validItemsPerPage)
    return isNaN(pages) || pages < 1 ? 1 : pages
  }, [data.length, validItemsPerPage])
  const startIndex = (currentPage - 1) * validItemsPerPage
  const endIndex = startIndex + validItemsPerPage
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex)
  }, [data, startIndex, endIndex])

  // Reset to page 1 when items per page changes
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value)
    if (!isNaN(newItemsPerPage) && newItemsPerPage > 0) {
      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1)
    }
  }

  // Reset to page 1 when data changes or total pages decreases
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [data.length, totalPages, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Create select options for items per page
  const itemsPerPageSelectOptions: SelectOption[] = itemsPerPageOptions.map((option) => ({
    value: option.toString(),
    label: `${option} per page`,
  }))

  if (data.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Table */}
      <div role="region" aria-label="Data table with pagination">
        <Table striped={striped} hoverable={hoverable} compact={compact}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.key)} header align={column.align || 'left'}>
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
        <TableBody striped={striped} hoverable={hoverable}>
          {paginatedData.map((row, rowIndex) => {
            // Use id if available, otherwise use index with startIndex for uniqueness
            const rowKey = 'id' in row && row.id != null ? String(row.id) : `${startIndex}-${rowIndex}`
            return (
              <TableRow key={rowKey}>
                {columns.map((column) => {
                  const value = column.key in row ? row[column.key as keyof T] : null
                  const cellContent = column.render ? column.render(value, row) : value

                  return (
                    <TableCell key={String(column.key)} align={column.align || 'left'}>
                      {cellContent}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>

      {/* Pagination and Page Size Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Items per page selector and entry count */}
        {showItemsPerPage && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label htmlFor="items-per-page" className="text-sm text-gray-700 dark:text-gray-300">
                Show:
              </label>
              <Select
                id="items-per-page"
                value={validItemsPerPage.toString()}
                onChange={handleItemsPerPageChange}
                options={itemsPerPageSelectOptions}
                className="w-auto min-w-[140px]"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showFirstLast={totalPages > 7}
          />
        )}
      </div>
    </div>
  )
}

export default TableWithPagination

