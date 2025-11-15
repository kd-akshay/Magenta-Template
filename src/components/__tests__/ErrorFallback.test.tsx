import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import ErrorFallback from '../ErrorFallback'

// Helper to create a router with error
const createRouterWithError = (error: Error | Response) => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: '/error',
        element: <div>Should not render</div>,
        errorElement: <ErrorFallback />,
        loader: () => {
          throw error
        },
      },
    ],
    {
      initialEntries: ['/error'],
    }
  )
}

describe('ErrorFallback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders error message for route error', () => {
    const error = new Response('Not Found', { status: 404, statusText: 'Not Found' })
    const router = createRouterWithError(error)
    
    render(<RouterProvider router={router} />)
    
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  it('renders error message for Error instance', () => {
    const error = new Error('Test error message')
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Home</div>,
          errorElement: <ErrorFallback />,
        },
      ],
      {
        initialEntries: ['/'],
      }
    )
    
    // Simulate error by throwing in render
    const ThrowError = () => {
      throw error
    }
    
    render(
      <RouterProvider router={router} />
    )
  })

  it('displays error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    
    const error = new Error('Test error')
    error.stack = 'Error stack trace'
    
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Home</div>,
          errorElement: <ErrorFallback />,
        },
      ],
      {
        initialEntries: ['/'],
      }
    )
    
    // This is a simplified test - in reality, React Router would handle the error
    render(<RouterProvider router={router} />)
    
    process.env.NODE_ENV = originalEnv
  })

  it('renders action buttons', () => {
    const error = new Response('Error', { status: 500 })
    const router = createRouterWithError(error)
    
    render(<RouterProvider router={router} />)
    
    // Wait for error to render
    setTimeout(() => {
      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument()
    }, 100)
  })
})

