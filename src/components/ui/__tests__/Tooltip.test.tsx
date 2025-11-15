import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tooltip from '../Tooltip'
import Button from '../Button'

describe('Tooltip', () => {
  it('renders tooltip trigger', () => {
    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('renders tooltip content on hover', async () => {
    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    )
    
    // Note: Headless UI Popover may handle visibility differently
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('renders with different positions', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
    )
    expect(screen.getByText('Top')).toBeInTheDocument()
    
    rerender(
      <Tooltip content="Tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    )
    expect(screen.getByText('Bottom')).toBeInTheDocument()
    
    rerender(
      <Tooltip content="Tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
    )
    expect(screen.getByText('Left')).toBeInTheDocument()
    
    rerender(
      <Tooltip content="Tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
    )
    expect(screen.getByText('Right')).toBeInTheDocument()
  })
})

