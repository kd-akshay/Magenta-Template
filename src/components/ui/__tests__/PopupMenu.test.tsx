import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupMenu from '../PopupMenu'
import Button from '../Button'

describe('PopupMenu', () => {
  const items = [
    { label: 'Edit', onClick: vi.fn() },
    { label: 'Delete', onClick: vi.fn(), danger: true },
    { label: 'Disabled', onClick: vi.fn(), disabled: true },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders menu trigger', () => {
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('opens menu when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    
    await user.click(screen.getByText('Menu'))
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('calls onClick when menu item is clicked', async () => {
    const user = userEvent.setup()
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    
    await user.click(screen.getByText('Menu'))
    await user.click(screen.getByText('Edit'))
    expect(items[0].onClick).toHaveBeenCalledTimes(1)
  })

  it('renders disabled menu items', async () => {
    const user = userEvent.setup()
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    
    await user.click(screen.getByText('Menu'))
    const disabledItem = screen.getByText('Disabled')
    expect(disabledItem.closest('button')).toBeDisabled()
  })

  it('renders danger items with danger styling', async () => {
    const user = userEvent.setup()
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    
    await user.click(screen.getByText('Menu'))
    const dangerItem = screen.getByText('Delete')
    expect(dangerItem.closest('button')).toHaveClass('text-red-600')
  })

  it('renders menu items with icons', async () => {
    const user = userEvent.setup()
    const itemsWithIcon = [
      { label: 'Edit', onClick: vi.fn(), icon: <span>📝</span> },
    ]
    render(
      <PopupMenu trigger={<Button>Menu</Button>} items={itemsWithIcon} />
    )
    
    await user.click(screen.getByText('Menu'))
    expect(screen.getByText('📝')).toBeInTheDocument()
  })

  it('renders menu on right by default', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} />
    )
    
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('[role="menu"]')
    expect(menu).toHaveClass('right-0')
  })

  it('renders menu on left when position is left', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <PopupMenu trigger={<Button>Menu</Button>} items={items} position="left" />
    )
    
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('[role="menu"]')
    expect(menu).toHaveClass('left-0')
  })
})

