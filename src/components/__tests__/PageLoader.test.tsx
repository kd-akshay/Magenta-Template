import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import PageLoader from '../PageLoader'

describe('PageLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not render immediately when isLoading is true (delay)', () => {
    render(<PageLoader isLoading={true} />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders after delay when isLoading is true', async () => {
    render(<PageLoader isLoading={true} />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('does not render when isLoading is false', () => {
    const { container } = render(<PageLoader isLoading={false} />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('displays custom loading message', async () => {
    render(<PageLoader isLoading={true} message="Please wait..." />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      expect(screen.getByText('Please wait...')).toBeInTheDocument()
    })
  })

  it('displays default message when no message provided', async () => {
    render(<PageLoader isLoading={true} />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  it('has proper accessibility attributes', async () => {
    render(<PageLoader isLoading={true} />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      const loader = screen.getByRole('status')
      expect(loader).toHaveAttribute('aria-live', 'polite')
      expect(loader).toHaveAttribute('aria-label', 'Loading...')
    })
  })

  it('applies custom className', async () => {
    render(<PageLoader isLoading={true} className="custom-class" />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      const loader = screen.getByRole('status')
      expect(loader).toHaveClass('custom-class')
    })
  })

  it('shows loader with spinner', async () => {
    render(<PageLoader isLoading={true} />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      const spinner = screen.getByRole('status').querySelector('svg')
      expect(spinner).toBeInTheDocument()
    })
  })

  it('renders in non-fullscreen mode', async () => {
    render(<PageLoader isLoading={true} fullScreen={false} />)
    
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      const loader = screen.getByRole('status')
      expect(loader).not.toHaveClass('fixed', 'inset-0')
    })
  })
})

