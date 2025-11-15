import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('renders card with children', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders card with header', () => {
    render(<Card header={<h2>Card Header</h2>}>Card Content</Card>)
    expect(screen.getByText('Card Header')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders card with footer', () => {
    render(<Card footer={<p>Card Footer</p>}>Card Content</Card>)
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders card with header and footer', () => {
    render(
      <Card 
        header={<h2>Header</h2>} 
        footer={<p>Footer</p>}
      >
        Content
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('custom-class')
  })

  it('renders with default styling', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md')
  })
})

