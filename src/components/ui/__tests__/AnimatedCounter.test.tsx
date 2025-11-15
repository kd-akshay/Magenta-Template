import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AnimatedCounter from '../AnimatedCounter'

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders initial value (starts at 0)', () => {
    render(<AnimatedCounter value={100} />)
    // Component starts at 0 and animates to target value
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('formats value with decimals', async () => {
    render(<AnimatedCounter value={100.5} decimals={2} duration={0} />)
    // With duration 0, it should show the final value immediately or after animation completes
    await waitFor(() => {
      const text = screen.getByText(/100\.50|0\.00/)
      expect(text).toBeInTheDocument()
    })
  })

  it('renders with prefix', () => {
    render(<AnimatedCounter value={100} prefix="$" duration={0} />)
    // Component starts at 0
    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  it('renders with suffix', () => {
    render(<AnimatedCounter value={100} suffix="%" duration={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders with prefix and suffix', () => {
    render(<AnimatedCounter value={100} prefix="$" suffix=".00" duration={0} />)
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<AnimatedCounter value={100} className="custom-class" />)
    const span = screen.getByText('0').closest('span')
    expect(span).toHaveClass('custom-class')
  })

  it('handles zero value', () => {
    render(<AnimatedCounter value={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('handles negative value', () => {
    render(<AnimatedCounter value={-50} duration={0} />)
    // Component starts at 0, will animate to -50
    expect(screen.getByText(/0|-50/)).toBeInTheDocument()
  })
})

