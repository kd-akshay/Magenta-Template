import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableRow from '../TableRow'

describe('TableRow', () => {
  it('renders tr element', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    expect(screen.getByText('Cell')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </TableRow>
        </tbody>
      </table>
    )
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
  })

  it('applies selected styles when selected is true', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow selected>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    const tr = container.querySelector('tr')
    expect(tr).toHaveClass('bg-primary/10')
  })

  it('does not apply selected styles by default', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    const tr = container.querySelector('tr')
    expect(tr).not.toHaveClass('bg-primary/10')
  })

  it('applies cursor-pointer when onClick is provided', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow onClick={() => {}}>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    const tr = container.querySelector('tr')
    expect(tr).toHaveClass('cursor-pointer')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(
      <table>
        <tbody>
          <TableRow onClick={handleClick}>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    
    await user.click(screen.getByText('Cell'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow className="custom-class">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    )
    const tr = container.querySelector('tr')
    expect(tr).toHaveClass('custom-class')
  })
})

