import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckboxCard from '../CheckboxCard'

describe('CheckboxCard', () => {
  it('renders checkbox card with children', () => {
    render(<CheckboxCard>Card Content</CheckboxCard>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('toggles when card is clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<CheckboxCard onChange={handleChange}>Clickable Card</CheckboxCard>)
    
    const card = screen.getByText('Clickable Card').closest('div[class*="cursor-pointer"]')
    if (card) {
      await user.click(card)
      expect(handleChange).toHaveBeenCalledWith(true)
    }
  })

  it('toggles when checkbox is clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<CheckboxCard checked={false} onChange={handleChange}>Card</CheckboxCard>)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('renders with header', () => {
    render(<CheckboxCard header={<h3>Card Title</h3>}>Content</CheckboxCard>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders with footer', () => {
    render(<CheckboxCard footer={<button>Action</button>}>Content</CheckboxCard>)
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('handles disabled state', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<CheckboxCard disabled onChange={handleChange}>Disabled Card</CheckboxCard>)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    
    const card = screen.getByText('Disabled Card').closest('div[class*="cursor-pointer"]')
    if (card) {
      await user.click(card)
      expect(handleChange).not.toHaveBeenCalled()
    }
  })

  it('shows visual feedback when checked', () => {
    const { rerender } = render(<CheckboxCard checked={false}>Unchecked</CheckboxCard>)
    let card = screen.getByText('Unchecked').closest('div[class*="border-gray-200"]')
    expect(card).toBeInTheDocument()
    
    rerender(<CheckboxCard checked={true}>Checked</CheckboxCard>)
    card = screen.getByText('Checked').closest('div[class*="border-primary"]')
    expect(card).toBeInTheDocument()
  })

  it('supports different checkbox positions', () => {
    const { rerender } = render(<CheckboxCard checkboxPosition="top-left">Card</CheckboxCard>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    
    rerender(<CheckboxCard checkboxPosition="bottom-right">Card</CheckboxCard>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('can hide checkbox', () => {
    render(<CheckboxCard showCheckbox={false}>No Checkbox</CheckboxCard>)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CheckboxCard ref={ref}>Ref Test</CheckboxCard>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

