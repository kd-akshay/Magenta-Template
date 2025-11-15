import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Radio from '../Radio'

describe('Radio', () => {
  it('renders radio button with label', () => {
    render(<Radio label="Option 1" name="test" />)
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('type', 'radio')
  })

  it('renders radio button without label', () => {
    render(<Radio name="test" />)
    const radio = screen.getByRole('radio')
    expect(radio).toBeInTheDocument()
  })

  it('can be checked', async () => {
    const user = userEvent.setup()
    render(<Radio label="Option 1" name="test" />)
    
    const radio = screen.getByRole('radio')
    await user.click(radio)
    expect(radio).toBeChecked()
  })

  it('can be checked by default', () => {
    render(<Radio label="Option 1" name="test" defaultChecked />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Radio label="Option 1" name="test" disabled />)
    const radio = screen.getByRole('radio')
    expect(radio).toBeDisabled()
  })

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Radio label="Option 1" name="test" onChange={handleChange} />)
    
    await user.click(screen.getByRole('radio'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with error state', () => {
    render(<Radio label="Option 1" name="test" error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true')
  })

  it('groups radio buttons by name', () => {
    render(
      <>
        <Radio label="Option 1" name="group" value="1" />
        <Radio label="Option 2" name="group" value="2" defaultChecked />
      </>
    )

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
    expect(radios[0]).toHaveAttribute('name', 'group')
    expect(radios[1]).toHaveAttribute('name', 'group')
    expect(radios[1]).toBeChecked()
  })
})

