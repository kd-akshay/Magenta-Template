import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TableFooter from '../TableFooter'

describe('TableFooter', () => {
  it('renders tfoot element', () => {
    render(
      <table>
        <TableFooter>
          <tr>
            <td>Footer</td>
          </tr>
        </TableFooter>
      </table>
    )
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <table>
        <TableFooter>
          <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
          </tr>
        </TableFooter>
      </table>
    )
    expect(screen.getByText('Footer 1')).toBeInTheDocument()
    expect(screen.getByText('Footer 2')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    const { container } = render(
      <table>
        <TableFooter>
          <tr>
            <td>Footer</td>
          </tr>
        </TableFooter>
      </table>
    )
    const tfoot = container.querySelector('tfoot')
    expect(tfoot).toHaveClass('bg-gray-50')
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <TableFooter className="custom-class">
          <tr>
            <td>Footer</td>
          </tr>
        </TableFooter>
      </table>
    )
    const tfoot = container.querySelector('tfoot')
    expect(tfoot).toHaveClass('custom-class')
  })
})

