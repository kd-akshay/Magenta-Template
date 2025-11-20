import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableWithPagination from '../TableWithPagination'

describe('TableWithPagination', () => {
  const data = [
    { id: 1, name: 'John', email: 'john@test.com' },
    { id: 2, name: 'Jane', email: 'jane@test.com' },
    { id: 3, name: 'Bob', email: 'bob@test.com' },
    { id: 4, name: 'Alice', email: 'alice@test.com' },
    { id: 5, name: 'Charlie', email: 'charlie@test.com' },
  ]

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ]

  it('renders table with data', () => {
    render(<TableWithPagination data={data} columns={columns} itemsPerPage={5} />)
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
  })

  it('paginates data correctly', () => {
    render(<TableWithPagination data={data} columns={columns} itemsPerPage={2} />)
    // Should show first 2 items
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
  })

  it('changes page when pagination is clicked', async () => {
    const user = userEvent.setup()
    render(<TableWithPagination data={data} columns={columns} itemsPerPage={2} />)
    
    const nextButton = screen.getByRole('button', { name: /next page/i })
    await user.click(nextButton)
    
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('John')).not.toBeInTheDocument()
  })

  it('changes items per page', async () => {
    const user = userEvent.setup()
    render(<TableWithPagination data={data} columns={columns} itemsPerPage={2} />)
    
    const select = screen.getByLabelText(/show:/i)
    await user.click(select)
    
    // Select new option
    const option = screen.getByText(/5 per page/i)
    await user.click(option)
    
    // Should show all 5 items
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('displays entry count', () => {
    render(<TableWithPagination data={data} columns={columns} itemsPerPage={2} />)
    expect(screen.getByText(/showing 1 to 2 of 5 entries/i)).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(<TableWithPagination data={[]} columns={columns} emptyMessage="No data" />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('supports custom column rendering', () => {
    const columnsWithRender = [
      { key: 'name', header: 'Name', render: (value: string) => <strong>{value}</strong> },
    ]
    render(<TableWithPagination data={[{ id: 1, name: 'John' }]} columns={columnsWithRender} />)
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('has proper table structure', () => {
    render(<TableWithPagination data={data} columns={columns} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /id/i })).toBeInTheDocument()
  })
})

