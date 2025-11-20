import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from '../DatePicker'

// Mock useTheme hook
vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ isDark: false }),
}))

describe('DatePicker', () => {
  it('renders date picker input', () => {
    render(<DatePicker />)
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    expect(input).toHaveAttribute('type', 'date')
  })

  it('renders with label', () => {
    render(<DatePicker label="Select Date" />)
    expect(screen.getByText('Select Date')).toBeInTheDocument()
  })

  it('calls onChange when date is selected', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<DatePicker onChange={handleChange} />)
    
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    await user.type(input, '2024-01-15')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays error message', () => {
    render(<DatePicker error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('displays helper text', () => {
    render(<DatePicker helperText="Select a date" />)
    expect(screen.getByText('Select a date')).toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(<DatePicker disabled />)
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    expect(input).toBeDisabled()
  })

  it('has calendar icon button', () => {
    render(<DatePicker />)
    const button = screen.getByRole('button', { name: /open calendar/i })
    expect(button).toBeInTheDocument()
  })

  it('opens calendar picker when icon is clicked', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    
    const button = screen.getByRole('button', { name: /open calendar/i })
    await user.click(button)
    // Note: Native date picker behavior can't be fully tested in JSDOM
  })

  it('respects min and max date constraints', () => {
    render(<DatePicker min="2024-01-01" max="2024-12-31" />)
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    expect(input).toHaveAttribute('min', '2024-01-01')
    expect(input).toHaveAttribute('max', '2024-12-31')
  })

  it('has proper ARIA attributes', () => {
    render(<DatePicker label="Date" error="Error" />)
    const input = screen.getByRole('textbox', { hidden: true }) || screen.getByDisplayValue('')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})

