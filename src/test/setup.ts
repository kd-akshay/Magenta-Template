import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Extend global types for vitest
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

// Cleanup after each test
afterEach(() => {
  cleanup()
})

