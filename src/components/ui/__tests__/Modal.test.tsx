import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        Modal Content
      </Modal>
    )
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Modal Content
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Modal Title">
        Modal Content
      </Modal>
    )
    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders close button by default', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    )
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument()
  })

  it('does not render close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
        Content
      </Modal>
    )
    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )
    
    await user.click(screen.getByLabelText('Close dialog'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="sm">
        Content
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    
    rerender(
      <Modal isOpen={true} onClose={vi.fn()} size="md">
        Content
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    
    rerender(
      <Modal isOpen={true} onClose={vi.fn()} size="lg">
        Content
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    
    rerender(
      <Modal isOpen={true} onClose={vi.fn()} size="xl">
        Content
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders modal when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

