import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeControl from '../ThemeControl'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('ThemeControl', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders closed button initially', () => {
    render(<ThemeControl />, { wrapper })
    expect(screen.getByLabelText('Open theme settings')).toBeInTheDocument()
    expect(screen.queryByText('Theme Settings')).not.toBeInTheDocument()
  })

  it('opens panel when button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const button = screen.getByLabelText('Open theme settings')
    await user.click(button)
    
    expect(screen.getByText('Theme Settings')).toBeInTheDocument()
  })

  it('closes panel when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    const closeButton = screen.getByLabelText('Close theme settings')
    await user.click(closeButton)
    
    expect(screen.queryByText('Theme Settings')).not.toBeInTheDocument()
  })

  it('renders theme mode selector', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    expect(screen.getByText('Theme Mode')).toBeInTheDocument()
  })

  it('renders color pickers', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    expect(screen.getByText('Colors')).toBeInTheDocument()
    expect(screen.getByText('primary')).toBeInTheDocument()
  })

  it('renders font size selector', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    expect(screen.getByText('Font Size')).toBeInTheDocument()
  })

  it('renders spacing scale selector', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    expect(screen.getByText('Spacing Scale')).toBeInTheDocument()
  })

  it('renders reset button', async () => {
    const user = userEvent.setup()
    render(<ThemeControl />, { wrapper })
    
    const openButton = screen.getByLabelText('Open theme settings')
    await user.click(openButton)
    
    expect(screen.getByText('Reset to Defaults')).toBeInTheDocument()
  })
})

