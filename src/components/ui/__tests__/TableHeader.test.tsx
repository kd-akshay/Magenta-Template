import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TableHeader from '../TableHeader'

describe('TableHeader', () => {
  it('renders thead element', () => {
    render(
      <table>
        <TableHeader>
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </table>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <table>
        <TableHeader>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </TableHeader>
      </table>
    )
    expect(screen.getByText('Column 1')).toBeInTheDocument()
    expect(screen.getByText('Column 2')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    const { container } = render(
      <table>
        <TableHeader>
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </table>
    )
    const thead = container.querySelector('thead')
    expect(thead).toHaveClass('bg-primary/10')
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <TableHeader className="custom-class">
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </table>
    )
    const thead = container.querySelector('thead')
    expect(thead).toHaveClass('custom-class')
  })
})

