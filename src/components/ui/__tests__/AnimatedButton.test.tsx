import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnimatedButton from '../AnimatedButton'

describe('AnimatedButton', () => {
  it('renders button with text', () => {
    render(<AnimatedButton>Click me</AnimatedButton>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<AnimatedButton onClick={handleClick}>Click me</AnimatedButton>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with primary variant by default', () => {
    render(<AnimatedButton>Primary</AnimatedButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<AnimatedButton variant="secondary">Secondary</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200')
    
    rerender(<AnimatedButton variant="outline">Outline</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('border-primary')
    
    rerender(<AnimatedButton variant="ghost">Ghost</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('text-primary')
    
    rerender(<AnimatedButton variant="danger">Danger</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<AnimatedButton size="sm">Small</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm')
    
    rerender(<AnimatedButton size="md">Medium</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-base')
    
    rerender(<AnimatedButton size="lg">Large</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
  })

  it('renders with different animations', () => {
    const { rerender } = render(<AnimatedButton animation="bounce">Bounce</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('hover:animate-bounce')
    
    rerender(<AnimatedButton animation="pulse">Pulse</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('hover:animate-pulse')
    
    rerender(<AnimatedButton animation="shake">Shake</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('hover:animate-shake')
    
    rerender(<AnimatedButton animation="none">None</AnimatedButton>)
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('hover:animate-bounce')
    expect(button).not.toHaveClass('hover:animate-pulse')
    expect(button).not.toHaveClass('hover:animate-shake')
  })

  it('can be disabled', () => {
    render(<AnimatedButton disabled>Disabled</AnimatedButton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<AnimatedButton className="custom-class">Custom</AnimatedButton>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<AnimatedButton ref={ref}>Ref Button</AnimatedButton>)
    expect(ref).toHaveBeenCalled()
  })
})

