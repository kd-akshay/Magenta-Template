import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedCard from '../AnimatedCard'

describe('AnimatedCard', () => {
  it('renders card with children', () => {
    render(<AnimatedCard>Card Content</AnimatedCard>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders card with header', () => {
    render(<AnimatedCard header={<div>Header</div>}>Content</AnimatedCard>)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders card with footer', () => {
    render(<AnimatedCard footer={<div>Footer</div>}>Content</AnimatedCard>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders card with header and footer', () => {
    render(
      <AnimatedCard header={<div>Header</div>} footer={<div>Footer</div>}>
        Content
      </AnimatedCard>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders with lift animation by default', () => {
    const { container } = render(<AnimatedCard>Content</AnimatedCard>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:-translate-y-1')
  })

  it('renders with different animations', () => {
    const { rerender, container } = render(<AnimatedCard animation="glow">Content</AnimatedCard>)
    let card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:shadow-lg')
    
    rerender(<AnimatedCard animation="scale">Content</AnimatedCard>)
    card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:scale-105')
    
    rerender(<AnimatedCard animation="none">Content</AnimatedCard>)
    card = container.firstChild as HTMLElement
    expect(card).not.toHaveClass('hover:-translate-y-1')
    expect(card).not.toHaveClass('hover:shadow-lg')
    expect(card).not.toHaveClass('hover:scale-105')
  })

  it('disables hover when hover is false', () => {
    const { container } = render(<AnimatedCard hover={false} animation="lift">Content</AnimatedCard>)
    const card = container.firstChild as HTMLElement
    expect(card).not.toHaveClass('hover:-translate-y-1')
  })

  it('applies custom className', () => {
    const { container } = render(<AnimatedCard className="custom-class">Content</AnimatedCard>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-class')
  })
})

