import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    expect(screen.getByLabelText('Accept terms')).toHaveAttribute('type', 'checkbox')
  })

  it('can be checked', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Check me" />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('can be checked by default', () => {
    render(<Checkbox label="Checked" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('can be unchecked', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Uncheck me" defaultChecked />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('can be disabled', () => {
    render(<Checkbox label="Disabled" disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Check me" onChange={handleChange} />)
    
    await user.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with error state', () => {
    render(<Checkbox label="Required" error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })
})

