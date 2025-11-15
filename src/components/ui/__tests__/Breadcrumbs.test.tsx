import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products/electronics' },
    { label: 'Current Page' },
  ]

  it('renders breadcrumbs with items', () => {
    renderWithRouter(<Breadcrumbs items={items} />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('renders home icon', () => {
    renderWithRouter(<Breadcrumbs items={items} />)
    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders last item as span (current page)', () => {
    renderWithRouter(<Breadcrumbs items={items} />)
    const lastItem = screen.getByText('Current Page')
    expect(lastItem.tagName).toBe('SPAN')
    expect(lastItem).toHaveAttribute('aria-current', 'page')
  })

  it('renders non-last items with paths as links', () => {
    renderWithRouter(<Breadcrumbs items={items} />)
    const productsLink = screen.getByText('Products').closest('a')
    expect(productsLink).toHaveAttribute('href', '/products')
    
    const electronicsLink = screen.getByText('Electronics').closest('a')
    expect(electronicsLink).toHaveAttribute('href', '/products/electronics')
  })

  it('renders item without path as span', () => {
    const itemsWithoutPath = [
      { label: 'Products' },
      { label: 'Current' },
    ]
    renderWithRouter(<Breadcrumbs items={itemsWithoutPath} />)
    expect(screen.getByText('Products').tagName).toBe('SPAN')
  })

  it('applies custom className', () => {
    const { container } = renderWithRouter(<Breadcrumbs items={items} className="custom-class" />)
    expect(container.querySelector('nav')).toHaveClass('custom-class')
  })

  it('renders chevron separators', () => {
    const { container } = renderWithRouter(<Breadcrumbs items={items} />)
    const chevrons = container.querySelectorAll('svg')
    expect(chevrons.length).toBeGreaterThan(0)
  })
})

