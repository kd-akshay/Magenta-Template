import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from '../Alert'

describe('Alert', () => {
  it('renders alert with children', () => {
    render(<Alert>Alert message</Alert>)
    expect(screen.getByText('Alert message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders with info variant by default', () => {
    const { container } = render(<Alert>Info alert</Alert>)
    const alert = container.querySelector('[role="alert"]')
    expect(alert).toHaveClass('bg-blue-50')
  })

  it('renders with different variants', () => {
    const { rerender, container } = render(<Alert variant="success">Success</Alert>)
    expect(container.querySelector('[role="alert"]')).toHaveClass('bg-green-50')
    
    rerender(<Alert variant="warning">Warning</Alert>)
    expect(container.querySelector('[role="alert"]')).toHaveClass('bg-yellow-50')
    
    rerender(<Alert variant="error">Error</Alert>)
    expect(container.querySelector('[role="alert"]')).toHaveClass('bg-red-50')
  })

  it('renders with title', () => {
    render(<Alert title="Alert Title">Alert message</Alert>)
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert message')).toBeInTheDocument()
  })

  it('renders close button when onClose is provided', () => {
    const handleClose = vi.fn()
    render(<Alert onClose={handleClose}>Alert message</Alert>)
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument()
  })

  it('does not render close button when onClose is not provided', () => {
    render(<Alert>Alert message</Alert>)
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(<Alert onClose={handleClose}>Alert message</Alert>)
    
    await user.click(screen.getByLabelText('Close alert'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders appropriate icon for each variant', () => {
    const { container, rerender } = render(<Alert variant="info">Info</Alert>)
    expect(container.querySelector('svg')).toBeInTheDocument()
    
    rerender(<Alert variant="success">Success</Alert>)
    expect(container.querySelector('svg')).toBeInTheDocument()
    
    rerender(<Alert variant="warning">Warning</Alert>)
    expect(container.querySelector('svg')).toBeInTheDocument()
    
    rerender(<Alert variant="error">Error</Alert>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Alert className="custom-class">Alert</Alert>)
    expect(container.querySelector('[role="alert"]')).toHaveClass('custom-class')
  })
})

