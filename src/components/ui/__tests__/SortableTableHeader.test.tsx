import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SortableTableHeader from '../SortableTableHeader'

describe('SortableTableHeader', () => {
  it('renders header with text', () => {
    render(<SortableTableHeader>Name</SortableTableHeader>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders as table header cell', () => {
    const { container } = render(<SortableTableHeader>Name</SortableTableHeader>)
    expect(container.querySelector('th')).toBeInTheDocument()
  })

  it('renders sort icons when sortable', () => {
    const handleSort = vi.fn()
    const { container } = render(
      <SortableTableHeader sortKey="name" onSort={handleSort}>
        Name
      </SortableTableHeader>
    )
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('does not render sort icons when not sortable', () => {
    const { container } = render(<SortableTableHeader>Name</SortableTableHeader>)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBe(0)
  })

  it('calls onSort when clicked', async () => {
    const handleSort = vi.fn()
    const user = userEvent.setup()
    render(
      <SortableTableHeader sortKey="name" onSort={handleSort}>
        Name
      </SortableTableHeader>
    )
    
    await user.click(screen.getByText('Name'))
    expect(handleSort).toHaveBeenCalledWith('name')
  })

  it('shows active state when currentSortKey matches', () => {
    const { container } = render(
      <SortableTableHeader 
        sortKey="name" 
        currentSortKey="name" 
        sortDirection="asc"
        onSort={vi.fn()}
      >
        Name
      </SortableTableHeader>
    )
    const icons = container.querySelectorAll('svg')
    expect(icons[0]).toHaveClass('text-primary')
  })

  it('shows ascending icon when sortDirection is asc', () => {
    const { container } = render(
      <SortableTableHeader 
        sortKey="name" 
        currentSortKey="name" 
        sortDirection="asc"
        onSort={vi.fn()}
      >
        Name
      </SortableTableHeader>
    )
    const upIcon = container.querySelector('svg')
    expect(upIcon).toHaveClass('text-primary', 'opacity-100')
  })

  it('shows descending icon when sortDirection is desc', () => {
    const { container } = render(
      <SortableTableHeader 
        sortKey="name" 
        currentSortKey="name" 
        sortDirection="desc"
        onSort={vi.fn()}
      >
        Name
      </SortableTableHeader>
    )
    const icons = container.querySelectorAll('svg')
    expect(icons[1]).toHaveClass('text-primary', 'opacity-100')
  })

  it('renders with different alignments', () => {
    const { rerender, container } = render(
      <SortableTableHeader align="left">Name</SortableTableHeader>
    )
    expect(container.querySelector('th')).toHaveClass('text-left')
    
    rerender(<SortableTableHeader align="center">Name</SortableTableHeader>)
    expect(container.querySelector('th')).toHaveClass('text-center')
    
    rerender(<SortableTableHeader align="right">Name</SortableTableHeader>)
    expect(container.querySelector('th')).toHaveClass('text-right')
  })

  it('applies custom className', () => {
    const { container } = render(
      <SortableTableHeader className="custom-class">Name</SortableTableHeader>
    )
    expect(container.querySelector('th')).toHaveClass('custom-class')
  })

  it('has cursor-pointer when sortable', () => {
    const { container } = render(
      <SortableTableHeader sortKey="name" onSort={vi.fn()}>
        Name
      </SortableTableHeader>
    )
    expect(container.querySelector('th')).toHaveClass('cursor-pointer')
  })
})

