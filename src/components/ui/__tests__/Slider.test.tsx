import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Slider from '../Slider'

describe('Slider', () => {
  it('renders with default value', () => {
    render(<Slider value={50} onChange={vi.fn()} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Slider value={50} onChange={vi.fn()} label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<Slider value={50} onChange={vi.fn()} helperText="Adjust volume" />)
    expect(screen.getByText('Adjust volume')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Slider value={50} onChange={vi.fn()} error="Invalid value" />)
    expect(screen.getByText('Invalid value')).toBeInTheDocument()
    expect(screen.getByText('Invalid value')).toHaveAttribute('role', 'alert')
  })

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider value={50} onChange={handleChange} min={0} max={100} />)
    
    const slider = screen.getByRole('slider')
    await user.click(slider)
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Slider value={50} onChange={vi.fn()} disabled />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-disabled', 'true')
    expect(slider).toHaveAttribute('tabIndex', '-1')
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider value={50} onChange={handleChange} min={0} max={100} step={10} />)
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays value labels', () => {
    render(<Slider value={50} onChange={vi.fn()} min={0} max={100} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders marks when marks prop is true', () => {
    const { container } = render(<Slider value={50} onChange={vi.fn()} marks min={0} max={100} step={10} />)
    const marks = container.querySelectorAll('[class*="rounded-full"]')
    expect(marks.length).toBeGreaterThan(0)
  })

  it('applies size classes', () => {
    const { rerender } = render(<Slider value={50} onChange={vi.fn()} size="sm" />)
    let slider = screen.getByRole('slider')
    expect(slider.parentElement).toHaveClass('h-8')

    rerender(<Slider value={50} onChange={vi.fn()} size="md" />)
    slider = screen.getByRole('slider')
    expect(slider.parentElement).toHaveClass('h-8')

    rerender(<Slider value={50} onChange={vi.fn()} size="lg" />)
    slider = screen.getByRole('slider')
    expect(slider.parentElement).toHaveClass('h-8')
  })

  it('renders vertical orientation', () => {
    const { container } = render(<Slider value={50} onChange={vi.fn()} orientation="vertical" />)
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('handles uncontrolled mode with defaultValue', () => {
    const handleChange = vi.fn()
    render(<Slider defaultValue={25} onChange={handleChange} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25')
  })

  it('respects min and max values', () => {
    render(<Slider value={50} onChange={vi.fn()} min={10} max={90} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '10')
    expect(slider).toHaveAttribute('aria-valuemax', '90')
  })

  it('formats label when formatLabel is provided', () => {
    const formatLabel = (value: number) => `${value}%`
    render(<Slider value={50} onChange={vi.fn()} formatLabel={formatLabel} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})

