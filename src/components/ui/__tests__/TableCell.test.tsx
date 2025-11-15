import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TableCell from '../TableCell'

describe('TableCell', () => {
  it('renders td element by default', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText('Cell')).toBeInTheDocument()
    const cell = screen.getByText('Cell')
    expect(cell.tagName).toBe('TD')
  })

  it('renders th element when header is true', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableCell header>Header</TableCell>
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    const cell = screen.getByText('Header')
    expect(cell.tagName).toBe('TH')
  })

  it('renders children', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell Content</TableCell>
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText('Cell Content')).toBeInTheDocument()
  })

  it('aligns content to left by default', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveClass('text-left')
  })

  it('aligns content to center', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell align="center">Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveClass('text-center')
  })

  it('aligns content to right', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell align="right">Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveClass('text-right')
  })

  it('applies header styles when header is true', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableCell header>Header</TableCell>
          </tr>
        </thead>
      </table>
    )
    const cell = container.querySelector('th')
    expect(cell).toHaveClass('font-semibold', 'uppercase')
  })

  it('applies cell styles when header is false', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveClass('text-sm')
    expect(cell).not.toHaveClass('font-semibold', 'uppercase')
  })

  it('sets colSpan attribute', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell colSpan={2}>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveAttribute('colSpan', '2')
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell className="custom-class">Cell</TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = container.querySelector('td')
    expect(cell).toHaveClass('custom-class')
  })
})

