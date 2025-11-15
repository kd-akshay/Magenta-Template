import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Divider from '../Divider'

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />)
    const divider = container.querySelector('[role="separator"]')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders horizontal divider with label', () => {
    render(<Divider label="Or" />)
    expect(screen.getByText('Or')).toBeInTheDocument()
  })

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const divider = container.querySelector('[role="separator"]')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('applies custom className', () => {
    const { container } = render(<Divider className="custom-class" />)
    const divider = container.querySelector('[role="separator"]')
    expect(divider).toHaveClass('custom-class')
  })

  it('renders label divider with correct structure', () => {
    const { container } = render(<Divider label="Or" />)
    const divider = container.querySelector('div')
    expect(divider).toHaveClass('flex', 'items-center')
    expect(screen.getByText('Or')).toBeInTheDocument()
  })
})

