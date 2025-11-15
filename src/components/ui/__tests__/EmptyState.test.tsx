import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from '../EmptyState'
import Button from '../Button'

describe('EmptyState', () => {
  it('renders with default title', () => {
    render(<EmptyState />)
    expect(screen.getByText('No data found')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<EmptyState title="Custom Title" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(<EmptyState description="This is a description" />)
    expect(screen.getByText('This is a description')).toBeInTheDocument()
  })

  it('renders with icon string', () => {
    render(<EmptyState icon="📦" />)
    expect(screen.getByText('📦')).toBeInTheDocument()
  })

  it('renders with icon element', () => {
    const Icon = () => <div data-testid="icon">Icon</div>
    render(<EmptyState icon={<Icon />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders with action button', () => {
    render(<EmptyState action={<Button>Action</Button>} />)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders with secondary action button', () => {
    render(<EmptyState secondaryAction={<Button>Secondary</Button>} />)
    expect(screen.getByText('Secondary')).toBeInTheDocument()
  })

  it('renders with both action buttons', () => {
    render(
      <EmptyState
        action={<Button>Primary</Button>}
        secondaryAction={<Button>Secondary</Button>}
      />
    )
    expect(screen.getByText('Primary')).toBeInTheDocument()
    expect(screen.getByText('Secondary')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<EmptyState className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies size variants', () => {
    const { rerender } = render(<EmptyState size="sm" title="Small" />)
    let title = screen.getByText('Small')
    expect(title).toHaveClass('text-lg')

    rerender(<EmptyState size="md" title="Medium" />)
    title = screen.getByText('Medium')
    expect(title).toHaveClass('text-xl')

    rerender(<EmptyState size="lg" title="Large" />)
    title = screen.getByText('Large')
    expect(title).toHaveClass('text-2xl')
  })

  it('does not render actions when both are undefined', () => {
    render(<EmptyState />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

