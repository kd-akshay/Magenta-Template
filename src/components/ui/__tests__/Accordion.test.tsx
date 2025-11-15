import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from '../Accordion'

describe('Accordion', () => {
  const items = [
    { title: 'Item 1', content: <div>Content 1</div> },
    { title: 'Item 2', content: <div>Content 2</div> },
    { title: 'Item 3', content: <div>Content 3</div> },
  ]

  it('renders accordion with items', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('does not show content by default', () => {
    render(<Accordion items={items} />)
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('shows content when item is clicked', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    
    await user.click(screen.getByText('Item 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('hides content when item is clicked again', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    
    const item1 = screen.getByText('Item 1')
    await user.click(item1)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    
    await user.click(item1)
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('opens defaultOpen items', () => {
    const itemsWithDefault = [
      { title: 'Item 1', content: <div>Content 1</div>, defaultOpen: true },
      { title: 'Item 2', content: <div>Content 2</div> },
    ]
    render(<Accordion items={itemsWithDefault} />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('closes other items when allowMultiple is false', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} allowMultiple={false} />)
    
    await user.click(screen.getByText('Item 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    
    await user.click(screen.getByText('Item 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('allows multiple items open when allowMultiple is true', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} allowMultiple={true} />)
    
    await user.click(screen.getByText('Item 1'))
    await user.click(screen.getByText('Item 2'))
    
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('updates aria-expanded when toggled', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    
    const button = screen.getByRole('button', { name: 'Item 1' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('applies custom className', () => {
    const { container } = render(<Accordion items={items} className="custom-class" />)
    const accordion = container.querySelector('div')
    expect(accordion).toHaveClass('custom-class')
  })
})

