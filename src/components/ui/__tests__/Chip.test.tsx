import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '../Chip'

describe('Chip', () => {
  it('renders chip with text', () => {
    render(<Chip>Test Chip</Chip>)
    expect(screen.getByText('Test Chip')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const handleRemove = vi.fn()
    const user = userEvent.setup()
    render(<Chip removable onRemove={handleRemove}>Removable</Chip>)
    
    const removeButton = screen.getByRole('button', { name: /remove/i })
    await user.click(removeButton)
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('does not show remove button when removable is false', () => {
    render(<Chip>Not Removable</Chip>)
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Chip variant="primary">Primary</Chip>)
    expect(screen.getByText('Primary')).toHaveClass('bg-primary/10')
    
    rerender(<Chip variant="success">Success</Chip>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100')
    
    rerender(<Chip variant="danger">Danger</Chip>)
    expect(screen.getByText('Danger')).toHaveClass('bg-red-100')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Chip size="sm">Small</Chip>)
    expect(screen.getByText('Small')).toHaveClass('text-xs')
    
    rerender(<Chip size="md">Medium</Chip>)
    expect(screen.getByText('Medium')).toHaveClass('text-sm')
    
    rerender(<Chip size="lg">Large</Chip>)
    expect(screen.getByText('Large')).toHaveClass('text-base')
  })

  it('renders with icon', () => {
    render(<Chip icon={<span data-testid="icon">★</span>}>With Icon</Chip>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles disabled state', () => {
    const handleRemove = vi.fn()
    render(<Chip removable onRemove={handleRemove} disabled>Disabled</Chip>)
    const removeButton = screen.getByRole('button', { name: /remove/i })
    expect(removeButton).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Chip ref={ref}>Ref Test</Chip>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('has proper ARIA label for remove button', () => {
    render(<Chip removable onRemove={vi.fn()}>Test</Chip>)
    const removeButton = screen.getByRole('button', { name: /remove/i })
    expect(removeButton).toHaveAttribute('aria-label', 'Remove')
  })
})

