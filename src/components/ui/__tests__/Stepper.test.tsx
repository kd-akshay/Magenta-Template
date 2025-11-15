import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stepper from '../Stepper'
import { CheckIcon, UserIcon } from '@heroicons/react/24/outline'

describe('Stepper', () => {
  const mockSteps = [
    { id: 1, title: 'Step 1', description: 'First step' },
    { id: 2, title: 'Step 2', description: 'Second step' },
    { id: 3, title: 'Step 3', description: 'Third step' },
  ]

  it('renders horizontal stepper by default', () => {
    render(<Stepper steps={mockSteps} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders vertical stepper when orientation is vertical', () => {
    render(<Stepper steps={mockSteps} orientation="vertical" />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })

  it('displays step numbers by default', () => {
    render(<Stepper steps={mockSteps} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('hides step numbers when showStepNumber is false', () => {
    render(<Stepper steps={mockSteps} showStepNumber={false} />)
    // Step numbers should not be visible
    const stepNumbers = screen.queryAllByText(/^[123]$/)
    expect(stepNumbers.length).toBe(0)
  })

  it('shows completed status for steps before current step', () => {
    render(<Stepper steps={mockSteps} currentStep={1} />)
    // Step 1 should be completed (check icon)
    const step1Indicator = screen.getByLabelText('Step 1: Step 1')
    expect(step1Indicator).toHaveClass('bg-primary')
  })

  it('shows current status for current step', () => {
    render(<Stepper steps={mockSteps} currentStep={1} />)
    const step2Indicator = screen.getByLabelText('Step 2: Step 2')
    expect(step2Indicator).toHaveAttribute('aria-current', 'step')
  })

  it('shows pending status for steps after current step', () => {
    render(<Stepper steps={mockSteps} currentStep={1} />)
    const step3Indicator = screen.getByLabelText('Step 3: Step 3')
    expect(step3Indicator).toHaveClass('bg-gray-200')
  })

  it('renders step descriptions', () => {
    render(<Stepper steps={mockSteps} />)
    expect(screen.getByText('First step')).toBeInTheDocument()
    expect(screen.getByText('Second step')).toBeInTheDocument()
    expect(screen.getByText('Third step')).toBeInTheDocument()
  })

  it('renders steps without descriptions', () => {
    const stepsWithoutDesc = [
      { id: 1, title: 'Step 1' },
      { id: 2, title: 'Step 2' },
    ]
    render(<Stepper steps={stepsWithoutDesc} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('renders custom icons when provided', () => {
    const stepsWithIcons = [
      { id: 1, title: 'Step 1', icon: <UserIcon data-testid="icon-1" /> },
      { id: 2, title: 'Step 2', icon: <CheckIcon data-testid="icon-2" /> },
    ]
    render(<Stepper steps={stepsWithIcons} />)
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
  })

  it('shows check icon for completed steps without custom icon', () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={1} />)
    // CheckIcon renders as SVG, look for svg elements
    const svgElements = container.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(0)
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Stepper steps={mockSteps} size="sm" />)
    let step1 = screen.getByLabelText('Step 1: Step 1')
    expect(step1).toHaveClass('w-6', 'h-6', 'text-xs')

    rerender(<Stepper steps={mockSteps} size="md" />)
    step1 = screen.getByLabelText('Step 1: Step 1')
    expect(step1).toHaveClass('w-8', 'h-8', 'text-sm')

    rerender(<Stepper steps={mockSteps} size="lg" />)
    step1 = screen.getByLabelText('Step 1: Step 1')
    expect(step1).toHaveClass('w-10', 'h-10', 'text-base')
  })

  it('handles clickable steps', async () => {
    const handleClick1 = vi.fn()
    const handleClick2 = vi.fn()
    const clickableSteps = [
      { id: 1, title: 'Step 1', onClick: handleClick1 },
      { id: 2, title: 'Step 2', onClick: handleClick2 },
    ]
    const user = userEvent.setup()
    render(<Stepper steps={clickableSteps} clickable />)

    const step1 = screen.getByLabelText('Step 1: Step 1')
    await user.click(step1)
    expect(handleClick1).toHaveBeenCalledTimes(1)

    const step2 = screen.getByLabelText('Step 2: Step 2')
    await user.click(step2)
    expect(handleClick2).toHaveBeenCalledTimes(1)
  })

  it('renders error status when step status is error', () => {
    const stepsWithError = [
      { id: 1, title: 'Step 1', status: 'completed' as const },
      { id: 2, title: 'Step 2', status: 'error' as const },
      { id: 3, title: 'Step 3', status: 'pending' as const },
    ]
    render(<Stepper steps={stepsWithError} />)
    const step2Indicator = screen.getByLabelText('Step 2: Step 2')
    expect(step2Indicator).toHaveClass('bg-red-500')
  })

  it('applies custom className', () => {
    render(<Stepper steps={mockSteps} className="custom-class" />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-class')
  })

  it('handles step with explicit status override', () => {
    const stepsWithStatus = [
      { id: 1, title: 'Step 1', status: 'completed' as const },
      { id: 2, title: 'Step 2', status: 'current' as const },
      { id: 3, title: 'Step 3', status: 'error' as const },
    ]
    render(<Stepper steps={stepsWithStatus} currentStep={0} />)
    // Step status should override currentStep logic
    const step1 = screen.getByLabelText('Step 1: Step 1')
    expect(step1).toHaveClass('bg-primary')

    const step2 = screen.getByLabelText('Step 2: Step 2')
    expect(step2).toHaveAttribute('aria-current', 'step')

    const step3 = screen.getByLabelText('Step 3: Step 3')
    expect(step3).toHaveClass('bg-red-500')
  })

  it('renders connector lines between steps in horizontal mode', () => {
    render(<Stepper steps={mockSteps} />)
    const nav = screen.getByRole('navigation')
    const connectors = nav.querySelectorAll('[aria-hidden="true"]')
    // Should have 2 connectors for 3 steps
    expect(connectors.length).toBe(2)
  })

  it('renders connector lines between steps in vertical mode', () => {
    render(<Stepper steps={mockSteps} orientation="vertical" />)
    const nav = screen.getByRole('navigation')
    const connectors = nav.querySelectorAll('[aria-hidden="true"]')
    // Should have 2 connectors for 3 steps
    expect(connectors.length).toBe(2)
  })
})

