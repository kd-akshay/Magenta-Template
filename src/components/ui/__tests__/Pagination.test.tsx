import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../Pagination'

describe('Pagination', () => {
  const handlePageChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders pagination with page numbers', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders First and Last buttons by default', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={handlePageChange} />)
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })

  it('does not render First and Last when showFirstLast is false', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        onPageChange={handlePageChange}
        showFirstLast={false}
      />
    )
    expect(screen.queryByLabelText('First page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Last page')).not.toBeInTheDocument()
  })

  it('calls onPageChange when page is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />)
    
    await user.click(screen.getByLabelText('Page 2'))
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when Next is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />)
    
    await user.click(screen.getByLabelText('Next page'))
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when Previous is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />)
    
    await user.click(screen.getByLabelText('Previous page'))
    expect(handlePageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange when First is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} />)
    
    await user.click(screen.getByLabelText('First page'))
    expect(handlePageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange when Last is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />)
    
    await user.click(screen.getByLabelText('Last page'))
    expect(handlePageChange).toHaveBeenCalledWith(10)
  })

  it('disables Previous and First on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
    expect(screen.getByLabelText('First page')).toBeDisabled()
  })

  it('disables Next and Last on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={handlePageChange} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    expect(screen.getByLabelText('Last page')).toBeDisabled()
  })

  it('marks current page as active', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />)
    const page3 = screen.getByLabelText('Page 3')
    expect(page3).toHaveAttribute('aria-current', 'page')
    expect(page3).toHaveClass('bg-primary')
  })

  it('renders ellipsis for large page counts', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} />)
    expect(screen.getAllByText('...').length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={handlePageChange}
        className="custom-class"
      />
    )
    expect(container.querySelector('nav')).toHaveClass('custom-class')
  })
})

