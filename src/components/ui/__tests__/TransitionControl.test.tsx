import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransitionProvider } from '@/contexts/TransitionContext'
import TransitionControl from '../TransitionControl'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TransitionProvider>{children}</TransitionProvider>
)

describe('TransitionControl', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders closed button initially', () => {
    render(<TransitionControl />, { wrapper })
    expect(screen.getByLabelText('Open transition settings')).toBeInTheDocument()
    expect(screen.queryByText('Transition Settings')).not.toBeInTheDocument()
  })

  it('opens panel when button is clicked', async () => {
    const user = userEvent.setup()
    render(<TransitionControl />, { wrapper })
    
    const button = screen.getByLabelText('Open transition settings')
    await user.click(button)
    
    expect(screen.getByText('Transition Settings')).toBeInTheDocument()
  })

  it('closes panel when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<TransitionControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open transition settings')
    await user.click(openButton)
    
    const closeButton = screen.getByLabelText('Close transition settings')
    await user.click(closeButton)
    
    expect(screen.queryByText('Transition Settings')).not.toBeInTheDocument()
  })

  it('renders transition speed selector', async () => {
    const user = userEvent.setup()
    render(<TransitionControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open transition settings')
    await user.click(openButton)
    
    expect(screen.getByText('Transition Speed')).toBeInTheDocument()
  })

  it('renders custom duration input when speed is custom', async () => {
    const user = userEvent.setup()
    render(<TransitionControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open transition settings')
    await user.click(openButton)
    
    // Set to custom first
    const speedSelect = screen.getByLabelText(/transition speed/i)
    await user.selectOptions(speedSelect, 'custom')
    
    expect(screen.getByText('Custom Duration (ms)')).toBeInTheDocument()
  })

  it('displays current transition configuration', async () => {
    const user = userEvent.setup()
    render(<TransitionControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open transition settings')
    await user.click(openButton)
    
    expect(screen.getByText(/normal/i)).toBeInTheDocument()
  })
})

