import { usePageLoader } from '@/hooks/usePageLoader'
import PageLoader from '@/components/PageLoader'
import { Card, Button, Badge, Divider } from '@/components/ui'

const PageLoaderExample = () => {
  const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()

  const simulateFastLoad = () => {
    startLoading('Loading quickly...')
    setTimeout(() => stopLoading(), 500)
  }

  const simulateSlowLoad = () => {
    startLoading('Fetching data from server...')
    setTimeout(() => stopLoading(), 3000)
  }

  const simulateApiCall = () => {
    startLoading('Processing request...')
    setTimeout(() => stopLoading(), 2000)
  }

  const simulateError = async () => {
    startLoading('Attempting to load...')
    setTimeout(() => {
      stopLoading()
      alert('Error occurred!')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Page Loader Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This page demonstrates the page-level loader component. Click the buttons below to see different loading scenarios.
        </p>
      </div>

      {/* Page Loader Component */}
      <PageLoader isLoading={isLoading} message={loadingMessage} />

      {/* Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Fast Load (500ms)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Simulates a quick operation that completes in 500ms.
          </p>
          <Button onClick={simulateFastLoad} className="w-full" variant="primary">
            Trigger Fast Load
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Slow Load (3s)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Simulates a slower operation that takes 3 seconds.
          </p>
          <Button onClick={simulateSlowLoad} className="w-full" variant="primary">
            Trigger Slow Load
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            API Call (2s)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Simulates an API request that takes 2 seconds.
          </p>
          <Button onClick={simulateApiCall} className="w-full" variant="outline">
            Trigger API Call
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Error Scenario
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Simulates a failed operation with error handling.
          </p>
          <Button onClick={simulateError} className="w-full" variant="outline">
            Trigger Error
          </Button>
        </Card>
      </div>

      {/* Status Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Current Status
          </h2>
          <Badge variant={isLoading ? 'warning' : 'success'}>
            {isLoading ? 'Loading' : 'Idle'}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Loading State:</strong> {isLoading ? 'true' : 'false'}</p>
          <p><strong>Message:</strong> {loadingMessage}</p>
        </div>
      </Card>

      {/* Code Examples */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Usage Examples
        </h2>

        <div className="space-y-6">
          {/* Basic Usage */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Basic Usage with Hook
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { usePageLoader } from '@/hooks/usePageLoader'
import PageLoader from '@/components/PageLoader'

const MyPage = () => {
  const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()

  const fetchData = async () => {
    startLoading('Fetching data...')
    try {
      const data = await api.getData()
      // Handle data
    } finally {
      stopLoading()
    }
  }

  return (
    <>
      <PageLoader isLoading={isLoading} message={loadingMessage} />
      {/* Your page content */}
    </>
  )
}`}
            </pre>
          </div>

          <Divider />

          {/* With Custom Message */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              With Custom Messages
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleSave = async () => {
  startLoading('Saving changes...')
  try {
    await api.save(data)
  } finally {
    stopLoading()
  }
}

const handleDelete = async () => {
  startLoading('Deleting item...')
  try {
    await api.delete(id)
  } finally {
    stopLoading()
  }
}`}
            </pre>
          </div>

          <Divider />

          {/* Inline Loader */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Inline Loader (Non-Fullscreen)
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<PageLoader 
  isLoading={isLoading} 
  message="Loading content..."
  fullScreen={false}
/>`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PageLoaderExample

