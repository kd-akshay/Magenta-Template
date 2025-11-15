import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedProgress from '../AnimatedProgress'

describe('AnimatedProgress', () => {
  it('renders progress bar', () => {
    render(<AnimatedProgress value={50} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()
  })

  it('sets correct aria attributes', () => {
    render(<AnimatedProgress value={50} max={100} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    expect(progressbar).toHaveAttribute('aria-label', '50% complete')
  })

  it('calculates percentage correctly', () => {
    const { container } = render(<AnimatedProgress value={25} max={100} />)
    const progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar?.style.width).toBe('25%')
  })

  it('clamps value between 0 and max', () => {
    const { rerender, container } = render(<AnimatedProgress value={150} max={100} />)
    let progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar?.style.width).toBe('100%')
    
    rerender(<AnimatedProgress value={-10} max={100} />)
    progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar?.style.width).toBe('0%')
  })

  it('renders with different variants', () => {
    const { rerender, container } = render(<AnimatedProgress value={50} variant="primary" />)
    let progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('bg-primary')
    
    rerender(<AnimatedProgress value={50} variant="success" />)
    progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('bg-green-500')
    
    rerender(<AnimatedProgress value={50} variant="warning" />)
    progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('bg-yellow-500')
    
    rerender(<AnimatedProgress value={50} variant="danger" />)
    progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('bg-red-500')
    
    rerender(<AnimatedProgress value={50} variant="info" />)
    progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('bg-blue-500')
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<AnimatedProgress value={50} size="sm" />)
    let wrapper = container.firstChild as HTMLElement
    expect(wrapper.querySelector('div')).toHaveClass('h-1')
    
    rerender(<AnimatedProgress value={50} size="md" />)
    wrapper = container.firstChild as HTMLElement
    expect(wrapper.querySelector('div')).toHaveClass('h-2')
    
    rerender(<AnimatedProgress value={50} size="lg" />)
    wrapper = container.firstChild as HTMLElement
    expect(wrapper.querySelector('div')).toHaveClass('h-3')
  })

  it('shows label when showLabel is true', () => {
    render(<AnimatedProgress value={50} showLabel />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('hides label by default', () => {
    render(<AnimatedProgress value={50} />)
    expect(screen.queryByText('Progress')).not.toBeInTheDocument()
  })

  it('animates by default', () => {
    const { container } = render(<AnimatedProgress value={50} />)
    const progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).toHaveClass('animate-pulse')
  })

  it('disables animation when animated is false', () => {
    const { container } = render(<AnimatedProgress value={50} animated={false} />)
    const progressbar = container.querySelector('[role="progressbar"]') as HTMLElement
    expect(progressbar).not.toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    const { container } = render(<AnimatedProgress value={50} className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

