import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedBadge from '../AnimatedBadge'

describe('AnimatedBadge', () => {
  it('renders badge with text', () => {
    render(<AnimatedBadge>Badge</AnimatedBadge>)
    expect(screen.getByText('Badge')).toBeInTheDocument()
  })

  it('renders with primary variant by default', () => {
    render(<AnimatedBadge>Primary</AnimatedBadge>)
    expect(screen.getByText('Primary')).toHaveClass('bg-primary/10', 'text-primary')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<AnimatedBadge variant="secondary">Secondary</AnimatedBadge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200')
    
    rerender(<AnimatedBadge variant="success">Success</AnimatedBadge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100')
    
    rerender(<AnimatedBadge variant="warning">Warning</AnimatedBadge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100')
    
    rerender(<AnimatedBadge variant="danger">Danger</AnimatedBadge>)
    expect(screen.getByText('Danger')).toHaveClass('bg-red-100')
    
    rerender(<AnimatedBadge variant="info">Info</AnimatedBadge>)
    expect(screen.getByText('Info')).toHaveClass('bg-blue-100')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<AnimatedBadge size="sm">Small</AnimatedBadge>)
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-0.5', 'text-xs')
    
    rerender(<AnimatedBadge size="md">Medium</AnimatedBadge>)
    expect(screen.getByText('Medium')).toHaveClass('px-2.5', 'py-1', 'text-sm')
    
    rerender(<AnimatedBadge size="lg">Large</AnimatedBadge>)
    expect(screen.getByText('Large')).toHaveClass('px-3', 'py-1.5', 'text-base')
  })

  it('renders with different animations', () => {
    const { rerender } = render(<AnimatedBadge animation="pulse">Pulse</AnimatedBadge>)
    expect(screen.getByText('Pulse')).toHaveClass('animate-pulse')
    
    rerender(<AnimatedBadge animation="bounce">Bounce</AnimatedBadge>)
    expect(screen.getByText('Bounce')).toHaveClass('animate-bounce')
    
    rerender(<AnimatedBadge animation="ping">Ping</AnimatedBadge>)
    expect(screen.getByText('Ping')).toHaveClass('animate-ping')
    
    rerender(<AnimatedBadge animation="none">None</AnimatedBadge>)
    const badge = screen.getByText('None')
    expect(badge).not.toHaveClass('animate-pulse')
    expect(badge).not.toHaveClass('animate-bounce')
    expect(badge).not.toHaveClass('animate-ping')
  })

  it('applies custom className', () => {
    render(<AnimatedBadge className="custom-class">Custom</AnimatedBadge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })
})

