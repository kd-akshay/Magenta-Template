import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedSkeleton from '../AnimatedSkeleton'

describe('AnimatedSkeleton', () => {
  it('renders skeleton', () => {
    const { container } = render(<AnimatedSkeleton />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toBeInTheDocument()
  })

  it('renders with text variant by default', () => {
    const { container } = render(<AnimatedSkeleton />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('h-4', 'rounded')
  })

  it('renders with different variants', () => {
    const { rerender, container } = render(<AnimatedSkeleton variant="text" />)
    let skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('h-4', 'rounded')
    
    rerender(<AnimatedSkeleton variant="circular" />)
    skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('rounded-full')
    
    rerender(<AnimatedSkeleton variant="rectangular" />)
    skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('rounded-lg')
  })

  it('applies custom width as number', () => {
    const { container } = render(<AnimatedSkeleton width={200} />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ width: '200px' })
  })

  it('applies custom width as string', () => {
    const { container } = render(<AnimatedSkeleton width="50%" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ width: '50%' })
  })

  it('applies custom height as number', () => {
    const { container } = render(<AnimatedSkeleton height={100} />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ height: '100px' })
  })

  it('applies custom height as string', () => {
    const { container } = render(<AnimatedSkeleton height="2rem" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ height: '2rem' })
  })

  it('renders single line by default', () => {
    const { container } = render(<AnimatedSkeleton />)
    const skeletons = container.querySelectorAll('div')
    expect(skeletons.length).toBe(1)
  })

  it('renders multiple lines', () => {
    const { container } = render(<AnimatedSkeleton lines={3} />)
    // When lines > 1, there's a wrapper div with children divs
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('DIV')
    const skeletons = wrapper.querySelectorAll('div')
    expect(skeletons.length).toBe(3)
  })

  it('applies 80% width to last line when multiple lines', () => {
    const { container } = render(<AnimatedSkeleton lines={3} />)
    const wrapper = container.firstChild as HTMLElement
    const skeletons = wrapper.querySelectorAll('div')
    const lastLine = skeletons[skeletons.length - 1] as HTMLElement
    expect(lastLine).toHaveStyle({ width: '80%' })
  })

  it('applies custom width to last line when specified', () => {
    const { container } = render(<AnimatedSkeleton lines={3} width="60%" />)
    const wrapper = container.firstChild as HTMLElement
    const skeletons = wrapper.querySelectorAll('div')
    const lastLine = skeletons[skeletons.length - 1] as HTMLElement
    expect(lastLine).toHaveStyle({ width: '60%' })
  })

  it('applies custom className', () => {
    const { container } = render(<AnimatedSkeleton className="custom-class" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('custom-class')
  })
})

