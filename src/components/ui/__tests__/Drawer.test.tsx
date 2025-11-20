import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from '../Drawer'

describe('Drawer', () => {
  it('renders drawer when open', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test Drawer">
        Drawer Content
      </Drawer>
    )
    expect(screen.getByText('Drawer Content')).toBeInTheDocument()
    expect(screen.getByText('Test Drawer')).toBeInTheDocument()
  })

  it('does not render drawer when closed', () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Test Drawer">
        Drawer Content
      </Drawer>
    )
    expect(screen.queryByText('Drawer Content')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Test Drawer">
        Content
      </Drawer>
    )
    
    const closeButton = screen.getByRole('button', { name: /close drawer/i })
    await user.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders without title', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('supports different positions', () => {
    const { rerender } = render(
      <Drawer isOpen={true} onClose={vi.fn()} position="left">
        Content
      </Drawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    
    rerender(
      <Drawer isOpen={true} onClose={vi.fn()} position="right">
        Content
      </Drawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} size="lg">
        Content
      </Drawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('can hide close button', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} showCloseButton={false}>
        Content
      </Drawer>
    )
    expect(screen.queryByRole('button', { name: /close drawer/i })).not.toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test Drawer">
        Content
      </Drawer>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /test drawer/i })).toBeInTheDocument()
  })
})

