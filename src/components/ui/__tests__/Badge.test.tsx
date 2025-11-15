import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders badge with text', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders with primary variant by default', () => {
    const { container } = render(<Badge>Primary</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('bg-primary/10')
  })

  it('renders with different variants', () => {
    const { rerender, container } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(container.querySelector('span')).toHaveClass('bg-gray-200')
    
    rerender(<Badge variant="success">Success</Badge>)
    expect(container.querySelector('span')).toHaveClass('bg-green-100')
    
    rerender(<Badge variant="warning">Warning</Badge>)
    expect(container.querySelector('span')).toHaveClass('bg-yellow-100')
    
    rerender(<Badge variant="danger">Danger</Badge>)
    expect(container.querySelector('span')).toHaveClass('bg-red-100')
    
    rerender(<Badge variant="info">Info</Badge>)
    expect(container.querySelector('span')).toHaveClass('bg-blue-100')
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<Badge size="sm">Small</Badge>)
    expect(container.querySelector('span')).toHaveClass('text-xs')
    
    rerender(<Badge size="md">Medium</Badge>)
    expect(container.querySelector('span')).toHaveClass('text-sm')
    
    rerender(<Badge size="lg">Large</Badge>)
    expect(container.querySelector('span')).toHaveClass('text-base')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Badge</Badge>)
    expect(container.querySelector('span')).toHaveClass('custom-class')
  })

  it('renders with rounded-full class', () => {
    const { container } = render(<Badge>Badge</Badge>)
    expect(container.querySelector('span')).toHaveClass('rounded-full')
  })
})

