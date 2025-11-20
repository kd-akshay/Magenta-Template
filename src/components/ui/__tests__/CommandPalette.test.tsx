import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommandPalette from '../CommandPalette'

describe('CommandPalette', () => {
  const options = [
    {
      id: '1',
      label: 'Home',
      description: 'Go to home',
      action: vi.fn(),
      group: 'Navigation',
    },
    {
      id: '2',
      label: 'Settings',
      description: 'Open settings',
      action: vi.fn(),
      group: 'Navigation',
    },
  ]

  it('renders when open', () => {
    render(
      <CommandPalette isOpen={true} onClose={vi.fn()} options={options} />
    )
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <CommandPalette isOpen={false} onClose={vi.fn()} options={options} />
    )
    expect(screen.queryByPlaceholderText(/type a command/i)).not.toBeInTheDocument()
  })

  it('filters options based on search query', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette isOpen={true} onClose={vi.fn()} options={options} />
    )
    
    const input = screen.getByPlaceholderText(/type a command/i)
    await user.type(input, 'Home')
    
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.queryByText('Settings')).not.toBeInTheDocument()
    })
  })

  it('calls action and closes when option is selected', async () => {
    const handleClose = vi.fn()
    const action = vi.fn()
    const optionsWithAction = [
      { ...options[0], action },
    ]
    const user = userEvent.setup()
    
    render(
      <CommandPalette isOpen={true} onClose={handleClose} options={optionsWithAction} />
    )
    
    await waitFor(() => {
      const option = screen.getByText('Home')
      return expect(option).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Home'))
    expect(action).toHaveBeenCalledTimes(1)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('displays empty message when no results', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette isOpen={true} onClose={vi.fn()} options={options} />
    )
    
    const input = screen.getByPlaceholderText(/type a command/i)
    await user.type(input, 'NonExistent')
    
    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument()
    })
  })

  it('groups options by group property', () => {
    render(
      <CommandPalette isOpen={true} onClose={vi.fn()} options={options} />
    )
    expect(screen.getByText('NAVIGATION')).toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(
      <CommandPalette isOpen={true} onClose={vi.fn()} options={options} />
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })
})

