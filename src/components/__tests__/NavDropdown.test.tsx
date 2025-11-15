import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { TransitionProvider } from '@/contexts/TransitionContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import NavDropdown from '../NavDropdown'
import { Squares2X2Icon } from '@heroicons/react/24/outline'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider>
      <TransitionProvider>
        {children}
      </TransitionProvider>
    </ThemeProvider>
  </BrowserRouter>
)

const mockItems = [
  { path: '/test1', label: 'Test 1' },
  { path: '/test2', label: 'Test 2', icon: <Squares2X2Icon className="w-5 h-5" /> },
  { path: '/test3', label: 'Test 3', divider: true },
]

describe('NavDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with label', () => {
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const icon = <Squares2X2Icon className="w-5 h-5" data-testid="icon" />
    render(<NavDropdown label="Menu" items={mockItems} icon={icon} />, { wrapper })
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('opens dropdown when button is clicked', async () => {
    const user = userEvent.setup()
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument()
    })
  })

  it('renders all menu items', async () => {
    const user = userEvent.setup()
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument()
      expect(screen.getByText('Test 2')).toBeInTheDocument()
      expect(screen.getByText('Test 3')).toBeInTheDocument()
    })
  })

  it('renders items with icons', async () => {
    const user = userEvent.setup()
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    await user.click(button)
    
    await waitFor(() => {
      const item2 = screen.getByText('Test 2').closest('a')
      expect(item2?.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('closes dropdown when item is clicked', async () => {
    const user = userEvent.setup()
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument()
    })
    
    const item = screen.getByText('Test 1')
    await user.click(item)
    
    await waitFor(() => {
      expect(screen.queryByText('Test 1')).not.toBeInTheDocument()
    })
  })

  it('marks active item', async () => {
    const user = userEvent.setup()
    // Mock current location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test1' },
      writable: true,
    })
    
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    await user.click(button)
    
    await waitFor(() => {
      const activeItem = screen.getByText('Test 1').closest('a')
      expect(activeItem).toHaveClass('bg-primary/10')
    })
  })

  it('highlights active dropdown when current path matches any item', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test2' },
      writable: true,
    })
    
    render(<NavDropdown label="Menu" items={mockItems} />, { wrapper })
    
    const button = screen.getByText('Menu')
    expect(button.closest('button')).toHaveClass('text-primary', 'bg-primary/10')
  })
})

