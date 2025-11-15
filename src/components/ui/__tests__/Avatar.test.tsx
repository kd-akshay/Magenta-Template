import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Avatar from '../Avatar'

describe('Avatar', () => {
  it('renders avatar with image', () => {
    render(<Avatar src="/avatar.jpg" alt="User avatar" />)
    const img = screen.getByAltText('User avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/avatar.jpg')
  })

  it('renders avatar with initials when no image', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders question mark when no name or image', () => {
    render(<Avatar />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<Avatar name="John Doe" size="sm" />)
    let avatar = container.querySelector('div')
    expect(avatar?.querySelector('div')).toHaveClass('w-8', 'h-8')
    
    rerender(<Avatar name="John Doe" size="md" />)
    avatar = container.querySelector('div')
    expect(avatar?.querySelector('div')).toHaveClass('w-10', 'h-10')
    
    rerender(<Avatar name="John Doe" size="lg" />)
    avatar = container.querySelector('div')
    expect(avatar?.querySelector('div')).toHaveClass('w-12', 'h-12')
    
    rerender(<Avatar name="John Doe" size="xl" />)
    avatar = container.querySelector('div')
    expect(avatar?.querySelector('div')).toHaveClass('w-16', 'h-16')
  })

  it('renders status indicator', () => {
    const { container, rerender } = render(<Avatar name="John Doe" status="online" />)
    expect(container.querySelector('[aria-label="Status: online"]')).toBeInTheDocument()
    
    rerender(<Avatar name="John Doe" status="offline" />)
    expect(container.querySelector('[aria-label="Status: offline"]')).toBeInTheDocument()
    
    rerender(<Avatar name="John Doe" status="away" />)
    expect(container.querySelector('[aria-label="Status: away"]')).toBeInTheDocument()
    
    rerender(<Avatar name="John Doe" status="busy" />)
    expect(container.querySelector('[aria-label="Status: busy"]')).toBeInTheDocument()
  })

  it('does not render status when not provided', () => {
    const { container } = render(<Avatar name="John Doe" />)
    expect(container.querySelector('[aria-label^="Status:"]')).not.toBeInTheDocument()
  })

  it('generates correct initials', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('handles single name', () => {
    render(<Avatar name="John" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('handles long names', () => {
    render(<Avatar name="John Michael Smith" />)
    expect(screen.getByText('JM')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Avatar name="John Doe" className="custom-class" />)
    expect(container.querySelector('div')).toHaveClass('custom-class')
  })
})

