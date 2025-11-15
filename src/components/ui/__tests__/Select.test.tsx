import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from '../Select'

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]

  it('renders select without label', () => {
    render(<Select options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders select with label', () => {
    render(<Select label="Choose option" options={options} />)
    expect(screen.getByLabelText('Choose option')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<Select options={options} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Select options={options} placeholder="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('can select an option', async () => {
    const user = userEvent.setup()
    render(<Select options={options} />)
    
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '2')
    expect(select).toHaveValue('2')
  })

  it('calls onChange when option is selected', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} onChange={handleChange} />)
    
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '2')
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders disabled options', () => {
    const optionsWithDisabled = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2', disabled: true },
    ]
    render(<Select options={optionsWithDisabled} />)
    const option2 = screen.getByText('Option 2')
    expect(option2.closest('option')).toBeDisabled()
  })

  it('renders with error message', () => {
    render(<Select options={options} error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be disabled', () => {
    render(<Select options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Select options={options} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('renders chevron icon', () => {
    const { container } = render(<Select options={options} />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})

