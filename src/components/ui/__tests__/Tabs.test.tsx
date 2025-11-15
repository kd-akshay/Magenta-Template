import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs from '../Tabs'

describe('Tabs', () => {
  const items = [
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
    { label: 'Tab 3', content: <div>Content 3</div> },
  ]

  it('renders tabs with items', () => {
    render(<Tabs items={items} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('renders first tab content by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('renders default tab content when defaultTab is set', () => {
    render(<Tabs items={items} defaultTab={1} />)
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} />)
    
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('does not switch when disabled tab is clicked', async () => {
    const user = userEvent.setup()
    const itemsWithDisabled = [
      { label: 'Tab 1', content: <div>Content 1</div> },
      { label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ]
    render(<Tabs items={itemsWithDisabled} />)
    
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('marks active tab with aria-selected', () => {
    render(<Tabs items={items} />)
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    expect(tab2).toHaveAttribute('aria-selected', 'false')
  })

  it('applies custom className', () => {
    const { container } = render(<Tabs items={items} className="custom-class" />)
    const tabsContainer = container.querySelector('div')
    expect(tabsContainer).toHaveClass('custom-class')
  })
})

