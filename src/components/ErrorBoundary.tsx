import React, { Component, type ReactNode, type ErrorInfo } from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Button, Card } from './ui'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
          <Card className="max-w-2xl w-full p-8">
            <div className="text-center space-y-6">
              {/* Error Icon */}
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>

              {/* Error Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Something went wrong
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We're sorry, but something unexpected happened. Please try again.
                </p>
              </div>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 text-left">
                  <details className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <summary className="cursor-pointer text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100">
                      Error Details (Development Only)
                    </summary>
                    <div className="mt-4 space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">
                          Error Message
                        </p>
                        <p className="mt-1 text-sm text-red-900 dark:text-red-100 font-mono break-all">
                          {this.state.error.toString()}
                        </p>
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide mt-4">
                            Component Stack
                          </p>
                          <pre className="mt-1 text-xs text-red-900 dark:text-red-100 font-mono overflow-auto max-h-48 bg-white dark:bg-gray-900 p-3 rounded border border-red-200 dark:border-red-800">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button
                  onClick={this.handleReset}
                  variant="primary"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Reload Page
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="ghost"
                  className="flex items-center justify-center gap-2"
                >
                  <HomeIcon className="w-5 h-5" />
                  Go Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

