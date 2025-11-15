import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Textarea from '../Textarea'

describe('Textarea', () => {
  it('renders textarea without label', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders textarea with label', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders textarea with placeholder', () => {
    render(<Textarea placeholder="Enter message" />)
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument()
  })

  it('can be typed into', async () => {
    const user = userEvent.setup()
    render(<Textarea />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'test message')
    expect(textarea).toHaveValue('test message')
  })

  it('calls onChange when typed', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Textarea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders with error message', () => {
    render(<Textarea error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be disabled', () => {
    render(<Textarea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('supports rows prop', () => {
    render(<Textarea rows={5} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('applies custom className', () => {
    const { container } = render(<Textarea className="custom-class" />)
    const textarea = container.querySelector('textarea')
    expect(textarea).toHaveClass('custom-class')
  })
})

