import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToast } from '../Toaster'

const TestComponent = () => {
  const { showToast } = useToast()
  
  return (
    <div>
      <button onClick={() => showToast('Success message', 'success')}>Show Success</button>
      <button onClick={() => showToast('Error message', 'error')}>Show Error</button>
      <button onClick={() => showToast('Warning message', 'warning')}>Show Warning</button>
      <button onClick={() => showToast('Info message', 'info')}>Show Info</button>
    </div>
  )
}

describe('Toaster', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not render when no toasts', () => {
    render(
      <ToastProvider>
        <div>Test</div>
      </ToastProvider>
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows success toast', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Success')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })
  })

  it('shows error toast', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Error')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  it('shows warning toast', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Warning')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Warning message')).toBeInTheDocument()
    })
  })

  it('shows info toast', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Info')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument()
    })
  })

  it('auto-dismisses toast after duration', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Success')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })
    
    vi.advanceTimersByTime(5000)
    
    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument()
    })
  })

  it('allows manual dismissal', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    const button = screen.getByText('Show Success')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })
    
    const closeButton = screen.getByLabelText(/close/i)
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument()
    })
  })

  it('throws error when useToast is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(
        <div>
          <TestComponent />
        </div>
      )
    }).toThrow('useToast must be used within ToastProvider')
    
    consoleSpy.mockRestore()
  })
})

