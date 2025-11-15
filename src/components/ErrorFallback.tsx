import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { Button, Card } from './ui'

/**
 * Error fallback component for React Router errorElement
 */
const ErrorFallback = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'An unexpected error occurred'
  let errorDetails = ''

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || `Error ${error.status}`
    errorDetails = error.data?.message || error.data?.toString() || ''
  } else if (error instanceof Error) {
    errorMessage = error.message
    errorDetails = error.stack || ''
  }

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
              {errorMessage}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We're sorry, but something went wrong while loading this page.
            </p>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && errorDetails && (
            <div className="mt-6 text-left">
              <details className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-red-900 dark:text-red-100 font-mono overflow-auto max-h-48 bg-white dark:bg-gray-900 p-3 rounded border border-red-200 dark:border-red-800 whitespace-pre-wrap">
                  {errorDetails}
                </pre>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/', { replace: true })}
              variant="primary"
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

export default ErrorFallback

