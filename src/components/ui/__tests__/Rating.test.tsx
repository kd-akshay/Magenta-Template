import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Rating from '../Rating'

describe('Rating', () => {
  it('renders with default max value of 5', () => {
    render(<Rating />)
    const stars = screen.getAllByRole('button')
    expect(stars).toHaveLength(5)
  })

  it('renders with custom max value', () => {
    render(<Rating max={10} />)
    const stars = screen.getAllByRole('button')
    expect(stars).toHaveLength(10)
  })

  it('renders with value', () => {
    render(<Rating value={3} />)
    const stars = screen.getAllByRole('button')
    expect(stars[0]).toHaveAttribute('aria-pressed', 'true')
    expect(stars[1]).toHaveAttribute('aria-pressed', 'true')
    expect(stars[2]).toHaveAttribute('aria-pressed', 'true')
    expect(stars[3]).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onChange when star is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Rating onChange={handleChange} />)
    
    const stars = screen.getAllByRole('button')
    await user.click(stars[2])
    
    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it('does not call onChange when readOnly', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Rating value={2} readOnly onChange={handleChange} />)
    
    const stars = screen.getAllByRole('button')
    await user.click(stars[3])
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('clears rating when same star is clicked and allowClear is true', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Rating value={3} allowClear onChange={handleChange} />)
    
    const stars = screen.getAllByRole('button')
    await user.click(stars[2]) // Click the 3rd star again
    
    expect(handleChange).toHaveBeenCalledWith(0)
  })

  it('displays value text when value is greater than 0', () => {
    render(<Rating value={3} max={5} />)
    expect(screen.getByText('3 / 5')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Rating label="Rate this" />)
    expect(screen.getByText('Rate this')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<Rating helperText="Select a rating" />)
    expect(screen.getByText('Select a rating')).toBeInTheDocument()
  })

  it('shows labels when showLabels is true', () => {
    render(<Rating value={3} showLabels />)
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('uses custom labels when provided', () => {
    const labels = ['Bad', 'Okay', 'Good', 'Great', 'Excellent']
    render(<Rating value={3} showLabels labels={labels} />)
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('applies size variants', () => {
    const { rerender } = render(<Rating size="sm" />)
    let stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('w-4', 'h-4')

    rerender(<Rating size="md" />)
    stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('w-5', 'h-5')

    rerender(<Rating size="lg" />)
    stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('w-6', 'h-6')

    rerender(<Rating size="xl" />)
    stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('w-8', 'h-8')
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Rating variant="primary" />)
    let stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('text-primary')

    rerender(<Rating variant="warning" />)
    stars = screen.getAllByRole('button')
    expect(stars[0].querySelector('svg')).toHaveClass('text-yellow-400')
  })

  it('handles uncontrolled mode with defaultValue', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Rating defaultValue={2} onChange={handleChange} />)
    
    const stars = screen.getAllByRole('button')
    await user.click(stars[3])
    
    expect(handleChange).toHaveBeenCalledWith(4)
  })
})

