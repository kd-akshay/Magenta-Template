import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '../Switch'

describe('Switch', () => {
  it('renders switch with label', () => {
    render(<Switch label="Enable notifications" />)
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('can be toggled on', async () => {
    const user = userEvent.setup()
    render(<Switch label="Toggle me" />)
    
    const switchElement = screen.getByRole('switch')
    await user.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it('can be toggled off', async () => {
    const user = userEvent.setup()
    render(<Switch label="Toggle me" defaultChecked />)
    
    const switchElement = screen.getByRole('switch')
    await user.click(switchElement)
    expect(switchElement).not.toBeChecked()
  })

  it('can be checked by default', () => {
    render(<Switch label="Enabled" defaultChecked />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Switch label="Disabled" disabled />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
  })

  it('calls onChange when toggled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Switch label="Toggle me" onChange={handleChange} />)
    
    await user.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with error state', () => {
    render(<Switch label="Required" error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true')
  })
})

