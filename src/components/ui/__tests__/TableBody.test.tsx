import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TableBody from '../TableBody'

describe('TableBody', () => {
  it('renders tbody element', () => {
    render(
      <table>
        <TableBody>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    expect(screen.getByText('Cell')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <table>
        <TableBody>
          <tr>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
          </tr>
        </TableBody>
      </table>
    )
    expect(screen.getByText('Row 1')).toBeInTheDocument()
    expect(screen.getByText('Row 2')).toBeInTheDocument()
  })

  it('applies hoverable styles by default', () => {
    const { container } = render(
      <table>
        <TableBody>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = container.querySelector('tbody')
    expect(tbody).toHaveClass('[&>tr]:transition-colors')
  })

  it('disables hoverable when hoverable is false', () => {
    const { container } = render(
      <table>
        <TableBody hoverable={false}>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = container.querySelector('tbody')
    expect(tbody).not.toHaveClass('[&>tr:hover]:bg-gray-50')
  })

  it('applies striped styles when striped is true', () => {
    const { container } = render(
      <table>
        <TableBody striped>
          <tr>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = container.querySelector('tbody')
    expect(tbody).toHaveClass('[&>tr:nth-child(even)]:bg-gray-50')
  })

  it('does not apply striped styles by default', () => {
    const { container } = render(
      <table>
        <TableBody>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = container.querySelector('tbody')
    expect(tbody).not.toHaveClass('[&>tr:nth-child(even)]:bg-gray-50')
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <TableBody className="custom-class">
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = container.querySelector('tbody')
    expect(tbody).toHaveClass('custom-class')
  })
})

