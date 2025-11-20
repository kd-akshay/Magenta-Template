import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from '../Dropdown'

describe('Dropdown', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]

  it('renders dropdown with placeholder', () => {
    render(<Dropdown options={options} placeholder="Select option" />)
    expect(screen.getByText('Select option')).toBeInTheDocument()
  })

  it('shows selected option', () => {
    render(<Dropdown options={options} value="1" />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('opens dropdown menu on click', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} />)
    
    const button = screen.getByRole('combobox')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  it('calls onChange when option is selected', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Dropdown options={options} onChange={handleChange} />)
    
    const button = screen.getByRole('combobox')
    await user.click(button)
    
    await waitFor(() => {
      const option = screen.getByText('Option 2')
      return expect(option).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Option 2'))
    expect(handleChange).toHaveBeenCalledWith('2')
  })

  it('renders with label', () => {
    render(<Dropdown options={options} label="Choose Option" />)
    expect(screen.getByText('Choose Option')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<Dropdown options={options} error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles disabled state', () => {
    render(<Dropdown options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('renders with icons', () => {
    const optionsWithIcons = [
      { value: '1', label: 'Home', icon: <span data-testid="home-icon">🏠</span> },
    ]
    render(<Dropdown options={optionsWithIcons} />)
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    const { rerender } = render(<Dropdown options={options} size="sm" />)
    expect(screen.getByRole('combobox')).toHaveClass('text-sm')
    
    rerender(<Dropdown options={options} size="lg" />)
    expect(screen.getByRole('combobox')).toHaveClass('text-lg')
  })

  it('has proper ARIA attributes', () => {
    render(<Dropdown options={options} label="Select" />)
    const combobox = screen.getByRole('combobox')
    expect(combobox).toHaveAttribute('aria-label', 'Select')
  })
})

