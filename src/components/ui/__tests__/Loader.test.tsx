import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loader from '../Loader'

describe('Loader', () => {
  it('renders loader', () => {
    const { container } = render(<Loader />)
    const loader = container.querySelector('[role="status"]')
    expect(loader).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<Loader size="sm" />)
    let loader = container.querySelector('[role="status"]')
    expect(loader).toHaveClass('w-4', 'h-4')
    
    rerender(<Loader size="md" />)
    loader = container.querySelector('[role="status"]')
    expect(loader).toHaveClass('w-8', 'h-8')
    
    rerender(<Loader size="lg" />)
    loader = container.querySelector('[role="status"]')
    expect(loader).toHaveClass('w-12', 'h-12')
  })

  it('renders with sr-only loading text', () => {
    render(<Loader />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
  })

  it('applies custom className', () => {
    const { container } = render(<Loader className="custom-class" />)
    const loader = container.querySelector('[role="status"]')
    expect(loader).toHaveClass('custom-class')
  })

  it('has animate-spin class', () => {
    const { container } = render(<Loader />)
    const loader = container.querySelector('[role="status"]')
    expect(loader).toHaveClass('animate-spin')
  })
})

