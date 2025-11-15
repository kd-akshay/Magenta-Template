import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table from '../Table'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import TableFooter from '../TableFooter'

describe('Table Components', () => {
  describe('Table', () => {
    it('renders table with basic structure', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Name</TableCell>
              <TableCell header>Email</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('renders table with overflow wrapper', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('overflow-x-auto')
    })

    it('renders compact table', () => {
      const { container } = render(
        <Table compact>
          <TableBody>
            <TableRow>
              <TableCell>Compact</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = container.querySelector('table')
      expect(table).toHaveClass('text-sm')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table className="custom-class">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = container.querySelector('table')
      expect(table).toHaveClass('custom-class')
    })
  })

  describe('TableHeader', () => {
    it('renders table header with primary background', () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('bg-primary/10')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <TableHeader className="custom-class">
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('custom-class')
    })
  })

  describe('TableBody', () => {
    it('renders table with striped rows', () => {
      const { container } = render(
        <Table striped>
          <TableBody striped>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = container.querySelector('tbody')
      expect(tbody).toHaveClass('[&>tr:nth-child(even)]:bg-gray-50')
    })

    it('renders table with hoverable rows', () => {
      const { container } = render(
        <Table hoverable>
          <TableBody hoverable>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = container.querySelector('tbody')
      expect(tbody).toHaveClass('[&>tr:hover]:bg-gray-50')
    })

    it('does not apply striped when striped is false', () => {
      const { container } = render(
        <Table>
          <TableBody striped={false}>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = container.querySelector('tbody')
      expect(tbody).not.toHaveClass('[&>tr:nth-child(even)]:bg-gray-50')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <TableBody className="custom-class">
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = container.querySelector('tbody')
      expect(tbody).toHaveClass('custom-class')
    })
  })

  describe('TableRow', () => {
    it('renders selected row with highlight', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = container.querySelector('tr')
      expect(row).toHaveClass('bg-primary/10')
    })

    it('calls onClick when row is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Clickable Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      await user.click(screen.getByText('Clickable Row'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('has cursor-pointer when onClick is provided', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow onClick={vi.fn()}>
              <TableCell>Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = container.querySelector('tr')
      expect(row).toHaveClass('cursor-pointer')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow className="custom-class">
              <TableCell>Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = container.querySelector('tr')
      expect(row).toHaveClass('custom-class')
    })
  })

  describe('TableCell', () => {
    it('renders as th when header is true', () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      expect(container.querySelector('th')).toBeInTheDocument()
    })

    it('renders as td when header is false', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(container.querySelector('td')).toBeInTheDocument()
    })

    it('renders table cell with alignment', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Left</TableCell>
              <TableCell align="center">Center</TableCell>
              <TableCell align="right">Right</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cells = container.querySelectorAll('td')
      expect(cells[0]).toHaveClass('text-left')
      expect(cells[1]).toHaveClass('text-center')
      expect(cells[2]).toHaveClass('text-right')
    })

    it('applies colSpan attribute', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Spanned</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cell = container.querySelector('td')
      expect(cell).toHaveAttribute('colSpan', '2')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-class">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cell = container.querySelector('td')
      expect(cell).toHaveClass('custom-class')
    })
  })

  describe('TableFooter', () => {
    it('renders table footer', () => {
      render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )

      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <TableFooter className="custom-class">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )

      const tfoot = container.querySelector('tfoot')
      expect(tfoot).toHaveClass('custom-class')
    })
  })
})

